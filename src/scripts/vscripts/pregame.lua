-- Libraries
local constants = require('constants')
local network = require('network')
local OptionManager = require('optionmanager')
local SkillManager = require('skillmanager')
local Timers = require('easytimers')
local SpellFixes = require('spellfixes')
local util = require('util')
require('statcollection.init')

--[[
    Main pregame, selection related handler
]]

local Pregame = class({})

-- Init pregame stuff
function Pregame:init()
    -- Store for options
    self.optionStore = {}

    -- Store for selected heroes and skills
    self.selectedHeroes = {}
    self.selectedPlayerAttr = {}
    self.selectedSkills = {}
    self.selectedRandomBuilds = {}

    -- Mirror draft stuff
    self.useDraftArrays = false
    self.maxDraftHeroes = 30
    self.maxDraftSkills = 0

    -- Stores which playerIDs we have already spawned
    self.spawnedHeroesFor = {}

    -- List of banned abilities
    self.bannedAbilities = {}

    -- List of banned heroes
    self.bannedHeroes = {}

    -- Stores the total bans for each player
    self.usedBans = {}

    -- Who is ready?
    self.isReady = {}

    -- Set it to the loading phase
    self:setPhase(constants.PHASE_LOADING)

    -- Init thinker
    GameRules:GetGameModeEntity():SetThink('onThink', self, 'PregameThink', 0.25)
    GameRules:SetHeroSelectionTime(0)   -- Hero selection is done elsewhere, hero selection should be instant

    -- Rune fix
    local totalRunes = 0
    local needBounty = false
    GameRules:GetGameModeEntity():SetRuneSpawnFilter(function(context, runeStuff)
        totalRunes = totalRunes + 1
        if totalRunes < 3 then
            runeStuff.rune_type = DOTA_RUNE_BOUNTY
        else
            if totalRunes % 2 == 1 then
                if math.random() < 0.5 then
                    needBounty = false
                    runeStuff.rune_type = DOTA_RUNE_BOUNTY
                else
                    needBounty = true
                    runeStuff.rune_type = util:pickRandomRune()
                end
            else
                if needBounty then
                    runeStuff.rune_type = DOTA_RUNE_BOUNTY
                else
                    runeStuff.rune_type = util:pickRandomRune()

                end

                -- No longer need a bounty rune
                needBounty = false
            end
        end

        return true
    end, self)

    -- Load troll combos
    self:loadTrollCombos()

    -- Init options
    self:initOptionSelector()

    -- Grab a reference to self
    local this = self

    --[[
        Listen to events
    ]]

    -- Options are locked
    CustomGameEventManager:RegisterListener('lodOptionsLocked', function(eventSourceIndex, args)
        this:onOptionsLocked(eventSourceIndex, args)
    end)

    -- Host looks at a different tab
    CustomGameEventManager:RegisterListener('lodOptionsMenu', function(eventSourceIndex, args)
        this:onOptionsMenuChanged(eventSourceIndex, args)
    end)

    -- Host wants to set an option
    CustomGameEventManager:RegisterListener('lodOptionSet', function(eventSourceIndex, args)
        this:onOptionChanged(eventSourceIndex, args)
    end)

    -- Player wants to set their hero
    CustomGameEventManager:RegisterListener('lodChooseHero', function(eventSourceIndex, args)
        this:onPlayerSelectHero(eventSourceIndex, args)
    end)

    -- Player wants to set their new primary attribute
    CustomGameEventManager:RegisterListener('lodChooseAttr', function(eventSourceIndex, args)
        this:onPlayerSelectAttr(eventSourceIndex, args)
    end)

    -- Player wants to change which ability is in a slot
    CustomGameEventManager:RegisterListener('lodChooseAbility', function(eventSourceIndex, args)
        this:onPlayerSelectAbility(eventSourceIndex, args)
    end)

    -- Player wants a random ability for a slot
    CustomGameEventManager:RegisterListener('lodChooseRandomAbility', function(eventSourceIndex, args)
        this:onPlayerSelectRandomAbility(eventSourceIndex, args)
    end)

    -- Player wants to swap two slots
    CustomGameEventManager:RegisterListener('lodSwapSlots', function(eventSourceIndex, args)
        this:onPlayerSwapSlot(eventSourceIndex, args)
    end)

    -- Player wants to perform a ban
    CustomGameEventManager:RegisterListener('lodBan', function(eventSourceIndex, args)
        this:onPlayerBan(eventSourceIndex, args)
    end)

    -- Player wants to ready up
    CustomGameEventManager:RegisterListener('lodReady', function(eventSourceIndex, args)
        this:onPlayerReady(eventSourceIndex, args)
    end)

    -- Player wants to select their all random build
    CustomGameEventManager:RegisterListener('lodSelectAllRandomBuild', function(eventSourceIndex, args)
        this:onPlayerSelectAllRandomBuild(eventSourceIndex, args)
    end)

    -- Player wants to select a full build
    CustomGameEventManager:RegisterListener('lodSelectBuild', function(eventSourceIndex, args)
        this:onPlayerSelectBuild(eventSourceIndex, args)
    end)

    -- Player wants their hero to be spawned
    CustomGameEventManager:RegisterListener('lodSpawnHero', function(eventSourceIndex, args)
        this:onPlayerAskForHero(eventSourceIndex, args)
    end)

    -- Network heroes
    self:networkHeroes()

    -- Setup default option related stuff
    network:setActiveOptionsTab('presets')
    self:setOption('lodOptionBanning', 1)
    self:setOption('lodOptionSlots', 6)
    self:setOption('lodOptionUlts', 2)
    self:setOption('lodOptionGamemode', 1)
    self:setOption('lodOptionMirrorHeroes', 20)

    -- Map enforcements
    local mapName = GetMapName()

    -- All Pick Only
    if mapName == 'all_pick' then
        self:setOption('lodOptionGamemode', 1)
    end

    -- Mirror Draft Only
    if mapName == 'mirror_draft' then
        self:setOption('lodOptionGamemode', 3)
    end

    -- All random only
    if mapName == 'all_random' then
        self:setOption('lodOptionGamemode', 4)
    end

    -- Exports for stat collection
    local this = self
    function PlayerResource:getPlayerStats(playerID)
        return this:getPlayerStats(playerID)
    end
end

-- Gets stats for the given player
function Pregame:getPlayerStats(playerID)
    local playerInfo =  {
        steamID32 = PlayerResource:GetSteamAccountID(playerID),                         -- steamID32    The player's steamID
    }

    -- Add selected hero
    playerInfo.h = (self.selectedHeroes[playerID] or ''):gsub('npc_dota_hero_', '')     -- h            The hero they selected

    -- Add selected skills
    local build = self.selectedSkills[playerID] or {}
    for i=1,6 do
        playerInfo['A' .. i] = build[i] or ''                                           -- A[1-6]       Ability 1 - 6
    end

    -- Add selected attribute
    playerInfo.s = self.selectedPlayerAttr[playerID] or ''                              -- s            Selected Attribute (str, agi, int)

    -- Grab there hero and attempt to add info on it
    local hero = PlayerResource:GetSelectedHeroEntity(playerID)

    -- Ensure we have a hero
    if hero ~= nil then
        -- Attempt to find team
        playerInfo.t = hero:GetTeam()                                                   -- t            The team number this player is on

        -- Read key info
        playerInfo.l = hero:GetLevel()                                                  -- l            The level of this hero
        playerInfo.k = hero:GetKills()                                                  -- k            The number of kills this hero has
        playerInfo.a = hero:GetAssists()                                                -- a            The number of assists this player has
        playerInfo.d = hero:GetDeaths()                                                 -- d            The number of deaths this player has
        playerInfo.g = math.floor(PlayerResource:GetGoldPerMin(playerID))               -- g            This player's gold per minute
        playerInfo.x = math.floor(PlayerResource:GetXPPerMin(playerID))                 -- x            This player's EXP per minute
        playerInfo.r = math.floor(PlayerResource:GetGold(playerID))                     -- r            How much gold this player currently has
        for slotID=1,6 do
            local item = hero:GetItemInSlot(slotID - 1)

            if item then
                playerInfo['I' .. slotID] = item:GetAbilityName():gsub('item_', '')     -- I[1-6]       Items 1 - 6
            else
                playerInfo['I' .. slotID] = ''
            end
        end
    else
        -- Default values if hero doesn't exist for some weird reason
        playerInfo.t = 0
        playerInfo.l = 0
        playerInfo.k = 0
        playerInfo.a = 0
        playerInfo.d = 0
        playerInfo.g = 0
        playerInfo.x = 0
        playerInfo.r = 0
        playerInfo['I1'] = ''
        playerInfo['I2'] = ''
        playerInfo['I3'] = ''
        playerInfo['I4'] = ''
        playerInfo['I5'] = ''
        playerInfo['I6'] = ''
    end

    return playerInfo
end

-- Thinker function to handle logic
function Pregame:onThink()
    -- Grab the phase
    local ourPhase = self:getPhase()

    --[[
        LOADING PHASE
    ]]
    if ourPhase == constants.PHASE_LOADING then
        -- Are we in the custom game setup phase?
        if GameRules:State_Get() >= DOTA_GAMERULES_STATE_CUSTOM_GAME_SETUP then
            self:setPhase(constants.PHASE_OPTION_SELECTION)
            self:setEndOfPhase(Time() + OptionManager:GetOption('maxOptionSelectionTime'))
        end

        -- Wait for time to pass
        return 0.1
    end

    --[[
        OPTION SELECTION PHASE
    ]]
    if ourPhase == constants.PHASE_OPTION_SELECTION then
        -- Is it over?
        if Time() >= self:getEndOfPhase() and self.freezeTimer == nil then
            -- Finish the option selection
            self:finishOptionSelection()
        end

        return 0.1
    end

    -- Process options ONCE here
    if not self.processedOptions then
        self:processOptions()
    end

    --[[
        BANNING PHASE
    ]]
    if ourPhase == constants.PHASE_BANNING then
        -- Is it over?
        if Time() >= self:getEndOfPhase() and self.freezeTimer == nil then
            -- Is there hero selection?
            if self.noHeroSelection then
                -- Is there all random selection?
                if self.allRandomSelection then
                    -- Goto all random
                    self:setPhase(constants.PHASE_RANDOM_SELECTION)
                    self:setEndOfPhase(Time() + OptionManager:GetOption('randomSelectionTime'), OptionManager:GetOption('randomSelectionTime'))
                else
                    -- Nope, change to review
                    self:setPhase(constants.PHASE_REVIEW)
                    self:setEndOfPhase(Time() + OptionManager:GetOption('reviewTime'), OptionManager:GetOption('reviewTime'))
                end
            else
                -- Change to picking phase
                self:setPhase(constants.PHASE_SELECTION)
                self:setEndOfPhase(Time() + OptionManager:GetOption('pickingTime'), OptionManager:GetOption('pickingTime'))
            end
        end

        return 0.1
    end

    -- Selection phase
    if ourPhase == constants.PHASE_SELECTION then
        if self.useDraftArrays and not self.draftArrays then
            self:buildDraftArrays()
        end

        -- Is it over?
        if Time() >= self:getEndOfPhase() and self.freezeTimer == nil then
            -- Change to picking phase
            self:setPhase(constants.PHASE_REVIEW)
            self:setEndOfPhase(Time() + OptionManager:GetOption('reviewTime'), OptionManager:GetOption('reviewTime'))
        end

        return 0.1
    end

    -- All random phase
    if ourPhase == constants.PHASE_RANDOM_SELECTION then
        if not self.allRandomBuilds then
            self:generateAllRandomBuilds()
        end

        -- Is it over?
        if Time() >= self:getEndOfPhase() and self.freezeTimer == nil then
            -- Change to picking phase
            self:setPhase(constants.PHASE_REVIEW)
            self:setEndOfPhase(Time() + OptionManager:GetOption('reviewTime'), OptionManager:GetOption('reviewTime'))
        end

        return 0.1
    end

    -- Process options ONCE here
    if not self.validatedBuilds then
        self:validateBuilds()
    end

    -- Review
    if ourPhase == constants.PHASE_REVIEW then
        -- Is it over?
        if Time() >= self:getEndOfPhase() and self.freezeTimer == nil then
            -- Change to picking phase
            self:setPhase(constants.PHASE_INGAME)

            -- Kill the selection screen
            GameRules:FinishCustomGameSetup()
        end

        return 0.1
    end

    -- Once we get to this point, we will not fire again

    -- Game is starting, spawn heroes
    if ourPhase == constants.PHASE_INGAME then
        self:spawnAllHeroes()
        self:addExtraTowers()
        self:preventCamping()
    end
end

-- Spawns all heroes (this should only be called once!)
function Pregame:spawnAllHeroes()
    local minPlayerID = 0
    local maxPlayerID = 24

    -- Loop over all playerIDs
    for playerID = minPlayerID,maxPlayerID do
        -- Attempt to spawn the player
        self:spawnPlayer(playerID)
    end
end

-- Spawns a given player
function Pregame:spawnPlayer(playerID)
    -- Is there a player in this slot?
    if PlayerResource:IsValidPlayerID(playerID) then
        -- There is, go ahead and build this player

        -- Only spawn a hero for a given player ONCE
        if self.spawnedHeroesFor[playerID] then return end
        self.spawnedHeroesFor[playerID] = true

        -- Grab their build
        local build = self.selectedSkills[playerID]

        -- Validate the player
        local player = PlayerResource:GetPlayer(playerID)
        if player ~= nil then
            local heroName = self.selectedHeroes[playerID] or self:getRandomHero()

            -- Attempt to precache their hero
            PrecacheUnitByNameAsync(heroName, function()
                -- Create the hero and validate it
                local hero = CreateHeroForPlayer(heroName, player)
                if hero ~= nil and IsValidEntity(hero) then
                    SkillManager:ApplyBuild(hero, build or {})

                    -- Do they have a custom attribute set?
                    if self.selectedPlayerAttr[playerID] ~= nil then
                        -- Set it

                        local toSet = 0

                        if self.selectedPlayerAttr[playerID] == 'str' then
                            toSet = 0
                        elseif self.selectedPlayerAttr[playerID] == 'agi' then
                            toSet = 1
                        elseif self.selectedPlayerAttr[playerID] == 'int' then
                            toSet = 2
                        end

                        -- Set a timer to fix stuff up
                        Timers:CreateTimer(function()
                            if IsValidEntity(hero) then
                                hero:SetPrimaryAttribute(toSet)
                            end
                        end, DoUniqueString('primaryAttrFix'), 0.1)
                    end
                end
            end, playerID)
        end
    end
end

-- Returns a random hero [will be unique]
function Pregame:getRandomHero(filter)
    -- Build a list of heroes that have already been taken
    local takenHeroes = {}
    for k,v in pairs(self.selectedHeroes) do
        takenHeroes[v] = true
    end

    local possibleHeroes = {}

    for k,v in pairs(self.allowedHeroes) do
        if not takenHeroes[k] and (filter == nil or filter(k)) then
            table.insert(possibleHeroes, k)
        end
    end

    -- If no heroes were found, just give them pudge
    -- This should never happen, but if it does, WTF mate?
    if #possibleHeroes == 0 then
        return 'npc_dota_hero_pudge'
    end

    return possibleHeroes[math.random(#possibleHeroes)]
end

-- Setup the selectable heroes
function Pregame:networkHeroes()
    local allHeroes = LoadKeyValues('scripts/npc/npc_heroes.txt')
    local flags = LoadKeyValues('scripts/kv/flags.kv')
    local oldAbList = LoadKeyValues('scripts/kv/abilities.kv')

    local heroToSkillMap = oldAbList.heroToSkillMap

    -- Prepare flags
    local flagsInverse = {}
    for flagName,abilityList in pairs(flags) do
        for abilityName,nothing in pairs(abilityList) do
            -- Ensure a store exists
            flagsInverse[abilityName] = flagsInverse[abilityName] or {}
            flagsInverse[abilityName][flagName] = true
        end
    end

    -- Load in the category data for abilities
    local oldSkillList = oldAbList.skills

    for tabName, tabList in pairs(oldSkillList) do
        for abilityName,uselessNumber in pairs(tabList) do
            flagsInverse[abilityName] = flagsInverse[abilityName] or {}
            flagsInverse[abilityName].category = tabName

            if SkillManager:isUlt(abilityName) then
                flagsInverse[abilityName].isUlt = true
            end
        end
    end

    -- Push flags to clients
    for abilityName, flagData in pairs(flagsInverse) do
        network:setFlagData(abilityName, flagData)
    end

    self.invisSkills = flags.invis

    -- Store the inverse flags list
    self.flagsInverse = flagsInverse

    -- Stores which abilities belong to which heroes
    self.abilityHeroOwner = {}

    local allowedHeroes = {}
    self.heroPrimaryAttr = {}
    self.heroRole = {}

    for heroName,heroValues in pairs(allHeroes) do
        -- Ensure it is enabled
        if heroName ~= 'Version' and heroName ~= 'npc_dota_hero_base' and heroValues.Enabled == 1 then
            -- Store all the useful information
            local theData = {
                AttributePrimary = heroValues.AttributePrimary,
                Role = heroValues.Role,
                Rolelevels = heroValues.Rolelevels,
                AttackCapabilities = heroValues.AttackCapabilities,
                AttackDamageMin = heroValues.AttackDamageMin,
                AttackDamageMax = heroValues.AttackDamageMax,
                AttackRate = heroValues.AttackRate,
                AttackRange = heroValues.AttackRange,
                MovementSpeed = heroValues.MovementSpeed,
                AttributeBaseStrength = heroValues.AttributeBaseStrength,
                AttributeStrengthGain = heroValues.AttributeStrengthGain,
                AttributeBaseIntelligence = heroValues.AttributeBaseIntelligence,
                AttributeIntelligenceGain = heroValues.AttributeIntelligenceGain,
                AttributeBaseAgility = heroValues.AttributeBaseAgility,
                AttributeAgilityGain = heroValues.AttributeAgilityGain
            }

            local attr = heroValues.AttributePrimary
            if attr == 'DOTA_ATTRIBUTE_INTELLECT' then
                self.heroPrimaryAttr[heroName] = 'int'
            elseif attr == 'DOTA_ATTRIBUTE_AGILITY' then
                self.heroPrimaryAttr[heroName] = 'agi'
            else
                self.heroPrimaryAttr[heroName] = 'str'
            end

            local role = heroValues.AttackCapabilities
            if role == 'DOTA_UNIT_CAP_RANGED_ATTACK' then
                self.heroRole[heroName] = 'ranged'
            else
                self.heroRole[heroName] = 'melee'
            end



            if heroToSkillMap[heroName] then
                for k,v in pairs(heroToSkillMap[heroName]) do
                    theData[k] = v
                end
            else
                local sn = 1
                for i=1,16 do
                    local abName = heroValues['Ability' .. i]

                    if abName ~= 'attribute_bonus' then
                        theData['Ability' .. sn] = abName
                        sn = sn + 1
                    end
                end
            end

            network:setHeroData(heroName, theData)

            -- Store allowed heroes
            allowedHeroes[heroName] = true

            -- Store the owners
            for i=1,16 do
                if theData['Ability'..i] ~= nil then
                    self.abilityHeroOwner[theData['Ability'..i]] = heroName
                end
            end

        end
    end

    -- Store it locally
    self.allowedHeroes = allowedHeroes
end

-- Finishes option selection
function Pregame:finishOptionSelection()
    -- Ensure we are in the options locking phase
    if self:getPhase() ~= constants.PHASE_OPTION_SELECTION then return end

    -- Validate teams
    local totalRadiant = 0
    local totalDire = 0

    local maxPlayerID = 24

    for playerID=0,maxPlayerID do
        local team = PlayerResource:GetCustomTeamAssignment(playerID)

        if team == DOTA_TEAM_GOODGUYS then
            totalRadiant = totalRadiant + 1
        elseif team == DOTA_TEAM_BADGUYS then
            totalDire = totalDire + 1
        end
    end

    for playerID=0,maxPlayerID do
        local team = PlayerResource:GetCustomTeamAssignment(playerID)

        if team ~= DOTA_TEAM_GOODGUYS and team ~= DOTA_TEAM_BADGUYS then
            if totalDire < totalRadiant then
                totalDire = totalDire + 1
                PlayerResource:SetCustomTeamAssignment(playerID, DOTA_TEAM_BADGUYS)
            else
                totalRadiant = totalRadiant + 1
                PlayerResource:SetCustomTeamAssignment(playerID, DOTA_TEAM_GOODGUYS)
            end

        end
    end

    -- Lock teams
    GameRules:LockCustomGameSetupTeamAssignment(true)

     -- Process gamemodes
    if self.optionStore['lodOptionCommonGamemode'] == 4 then
        self.noHeroSelection = true
        self.allRandomSelection = true
    end

    if self.optionStore['lodOptionCommonGamemode'] == 3 then
        self.useDraftArrays = true
    end

    -- Move onto the next phase
    if self.optionStore['lodOptionBanningMaxBans'] > 0 or self.optionStore['lodOptionBanningMaxHeroBans'] > 0 then
        -- There is banning
        self:setPhase(constants.PHASE_BANNING)
        self:setEndOfPhase(Time() + OptionManager:GetOption('banningTime'), OptionManager:GetOption('banningTime'))

    else
        -- There is not banning

        -- Is there hero selection?
        if self.noHeroSelection then
            -- No hero selection

            -- Is there all random selection?
            if self.allRandomSelection then
                -- Goto all random
                self:setPhase(constants.PHASE_RANDOM_SELECTION)
                self:setEndOfPhase(Time() + OptionManager:GetOption('randomSelectionTime'), OptionManager:GetOption('randomSelectionTime'))
            else
                -- Goto review
                self:setPhase(constants.PHASE_REVIEW)
                self:setEndOfPhase(Time() + OptionManager:GetOption('reviewTime'), OptionManager:GetOption('reviewTime'))
            end
        else
            -- Hero selection
            self:setPhase(constants.PHASE_SELECTION)
            self:setEndOfPhase(Time() + OptionManager:GetOption('pickingTime'), OptionManager:GetOption('pickingTime'))
        end
    end
end

-- Options Locked event was fired
function Pregame:onOptionsLocked(eventSourceIndex, args)
    -- Ensure we are in the options locking phase
    if self:getPhase() ~= constants.PHASE_OPTION_SELECTION then return end

    -- Grab data
    local playerID = args.PlayerID
    local player = PlayerResource:GetPlayer(playerID)

    -- Ensure they have hosting privileges
    if GameRules:PlayerHasCustomGameHostPrivileges(player) then
        -- Finish the option selection
        self:finishOptionSelection()
    end
end

-- Options menu changed
function Pregame:onOptionsMenuChanged(eventSourceIndex, args)
    -- Ensure we are in the options locking phase
    if self:getPhase() ~= constants.PHASE_OPTION_SELECTION then return end

    -- Grab data
    local playerID = args.PlayerID
    local player = PlayerResource:GetPlayer(playerID)

    -- Ensure they have hosting privileges
    if GameRules:PlayerHasCustomGameHostPrivileges(player) then
        -- Grab and set which tab is active
        local newActiveTab = args.v
        network:setActiveOptionsTab(newActiveTab)
    end
end

-- An option was changed
function Pregame:onOptionChanged(eventSourceIndex, args)
    -- Ensure we are in the options locking phase
    if self:getPhase() ~= constants.PHASE_OPTION_SELECTION then return end

    -- Grab data
    local playerID = args.PlayerID
    local player = PlayerResource:GetPlayer(playerID)

    -- Ensure they have hosting privileges
    if GameRules:PlayerHasCustomGameHostPrivileges(player) then
        -- Grab options
        local optionName = args.k
        local optionValue = args.v

        -- Option values and names are validated at a later stage
        self:setOption(optionName, optionValue)
    end
end

-- Load up the troll combo bans list
function Pregame:loadTrollCombos()
    -- Load in the ban list
    local tempBanList = LoadKeyValues('scripts/kv/bans.kv')

    -- Store no multicast
    SpellFixes:SetNoCasting(tempBanList.noMulticast, tempBanList.noWitchcraft)

    --local noTower = tempBanList.noTower
    --local noTowerAlways = tempBanList.noTowerAlways
    --local noBear = tempBanList.noBear

    -- Create the stores
    self.banList = {}
    self.wtfAutoBan = tempBanList.wtfAutoBan
    self.OPSkillsList = tempBanList.OPSkillsList
    self.noHero = tempBanList.noHero
    self.lodBanList = tempBanList.lodBanList
    self.doNotRandom = tempBanList.doNotRandom

    -- Bans a skill combo
    local function banCombo(a, b)
        -- Ensure ban lists exist
        self.banList[a] = self.banList[a] or {}
        self.banList[b] = self.banList[b] or {}

        -- Store the ban
        self.banList[a][b] = true
        self.banList[b][a] = true
    end

    -- Loop over the banned combinations
    for skillName, group in pairs(tempBanList.BannedCombinations) do
        for skillName2,_ in pairs(group) do
            banCombo(skillName, skillName2)
        end
    end

    -- Function to do a category ban
    local doCatBan
    doCatBan = function(skillName, cat)
        for skillName2,sort in pairs(tempBanList.Categories[cat] or {}) do
            if sort == 1 then
                banCombo(skillName, skillName2)
            elseif sort == 2 then
                doCatBan(skillName, skillName2)
            else
                print('Unknown category banning sort: '..sort)
            end
        end
    end


    -- Loop over category bans
    for skillName,cat in pairs(tempBanList.CategoryBans) do
        doCatBan(skillName, cat)
    end

    -- Ban the group bans
    for _,group in pairs(tempBanList.BannedGroups) do
        for skillName,__ in pairs(group) do
            for skillName2,___ in pairs(group) do
                banCombo(skillName, skillName2)
            end
        end
    end
end

-- Tests a build to decide if it is a troll combo
function Pregame:isTrollCombo(build)
    local maxSlots = self.optionStore['lodOptionCommonMaxSlots']

    for i=1,maxSlots do
        local ab1 = build[i]
        if ab1 ~= nil and self.banList[ab1] then
            for j=(i+1),maxSlots do
                local ab2 = build[j]

                if ab2 ~= nil and self.banList[ab1][ab2] then
                    -- Ability should be banned

                    return true, ab1, ab2
                end
            end
        end
    end

    return false
end

-- init option validator
function Pregame:initOptionSelector()
    -- Option validator can only init once
    if self.doneInitOptions then return end
    self.doneInitOptions = true

    self.validOptions = {
        -- Fast gamemode selection
        lodOptionGamemode = function(value)
            -- Ensure it is a number
            if type(value) ~= 'number' then return false end

            -- Map enforcements
            local mapName = GetMapName()

            -- All Pick Only
            if mapName == 'all_pick' then
                return value == 1
            end

            -- Mirror Draft Only
            if mapName == 'mirror_draft' then
                return value == 3
            end

            -- All random only
            if mapName == 'all_random' then
                return value == 4
            end

            -- Not in a forced map, allow any preset gamemode

            local validGamemodes = {
                [-1] = true,
                [1] = true,
                --[2] = true,
                [3] = true,
                [4] = true
            }

            -- Ensure it is one of the above gamemodes
            if not validGamemodes[value] then return false end

            -- It must be valid
            return true
        end,

        -- Fast banning selection
        lodOptionBanning = function(value)
            return value == 1 or value == 2 or value == 3
        end,

        -- Fast slots selection
        lodOptionSlots = function(value)
            return value == 4 or value == 5 or value == 6
        end,

        -- Fast ult selection
        lodOptionUlts = function(value)
            local valid = {
                [0] = true,
                [1] = true,
                [2] = true,
                [3] = true,
                [4] = true,
                [5] = true,
                [6] = true
            }

            return valid[value] or false
        end,

        -- Fast mirror draft hero selection
        lodOptionMirrorHeroes = function(value)
            local valid = {
                [10] = true,
                [20] = true,
                [30] = true,
                [40] = true,
                [50] = true
            }

            return valid[value] or false
        end,

        -- Common gamemode
        lodOptionCommonGamemode = function(value)
            -- Ensure gamemode is set to custom
            if self.optionStore['lodOptionGamemode'] ~= -1 then return false end

            return value == 1 or value == 2 or value == 3 or value == 4
        end,

        -- Common max slots
        lodOptionCommonMaxSlots = function(value)
            -- Ensure gamemode is set to custom
            if self.optionStore['lodOptionGamemode'] ~= -1 then return false end

            return value == 4 or value == 5 or value == 6
        end,

        -- Common max skills
        lodOptionCommonMaxSkills = function(value)
            -- Ensure gamemode is set to custom
            if self.optionStore['lodOptionGamemode'] ~= -1 then return false end

            local valid = {
                [0] = true,
                [1] = true,
                [2] = true,
                [3] = true,
                [4] = true,
                [5] = true,
                [6] = true
            }

            return valid[value] or false
        end,

        -- Common max ults
        lodOptionCommonMaxUlts = function(value)
            -- Ensure gamemode is set to custom
            if self.optionStore['lodOptionGamemode'] ~= -1 then return false end

            local valid = {
                [0] = true,
                [1] = true,
                [2] = true,
                [3] = true,
                [4] = true,
                [5] = true,
                [6] = true
            }

            return valid[value] or false
        end,

        -- Common max bans
        lodOptionBanningMaxBans = function(value)
            -- Ensure gamemode is set to custom
            if self.optionStore['lodOptionGamemode'] ~= -1 then return false end

            local valid = {
                [0] = true,
                [1] = true,
                [2] = true,
                [3] = true,
                [5] = true,
                [10] = true,
                [25] = true
            }

            return valid[value] or false
        end,

        -- Common max hero bans
        lodOptionBanningMaxHeroBans = function(value)
            -- Ensure gamemode is set to custom
            if self.optionStore['lodOptionGamemode'] ~= -1 then return false end

            local valid = {
                [0] = true,
                [1] = true,
                [2] = true,
                [3] = true
            }

            return valid[value] or false
        end,

        -- Common mirror draft hero selection
        lodOptionCommonMirrorHeroes = function(value)
            -- Ensure gamemode is set to custom
            if self.optionStore['lodOptionGamemode'] ~= -1 then return false end

            local valid = {
                [10] = true,
                [20] = true,
                [30] = true,
                [40] = true,
                [50] = true
            }

            return valid[value] or false
        end,

        -- Common block troll combos
        lodOptionBanningBlockTrollCombos = function(value)
            -- Ensure gamemode is set to custom
            if self.optionStore['lodOptionGamemode'] ~= -1 then return false end

            return value == 0 or value == 1
        end,

        -- Common use ban list
        lodOptionBanningUseBanList = function(value)
            -- Ensure gamemode is set to custom
            if self.optionStore['lodOptionGamemode'] ~= -1 then return false end

            return value == 0 or value == 1
        end,

        -- Common ban all invis
        lodOptionBanningBanInvis = function(value)
            -- Ensure gamemode is set to custom
            if self.optionStore['lodOptionGamemode'] ~= -1 then return false end

            return value == 0 or value == 1
        end,

        -- Game Speed -- Starting Level
        lodOptionGameSpeedStartingLevel = function(value)
            -- Ensure gamemode is set to custom
            if self.optionStore['lodOptionGamemode'] ~= -1 then return false end

            local valid = {
                [1] = true,
                [6] = true,
                [11] = true,
                [16] = true,
                [25] = true,
                [50] = true,
                [75] = true,
                [100] = true
            }

            return valid[value] or false
        end,

        -- Game Speed -- Max Level
        lodOptionGameSpeedMaxLevel = function(value)
            -- Ensure gamemode is set to custom
            if self.optionStore['lodOptionGamemode'] ~= -1 then return false end

            local valid = {
                [6] = true,
                [11] = true,
                [16] = true,
                [25] = true,
                [50] = true,
                [75] = true,
                [100] = true
            }

            return valid[value] or false
        end,

        -- Game Speed -- Starting Gold
        lodOptionGameSpeedStartingGold = function(value)
            -- Ensure gamemode is set to custom
            if self.optionStore['lodOptionGamemode'] ~= -1 then return false end

            local valid = {
                [0] = true,
                [250] = true,
                [500] = true,
                [1000] = true,
                [2500] = true,
                [5000] = true,
                [10000] = true,
                [25000] = true,
                [50000] = true,
                [100000] = true
            }

            return valid[value] or false
        end,

        -- Game Speed -- Respawn Time
        lodOptionGameSpeedRespawnTime = function(value)
            -- Ensure gamemode is set to custom
            if self.optionStore['lodOptionGamemode'] ~= -1 then return false end

            local valid = {
                [0] = true,
                [0.5] = true,
                [0.1] = true,
                [-1] = true,
                [-10] = true,
                [-20] = true,
                [-30] = true,
                [-60] = true
            }

            return valid[value] or false
        end,

        -- Game Speed -- Towers per lane
        lodOptionGameSpeedTowersPerLane = function(value)
            -- Ensure gamemode is set to custom
            if self.optionStore['lodOptionGamemode'] ~= -1 then return false end

            local valid = {
                [3] = true,
                [4] = true,
                [5] = true,
                [6] = true,
                [7] = true,
                [8] = true,
                [9] = true,
                [10] = true
            }

            return valid[value] or false
        end,

        -- Game Speed - Scepter Upgraded
        lodOptionGameSpeedUpgradedUlts = function(value)
            -- Ensure gamemode is set to custom
            if self.optionStore['lodOptionGamemode'] ~= -1 then return false end

            return value == 0 or value == 1
        end,

        -- Game Speed - Easy Mode
        lodOptionCrazyEasymode = function(value)
            -- Ensure gamemode is set to custom
            if self.optionStore['lodOptionGamemode'] ~= -1 then return false end

            return value == 0 or value == 1
        end,

        -- Advanced -- Enable Hero Abilities
        lodOptionAdvancedHeroAbilities = function(value)
            -- Ensure gamemode is set to custom
            if self.optionStore['lodOptionGamemode'] ~= -1 then return false end

            return value == 0 or value == 1
        end,

        -- Advanced -- Enable Neutral Abilities
        lodOptionAdvancedNeutralAbilities = function(value)
            -- Ensure gamemode is set to custom
            if self.optionStore['lodOptionGamemode'] ~= -1 then return false end

            return value == 0 or value == 1
        end,

        -- Advanced -- Enable Wraith Night Abilities
        lodOptionAdvancedNeutralWraithNight = function(value)
            -- Ensure gamemode is set to custom
            if self.optionStore['lodOptionGamemode'] ~= -1 then return false end

            return value == 0 or value == 1
        end,

        -- Advanced -- Enable OP Abilities
        lodOptionAdvancedOPAbilities = function(value)
            -- Ensure gamemode is set to custom
            if self.optionStore['lodOptionGamemode'] ~= -1 then return false end

            return value == 0 or value == 1
        end,

        -- Advanced -- Hide enemy picks
        lodOptionAdvancedHidePicks = function(value)
            -- Ensure gamemode is set to custom
            if self.optionStore['lodOptionGamemode'] ~= -1 then return false end

            return value == 0 or value == 1
        end,

        -- Advanced -- Unique Skills
        lodOptionAdvancedUniqueSkills = function(value)
            -- Ensure gamemode is set to custom
            if self.optionStore['lodOptionGamemode'] ~= -1 then return false end

            return value == 0 or value == 1 or value == 2
        end,

        -- Advanced -- Unique Heroes
        lodOptionAdvancedUniqueHeroes = function(value)
            -- Ensure gamemode is set to custom
            if self.optionStore['lodOptionGamemode'] ~= -1 then return false end

            return value == 0 or value == 1
        end,

        -- Advanced -- Allow picking primary attr
        lodOptionAdvancedSelectPrimaryAttr = function(value)
            -- Ensure gamemode is set to custom
            if self.optionStore['lodOptionGamemode'] ~= -1 then return false end

            return value == 0 or value == 1
        end,

        -- Other -- No Fountain Camping
        lodOptionCrazyNoCamping = function(value)
            -- Ensure gamemode is set to custom
            if self.optionStore['lodOptionGamemode'] ~= -1 then return false end

            return value == 0 or value == 1
        end,

        -- Other -- Universal Shop
        lodOptionCrazyUniversalShop = function(value)
            -- Ensure gamemode is set to custom
            if self.optionStore['lodOptionGamemode'] ~= -1 then return false end

            return value == 0 or value == 1
        end,

        -- Other -- All Vision
        lodOptionCrazyAllVision = function(value)
            -- Ensure gamemode is set to custom
            if self.optionStore['lodOptionGamemode'] ~= -1 then return false end

            return value == 0 or value == 1
        end,

        -- Other -- Multicast Madness
        lodOptionCrazyMulticast = function(value)
            -- Ensure gamemode is set to custom
            if self.optionStore['lodOptionGamemode'] ~= -1 then return false end

            return value == 0 or value == 1
        end,

        -- Other -- WTF Mode
        lodOptionCrazyWTF = function(value)
            -- Ensure gamemode is set to custom
            if self.optionStore['lodOptionGamemode'] ~= -1 then return false end

            return value == 0 or value == 1
        end,
    }

    -- Callbacks
    self.onOptionsChanged = {
        -- Fast Gamemode
        lodOptionGamemode = function(optionName, optionValue)
            -- If we are using a hard coded gamemode, then, set all options automatically
            if optionValue ~= -1 then
                -- Gamemode is copied
                self:setOption('lodOptionCommonGamemode', optionValue, true)

                -- Total slots is copied
                self:setOption('lodOptionCommonMaxSlots', self.optionStore['lodOptionSlots'], true)

                -- Max skills is always 6
                self:setOption('lodOptionCommonMaxSkills', 6, true)

                -- Max ults is copied
                self:setOption('lodOptionCommonMaxUlts', self.optionStore['lodOptionUlts'], true)

                -- Banning mode depends on the option, but is baically copied
                if self.optionStore['lodOptionBanning'] == 1 then
                    self:setOption('lodOptionBanningMaxBans', 0, true)
                    self:setOption('lodOptionBanningMaxHeroBans', 0, true)
                    self:setOption('lodOptionBanningUseBanList', 1, true)
                else
                    self:setOption('lodOptionBanningMaxBans', self.fastBansTotalBans, true)
                    self:setOption('lodOptionBanningMaxHeroBans', self.fastHeroBansTotalBans, true)
                    self:setOption('lodOptionBanningUseBanList', 0, true)
                end

                -- Block troll combos is always on
                self:setOption('lodOptionBanningBlockTrollCombos', 1, true)

                -- Default, we don't ban all invisiblity
                self:setOption('lodOptionBanningBanInvis', 0, true)

                -- Starting level is lvl 1
                self:setOption('lodOptionGameSpeedStartingLevel', 1, true)

                -- Max level is 25
                self:setOption('lodOptionGameSpeedMaxLevel', 25, true)

                -- No bonus starting gold
                self:setOption('lodOptionGameSpeedStartingGold', 0, true)

                -- Default respawn time
                self:setOption('lodOptionGameSpeedRespawnTime', 0, true)

                -- 3 Towers per lane
                self:setOption('lodOptionGameSpeedTowersPerLane', 3, true)

                -- Do not start scepter upgraded
                self:setOption('lodOptionGameSpeedUpgradedUlts', 0, true)

                -- Turn easy mode off
                self:setOption('lodOptionCrazyEasymode', 0, true)

                -- Enable hero abilities
                self:setOption('lodOptionAdvancedHeroAbilities', 1, true)

                -- Enable neutral abilities
                self:setOption('lodOptionAdvancedNeutralAbilities', 1, true)

                -- Enable Wraith Night abilities
                self:setOption('lodOptionAdvancedNeutralWraithNight', 1, true)

                -- Disable OP abilities
                self:setOption('lodOptionAdvancedOPAbilities', 1, true)

                -- Hide enemy picks
                self:setOption('lodOptionAdvancedHidePicks', 1, true)

                -- Disable Unique Skills
                self:setOption('lodOptionAdvancedUniqueSkills', 0, true)

                -- Disable Unique Heroes
                self:setOption('lodOptionAdvancedUniqueHeroes', 0, true)

                -- Enable picking primary attr
                self:setOption('lodOptionAdvancedSelectPrimaryAttr', 1, true)

                -- Disable Fountain Camping
                self:setOption('lodOptionCrazyNoCamping', 1, true)

                -- Disable Universal Shop
                self:setOption('lodOptionCrazyUniversalShop', 0, true)

                -- Disable All Vision
                self:setOption('lodOptionCrazyAllVision', 0, true)

                -- Disable Multicast Madness
                self:setOption('lodOptionCrazyMulticast', 0, true)

                -- Disable WTF Mode
                self:setOption('lodOptionCrazyWTF', 0, true)
            end
        end,

        -- Fast Banning
        lodOptionBanning = function(optionName, optionValue)
            if self.optionStore['lodOptionBanning'] == 1 then
                -- Balanced Bans
                self:setOption('lodOptionBanningMaxBans', 0, true)
                self:setOption('lodOptionBanningMaxHeroBans', 0, true)
                self:setOption('lodOptionBanningUseBanList', 1, true)
            elseif self.optionStore['lodOptionBanning'] == 2 then
                -- Fast Banning Phase
                self:setOption('lodOptionBanningMaxBans', self.fastBansTotalBans, true)
                self:setOption('lodOptionBanningMaxHeroBans', self.fastHeroBansTotalBans, true)
                self:setOption('lodOptionBanningUseBanList', 0, true)
            else
                -- No Banning
                self:setOption('lodOptionBanningMaxBans', 0, true)
                self:setOption('lodOptionBanningMaxHeroBans', 0, true)
                self:setOption('lodOptionBanningUseBanList', 0, true)
            end
        end,

        -- Fast max slots
        lodOptionSlots = function(optionName, optionValue)
            -- Copy max slots in
            self:setOption('lodOptionCommonMaxSlots', self.optionStore['lodOptionSlots'], true)
        end,

        -- Fast max ults
        lodOptionUlts = function(optionName, optionValue)
            self:setOption('lodOptionCommonMaxUlts', self.optionStore['lodOptionUlts'], true)
        end,

        -- Fast mirror draft
        lodOptionMirrorHeroes = function()
            self:setOption('lodOptionCommonMirrorHeroes', self.optionStore['lodOptionMirrorHeroes'], true)
        end,

        -- Common mirror draft heroes
        lodOptionCommonMirrorHeroes = function()
            self.maxDraftHeroes = self.optionStore['lodOptionCommonMirrorHeroes']
        end
    }

    -- Some default values
    self.fastBansTotalBans = 3
    self.fastHeroBansTotalBans = 1
end

-- Generates a random build
function Pregame:generateRandomBuild(playerID, buildID)
    -- Default filter allows all heroes
    local filter = function() return true end

    local this = self

    if buildID == 0 then
        -- A strength based hero only
        filter = function(heroName)
            return this.heroPrimaryAttr[heroName] == 'str'
        end
    elseif buildID == 1 then
        -- A Agility melee based hero only
        filter = function(heroName)
            return this.heroPrimaryAttr[heroName] == 'agi' and this.heroRole[heroName] == 'melee'
        end
    elseif buildID == 2 then
        -- A Agility ranged based hero only
        filter = function(heroName)
            return this.heroPrimaryAttr[heroName] == 'agi' and this.heroRole[heroName] == 'ranged'
        end

    elseif buildID == 3 then
        -- A int based hero only
        filter = function(heroName)
            return this.heroPrimaryAttr[heroName] == 'int'
        end
    elseif buildID == 4 then
        -- Any hero except agility
        filter = function(heroName)
            return this.heroPrimaryAttr[heroName] ~= 'agi'
        end
    end

    local heroName = self:getRandomHero(filter)
    local build = {}

    -- Validate it
    local maxSlots = self.optionStore['lodOptionCommonMaxSlots']

    for slot=1,maxSlots do
        -- Grab a random ability
        local newAbility = self:findRandomSkill(build, slot, playerID)

        -- Ensure we found an ability
        if newAbility ~= nil then
            build[slot] = newAbility
        end
    end

    -- Return the data
    return heroName, build
end

-- Generates builds for all random mode
function Pregame:generateAllRandomBuilds()
    -- Only process this once
    if self.allRandomBuilds then return end
    self.allRandomBuilds = {}

    -- Generate 10 builds
    local minPlayerID = 0
    local maxPlayerID = 9

    -- Max builds per player
    local maxPlayerBuilds = 5

    for playerID = minPlayerID,maxPlayerID do
        local theBuilds = {}

        for buildID = 0,(maxPlayerBuilds-1) do
            local heroName, build = self:generateRandomBuild(playerID, buildID)

            theBuilds[buildID] = {
                heroName = heroName,
                build = build
            }
        end

        -- Store and network
        self.allRandomBuilds[playerID] = theBuilds
        network:setAllRandomBuild(playerID, theBuilds)

        -- Highlight which build is selected
        self.selectedRandomBuilds[playerID] = {
            hero = 0,
            build = 0
        }
        network:setSelectedAllRandomBuild(playerID, self.selectedRandomBuilds[playerID])

        -- Assign the skills
        self.selectedSkills[playerID] = theBuilds[0].build
        network:setSelectedAbilities(playerID, self.selectedSkills[playerID])

        -- Must be valid, select it
        local heroName = theBuilds[0].heroName

        if self.selectedHeroes[playerID] ~= heroName then
            self.selectedHeroes[playerID] = heroName
            network:setSelectedHero(playerID, heroName)

            -- Attempt to set the primary attribute
            local newAttr = self.heroPrimaryAttr[heroName] or 'str'
            if self.selectedPlayerAttr[playerID] ~= newAttr then
                -- Update local store
                self.selectedPlayerAttr[playerID] = newAttr

                -- Update the selected hero
                network:setSelectedAttr(playerID, newAttr)
            end
        end
    end
end

-- Generates draft arrays
function Pregame:buildDraftArrays()
    -- Only build draft arrays once
    if self.draftArrays then return end
    self.draftArrays = {}

    local maxDraftArrays = 5
    for draftID = 0,(maxDraftArrays - 1) do
        -- Create store for data
        local draftData = {}
        self.draftArrays[draftID] = draftData

        local possibleHeroes = {}
        for k,v in pairs(self.allowedHeroes) do
            table.insert(possibleHeroes, k)
        end

        -- Select random heroes
        local heroDraft = {}
        for i=1,self.maxDraftHeroes do
            heroDraft[table.remove(possibleHeroes, math.random(#possibleHeroes))] = true
        end

        local possibleSkills = {}
        for abilityName,_ in pairs(self.flagsInverse) do
            local shouldAdd = true

            -- check bans
            if self.bannedAbilities[abilityName] then
                shouldAdd = false
            end

            -- Should we add it?
            if shouldAdd then
                table.insert(possibleSkills, abilityName)
            end
        end

        -- Select random skills
        local abilityDraft = {}
        for i=1,self.maxDraftSkills do
            abilityDraft[table.remove(possibleSkills, math.random(#possibleSkills))] = true
        end

        -- Store data
        draftData.heroDraft = heroDraft
        draftData.abilityDraft = abilityDraft

        -- Network data
        network:setDraftArray(draftID, draftData)
    end
end

-- Validates builds
function Pregame:validateBuilds()
    -- Only process this once
    if self.validatedBuilds then return end
    self.validatedBuilds = true

    -- Generate 10 builds
    local minPlayerID = 0
    local maxPlayerID = 9

    -- Validate it
    local maxSlots = self.optionStore['lodOptionCommonMaxSlots']

    -- Loop over all playerIDs
    for playerID = minPlayerID,maxPlayerID do
        -- Ensure they have a hero
        if not self.selectedHeroes[playerID] then
            local heroName = self:getRandomHero()
            self.selectedHeroes[playerID] = heroName
            network:setSelectedHero(playerID, heroName)

            -- Attempt to set the primary attribute
            local newAttr = self.heroPrimaryAttr[heroName] or 'str'
            if self.selectedPlayerAttr[playerID] ~= newAttr then
                -- Update local store
                self.selectedPlayerAttr[playerID] = newAttr

                -- Update the selected hero
                network:setSelectedAttr(playerID, newAttr)
            end
        end

        -- Grab their build
        local build = self.selectedSkills[playerID]

        -- Ensure they have a build
        if not build then
            build = {}
            self.selectedSkills[playerID] = build
        end

        for slot=1,maxSlots do
            if not build[slot] then
                -- Grab a random ability
                local newAbility = self:findRandomSkill(build, slot, playerID)

                -- Ensure we found an ability
                if newAbility ~= nil then
                    build[slot] = newAbility
                end
            end
        end

        -- Network it
        network:setSelectedAbilities(playerID, build)
    end
end

-- Processes options to push around to the rest of the systems
function Pregame:processOptions()
    -- Only process options once
    if self.processedOptions then return end
    self.processedOptions = true

    -- Push settings externally where possible
    OptionManager:SetOption('startingLevel', self.optionStore['lodOptionGameSpeedStartingLevel'])
    OptionManager:SetOption('bonusGold', self.optionStore['lodOptionGameSpeedStartingGold'])
    OptionManager:SetOption('maxHeroLevel', self.optionStore['lodOptionGameSpeedMaxLevel'])
    OptionManager:SetOption('multicastMadness', self.optionStore['lodOptionCrazyMulticast'] == 1)
    OptionManager:SetOption('respawnModifier', self.optionStore['lodOptionGameSpeedRespawnTime'])
    OptionManager:SetOption('freeScepter', self.optionStore['lodOptionGameSpeedUpgradedUlts'] == 1)

    -- Enforce max level
    if OptionManager:GetOption('startingLevel') > OptionManager:GetOption('maxHeroLevel') then
        self.optionStore['lodOptionGameSpeedStartingLevel'] = self.optionStore['lodOptionGameSpeedMaxLevel']
        OptionManager:SetOption('startingLevel', OptionManager:GetOption('maxHeroLevel'))
    end

    -- Enable easy mode
    if self.optionStore['lodOptionCrazyEasymode'] == 1 then
        Convars:SetInt('dota_easy_mode', 1)
    end

    -- Enable WTF mode
    if self.optionStore['lodOptionCrazyWTF'] == 1 then
        -- Auto ban powerful abilities
        for abilityName,v in pairs(self.wtfAutoBan) do
        	self:banAbility(abilityName)
        end

        -- Enable debug mode
        Convars:SetBool('dota_ability_debug', true)
    end

    -- Banning of OP Skills
    if self.optionStore['lodOptionAdvancedOPAbilities'] == 1 then
        for abilityName,v in pairs(self.OPSkillsList) do
            self:banAbility(abilityName)
        end
    end

    -- Banning invis skills
    if self.optionStore['lodOptionBanningBanInvis'] == 1 then
        for abilityName,v in pairs(self.invisSkills) do
            self:banAbility(abilityName)
        end
    end

    -- LoD ban list
    if self.optionStore['lodOptionBanningUseBanList'] == 1 then
        for abilityName,v in pairs(self.lodBanList) do
            self:banAbility(abilityName)
        end
    end

    -- Enable Universal Shop
    if self.optionStore['lodOptionCrazyUniversalShop'] == 1 then
        GameRules:SetUseUniversalShopMode(true)
    end

    -- Enable All Vision
    if self.optionStore['lodOptionCrazyAllVision'] == 1 then
        Convars:SetBool('dota_all_vision', true)
    end

    if OptionManager:GetOption('maxHeroLevel') ~= 25 then
        GameRules:GetGameModeEntity():SetCustomXPRequiredToReachNextLevel(constants.XP_PER_LEVEL_TABLE)
        GameRules:GetGameModeEntity():SetCustomHeroMaxLevel(OptionManager:GetOption('maxHeroLevel'))
        GameRules:GetGameModeEntity():SetUseCustomHeroLevels(true)
    end

    -- Respawn modifier
    local statCollectionRespawnModifier = self.optionStore['lodOptionGameSpeedRespawnTime']
    if statCollectionRespawnModifier == 0.1 then
        statCollectionRespawnModifier = 10
    elseif statCollectionRespawnModifier == 0.5 then
        statCollectionRespawnModifier = 2
    end

    -- Store flags
    statCollection:setFlags({
        ['Preset Gamemode'] = self.optionStore['lodOptionGamemode'],                                            -- Preset Gamemode                 [number, -1 - 4]
        ['Preset Banning'] = self.optionStore['lodOptionBanning'],                                              -- Present Banning                 [number, 1 - 3]
        ['Gamemode'] = self.optionStore['lodOptionCommonGamemode'],                                             -- Gamemode                        [number, 1 - 4]
        ['Max Slots'] = self.optionStore['lodOptionCommonMaxSlots'],                                            -- Max Slots                       [number, 0 - 6]
        ['Max Skills'] = self.optionStore['lodOptionCommonMaxSkills'],                                          -- Max Skills                      [number, 0 - 6]
        ['Max Ults'] = self.optionStore['lodOptionCommonMaxUlts'],                                              -- Max Ults                        [number, 0 - 6]
        ['Max Ability Bans'] = self.optionStore['lodOptionBanningMaxBans'],                                     -- Max Ability Bans                [number, 0 - 25]
        ['Max Hero Bans'] = self.optionStore['lodOptionBanningMaxHeroBans'],                                    -- Max Hero Bans                   [number, 0 - 3]
        ['Block Troll Combos'] = self.optionStore['lodOptionBanningBlockTrollCombos'],                          -- Block Troll Combos              [boolean, 1/0]
        ['Use LoD BanList'] = self.optionStore['lodOptionBanningUseBanList'],                                   -- Use LoD BanList                 [boolean, 1/0]
        ['Block OP Abilities'] = self.optionStore['lodOptionAdvancedOPAbilities'],                              -- Block OP Abilities              [boolean, 1/0]
        ['Block Invis Abilities'] = self.optionStore['lodOptionBanningBanInvis'],                               -- Block Invis Abilities           [boolean, 1/0]
        ['Starting Level'] = self.optionStore['lodOptionGameSpeedStartingLevel'],                               -- Starting Level                  [number, 1 - 100]
        ['Max Hero Level'] = self.optionStore['lodOptionGameSpeedMaxLevel'],                                    -- Max Hero Level                  [number, 6 - 100]
        ['Bonus Starting Gold'] = self.optionStore['lodOptionGameSpeedStartingGold'],                           -- Bonus Starting Gold             [number, 0 - 100,000]
        ['Respawn Modifier'] = statCollectionRespawnModifier,                                                   -- Respawn Modifier                [number, -60 - 10]
        ['Towers Per Lane'] = self.optionStore['lodOptionGameSpeedTowersPerLane'],                              -- Towers Per Lane                 [boolean, 1/0]
        ['Start With Upgraded Ults'] = self.optionStore['lodOptionGameSpeedUpgradedUlts'],                      -- Start with upgraded ults        [boolean, 1/0]
        ['Enable Easy Mode'] = self.optionStore['lodOptionCrazyEasymode'],                                      -- Enabled Easy Mode               [boolean, 1/0]
        ['Allow Hero Abilities'] = self.optionStore['lodOptionAdvancedHeroAbilities'],                          -- Allow Hero Abilities            [boolean, 1/0]
        ['Allow Neutral Abilities'] = self.optionStore['lodOptionAdvancedNeutralAbilities'],                    -- Allow Neutral Abilities         [boolean, 1/0]
        ['Allow Wraith Night Skills'] = self.optionStore['lodOptionAdvancedNeutralWraithNight'],                -- Allow Wraith Night Abilities    [boolean, 1/0]
        ['Hide Enemy Picks'] = self.optionStore['lodOptionAdvancedHidePicks'],                                  -- Hide Enemy Picks                [boolean, 1/0]
        ['Unique Skills'] = self.optionStore['lodOptionAdvancedUniqueSkills'],                                  -- Unique Skills                   [number, 0 - 2]
        ['Unique Heroes'] = self.optionStore['lodOptionAdvancedUniqueHeroes'],                                  -- Unique Heroes                   [boolean, 1/0]
        ['Allow Selecting Primary Attribute'] = self.optionStore['lodOptionAdvancedSelectPrimaryAttr'],         -- Allow Select Primary Attribute  [boolean, 1/0]
        ['Stop Fountain Camping'] = self.optionStore['lodOptionCrazyNoCamping'],                                -- Stop Fountain Camping           [boolean, 1/0]
        ['Enable Universal Shop'] = self.optionStore['lodOptionCrazyUniversalShop'],                            -- Universal Shop                  [boolean, 1/0]
        ['Enable All Vision'] = self.optionStore['lodOptionCrazyAllVision'],                                    -- Enabled All Vision              [boolean, 1/0]
        ['Enable Multicast Madness'] = self.optionStore['lodOptionCrazyMulticast'],                             -- Enable Multicast Madness        [boolean, 1/0]
        ['Enable WTF Mode'] = self.optionStore['lodOptionCrazyWTF'],                                            -- Enable WTF Mode                 [boolean, 1/0]
    })
end

-- Validates, and then sets an option
function Pregame:setOption(optionName, optionValue, force)
    -- option validator

    if not self.validOptions[optionName] then
        -- Tell the user they tried to modify an invalid option
        network:sendNotification(player, {
            sort = 'lodDanger',
            text = 'lodFailedToFindOption',
            params = {
            	['optionName'] = optionName
        	}
        })

        return
    end

    if not force and not self.validOptions[optionName](optionValue) then
        -- Tell the user they gave an invalid value
        network:sendNotification(player, {
            sort = 'lodDanger',
            text = 'lodFailedToSetOptionValue',
            params = {
	            ['optionName'] = optionName,
            	['optionValue'] = optionValue
        	}
        })

        return
    end

    -- Set the option
    self.optionStore[optionName] = optionValue
    network:setOption(optionName, optionValue)

    -- Check for option changing callbacks
    if self.onOptionsChanged[optionName] then
        self.onOptionsChanged[optionName](optionName, optionValue)
    end
end

-- Bans an ability
function Pregame:banAbility(abilityName)
    if not self.bannedAbilities[abilityName] then
        -- Do the ban
        self.bannedAbilities[abilityName] = true
        network:banAbility(abilityName)

        return true
    end

    return false
end

-- Bans a hero
function Pregame:banHero(heroName)
	if not self.bannedHeroes[heroName] then
        -- Do the ban
        self.bannedHeroes[heroName] = true
        network:banHero(heroName)

        return true
    end

    return false
end

-- Returns a player's draft index
function Pregame:getDraftID(playerID)
    local maxPlayers = 10

    local theirTeam = PlayerResource:GetTeam(playerID)

    local draftID = 0
    for i=0,(maxPlayers - 1) do
        -- Stop when we hit our playerID
        if playerID == i then break end

        if PlayerResource:GetTeam(i) == theirTeam then
            draftID = draftID + 1
            if draftID > 4 then
                draftID = 0
            end
        end
    end

    return draftID
end

-- Tries to set a player's selected hero
function Pregame:setSelectedHero(playerID, heroName)
    -- Grab the player so we can push messages
    local player = PlayerResource:GetPlayer(playerID)

    -- Validate hero
    if not self.allowedHeroes[heroName] then
        -- Add an error
        network:sendNotification(player, {
            sort = 'lodDanger',
            text = 'lodFailedToFindHero'
        })

        return
    end

    -- Is this hero banned?
    -- Validate the ability isn't already banned
    if self.bannedHeroes[heroName] then
        -- hero is banned
        network:sendNotification(player, {
            sort = 'lodDanger',
            text = 'lodFailedHeroIsBanned',
            params = {
                ['heroName'] = heroName
            }
        })

        return
    end

    -- Is unique heroes on?
    if self.optionStore['lodOptionAdvancedUniqueHeroes'] == 1 then
        for thePlayerID,theSelectedHero in pairs(self.selectedHeroes) do
            if theSelectedHero == heroName then
                -- Tell them
                network:sendNotification(player, {
                    sort = 'lodDanger',
                    text = 'lodFailedHeroIsTaken',
                    params = {
                        ['heroName'] = heroName
                    }
                })

                return
            end
        end
    end

    -- Check draft array
    if self.useDraftArrays then
        local draftID = self:getDraftID(playerID)
        local draftArray = self.draftArrays[draftID] or {}
        local heroDraft = draftArray.heroDraft

        if self.maxDraftHeroes > 0 then
            if not heroDraft[heroName] then
                -- Tell them
                network:sendNotification(player, {
                    sort = 'lodDanger',
                    text = 'lodFailedDraftWrongHero',
                    params = {
                        ['heroName'] = heroName
                    }
                })

                return
            end
        end
    end

    -- Attempt to set the primary attribute
    local newAttr = self.heroPrimaryAttr[heroName] or 'str'
    if self.selectedPlayerAttr[playerID] ~= newAttr then
        -- Update local store
        self.selectedPlayerAttr[playerID] = newAttr

        -- Update the selected hero
        network:setSelectedAttr(playerID, newAttr)
    end

    -- Is there an actual change?
    if self.selectedHeroes[playerID] ~= heroName then
        -- Update local store
        self.selectedHeroes[playerID] = heroName

        -- Update the selected hero
        network:setSelectedHero(playerID, heroName)
    end
end

-- Player wants to select a hero
function Pregame:onPlayerSelectHero(eventSourceIndex, args)
    -- Grab data
    local playerID = args.PlayerID
    local player = PlayerResource:GetPlayer(playerID)

    -- Ensure we are in the picking phase
    if self:getPhase() ~= constants.PHASE_SELECTION then
        -- Ensure we are in the picking phase
        if self:getPhase() ~= constants.PHASE_SELECTION then
            network:sendNotification(player, {
                sort = 'lodDanger',
                text = 'lodFailedWrongPhaseSelection'
            })

            return
        end

        return
    end

    -- Attempt to select the hero
    self:setSelectedHero(playerID, args.heroName)
end

-- Attempts to set a player's attribute
function Pregame:setSelectedAttr(playerID, newAttr)
    local player = PlayerResource:GetPlayer(playerID)

    -- Validate that the option is enabled
    if self.optionStore['lodOptionAdvancedSelectPrimaryAttr'] == 0 then
        -- Add an error
        network:sendNotification(player, {
            sort = 'lodDanger',
            text = 'lodFailedToChangeAttr'
        })

        return
    end

    -- Validate the new attribute
    if newAttr ~= 'str' and newAttr ~= 'agi' and newAttr ~= 'int' then
        -- Add an error
        network:sendNotification(player, {
            sort = 'lodDanger',
            text = 'lodFailedToChangeAttrInvalid'
        })

        return
    end

    -- Is there an actual change?
    if self.selectedPlayerAttr[playerID] ~= newAttr then
        -- Update local store
        self.selectedPlayerAttr[playerID] = newAttr

        -- Update the selected hero
        network:setSelectedAttr(playerID, newAttr)
    end
end

-- Player wants to select a new primary attribute
function Pregame:onPlayerSelectAttr(eventSourceIndex, args)
    -- Grab data
    local playerID = args.PlayerID
    local player = PlayerResource:GetPlayer(playerID)

    -- Ensure we are in the picking phase
    if self:getPhase() ~= constants.PHASE_SELECTION then
        network:sendNotification(player, {
            sort = 'lodDanger',
            text = 'lodFailedWrongPhaseSelection'
        })

        return
    end

    -- Attempt to set it
    self:setSelectedAttr(playerID, args.newAttr)
end

-- Player is asking why they don't have a hero
function Pregame:onPlayerAskForHero(eventSourceIndex, args)
    -- This code only works during the game phase
    if self:getPhase() ~= constants.PHASE_INGAME then return end

    -- Attempt to spawn a hero (this is validated inside to prevent multiple heroes)
    self:spawnPlayer(args.PlayerID)
end

-- Player wants to select an entire build
function Pregame:onPlayerSelectBuild(eventSourceIndex, args)
    -- Grab data
    local playerID = args.PlayerID
    local player = PlayerResource:GetPlayer(playerID)

    -- Ensure we are in the picking phase
    if self:getPhase() ~= constants.PHASE_SELECTION then
        network:sendNotification(player, {
            sort = 'lodDanger',
            text = 'lodFailedWrongPhaseSelection'
        })

        return
    end

    -- Grab the stuff
    local hero = args.hero
    local attr = args.attr
    local build = args.build

    -- Do we need to change our hero?
    if self.selectedHeroes ~= hero then
        -- Set the hero
        self:setSelectedHero(playerID, hero)
    end

    -- Do we have a different attr?
    if self.selectedPlayerAttr[playerID] ~= attr then
        -- Attempt to set it
        self:setSelectedAttr(playerID, attr)
    end

    -- Grab number of slots
    local maxSlots = self.optionStore['lodOptionCommonMaxSlots']

    -- Reset the player's build
    self.selectedSkills[playerID] = {}

    for slotID=1,maxSlots do
        if build[tostring(slotID)] ~= nil then
            self:setSelectedAbility(playerID, slotID, build[tostring(slotID)], true)
        end
    end

    -- Perform the networking
    network:setSelectedAbilities(playerID, self.selectedSkills[playerID])
end

-- Player wants to select an all random build
function Pregame:onPlayerSelectAllRandomBuild(eventSourceIndex, args)
    local playerID = args.PlayerID
    local player = PlayerResource:GetPlayer(playerID)

    -- Player shouldn't be able to do this unless it is the all random phase
    if self:getPhase() ~= constants.PHASE_RANDOM_SELECTION then
        network:sendNotification(player, {
            sort = 'lodDanger',
            text = 'lodFailedNotAllRandomPhase'
        })
        return
    end

    -- Read options
    local buildID = args.buildID
    local heroOnly = args.heroOnly == 1

    -- Validate builds
    local builds = self.allRandomBuilds[playerID]
    if builds == nil then
        network:sendNotification(player, {
            sort = 'lodDanger',
            text = 'lodFailedAllRandomNoBuilds'
        })
        return
    end

    local build = builds[tonumber(buildID)]
    if build == nil then
        network:sendNotification(player, {
            sort = 'lodDanger',
            text = 'lodFailedAllRandomInvalidBuild',
            params = {
                ['buildID'] = buildID
            }
        })
        return
    end

    -- Are we meant to set the hero or hte build?
    if not heroOnly then
        -- Push the build
        self.selectedSkills[playerID] = build.build
        network:setSelectedAbilities(playerID, build.build)

        -- Change which build has been selected
        self.selectedRandomBuilds[playerID].build = buildID
        network:setSelectedAllRandomBuild(playerID, self.selectedRandomBuilds[playerID])
    else
        -- Must be valid, select it
        local heroName = build.heroName

        if self.selectedHeroes[playerID] ~= heroName then
            self.selectedHeroes[playerID] = heroName
            network:setSelectedHero(playerID, heroName)

            -- Attempt to set the primary attribute
            local newAttr = self.heroPrimaryAttr[heroName] or 'str'
            if self.selectedPlayerAttr[playerID] ~= newAttr then
                -- Update local store
                self.selectedPlayerAttr[playerID] = newAttr

                -- Update the selected hero
                network:setSelectedAttr(playerID, newAttr)
            end
        end

        -- Change which hero has been selected
        self.selectedRandomBuilds[playerID].hero = buildID
        network:setSelectedAllRandomBuild(playerID, self.selectedRandomBuilds[playerID])
    end
end

-- Player wants to ready up
function Pregame:onPlayerReady(eventSourceIndex, args)
    if self:getPhase() ~= constants.PHASE_BANNING and self:getPhase() ~= constants.PHASE_SELECTION and self:getPhase() ~= constants.PHASE_RANDOM_SELECTION and self:getPhase() ~= constants.PHASE_REVIEW then return end

    local playerID = args.PlayerID

    -- Ensure we have a store for this player's ready state
    self.isReady[playerID] = self.isReady[playerID] or 0

    -- Toggle their state
    self.isReady[playerID] = (self.isReady[playerID] == 1 and 0) or 1

    -- Checks if people are ready
    self:checkForReady()
end

-- Checks if people are ready
function Pregame:checkForReady()
    -- Network it
    network:sendReadyState(self.isReady)

    local currentTime = self.endOfTimer - Time()
    local maxTime = OptionManager:GetOption('pickingTime')
    local minTime = 3

    -- If we are in the banning phase
    if self:getPhase() == constants.PHASE_BANNING then
        maxTime = OptionManager:GetOption('banningTime')
    end

    -- If we are in the random phase
    if self:getPhase() == constants.PHASE_RANDOM_SELECTION then
        maxTime = OptionManager:GetOption('randomSelectionTime')
    end

    -- If we are in the review phase
    if self:getPhase() == constants.PHASE_REVIEW then
        maxTime = OptionManager:GetOption('reviewTime')
    end

    -- Calculate how many players are ready
    local totalPlayers = self:getActivePlayers()
    local readyPlayers = 0

    for playerID,readyState in pairs(self.isReady) do
        -- Ensure the player is connected AND ready
        if readyState == 1 and PlayerResource:GetConnectionState(playerID) == 2 then
            readyPlayers = readyPlayers + 1
        end
    end

    -- Is there at least one player that is ready?
    if readyPlayers > 0 then
        -- Someone is ready, timer should be moving

        -- Is time currently frozen?
        if self.freezeTimer ~= nil then
            -- Start the clock

            if readyPlayers >= totalPlayers then
                -- Single player
                self:setEndOfPhase(Time() + minTime)
            else
                -- Multiplayer, start the timer ticking
                self:setEndOfPhase(Time() + maxTime)
            end
        else
            -- Check if we can lower the timer

            -- If everyone is ready, set the remaining time to be the min
            if readyPlayers >= totalPlayers then
                if currentTime > minTime then
                    self:setEndOfPhase(Time() + minTime)
                end
            else
                local percentageReady = (readyPlayers-1) / totalPlayers

                local discountTime = maxTime * (1-percentageReady) * 1.5

                if discountTime < currentTime then
                    self:setEndOfPhase(Time() + discountTime)
                end
            end
        end
    else
        -- No one is ready, freeze time at max
        self:setEndOfPhase(Time() + maxTime, maxTime)
    end
end

-- Player wants to ban an ability
function Pregame:onPlayerBan(eventSourceIndex, args)
    -- Grab data
    local playerID = args.PlayerID
    local player = PlayerResource:GetPlayer(playerID)

	-- Ensure we are in the banning phase
    if self:getPhase() ~= constants.PHASE_BANNING then
        network:sendNotification(player, {
            sort = 'lodDanger',
            text = 'lodFailedWrongPhaseBanning'
        })

        return
    end

	local usedBans = self.usedBans

    -- Ensure we have a store
    usedBans[playerID] = usedBans[playerID] or {
    	heroBans = 0,
    	abilityBans = 0
	}

	-- Grab the ban object
	local playerBans = usedBans[playerID]

	-- Grab settings
	local maxBans = self.optionStore['lodOptionBanningMaxBans']
	local maxHeroBans = self.optionStore['lodOptionBanningMaxHeroBans']

	-- Check what kind of ban it is
	local heroName = args.heroName
	local abilityName = args.abilityName

	-- Default is heroBan
	if heroName ~= nil then
		-- Check the number of bans
		if playerBans.heroBans >= maxHeroBans then
            if maxHeroBans == 0 then
                -- There is no hero banning
                network:sendNotification(player, {
                    sort = 'lodDanger',
                    text = 'lodFailedBanHeroNoBanning'
                })

                return
            else
                -- Player has used all their bans
                network:sendNotification(player, {
                    sort = 'lodDanger',
                    text = 'lodFailedBanHeroLimit',
                    params = {
                        ['used'] = playerBans.heroBans,
                        ['max'] = maxHeroBans
                    }
                })
            end

			return
		end

		-- Is this a valid hero?
		if not self.allowedHeroes[heroName] then
	        -- Add an error
	        network:sendNotification(player, {
	            sort = 'lodDanger',
	            text = 'lodFailedToFindHero'
	        })

	        return
	    end

	    -- Perform the ban
		if self:banHero(heroName) then
			-- Success

			network:broadcastNotification({
	            sort = 'lodSuccess',
	            text = 'lodSuccessBanHero',
	            params = {
	            	['heroName'] = heroName
	        	}
	        })

            -- Increase the number of ability bans this player has done
            playerBans.heroBans = playerBans.heroBans + 1

            -- Network how many bans have been used
            network:setTotalBans(playerID, playerBans.heroBans, playerBans.abilityBans)
		else
			-- Ability was already banned

			network:sendNotification(player, {
	            sort = 'lodDanger',
	            text = 'lodFailedBanHeroAlreadyBanned',
	            params = {
	            	['heroName'] = heroName
	        	}
	        })

            return
		end
	elseif abilityName ~= nil then
		-- Check the number of bans
		if playerBans.abilityBans >= maxBans then
            if maxBans == 0 then
                -- No ability banning allowed
                network:sendNotification(player, {
                    sort = 'lodDanger',
                    text = 'lodFailedBanAbilityNoBanning'
                })

                return
            else
                -- Player has used all their bans
                network:sendNotification(player, {
                    sort = 'lodDanger',
                    text = 'lodFailedBanAbilityLimit',
                    params = {
                        ['used'] = playerBans.abilityBans,
                        ['max'] = maxBans
                    }
                })
            end

			return
		end

		-- Is this even a real skill?
	    if not self.flagsInverse[abilityName] then
	        -- Invalid ability name
	        network:sendNotification(player, {
	            sort = 'lodDanger',
	            text = 'lodFailedInvalidAbility',
	            params = {
	                ['abilityName'] = abilityName
	            }
	        })

	        return
	    end

		-- Perform the ban
		if self:banAbility(abilityName) then
			-- Success

			network:broadcastNotification({
	            sort = 'lodSuccess',
	            text = 'lodSuccessBanAbility',
	            params = {
	            	['abilityName'] = 'DOTA_Tooltip_ability_' .. abilityName
	        	}
	        })

            -- Increase the number of bans this player has done
            playerBans.abilityBans = playerBans.abilityBans + 1

            -- Network how many bans have been used
            network:setTotalBans(playerID, playerBans.heroBans, playerBans.abilityBans)
		else
			-- Ability was already banned

			network:sendNotification(player, {
	            sort = 'lodDanger',
	            text = 'lodFailedBanAbilityAlreadyBanned',
	            params = {
	            	['abilityName'] = 'DOTA_Tooltip_ability_' .. abilityName
	        	}
	        })

            return
		end
	end

    -- Have they hit the ban limit?
    if playerBans.heroBans >= maxHeroBans and playerBans.abilityBans >= maxBans then
        -- Toggle their state
        self.isReady[playerID] =  1

        -- Checks if people are ready
        self:checkForReady()
    end
end

-- Player wants to select a random ability
function Pregame:onPlayerSelectRandomAbility(eventSourceIndex, args)
    -- Grab data
    local playerID = args.PlayerID
    local player = PlayerResource:GetPlayer(playerID)

	-- Ensure we are in the picking phase
    if self:getPhase() ~= constants.PHASE_SELECTION then
        network:sendNotification(player, {
            sort = 'lodDanger',
            text = 'lodFailedWrongPhaseAllRandom'
        })

        return
    end

    local slot = math.floor(tonumber(args.slot))

    local maxSlots = self.optionStore['lodOptionCommonMaxSlots']
    local maxRegulars = self.optionStore['lodOptionCommonMaxSkills']
    local maxUlts = self.optionStore['lodOptionCommonMaxUlts']

    -- Ensure a container for this player exists
    self.selectedSkills[playerID] = self.selectedSkills[playerID] or {}

    local build = self.selectedSkills[playerID]

    -- Validate the slot is a valid slot index
    if slot < 1 or slot > maxSlots then
        -- Invalid slot number
        network:sendNotification(player, {
            sort = 'lodDanger',
            text = 'lodFailedInvalidSlot'
        })

        return
    end

    -- Grab a random ability
    local newAbility = self:findRandomSkill(build, slot, playerID)

    if newAbility == nil then
    	-- No ability found, report error
    	network:sendNotification(player, {
            sort = 'lodDanger',
            text = 'lodFailedNoValidAbilities'
        })

        return
    else
    	-- Store it
        build[slot] = newAbility

        -- Network it
        network:setSelectedAbilities(playerID, build)
    end
end

-- Tries to set which ability is in the given slot
function Pregame:setSelectedAbility(playerID, slot, abilityName, dontNetwork)
    -- Grab the player so we can push messages
    local player = PlayerResource:GetPlayer(playerID)

    -- Grab settings
    local maxSlots = self.optionStore['lodOptionCommonMaxSlots']
    local maxRegulars = self.optionStore['lodOptionCommonMaxSkills']
    local maxUlts = self.optionStore['lodOptionCommonMaxUlts']

    -- Ensure a container for this player exists
    self.selectedSkills[playerID] = self.selectedSkills[playerID] or {}

    local build = self.selectedSkills[playerID]

    -- Grab what the new build would be, to run tests against it
    local newBuild = SkillManager:grabNewBuild(build, slot, abilityName)

    -- Validate the slot is a valid slot index
    if slot < 1 or slot > maxSlots then
        -- Invalid slot number
        network:sendNotification(player, {
            sort = 'lodDanger',
            text = 'lodFailedInvalidSlot'
        })

        return
    end

    -- Validate ability is an actual ability
    if not self.flagsInverse[abilityName] then
        -- Invalid ability name
        network:sendNotification(player, {
            sort = 'lodDanger',
            text = 'lodFailedInvalidAbility',
            params = {
                ['abilityName'] = abilityName
            }
        })

        return
    end

    -- Check draft array
    if self.useDraftArrays then
        local draftID = self:getDraftID(playerID)
        local draftArray = self.draftArrays[draftID] or {}
        local heroDraft = draftArray.heroDraft
        local abilityDraft = draftArray.abilityDraft

        if self.maxDraftHeroes > 0 then
            local heroName = self.abilityHeroOwner[abilityName]

            if not heroDraft[heroName] then
                -- Tell them
                network:sendNotification(player, {
                    sort = 'lodDanger',
                    text = 'lodFailedDraftWrongHeroAbility',
                    params = {
                        ['abilityName'] = 'DOTA_Tooltip_ability_' .. abilityName
                    }
                })

                return
            end
        end

        if self.maxDraftSkills > 0 then
            if not abilityDraft[abilityName] then
                -- Tell them
                network:sendNotification(player, {
                    sort = 'lodDanger',
                    text = 'lodFailedDraftWrongAbility',
                    params = {
                        ['abilityName'] = 'DOTA_Tooltip_ability_' .. abilityName
                    }
                })

                return
            end
        end
    end

    -- Don't allow picking banned abilities
    if self.bannedAbilities[abilityName] then
        -- Invalid ability name
        network:sendNotification(player, {
            sort = 'lodDanger',
            text = 'lodFailedSkillIsBanned',
            params = {
                ['abilityName'] = 'DOTA_Tooltip_ability_' .. abilityName
            }
        })

        return
    end

    -- Validate that the ability is allowed in this slot (ulty count)
    if SkillManager:hasTooMany(newBuild, maxUlts, function(ab)
        return SkillManager:isUlt(ab)
    end) then
        -- Invalid ability name
        network:sendNotification(player, {
            sort = 'lodDanger',
            text = 'lodFailedTooManyUlts',
            params = {
                ['maxUlts'] = maxUlts
            }
        })

        return
    end

    -- Validate that the ability is allowed in this slot (regular count)
    if SkillManager:hasTooMany(newBuild, maxRegulars, function(ab)
        return not SkillManager:isUlt(ab)
    end) then
        -- Invalid ability name
        network:sendNotification(player, {
            sort = 'lodDanger',
            text = 'lodFailedTooManyRegulars',
            params = {
                ['maxRegulars'] = maxRegulars
            }
        })

        return
    end

    -- Do they already have this ability?
    for k,v in pairs(build) do
        if k ~= slot and v == abilityName then
            -- Invalid ability name
            network:sendNotification(player, {
                sort = 'lodDanger',
                text = 'lodFailedAlreadyGotSkill',
                params = {
                    ['abilityName'] = 'DOTA_Tooltip_ability_' .. abilityName
                }
            })

            return
        end
    end

    -- Is the ability in one of the allowed categories?
    local cat = (self.flagsInverse[abilityName] or {}).category
    if cat then
        local allowed = true

        if cat == 'main' then
            allowed = self.optionStore['lodOptionAdvancedHeroAbilities'] == 1
        elseif cat == 'neutral' then
            allowed = self.optionStore['lodOptionAdvancedNeutralAbilities'] == 1
        elseif cat == 'wraith' then
            allowed = self.optionStore['lodOptionAdvancedNeutralWraithNight'] == 1
        elseif cat == 'OP' then
            allowed = self.optionStore['lodOptionAdvancedOPAbilities'] == 0
        end

        if not allowed then
            network:sendNotification(player, {
                sort = 'lodDanger',
                text = 'lodFailedBannedCategory',
                params = {
                    ['cat'] = 'lodCategory_' .. cat,
                    ['ab'] = 'DOTA_Tooltip_ability_' .. abilityName
                }
            })

            return
        end
    else
        -- Category not found, don't allow this skill

        network:sendNotification(player, {
            sort = 'lodDanger',
            text = 'lodFailedUnknownCategory',
            params = {
                ['ab'] = 'DOTA_Tooltip_ability_' .. abilityName
            }
        })

        return
    end

    -- Should we block troll combinations?
    if self.optionStore['lodOptionBanningBlockTrollCombos'] == 1 then
        -- Validate that it isn't a troll build
        local isTrollCombo, ab1, ab2 = self:isTrollCombo(newBuild)
        if isTrollCombo then
            -- Invalid ability name
            network:sendNotification(player, {
                sort = 'lodDanger',
                text = 'lodFailedTrollCombo',
                params = {
                    ['ab1'] = 'DOTA_Tooltip_ability_' .. ab1,
                    ['ab2'] = 'DOTA_Tooltip_ability_' .. ab2
                }
            })

            return
        end
    end

    -- Consider unique skills
    if self.optionStore['lodOptionAdvancedUniqueSkills'] == 1 then
        local team = PlayerResource:GetTeam(playerID)

        for thePlayerID,theBuild in pairs(self.selectedSkills) do
            -- Ensure the team matches up
            if team == PlayerResource:GetTeam(thePlayerID) then
                for theSlot,theAbility in pairs(theBuild) do
                    if theAbility == abilityName then
                        -- Skill is taken
                        network:sendNotification(player, {
                            sort = 'lodDanger',
                            text = 'lodFailedSkillTaken',
                            params = {
                                ['ab'] = 'DOTA_Tooltip_ability_' .. abilityName
                            }
                        })

                        return
                    end
                end
            end
        end
    elseif self.optionStore['lodOptionAdvancedUniqueSkills'] == 2 then
        for playerID,theBuild in pairs(self.selectedSkills) do
            for theSlot,theAbility in pairs(theBuild) do
                if theAbility == abilityName then
                    -- Skill is taken
                    network:sendNotification(player, {
                        sort = 'lodDanger',
                        text = 'lodFailedSkillTaken',
                        params = {
                            ['ab'] = 'DOTA_Tooltip_ability_' .. abilityName
                        }
                    })

                    return
                end
            end
        end
    end

    -- Is there an actual change?
    if build[slot] ~= abilityName then
        -- New ability in this slot
        build[slot] = abilityName

        -- Should we network it
        if not dontNetwork then
            -- Network it
            network:setSelectedAbilities(playerID, build)
        end
    end
end

-- Player wants to select a new ability
function Pregame:onPlayerSelectAbility(eventSourceIndex, args)
    -- Grab data
    local playerID = args.PlayerID
    local player = PlayerResource:GetPlayer(playerID)

    -- Ensure we are in the picking phase
    if self:getPhase() ~= constants.PHASE_SELECTION then
        network:sendNotification(player, {
            sort = 'lodDanger',
            text = 'lodFailedWrongPhaseSelection'
        })

        return
    end

    local slot = math.floor(tonumber(args.slot))
    local abilityName = args.abilityName

    -- Attempt to set the ability
    self:setSelectedAbility(playerID, slot, abilityName)
end

-- Player wants to swap two slots
function Pregame:onPlayerSwapSlot(eventSourceIndex, args)
    -- Ensure we are in the picking phase
    if self:getPhase() ~= constants.PHASE_SELECTION and self:getPhase() ~= constants.PHASE_REVIEW then return end

    -- Grab data
    local playerID = args.PlayerID
    local player = PlayerResource:GetPlayer(playerID)

    local slot1 = math.floor(tonumber(args.slot1))
    local slot2 = math.floor(tonumber(args.slot2))

    local maxSlots = self.optionStore['lodOptionCommonMaxSlots']

    -- Ensure a container for this player exists
    self.selectedSkills[playerID] = self.selectedSkills[playerID] or {}

    local build = self.selectedSkills[playerID]

    -- Ensure they are not the same slot
    if slot1 == slot2 then
    	-- Invalid ability name
        network:sendNotification(player, {
            sort = 'lodDanger',
            text = 'lodFailedSwapSlotSameSlot'
        })

        return
    end

    -- Ensure both the slots are valid
    if slot1 < 1 or slot1 > maxSlots or slot2 < 1 or slot2 > maxSlots then
    	-- Invalid ability name
        network:sendNotification(player, {
            sort = 'lodDanger',
            text = 'lodFailedSwapSlotInvalidSlots'
        })

        return
    end

    -- Perform the slot
    local tempSkill = build[slot1]
    build[slot1] = build[slot2]
    build[slot2] = tempSkill

    -- Network it
    network:setSelectedAbilities(playerID, build)
end

-- Returns a random skill for a player, given a build and the slot the skill would be for
function Pregame:findRandomSkill(build, slotNumber, playerID)
    local team = PlayerResource:GetTeam(playerID)

	-- Ensure we have a valid build
	build = build or {}

	-- Table that will contain all possible skills
	local possibleSkills = {}

	-- Grab the limits
	local maxRegulars = self.optionStore['lodOptionCommonMaxSkills']
    local maxUlts = self.optionStore['lodOptionCommonMaxUlts']

    -- Count how many ults
    local totalUlts = 0
    local totalNormal = 0

    for slotID,abilityName in pairs(build) do
    	if slotID ~= slotNumber then
    		if SkillManager:isUlt(abilityName) then
    			totalUlts = totalUlts + 1
    		else
    			totalNormal = totalNormal + 1
    		end
    	end
    end

	for abilityName,_ in pairs(self.flagsInverse) do
		-- Do we already have this ability / is this in vilation of our troll combos

		local shouldAdd = true

        -- Prevent certain skills from being randomed
        if self.doNotRandom[abilityName] then
            shouldAdd = false
        end

		-- consider ulty count
		if shouldAdd and SkillManager:isUlt(abilityName) then
			if totalUlts >= maxUlts then
				shouldAdd = false
			end
		else
			if totalNormal >= maxRegulars then
				shouldAdd = false
			end
		end

		-- Check draft array
        if self.useDraftArrays then
            local draftID = self:getDraftID(playerID)
            local draftArray = self.draftArrays[draftID] or {}
            local heroDraft = draftArray.heroDraft
            local abilityDraft = draftArray.abilityDraft

            if self.maxDraftHeroes > 0 then
                local heroName = self.abilityHeroOwner[abilityName]

                if not heroDraft[heroName] then
                    shouldAdd = false
                end
            end

            if self.maxDraftSkills > 0 then
                if not abilityDraft[abilityName] then
                    shouldAdd = false
                end
            end
        end

        -- Consider unique skills
        if self.optionStore['lodOptionAdvancedUniqueSkills'] == 1 then
            for playerID,theBuild in pairs(self.selectedSkills) do
                -- Ensure the team matches up
                if team == PlayerResource:GetTeam(playerID) then
                    for theSlot,theAbility in pairs(theBuild) do
                        if theAbility == abilityName then
                            shouldAdd = false
                            break
                        end
                    end
                end
            end
        elseif self.optionStore['lodOptionAdvancedUniqueSkills'] == 2 then
            for playerID,theBuild in pairs(self.selectedSkills) do
                for theSlot,theAbility in pairs(theBuild) do
                    if theAbility == abilityName then
                        shouldAdd = false
                        break
                    end
                end
            end
        end

		-- check bans
		if self.bannedAbilities[abilityName] then
			shouldAdd = false
		end

		for slotNumber,abilityInSlot in pairs(build) do
			if abilityName == abilityInSlot then
				shouldAdd = false
				break
			end

			if self.banList[abilityName] and self.banList[abilityName][abilityInSlot] then
				shouldAdd = false
				break
			end
		end

		-- Should we add it?
		if shouldAdd then
			table.insert(possibleSkills, abilityName)
		end
	end

	-- Are there any possible skills for this slot?
	if #possibleSkills == 0 then
		return nil
	end

	-- Pick a random skill to return
	return possibleSkills[math.random(#possibleSkills)]
end

-- Sets the stage
function Pregame:setPhase(newPhaseNumber)
    -- Store the current phase
    self.currentPhase = newPhaseNumber

    -- Update the phase for the clients
    network:setPhase(newPhaseNumber)

    -- Ready state should reset
    for k,v in pairs(self.isReady) do
        self.isReady[k] = 0
    end

    -- Network it
    network:sendReadyState(self.isReady)
end

-- Sets when the next phase is going to end
function Pregame:setEndOfPhase(endTime, freezeTimer)
    -- Store the time
    self.endOfTimer = endTime

    -- Network it
    network:setEndOfPhase(endTime)

    -- Should we freeze the timer?
    if freezeTimer then
        self.freezeTimer = freezeTimer
        network:freezeTimer(freezeTimer)
    else
        self.freezeTimer = nil
        network:freezeTimer(-1)
    end
end

-- Returns when the current phase should end
function Pregame:getEndOfPhase()
    return self.endOfTimer
end

-- Returns the current phase
function Pregame:getPhase()
    return self.currentPhase
end

-- Calculates how many players are in the server
function Pregame:getActivePlayers()
    local total = 0

    for i=0,9 do
        if PlayerResource:GetConnectionState(i) == 2 then
            total = total + 1
        end
    end

    return total
end

-- Adds extra towers
-- Adds extra towers
function Pregame:addExtraTowers()
    local totalMiddleTowers = self.optionStore['lodOptionGameSpeedTowersPerLane'] - 2

    -- Is there any work to do?
    if totalMiddleTowers > 1 then
        -- Create a store for tower connectors
        self.towerConnectors = {}

        local lanes = {
            top = true,
            mid = true,
            bot = true
        }

        local teams = {
            good = DOTA_TEAM_GOODGUYS,
            bad = DOTA_TEAM_BADGUYS
        }

        local patchMap = {
            dota_goodguys_tower3_top = '1021_tower_radiant',
            dota_goodguys_tower3_mid = '1020_tower_radiant',
            dota_goodguys_tower3_bot = '1019_tower_radiant',

            dota_goodguys_tower2_top = '1026_tower_radiant',
            dota_goodguys_tower2_mid = '1024_tower_radiant',
            dota_goodguys_tower2_bot = '1022_tower_radiant',

            dota_goodguys_tower1_top = '1027_tower_radiant',
            dota_goodguys_tower1_mid = '1025_tower_radiant',
            dota_goodguys_tower1_bot = '1023_tower_radiant',

            dota_badguys_tower3_top = '1036_tower_dire',
            dota_badguys_tower3_mid = '1031_tower_dire',
            dota_badguys_tower3_bot = '1030_tower_dire',

            dota_badguys_tower2_top = '1035_tower_dire',
            dota_badguys_tower2_mid = '1032_tower_dire',
            dota_badguys_tower2_bot = '1029_tower_dire',

            dota_badguys_tower1_top = '1034_tower_dire',
            dota_badguys_tower1_mid = '1033_tower_dire',
            dota_badguys_tower1_bot = '1028_tower_dire',
        }

        for team,teamNumber in pairs(teams) do
            for lane,__ in pairs(lanes) do
                local threeRaw = 'dota_'..team..'guys_tower3_'..lane
                local three = Entities:FindByName(nil, threeRaw) or Entities:FindByName(nil, patchMap[threeRaw] or '_unknown_')

                local twoRaw = 'dota_'..team..'guys_tower2_'..lane
                local two = Entities:FindByName(nil, twoRaw) or Entities:FindByName(nil, patchMap[twoRaw] or '_unknown_')

                local oneRaw = 'dota_'..team..'guys_tower1_'..lane
                local one = Entities:FindByName(nil, oneRaw) or Entities:FindByName(nil, patchMap[oneRaw] or '_unknown_')

                -- Unit name
                local unitName = 'npc_dota_'..team..'guys_tower_lod_'..lane

                if one and two and three then
                    -- Proceed to patch the towers
                    local onePos = one:GetOrigin()
                    local threePos = three:GetOrigin()

                    -- Workout the difference in the positions
                    local dif = threePos - onePos
                    local sep = dif / totalMiddleTowers + 1

                    -- Remove the middle tower
                    UTIL_Remove(two)

                    -- Used to connect towers
                    local prevTower = three

                    for i=1,totalMiddleTowers do
                        local newPos = threePos - (sep * i)

                        local newTower = CreateUnitByName(unitName, newPos, false, nil, nil, teamNumber)

                        if newTower then
                            -- Make it unkillable
                            newTower:AddNewModifier(ent, nil, 'modifier_invulnerable', {})

                            -- Store connection
                            self.towerConnectors[newTower] = prevTower
                            prevTower = newTower
                        else
                            print('Failed to create tower #'..i..' in lane '..lane)
                        end
                    end

                    -- Store initial connection
                    self.towerConnectors[one] = prevTower
                else
                    -- Failure
                    print('Failed to patch towers!')
                end
            end
        end

        -- Hook the towers properly
        local this = self

        ListenToGameEvent('entity_hurt', function(keys)
            -- Grab the entity that was hurt
            local ent = EntIndexToHScript(keys.entindex_killed)

            -- Check for tower connections
            if ent:GetHealth() <= 0 and this.towerConnectors[ent] then
                local tower = this.towerConnectors[ent]
                this.towerConnectors[ent] = nil

                if IsValidEntity(tower) then
                    -- Make it killable!
                    tower:RemoveModifierByName('modifier_invulnerable')
                end
            end
        end, nil)
    end
end

-- Prevents Fountain Camping
function Pregame:preventCamping()
    -- Should we prevent fountain camping?
    if self.optionStore['lodOptionCrazyNoCamping'] == 1 then
        local toAdd = {
            ursa_fury_swipes = 4,
            templar_assassin_psi_blades = 1,
            slark_essence_shift = 4
        }

        local fountains = Entities:FindAllByClassname('ent_dota_fountain')
        -- Loop over all ents
        for k,fountain in pairs(fountains) do
            for skillName,skillLevel in pairs(toAdd) do
                fountain:AddAbility(skillName)
                local ab = fountain:FindAbilityByName(skillName)
                if ab then
                    ab:SetLevel(skillLevel)
                end
            end

            local item = CreateItem('item_monkey_king_bar', fountain, fountain)
            if item then
                fountain:AddItem(item)
            end
        end
    end
end

-- Return an instance of it
return Pregame()