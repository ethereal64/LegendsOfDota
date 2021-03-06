"use strict";

// All options JSON (todo: EXPORT IT)
var allOptions = {
    // Presets, to make selection FAST
    presets: {
        default: true,
        fields: [
            {
                name: 'lodOptionGamemode',
                des: 'lodOptionsPresetGamemode',
                about: 'lodOptionAboutPresetGamemode',
                sort: 'dropdown',
                values: [
                    {
                        text: 'lodOptionBalancedAllPick',
                        value: 1
                    },
                    /*{
                        text: 'lodOptionBalancedSingleDraft',
                        value: 2
                    },*/
                    {
                        text: 'lodOptionBalancedMirrorDraft',
                        value: 3
                    },
                    {
                        text: 'lodOptionBalancedAllRandom',
                        value: 4
                    },
                    {
                        text: 'lodOptionBalancedCustom',
                        value: -1
                    }
                ]
            },
            {
                preset: true,
                name: 'lodOptionBanning',
                des: 'lodOptionsPresetBanning',
                about: 'lodOptionAboutPresetBanning',
                sort: 'dropdown',
                values: [
                    {
                        text: 'lodOptionBalancedBan',
                        value: 1
                    },
                    {
                        text: 'lodOptionManualBan',
                        value: 2
                    },
                    {
                        text: 'lodOptionNoBans',
                        value: 3
                    }
                ]
            },
            {
                preset: true,
                name: 'lodOptionSlots',
                des: 'lodOptionsPresetSlots',
                about: 'lodOptionAboutPresetSlots',
                sort: 'dropdown',
                values: [
                    {
                        text: 'lodOptionBalancedSlots4',
                        value: 4
                    },
                    {
                        text: 'lodOptionBalancedSlots5',
                        value: 5
                    },
                    {
                        text: 'lodOptionBalancedSlots6',
                        value: 6
                    }
                ]
            },
            {
                preset: true,
                name: 'lodOptionUlts',
                des: 'lodOptionsPresetUlts',
                about: 'lodOptionAboutPresetUlts',
                sort: 'dropdown',
                values: [
                    {
                        text: 'lodOptionBalancedUlts1',
                        value: 1
                    },
                    {
                        text: 'lodOptionBalancedUlts2',
                        value: 2
                    },
                    {
                        text: 'lodOptionBalancedUlts3',
                        value: 3
                    },
                    {
                        text: 'lodOptionBalancedUlts4',
                        value: 4
                    },
                    {
                        text: 'lodOptionBalancedUlts5',
                        value: 5
                    },
                    {
                        text: 'lodOptionBalancedUlts6',
                        value: 6
                    },
                    {
                        text: 'lodOptionBalancedUlts0',
                        value: 0
                    },
                ]
            },
            {
                preset: true,
                name: 'lodOptionMirrorHeroes',
                des: 'lodOptionsPresetMirrorHeroes',
                about: 'lodOptionAboutPresetMirrorHeroes',
                sort: 'dropdown',
                values: [
                    {
                        text: 'lodOptionMirrorHeroes10',
                        value: 10
                    },
                    {
                        text: 'lodOptionMirrorHeroes20',
                        value: 20
                    },
                    {
                        text: 'lodOptionMirrorHeroes30',
                        value: 30
                    },
                    {
                        text: 'lodOptionMirrorHeroes40',
                        value: 40
                    },
                    {
                        text: 'lodOptionMirrorHeroes50',
                        value: 50
                    }
                ]
            }
        ]
    },

    // The common stuff people play with
    common_selection: {
        custom: true,
        fields: [
            {
                name: 'lodOptionCommonGamemode',
                des: 'lodOptionDesCommonGamemode',
                about: 'lodOptionAboutCommonGamemode',
                sort: 'dropdown',
                values: [
                    {
                        text: 'lodOptionAllPick',
                        value: 1
                    },
                    /*{
                        text: 'lodOptionSingleDraft',
                        value: 2
                    },*/
                    {
                        text: 'lodOptionMirrorDraft',
                        value: 3
                    },
                    {
                        text: 'lodOptionAllRandom',
                        value: 4
                    }
                ]
            },
            {
                name: 'lodOptionCommonMaxSlots',
                des: 'lodOptionDesCommonMaxSlots',
                about: 'lodOptionAboutCommonMaxSlots',
                sort: 'dropdown',
                values: [
                    {
                        text: 'lodOptionCommonSlots4',
                        value: 4
                    },
                    {
                        text: 'lodOptionCommonSlots5',
                        value: 5
                    },
                    {
                        text: 'lodOptionCommonSlots6',
                        value: 6
                    }
                ]
            },
            {
                name: 'lodOptionCommonMaxSkills',
                des: 'lodOptionDesCommonMaxSkills',
                about: 'lodOptionAboutCommonMaxSkills',
                sort: 'dropdown',
                values: [
                    {
                        text: 'lodOptionCommonSkills0',
                        value: 0
                    },
                    {
                        text: 'lodOptionCommonSkills1',
                        value: 1
                    },
                    {
                        text: 'lodOptionCommonSkills2',
                        value: 2
                    },
                    {
                        text: 'lodOptionCommonSkills3',
                        value: 3
                    },
                    {
                        text: 'lodOptionCommonSkills4',
                        value: 4
                    },
                    {
                        text: 'lodOptionCommonSkills5',
                        value: 5
                    },
                    {
                        text: 'lodOptionCommonSkills6',
                        value: 6
                    }
                ]
            },
            {
                name: 'lodOptionCommonMaxUlts',
                des: 'lodOptionDesCommonMaxUlts',
                about: 'lodOptionAboutCommonMaxUlts',
                sort: 'dropdown',
                values: [
                    {
                        text: 'lodOptionCommonUlts0',
                        value: 0
                    },
                    {
                        text: 'lodOptionCommonUlts1',
                        value: 1
                    },
                    {
                        text: 'lodOptionCommonUlts2',
                        value: 2
                    },
                    {
                        text: 'lodOptionCommonUlts3',
                        value: 3
                    },
                    {
                        text: 'lodOptionCommonUlts4',
                        value: 4
                    },
                    {
                        text: 'lodOptionCommonUlts5',
                        value: 5
                    },
                    {
                        text: 'lodOptionCommonUlts6',
                        value: 6
                    }
                ]
            },
            {
                preset: true,
                name: 'lodOptionCommonMirrorHeroes',
                des: 'lodOptionsCommonMirrorHeroes',
                about: 'lodOptionAboutCommonMirrorHeroes',
                sort: 'dropdown',
                values: [
                    {
                        text: 'lodOptionMirrorHeroes10',
                        value: 10
                    },
                    {
                        text: 'lodOptionMirrorHeroes20',
                        value: 20
                    },
                    {
                        text: 'lodOptionMirrorHeroes30',
                        value: 30
                    },
                    {
                        text: 'lodOptionMirrorHeroes40',
                        value: 40
                    },
                    {
                        text: 'lodOptionMirrorHeroes50',
                        value: 50
                    }
                ]
            },
        ]
    },

    // Changing what stuff is banned
    banning: {
        custom: true,
        fields: [
            {
                name: 'lodOptionBanningMaxBans',
                des: 'lodOptionDesBanningMaxBans',
                about: 'lodOptionAboutBanningMaxBans',
                sort: 'dropdown',
                values: [
                    {
                        text: 'lodOptionBanningMaxBans0',
                        value: 0
                    },
                    {
                        text: 'lodOptionBanningMaxBans1',
                        value: 1
                    },
                    {
                        text: 'lodOptionBanningMaxBans2',
                        value: 2
                    },
                    {
                        text: 'lodOptionBanningMaxBans3',
                        value: 3
                    },
                    {
                        text: 'lodOptionBanningMaxBans5',
                        value: 5
                    },
                    {
                        text: 'lodOptionBanningMaxBans10',
                        value: 10
                    },
                    {
                        text: 'lodOptionBanningMaxBans25',
                        value: 25
                    }
                ]
            },
            {
                name: 'lodOptionBanningMaxHeroBans',
                des: 'lodOptionDesBanningMaxHeroBans',
                about: 'lodOptionAboutBanningMaxHeroBans',
                sort: 'dropdown',
                values: [
                    {
                        text: 'lodOptionBanningMaxHeroBans0',
                        value: 0
                    },
                    {
                        text: 'lodOptionBanningMaxBans1',
                        value: 1
                    },
                    {
                        text: 'lodOptionBanningMaxBans2',
                        value: 2
                    },
                    {
                        text: 'lodOptionBanningMaxBans3',
                        value: 3
                    }
                ]
            },
            {
                name: 'lodOptionBanningBlockTrollCombos',
                des: 'lodOptionDesBanningBlockTrollCombos',
                about: 'lodOptionAboutBanningBlockTrollCombos',
                sort: 'toggle',
                values: [
                    {
                        text: 'lodOptionNo',
                        value: 0
                    },
                    {
                        text: 'lodOptionYes',
                        value: 1
                    }
                ]
            },
            {
                name: 'lodOptionBanningUseBanList',
                des: 'lodOptionDesBanningUseBanList',
                about: 'lodOptionAboutBanningUseBanList',
                sort: 'toggle',
                values: [
                    {
                        text: 'lodOptionNo',
                        value: 0
                    },
                    {
                        text: 'lodOptionYes',
                        value: 1
                    }
                ]
            },
            {
                name: 'lodOptionAdvancedOPAbilities',
                des: 'lodOptionDesAdvancedOPAbilities',
                about: 'lodOptionAboutAdvancedOPAbilities',
                sort: 'toggle',
                values: [
                    {
                        text: 'lodOptionNo',
                        value: 0
                    },
                    {
                        text: 'lodOptionYes',
                        value: 1
                    }

                ]
            },
            {
                name: 'lodOptionBanningBanInvis',
                des: 'lodOptionDesBanningBanInvis',
                about: 'lodOptionAboutBanningBanInvis',
                sort: 'toggle',
                values: [
                    {
                        text: 'lodOptionNo',
                        value: 0
                    },
                    {
                        text: 'lodOptionYes',
                        value: 1
                    }
                ]
            },
        ]
    },

    // Changing the speed of the match
    game_speed: {
        custom: true,
        fields: [
            {
                name: 'lodOptionGameSpeedStartingLevel',
                des: 'lodOptionDesGameSpeedStartingLevel',
                about: 'lodOptionAboutGameSpeedStartingLevel',
                sort: 'dropdown',
                values: [
                    {
                        text: 'lodOptionLevel1',
                        value: 1
                    },
                    {
                        text: 'lodOptionLevel6',
                        value: 6
                    },
                    {
                        text: 'lodOptionLevel11',
                        value: 11
                    },
                    {
                        text: 'lodOptionLevel16',
                        value: 16
                    },
                    {
                        text: 'lodOptionLevel25',
                        value: 25
                    },
                    {
                        text: 'lodOptionLevel50',
                        value: 50
                    },
                    {
                        text: 'lodOptionLevel75',
                        value: 75
                    },
                    {
                        text: 'lodOptionLevel100',
                        value: 100
                    }
                ]
            },
            {
                name: 'lodOptionGameSpeedMaxLevel',
                des: 'lodOptionDesGameSpeedMaxLevel',
                about: 'lodOptionAboutGameSpeedMaxLevel',
                sort: 'dropdown',
                values: [
                    {
                        text: 'lodOptionLevel6',
                        value: 6
                    },
                    {
                        text: 'lodOptionLevel11',
                        value: 11
                    },
                    {
                        text: 'lodOptionLevel16',
                        value: 16
                    },
                    {
                        text: 'lodOptionLevel25',
                        value: 25
                    },
                    {
                        text: 'lodOptionLevel50',
                        value: 50
                    },
                    {
                        text: 'lodOptionLevel75',
                        value: 75
                    },
                    {
                        text: 'lodOptionLevel100',
                        value: 100
                    }
                ]
            },
            {
                name: 'lodOptionGameSpeedStartingGold',
                des: 'lodOptionDesGameSpeedStartingGold',
                about: 'lodOptionAboutGameSpeedStartingGold',
                sort: 'dropdown',
                values: [
                    {
                        text: 'lodOptionGameSpeedStartingGold0',
                        value: 0
                    },
                    {
                        text: 'lodOptionGameSpeedStartingGold250',
                        value: 250
                    },
                    {
                        text: 'lodOptionGameSpeedStartingGold500',
                        value: 500
                    },
                    {
                        text: 'lodOptionGameSpeedStartingGold1000',
                        value: 1000
                    },
                    {
                        text: 'lodOptionGameSpeedStartingGold2500',
                        value: 2500
                    },
                    {
                        text: 'lodOptionGameSpeedStartingGold5000',
                        value: 5000
                    },
                    {
                        text: 'lodOptionGameSpeedStartingGold10000',
                        value: 10000
                    },
                    {
                        text: 'lodOptionGameSpeedStartingGold25000',
                        value: 25000
                    },
                    {
                        text: 'lodOptionGameSpeedStartingGold50000',
                        value: 50000
                    },
                    {
                        text: 'lodOptionGameSpeedStartingGold100000',
                        value: 100000
                    },
                ]
            },
            {
                name: 'lodOptionGameSpeedRespawnTime',
                des: 'lodOptionDesGameSpeedRespawnTime',
                about: 'lodOptionAboutGameSpeedRespawnTime',
                sort: 'dropdown',
                values: [
                    {
                        text: 'lodOptionGameSpeedRespawnTimeDefault',
                        value: 0
                    },
                    {
                        text: 'lodOptionGameSpeedRespawnTimeHalf',
                        value: 0.5
                    },
                    {
                        text: 'lodOptionGameSpeedRespawnTimeTenth',
                        value: 0.1
                    },
                    {
                        text: 'lodOptionGameSpeedRespawnTimeSecond',
                        value: -1
                    },
                    {
                        text: 'lodOptionGameSpeedRespawnTime10Second',
                        value: -10
                    },
                    {
                        text: 'lodOptionGameSpeedRespawnTime20Second',
                        value: -20
                    },
                    {
                        text: 'lodOptionGameSpeedRespawnTime30Second',
                        value: -30
                    },
                    {
                        text: 'lodOptionGameSpeedRespawnTime60Second',
                        value: -60
                    }
                ]
            },
            {
                name: 'lodOptionGameSpeedTowersPerLane',
                des: 'lodOptionDesGameSpeedTowersPerLane',
                about: 'lodOptionAboutGameSpeedTowersPerLane',
                sort: 'dropdown',
                values: [
                    {
                        text: 'lodOptionTower3',
                        value: 3
                    },
                    {
                        text: 'lodOptionTower4',
                        value: 4
                    },
                    {
                        text: 'lodOptionTower5',
                        value: 5
                    },
                    {
                        text: 'lodOptionTower6',
                        value: 6
                    },
                    {
                        text: 'lodOptionTower7',
                        value: 7
                    },
                    {
                        text: 'lodOptionTower8',
                        value: 8
                    },
                    {
                        text: 'lodOptionTower9',
                        value: 9
                    },
                    {
                        text: 'lodOptionTower10',
                        value: 10
                    }
                ]
            },
            {
                name: 'lodOptionGameSpeedUpgradedUlts',
                des: 'lodOptionDesGameSpeedUpgradedUlts',
                about: 'lodOptionAboutGameSpeedUpgradedUlts',
                sort: 'toggle',
                values: [
                    {
                        text: 'lodOptionNo',
                        value: 0
                    },
                    {
                        text: 'lodOptionYes',
                        value: 1
                    }
                ]
            },
            {
                name: 'lodOptionCrazyEasymode',
                des: 'lodOptionDesCrazyEasymode',
                about: 'lodOptionAboutCrazyEasymode',
                sort: 'toggle',
                values: [
                    {
                        text: 'lodOptionNo',
                        value: 0
                    },
                    {
                        text: 'lodOptionYes',
                        value: 1
                    }
                ]
            },
        ]
    },

    // Advanced stuff, for pros
    advanced_selection: {
        custom: true,
        fields: [
            {
                name: 'lodOptionAdvancedHeroAbilities',
                des: 'lodOptionDesAdvancedHeroAbilities',
                about: 'lodOptionAboutAdvancedHeroAbilities',
                sort: 'toggle',
                values: [
                    {
                        text: 'lodOptionNo',
                        value: 0
                    },
                    {
                        text: 'lodOptionYes',
                        value: 1
                    }
                ]
            },
            {
                name: 'lodOptionAdvancedNeutralAbilities',
                des: 'lodOptionDesAdvancedNeutralAbilities',
                about: 'lodOptionAboutAdvancedNeutralAbilities',
                sort: 'toggle',
                values: [
                    {
                        text: 'lodOptionNo',
                        value: 0
                    },
                    {
                        text: 'lodOptionYes',
                        value: 1
                    }
                ]
            },
            {
                name: 'lodOptionAdvancedNeutralWraithNight',
                des: 'lodOptionDesAdvancedWraithNight',
                about: 'lodOptionAboutAdvancedWraithNight',
                sort: 'toggle',
                values: [
                    {
                        text: 'lodOptionNo',
                        value: 0
                    },
                    {
                        text: 'lodOptionYes',
                        value: 1
                    }
                ]
            },
            {
                name: 'lodOptionAdvancedHidePicks',
                des: 'lodOptionDesAdvancedHidePicks',
                about: 'lodOptionAboutAdvancedHidePicks',
                sort: 'toggle',
                values: [
                    {
                        text: 'lodOptionNo',
                        value: 0
                    },
                    {
                        text: 'lodOptionYes',
                        value: 1
                    }
                ]
            },
            {
                name: 'lodOptionAdvancedUniqueSkills',
                des: 'lodOptionDesAdvancedUniqueSkills',
                about: 'lodOptionAboutAdvancedUniqueSkills',
                sort: 'dropdown',
                values: [
                    {
                        text: 'lodUniqueSkillsOff',
                        value: 0
                    },
                    {
                        text: 'lodUniqueSkillsTeam',
                        value: 1
                    },
                    {
                        text: 'lodUniqueSkillsGlobal',
                        value: 2
                    },
                ]
            },
            {
                name: 'lodOptionAdvancedUniqueHeroes',
                des: 'lodOptionDesAdvancedUniqueHeroes',
                about: 'lodOptionAboutAdvancedUniqueHeroes',
                sort: 'toggle',
                values: [
                    {
                        text: 'lodOptionNo',
                        value: 0
                    },
                    {
                        text: 'lodOptionYes',
                        value: 1
                    }
                ]
            },
            {
                name: 'lodOptionAdvancedSelectPrimaryAttr',
                des: 'lodOptionDesAdvancedSelectPrimaryAttr',
                about: 'lodOptionAboutAdvancedSelectPrimaryAttr',
                sort: 'toggle',
                values: [
                    {
                        text: 'lodOptionNo',
                        value: 0
                    },
                    {
                        text: 'lodOptionYes',
                        value: 1
                    }
                ]
            },
        ]
    },

    // Buffing of heroes, towers, etc
    /*buffs: {
        custom: true,
        fields: [

        ]
    },*/

    // Stuff that is just crazy
    crazyness: {
        custom: true,
        fields: [
            {
                name: 'lodOptionCrazyNoCamping',
                des: 'lodOptionDesCrazyNoCamping',
                about: 'lodOptionAboutCrazyNoCamping',
                sort: 'toggle',
                values: [
                    {
                        text: 'lodOptionNo',
                        value: 0
                    },
                    {
                        text: 'lodOptionYes',
                        value: 1
                    }
                ]
            },
            {
                name: 'lodOptionCrazyUniversalShop',
                des: 'lodOptionDesCrazyUniversalShop',
                about: 'lodOptionAboutCrazyUniversalShop',
                sort: 'toggle',
                values: [
                    {
                        text: 'lodOptionNo',
                        value: 0
                    },
                    {
                        text: 'lodOptionYes',
                        value: 1
                    }
                ]
            },
            {
                name: 'lodOptionCrazyAllVision',
                des: 'lodOptionDesCrazyAllVision',
                about: 'lodOptionAboutCrazyAllVision',
                sort: 'toggle',
                values: [
                    {
                        text: 'lodOptionNo',
                        value: 0
                    },
                    {
                        text: 'lodOptionYes',
                        value: 1
                    }
                ]
            },
            {
                name: 'lodOptionCrazyMulticast',
                des: 'lodOptionDesCrazyMulticast',
                about: 'lodOptionAboutCrazyMulticast',
                sort: 'toggle',
                values: [
                    {
                        text: 'lodOptionNo',
                        value: 0
                    },
                    {
                        text: 'lodOptionYes',
                        value: 1
                    }
                ]
            },
            {
                name: 'lodOptionCrazyWTF',
                des: 'lodOptionDesCrazyWTF',
                about: 'lodOptionAboutCrazyWTF',
                sort: 'toggle',
                values: [
                    {
                        text: 'lodOptionNo',
                        value: 0
                    },
                    {
                        text: 'lodOptionYes',
                        value: 1
                    }
                ]
            },
        ]
    }
}

// Hard Coded Recommended Builds
var recommendedBuilds = [
    {
        title: 'Hunter in the night',
        heroName: 'npc_dota_hero_night_stalker',
        attr: 'str',
        build: {
            1: 'magnataur_empower',
            2: 'antimage_blink',
            3: 'lycan_shapeshift',
            4: 'luna_lunar_blessing',
            5: 'night_stalker_hunter_in_the_night',
            6: 'night_stalker_darkness',
        },
    },
    {
        title: 'Generic Tank',
        heroName: 'npc_dota_hero_centaur',
        attr: 'str',
        build: {
            1: 'huskar_berserkers_blood',
            2: 'dragon_knight_dragon_blood',
            3: 'spectre_dispersion',
            4: 'viper_corrosive_skin',
            5: 'shredder_reactive_armor',
            6: 'alchemist_chemical_rage',
        },
    },
    {
        title: 'Infest Support',
        heroName: 'npc_dota_hero_night_stalker',
        attr: 'str',
        build: {
            1: 'pudge_rot',
            2: 'witch_doctor_voodoo_restoration',
            3: 'magnataur_empower',
            4: 'alpha_wolf_command_aura',
            5: 'omniknight_degen_aura',
            6: 'life_stealer_infest',
        },
    },
    {
        title: 'Global Caster',
        heroName: 'npc_dota_hero_pugna',
        attr: 'int',
        build: {
            1: 'treant_living_armor',
            2: 'holdout_arcane_aura',
            3: 'ancient_apparition_ice_blast',
            4: 'silencer_glaives_of_wisdom',
            5: 'bloodseeker_thirst',
            6: 'zuus_thundergods_wrath',
        },
    },
    {
        title: 'Magic Be Dashed!',
        heroName: 'npc_dota_hero_mirana',
        attr: 'agi',
        build: {
            1: 'medusa_split_shot',
            2: 'sniper_take_aim',
            3: 'spectre_desolate',
            4: 'meepo_geostrike',
            5: 'necronomicon_warrior_mana_burn_lod',
            6: 'phantom_lancer_juxtapose',
        },
    },
    {
        title: 'All your attributes are belong to me',
        heroName: 'npc_dota_hero_windrunner',
        attr: 'int',
        build: {
            1: 'obsidian_destroyer_arcane_orb',
            2: 'obsidian_destroyer_essence_aura',
            3: 'slark_essence_shift',
            4: 'pudge_flesh_heap',
            5: 'silencer_glaives_of_wisdom',
            6: 'windrunner_focusfire',
        },
    },
    {
        title: 'Rapture',
        heroName: 'npc_dota_hero_pugna',
        attr: 'int',
        build: {
            1: 'pudge_meat_hook',
            2: 'lone_druid_savage_roar',
            3: 'vengefulspirit_nether_swap',
            4: 'earth_spirit_boulder_smash',
            5: 'magnataur_skewer',
            6: 'bloodseeker_rupture',
        },
    },
    {
        title: 'Global Stunner',
        heroName: 'npc_dota_hero_pugna',
        attr: 'int',
        build: {
            1: 'sven_storm_bolt',
            2: 'vengefulspirit_magic_missile',
            3: 'antimage_blink',
            4: 'furion_teleportation',
            5: 'holdout_arcane_aura',
            6: 'magnataur_reverse_polarity',
        },
    },
    {
        title: 'Bring the team fight',
        heroName: 'npc_dota_hero_silencer',
        attr: 'int',
        build: {
            1: 'enigma_midnight_pulse',
            2: 'necrolyte_heartstopper_aura',
            3: 'warlock_rain_of_chaos',
            4: 'magnataur_empower',
            5: 'skeleton_king_vampiric_aura',
            6: 'enigma_black_hole',
        },
    },
    {
        title: 'The Duelist',
        heroName: 'npc_dota_hero_juggernaut',
        attr: 'agi',
        build: {
            1: 'phantom_assassin_phantom_strike',
            2: 'slardar_bash',
            3: 'windrunner_focusfire',
            4: 'slark_essence_shift',
            5: 'troll_warlord_fervor',
            6: 'legion_commander_duel',
        },
    },
];

// Phases
var PHASE_LOADING = 1;          // Waiting for players, etc
var PHASE_OPTION_SELECTION = 2; // Selection options
var PHASE_BANNING = 3;          // Banning stuff
var PHASE_SELECTION = 4;        // Selecting heroes
var PHASE_DRAFTING = 5;         // Place holder for drafting mode
var PHASE_RANDOM_SELECTION = 6; // Random build selection (For All Random)
var PHASE_REVIEW = 7;           // Review Phase
var PHASE_INGAME = 8;           // Game has started

// Hero data
var heroData = {};
var abilityHeroOwner = {};

// Ability Data
var flagData = {}
var flagDataInverse = {}

// Used to make data transfer smoother
var dataHooks = {};

// Used to hook when players are clicking around
var onLoadTabHook = {};

// Used to store selected heroes and skills
var selectedHeroes = {};
var selectedAttr = {};
var selectedSkills = {};
var readyState = {};

// Hide enemy picks?
var hideEnemyPicks = false;

// Mirror Draft stuff
var heroDraft = null;
var abilityDraft = null;

// The current phase we are in
var currentPhase = PHASE_LOADING;
var selectedPhase = PHASE_OPTION_SELECTION;
var endOfTimer = -1;
var freezeTimer = -1;
var lastTimerShow = -1;
var allowCustomSettings = false;

// Current hero & Skill
var currentSelectedHero = '';
var currentSelectedSkill = '';
var currentSelectedSlot = -1;
var currentSelectedAbCon = null;

// List of all player team panels
var allPlayerPanels = [];
var activePlayerPanels = {};
var activeReviewPanels = {};

// List of hero panels
var heroPanelMap = {};

// List of option links
var allOptionLinks = {};

// Prevent double option sending
var lastOptionValues = {};

// Map of optionName -> callback for value change
var optionFieldMap = {};

// Map of optionName -> Value
var optionValueList = {};

// Map of categories that are allowed to be picked from
var allowedCategories = {};

// Should we show banned / disallowed skills?
var showBannedSkills = false;
var showDisallowedSkills = false;
var showTakenSkills = true;
var showNonDraftSkills = false;

// List of banned abilities
var bannedAbilities = {};
var bannedHeroes = {};

// List of taken abilities
var takenAbilities = {};
var takenTeamAbilities = {};

// Keeping track of bans
var currentHeroBans = 0;
var currentAbilityBans = 0;

// Used to calculate filters (stub function)
var calculateFilters = function(){};
var calculateHeroFilters = function(){};

// Hooks an events and fires for all the keys
function hookAndFire(tableName, callback) {
    // Listen for phase changing information
    CustomNetTables.SubscribeNetTableListener(tableName, callback);

    // Grab the data
    var data = CustomNetTables.GetAllTableValues(tableName);
    for(var i=0; i<data.length; ++i) {
        var info = data[i];
        callback(tableName, info.key, info.value);
    }
}

// Focuses on nothing
function focusNothing() {
    $('#mainSelectionRoot').SetFocus();
}

// Adds a notification
var notifcationTotal = 0;
function addNotification(options) {
    // Grab useful stuff
    var notificationRoot = $('#lodNotificationArea');
    var notificationID = ++notifcationTotal;

    options = options || {};
    var text = options.text || '';
    var params = options.params || [];
    var sort = options.sort || 'lodInfo';
    var duration = options.duration || 5;

    var realText = $.Localize(text);
    for(var key in params) {
        var toAdd = $.Localize(params[key]);

        realText = realText.replace(new RegExp('\\{' + key + '\\}', 'g'), toAdd);
    }


    // Create the panel
    var notificationPanel = $.CreatePanel('Panel', notificationRoot, 'notification_' + notificationID);
    var textContainer = $.CreatePanel('Label', notificationPanel, 'notification_text_' + notificationID);

    // Push the style and text
    notificationPanel.AddClass('lodNotification');
    notificationPanel.AddClass('lodNotificationLoading');
    notificationPanel.AddClass(sort);
    textContainer.text = realText;

    // Delete it after a bit
    $.Schedule(duration, function() {
        notificationPanel.RemoveClass('lodNotificationLoading');
        notificationPanel.AddClass('lodNotificationRemoving');

        $.Schedule(0.5, function() {
            notificationPanel.DeleteAsync(0);
        });
    });
}

// Hooks a change event
function addInputChangedEvent(panel, callback) {
    var shouldListen = false;
    var checkRate = 0.25;
    var currentString = panel.text;

    var inputChangedLoop = function() {
        // Check for a change
        if(currentString != panel.text) {
            // Update current string
            currentString = panel.text;

            // Run the callback
            callback(panel, currentString);
        }

        if(shouldListen) {
            $.Schedule(checkRate, inputChangedLoop);
        }
    }

    panel.SetPanelEvent('onfocus', function() {
        // Enable listening, and monitor the field
        shouldListen = true;
        inputChangedLoop();
    });

    panel.SetPanelEvent('onblur', function() {
        // No longer listen
        shouldListen = false;
    });
}

// Hooks a tab change
function hookTabChange(tabName, callback) {
    onLoadTabHook[tabName] = callback;
}

// Makes skill info appear when you hover the panel that is parsed in
function hookSkillInfo(panel) {
    // Show
    panel.SetPanelEvent('onmouseover', function() {
        var ability = panel.GetAttributeString('abilityname', 'life_stealer_empty_1');

        // If no ability, give life stealer empty
        if(ability == '') {
            ability = 'life_stealer_empty_1';
        }

        $.DispatchEvent('DOTAShowAbilityTooltip', panel, ability);
    });

    // Hide
    panel.SetPanelEvent('onmouseout', function() {
        $.DispatchEvent('DOTAHideAbilityTooltip');
    });
}

// Hero data has changed
function OnHeroDataChanged(table_name, key, data) {
    heroData[key] = data;

    for(var i=1; i<=16; ++i) {
        if(data['Ability' + i] != null) {
            abilityHeroOwner[data['Ability' + i]] = key;
        }
    }

    // Do the schedule
    if(dataHooks.OnHeroDataChanged == null) dataHooks.OnHeroDataChanged = 0;
    var myHookNumber = ++dataHooks.OnHeroDataChanged;
    $.Schedule(1, function() {
        if(dataHooks.OnHeroDataChanged == myHookNumber) {
            buildHeroList();
        }
    });
}

// Flag data has changed
function OnFlagDataChanged(table_name, key, data) {
    flagDataInverse[key] = data;

    // Do the schedule
    if(dataHooks.OnFlagDataChanged == null) dataHooks.OnFlagDataChanged = 0;
    var myHookNumber = ++dataHooks.OnFlagDataChanged;
    $.Schedule(1, function() {
        if(dataHooks.OnFlagDataChanged == myHookNumber) {
            buildFlagList();
        }
    });
}

// Selected heroes has changed
var allSelectedHeroes = {};
function OnSelectedHeroesChanged(table_name, key, data) {
    // Grab data
    var playerID = data.playerID;
    var heroName = data.heroName;

    // Store the change
    selectedHeroes[playerID] = heroName;

    // Was it an update on our local player?
    if(playerID == Players.GetLocalPlayer()) {
        // Update our hero icon and text
        $('#pickingPhaseSelectedHeroImage').heroname = heroName;
        $('#pickingPhaseSelectedHeroText').text = $.Localize(heroName);

        // Set it so no hero is selected
        $('#pickingPhaseSelectedHeroImageCon').SetHasClass('no_hero_selected', false);
    }

    // Shows which heroes have been taken
    showTakenHeroes();
    updateHeroPreviewFilters();
    updateRecommendedBuildFilters();

    if(activePlayerPanels[playerID]) {
        activePlayerPanels[playerID].OnGetHeroData(heroName);
    }

    if(activeReviewPanels[playerID]) {
        activeReviewPanels[playerID].OnGetHeroData(heroName);
    }
}

// Shows which heroes have been taken
function showTakenHeroes() {
    // Calculate which heroes are taken
    allSelectedHeroes = {};
    for(var playerID in selectedHeroes) {
        allSelectedHeroes[selectedHeroes[playerID]] = true;
    }

    // Mark them as taken
    for(var heroName in heroPanelMap) {
        var panel = heroPanelMap[heroName];
        panel.SetHasClass('takenHero', allSelectedHeroes[heroName] != null);
    }
}

// Selected primary attribute changes
function OnSelectedAttrChanged(table_name, key, data) {
    // Grab data
    var playerID = data.playerID;
    var newAttr = data.newAttr;

    // Store the change
    selectedAttr[playerID] = newAttr;

    // Was it an update on our local player?
    if(playerID == Players.GetLocalPlayer()) {
        // Update which attribute is selected
        $('#pickingPhaseSelectHeroStr').SetHasClass('selectedAttribute', newAttr == 'str');
        $('#pickingPhaseSelectHeroAgi').SetHasClass('selectedAttribute', newAttr == 'agi');
        $('#pickingPhaseSelectHeroInt').SetHasClass('selectedAttribute', newAttr == 'int');
    }

    // Push the attribute
    if(activePlayerPanels[playerID]) {
        activePlayerPanels[playerID].OnGetNewAttribute(newAttr);
    }

    if(activeReviewPanels[playerID]) {
        activeReviewPanels[playerID].OnGetNewAttribute(newAttr);
    }
}

// Selected abilities has changed
function OnSelectedSkillsChanged(table_name, key, data) {
    var playerID = data.playerID;

    // Store the change
    selectedSkills[playerID] = data.skills;

    // Grab max slots
    var maxSlots = optionValueList['lodOptionCommonMaxSlots'] || 6;
    var defaultSkill = 'life_stealer_empty_1';

    if(playerID == Players.GetLocalPlayer()) {
        for(var i=1; i<=maxSlots; ++i) {
            // Default to no skills
            if(!selectedSkills[playerID][i]) {
                var ab = $('#lodYourAbility' + i);
                ab.abilityname = defaultSkill;
                ab.SetAttributeString('abilityname', defaultSkill);
            }
        }

        for(var key in selectedSkills[playerID]) {
            var ab = $('#lodYourAbility' + key);
            var abName = selectedSkills[playerID][key];

            if(ab != null) {
                ab.abilityname = abName;
                ab.SetAttributeString('abilityname', abName);
            }
        }
    }

    // Push the build
    if(activePlayerPanels[playerID]) {
        activePlayerPanels[playerID].OnGetHeroBuildData(data.skills);
    }

    if(activeReviewPanels[playerID]) {
        activeReviewPanels[playerID].OnGetHeroBuildData(data.skills);
    }

    // Update which skills are taken
    updateTakenSkills();
}

// Updates which skills have been taken
function updateTakenSkills() {
    var myTeam = (Game.GetPlayerInfo(Players.GetLocalPlayer()) || {}).player_team_id || -1;

    // Reset taken skills
    takenTeamAbilities = {};
    takenAbilities = {};

    // Loop over each build
    for(var playerID in selectedSkills) {
        var build = selectedSkills[playerID];

        var theTeam = (Game.GetPlayerInfo(parseInt(playerID)) || {}).player_team_id || -1;

        for(var slotID in build) {
            var abilityName = build[slotID];

            // This ability is taken
            takenAbilities[abilityName] = true;

            if(myTeam == theTeam) {
                takenTeamAbilities[abilityName] = true;
            }
        }
    }

    // Rebuild the visible skills
    calculateFilters();
    updateHeroPreviewFilters();
    updateRecommendedBuildFilters();
}

// A ban was sent through
function OnSkillBanned(table_name, key, data) {
    var heroName = data.heroName;
    var abilityName = data.abilityName;
    var playerInfo = data.playerInfo;

    if(heroName != null) {
        // Store the ban
        bannedHeroes[heroName] = true;

        // Recalculate filters
        calculateHeroFilters();
        updateHeroPreviewFilters();
        updateRecommendedBuildFilters();
    }

    if(abilityName != null) {
        // Store the ban
        bannedAbilities[abilityName] = true;

        // Recalculate filters
        calculateFilters();
        updateHeroPreviewFilters();
        updateRecommendedBuildFilters();
    }

    if(data.playerID != null) {
        // Someone's ban info
        if(data.playerID == Players.GetLocalPlayer()) {
            // Our banning info

            // Store new values
            currentHeroBans = data.currentHeroBans;
            currentAbilityBans = data.currentAbilityBans;

            // Recalculate
            recalculateBanLimits();
        }
    }
}

// Server just sent the ready state
function OnGetReadyState(table_name, key, data) {
    // Store it
    readyState = data;

    // Process it
    for(var playerID in data) {
        var panel = activePlayerPanels[playerID];
        if(panel) {
            panel.setReadyState(data[playerID])
        }

        var panel = activeReviewPanels[playerID];
        if(panel) {
            panel.setReadyState(data[playerID])
        }

        // Is it our local player?
        if(playerID == Players.GetLocalPlayer()) {
            $('#heroBuilderLockButton').SetHasClass('makeThePlayerNoticeThisButton', data[playerID] == 0);
            $('#heroBuilderLockButtonBans').SetHasClass('makeThePlayerNoticeThisButton', data[playerID] == 0);
            $('#heroBuilderLockButtonBans').SetHasClass('hideThisButton', data[playerID] == 1);

            $('#allRandomLockButton').visible = data[playerID] == 0;
            $('#reviewReadyButton').visible = data[playerID] == 0;

            // Set the text
            if(data[playerID] == 0) {
                $('#heroBuilderLockButtonText').text = $.Localize('lockBuild');
            } else {
                $('#heroBuilderLockButtonText').text = $.Localize('unlockBuild');
            }
        }
    }
}

// Server just sent us random build data
var allRandomBuildContainers = {};
var allRandomSelectedBuilds = {
    hero: 0,
    build: 0
};
function OnGetRandomBuilds(table_name, key, data) {
    if(data.selected != null) {
        OnSelectedRandomBuildChanged(table_name, key, data);
        return;
    }

    // See who's data we just got
    var playerID = data.playerID;
    if(playerID == Players.GetLocalPlayer()) {
        // It's our data!
        var builds = data.builds;

        var con = $('#allRandomBuildsContainer');

        // Clear out any current builds
        con.RemoveAndDeleteChildren();

        for(var buildID in builds) {
            var theBuild = builds[buildID];

            // Create the container
            var buildCon = $.CreatePanel('Panel', con, 'allRandomBuild' + buildID);
            buildCon.BLoadLayout('file://{resources}/layout/custom_game/all_random_build.xml', false, false);
            buildCon.setBuild(buildID, theBuild.heroName, theBuild.build);
            buildCon.hook(hookSkillInfo);

            allRandomBuildContainers[buildID] = buildCon;
        }

        updateAllRandomHighlights();
    }
}

// The build we selected changed
function OnSelectedRandomBuildChanged(table_name, key, data) {
    // See who's data we just got
    var playerID = data.playerID;

    if(playerID == Players.GetLocalPlayer()) {
        allRandomSelectedBuilds.hero = data.hero;
        allRandomSelectedBuilds.build = data.build;
        updateAllRandomHighlights();
    }
}

// Server just sent us a draft array
function OnGetDraftArray(table_name, key, data) {
    var draftID = data.draftID;

    var myDraftID = 0;

    var playerID = Players.GetLocalPlayer();
    var myInfo = Game.GetPlayerInfo(playerID);
    var myTeamID = myInfo.player_team_id;
    var myTeamPlayers = Game.GetPlayerIDsOnTeam(myTeamID);

    var maxPlayers = 10;
    for(var i=0; i<maxPlayers; ++i) {
        if(i == playerID) break;

        var info = Game.GetPlayerInfo(i);

        if(info != null && myTeamID == info.player_team_id) {
            ++myDraftID;
        }
    }

    // Ensure we don't get a weird value for draftID
    myDraftID = myDraftID % 5;

    // Is this data for us?
    if(myDraftID != draftID) return;

    var draftArray = data.draftArray;
    heroDraft = draftArray.heroDraft;
    abilityDraft = draftArray.abilityDraft;

    // Run the calculations
    calculateFilters();
    calculateHeroFilters();
    updateHeroPreviewFilters();
    updateRecommendedBuildFilters();

    // Show the button to show non-draft abilities
    $('#toggleShowDraftAblilities').visible = true;
}

// Update the highlights
function updateAllRandomHighlights() {
    for(var buildID in allRandomBuildContainers) {
        var con = allRandomBuildContainers[buildID];
        con.setSelected(buildID == allRandomSelectedBuilds.hero, buildID == allRandomSelectedBuilds.build);
    }
}

// When the lock build button is pressed
function onLockBuildButtonPressed() {
    // Tell the server we clicked it
    GameEvents.SendCustomGameEventToServer('lodReady', {});
}

// Sets up the hero builder tab
function setupBuilderTabs() {
    var mainPanel = $('#pickingPhaseTabs');
    $.Each(mainPanel.Children(), function(panelTab) {
        if(panelTab.BHasClass('pickingPhaseTab')) {
            $.Each(panelTab.Children(), function(tabElement) {
                var tabLink = tabElement.GetAttributeString('link', '-1');

                if(tabLink != '-1') {
                    tabElement.SetPanelEvent('onactivate', function() {
                        showBuilderTab(tabLink);

                        // No skills selected anymore
                        setSelectedDropAbility();

                        // Focus to nothing
                        focusNothing();
                    });
                }
            });
        }
    });

    var mainContentPanel = $('#pickingPhaseTabsContent');
    $.Each(mainContentPanel.Children(), function(panelTab) {
        if(panelTab.BHasClass('pickingPhaseTabContent')) {
            panelTab.visible = false;
        }
    });

    // Show the main tab only
    showBuilderTab('pickingPhaseMainTab');

    // Default to no selected preview hero
    setSelectedHelperHero();

    for(var i=1;i<=6; ++i) {
        (function(con, slotID) {
            // Hook abilitys that should show info
            hookSkillInfo(con);

            con.SetDraggable(true);

            // Allow for dropping
            $.RegisterEventHandler('DragEnter', con, function(panelID, draggedPanel) {
                // Are we dragging an ability?
                if(draggedPanel.GetAttributeString('abilityname', '') != '') {
                    con.AddClass('potential_drop_target');
                    draggedPanel.SetAttributeInt('activeSlot', slotID);
                }
            });

            $.RegisterEventHandler('DragLeave', con, function(panelID, draggedPanel) {
                $.Schedule(0.1, function() {
                    con.RemoveClass('potential_drop_target');

                    if(draggedPanel.deleted == null && draggedPanel.GetAttributeInt('activeSlot', -1) == slotID) {
                        draggedPanel.SetAttributeInt('activeSlot', -1);
                    }
                });
            });

            // TODO: Allow for slot swapping
            $.RegisterEventHandler('DragStart', con, function(panelID, dragCallbacks) {
                var abName = con.GetAttributeString('abilityname', '');

                if(abName == null || abName.length <= 0) return false;

                //setSelectedDropAbility(abName, con);

                // Create a temp image to drag around
                var displayPanel = $.CreatePanel('DOTAAbilityImage', $.GetContextPanel(), 'dragImage');
                displayPanel.abilityname = abName;
                dragCallbacks.displayPanel = displayPanel;
                dragCallbacks.offsetX = 0;
                dragCallbacks.offsetY = 0;
                displayPanel.SetAttributeString('abilityname', abName);

                // Select this slot
                currentSelectedSlot = slotID;

                // Do the highlight
                highlightDropSlots();

                // Hide skill info
                $.DispatchEvent('DOTAHideAbilityTooltip');
            });

            $.RegisterEventHandler('DragEnd', con, function(panelId, draggedPanel) {
                // Delete the draggable panel
                draggedPanel.deleted = true;
                draggedPanel.DeleteAsync(0.0);

                var dropSlot = draggedPanel.GetAttributeInt('activeSlot', -1);
                if(dropSlot != -1 && dropSlot != slotID) {
                    swapSlots(dropSlot, slotID);
                }

                // Highlight nothing
                setSelectedDropAbility();
            });
        })($('#lodYourAbility' + i), i);
    }

    for(var i=1;i<=16; ++i) {
        hookSkillInfo($('#buildingHelperHeroPreviewSkill' + i));
        makeSkillSelectable($('#buildingHelperHeroPreviewSkill' + i));
    }

    // Hook drag and drop stuff for heroes
    var heroDragEnter = function(panelID, draggedPanel) {
        // Are we dragging an ability?
        if(draggedPanel.GetAttributeString('heroName', '') != '') {
            heroDropCon.AddClass('potential_drop_target');
            heroDropConBlank.AddClass('potential_drop_target');
            draggedPanel.SetAttributeInt('canSelectHero', 1);
        }
    };

    var heroDragLeave = function(panelID, draggedPanel) {
        $.Schedule(0.1, function() {
            heroDropCon.RemoveClass('potential_drop_target');
            heroDropConBlank.RemoveClass('potential_drop_target');

            if(draggedPanel.deleted == null) {
                draggedPanel.SetAttributeInt('canSelectHero', 0);
            }
        });
    };

    var heroDropCon = $('#pickingPhaseSelectedHeroImage');
    $.RegisterEventHandler('DragEnter', heroDropCon, heroDragEnter);
    $.RegisterEventHandler('DragLeave', heroDropCon, heroDragLeave);

    var heroDropConBlank = $('#pickingPhaseSelectedHeroImageNone');
    $.RegisterEventHandler('DragEnter', heroDropConBlank, heroDragEnter);
    $.RegisterEventHandler('DragLeave', heroDropConBlank, heroDragLeave);

    $('#pickingPhaseSelectedHeroText').hittest = false;

    // Hook banning
    //var theSet = '';
    var hookSet = function(setName) {
        var enterNumber = 0;
        var banningArea = $('#pickingPhaseBans');

        var banningDragEnter = function(panelID, draggedPanel) {
            banningArea.AddClass('potential_drop_target');
            draggedPanel.SetAttributeInt('banThis', 1);

            // Prevent annoyingness
            ++enterNumber;
        };

        var banningDragLeave = function(panelID, draggedPanel) {
            var myNumber = ++enterNumber;

            $.Schedule(0.1, function() {
                if(myNumber == enterNumber) {
                    banningArea.RemoveClass('potential_drop_target');

                    if(draggedPanel.deleted == null) {
                        draggedPanel.SetAttributeInt('banThis', 0);
                    }
                }
            });
        };

        $.RegisterEventHandler('DragEnter', $(setName), banningDragEnter);
        $.RegisterEventHandler('DragLeave', $(setName), banningDragLeave);
    };

    hookSet('#pickingPhaseBans');
}

// Builds the hero list
function buildHeroList() {
    var strHeroes = [];
    var agiHeroes = [];
    var intHeroes = [];

    for(var heroName in heroData) {
        var info = heroData[heroName];

        switch(info.AttributePrimary) {
            case 'DOTA_ATTRIBUTE_STRENGTH':
                strHeroes.push(heroName);
            break;

            case 'DOTA_ATTRIBUTE_AGILITY':
                agiHeroes.push(heroName);
            break;

            case 'DOTA_ATTRIBUTE_INTELLECT':
                intHeroes.push(heroName);
            break;
        }
    }

    function doInsertHeroes(container, heroList) {
        // Cleanup container
        container.RemoveAndDeleteChildren();

        // Sort the hero list
        heroList.sort();

        // Insert it
        for(var i=0; i<heroList.length; ++i) {
            (function() {
                var heroName = heroList[i];

                // Create the panel
                var newPanel = $.CreatePanel('DOTAHeroImage', container, 'heroSelector_' + heroName);
                newPanel.SetAttributeString('heroName', heroName);
                newPanel.heroname = heroName;
                newPanel.heroimagestyle = 'portrait';

                /*newPanel.SetPanelEvent('onactivate', function() {
                    // Set the selected helper hero
                    setSelectedHelperHero(heroName);
                });*/

                // Make the hero selectable
                makeHeroSelectable(newPanel);

                // Store it
                heroPanelMap[heroName] = newPanel;
            })();
        }
    }

    // Reset the hero map
    heroPanelMap = {};

    // Insert heroes
    doInsertHeroes($('#strHeroContainer'), strHeroes);
    doInsertHeroes($('#agiHeroContainer'), agiHeroes);
    doInsertHeroes($('#intHeroContainer'), intHeroes);

    // Update which heroes are taken
    showTakenHeroes();
    updateHeroPreviewFilters();
    updateRecommendedBuildFilters();
}

// Build the flags list
function buildFlagList() {
    flagData = {};

    for(var abilityName in flagDataInverse) {
        var flags = flagDataInverse[abilityName];

        for(var flag in flags) {
            if(flagData[flag] == null) flagData[flag] = {};

            flagData[flag][abilityName] = flags[flag];
        }
    }
}

function setSelectedHelperHero(heroName, dontUnselect) {
    var previewCon = $('#buildingHelperHeroPreview');

    // Validate hero name
    if(heroName == null || heroName.length <= 0 || !heroData[heroName]) {
        previewCon.visible = false;
        return;
    }

    // Show the preview
    previewCon.visible = true;

    // Grab the info
    var info = heroData[heroName];

    // Update the hero
    $('#buildingHelperHeroPreviewHero').heroname = heroName;
    $('#buildingHelperHeroPreviewHeroName').text = $.Localize(heroName);

    // Set this as the selected one
    currentSelectedHero = heroName;

    for(var i=1; i<=16; ++i) {
        var abName = info['Ability' + i];
        var abCon = $('#buildingHelperHeroPreviewSkill' + i);

        // Ensure it is a valid ability, and we have flag data about it
        if(abName != null && abName != '' && flagDataInverse[abName]) {
            abCon.visible = true;
            abCon.abilityname = abName;
            abCon.SetAttributeString('abilityname', abName);
        } else {
            abCon.visible = false;
        }
    }

    // Highlight drop slots correctly
    if(!dontUnselect) {
        // No abilities selected anymore
        setSelectedDropAbility();
    }

    // Update the filters for this hero
    updateHeroPreviewFilters();

    // Jump to the right tab
    //showBuilderTab('pickingPhaseHeroTab');
}

// They try to set a new hero
function onNewHeroSelected() {
    // Push data to the server
    chooseHero(currentSelectedHero);

    // Unselect selected skill
    setSelectedDropAbility();
}

// They try to ban a hero
function onHeroBanButtonPressed() {
    banHero(currentSelectedHero);
}

// They tried to set a new primary attribute
function setPrimaryAttr(newAttr) {
    choosePrimaryAttr(newAttr);
}

// Highlights slots for dropping
function highlightDropSlots() {
    // If no slot selected, default slots
    if(currentSelectedSlot == -1) {
        for(var i=1; i<=6; ++i) {
            var ab = $('#lodYourAbility' + i);

            ab.SetHasClass('lodSelected', false);
            ab.SetHasClass('lodSelectedDrop', false);
        }
    } else {
        for(var i=1; i<=6; ++i) {
            var ab = $('#lodYourAbility' + i);

            if(currentSelectedSlot == i) {
                ab.SetHasClass('lodSelected', true);
                ab.SetHasClass('lodSelectedDrop', false);
            } else {
                ab.SetHasClass('lodSelected', false);
                ab.SetHasClass('lodSelectedDrop', true);
            }
        }
    }

    // If no skill is selected, highlight nothing
    if(currentSelectedSkill == '') return;

    // Count the number of ultimate abiltiies
    var theCount = 0;
    var theMax = optionValueList['lodOptionCommonMaxUlts'];
    var isUlt = isUltimateAbility(currentSelectedSkill);
    var playerID = Players.GetLocalPlayer();
    if(!isUlt) {
        theMax = optionValueList['lodOptionCommonMaxSkills'];
    }
    var alreadyHas = false;

    // Check our build
    var ourBuild = selectedSkills[playerID] || {};

    for(var slotID in ourBuild) {
        var abilityName = selectedSkills[playerID][slotID];

        if(isUltimateAbility(abilityName) == isUlt) {
            ++theCount;
        }

        if(currentSelectedSkill == abilityName) {
            alreadyHas = true;
        }
    }

    var easyAdd = theCount < theMax;

    // Decide which slots can be dropped into
    for(var i=1; i<=6; ++i) {
        var ab = $('#lodYourAbility' + i);

        // Do we already have this ability?
        if(alreadyHas) {
            ab.SetHasClass('lodSelectedDrop', currentSelectedSkill == ourBuild[i]);
        } else {
            ab.SetHasClass('lodSelectedDrop', (easyAdd || (ourBuild[i] != null && isUlt == isUltimateAbility(ourBuild[i]))));
        }
    }
}

// Decides if the given ability is an ult or not
function isUltimateAbility(abilityName) {
    return (flagDataInverse[abilityName] || {}).isUlt != null;
}

// Sets the currently selected ability for dropping
function setSelectedDropAbility(abName, abcon) {
    abName = abName || '';

    // Was there a slot selected?
    if(currentSelectedSlot != -1) {
        var theSlot = currentSelectedSlot;
        currentSelectedSlot = -1;

        if(abName.length > 0) {
            chooseNewAbility(theSlot, abName);
        }
        highlightDropSlots();
        return;
    }


    // Remove the highlight from the old ability icon
    if(currentSelectedAbCon != null) {
        currentSelectedAbCon.SetHasClass('lodSelected', false);
        currentSelectedAbCon = null;
    }

    if(currentSelectedSkill == abName || abName == '') {
        // Nothing selected
        currentSelectedSkill = '';

        // Update the banning skill icon
        $('#banningButtonContainer').SetHasClass('disableButton', true);
    } else {
        // Do a selection
        currentSelectedSkill = abName;
        currentSelectedAbCon = abcon;

        // Highlight ability
        if(abcon != null) {
            abcon.SetHasClass('lodSelected', true);
        }

        // Update the banning skill icon
        $('#lodBanThisSkill').abilityname = abName;
        $('#banningButtonContainer').SetHasClass('disableButton', false);
    }

    // Highlight which slots we can drop it into
    highlightDropSlots();
}

// They clicked on a skill
/*function onHeroAbilityClicked(heroAbilityID) {
    // Focus nothing
    focusNothing();

    var abcon = $('#buildingHelperHeroPreviewSkill' + heroAbilityID);
    var ab = abcon.abilityname;

    // Push the event
    setSelectedDropAbility(ab, abcon);
}*/

// They click on the banning button
function onBanButtonPressed() {
    // Focus nothing
    focusNothing();

    // Check what action should be performed
    if(currentSelectedSkill != '') {
        // They are trying to select a new skill
        banAbility(currentSelectedSkill);

        // Done
        return;
    }
}

// They clicked on one of their ability icons
function onYourAbilityIconPressed(slot) {
    // Focus nothing
    focusNothing();

    // Check what action should be performed
    if(currentSelectedSkill != '') {
        // They are trying to select a new skill
        chooseNewAbility(slot, currentSelectedSkill);

        // Done
        return;
    }

    // allow swapping of skills
    if(currentSelectedSlot == -1) {
        // Select this slot
        currentSelectedSlot = slot;

        // Do the highlight
        highlightDropSlots();
    } else {
        // Attempt to drop the slot

        // Is it a different slot?
        if(currentSelectedSlot == slot) {
            // Same slot, just deselect
            currentSelectedSlot = -1;

            // Do the highlight
            highlightDropSlots();
            return;
        }

        // Different slot, do the swap
        swapSlots(currentSelectedSlot, slot);

        // Same slot, just deselect
        currentSelectedSlot = -1;

        // Do the highlight
        highlightDropSlots();
    }
}

function showBuilderTab(tabName) {
    // Hide all panels
    var mainPanel = $('#pickingPhaseTabs');
    $.Each(mainPanel.Children(), function(panelTab) {
        panelTab.visible = false;
    });

    var mainContentPanel = $('#pickingPhaseTabsContent');
    $.Each(mainContentPanel.Children(), function(panelTab) {
        panelTab.visible = false;
    });

    // Show our tab
    var ourTab = $('#' + tabName);
    if(ourTab != null) ourTab.visible = true;

    // Try to move the hero preview
    var heroPreview = $('#buildingHelperHeroPreview');
    var heroPreviewCon = $('#' + tabName + 'HeroPreview');
    if(heroPreviewCon != null) {
        heroPreview.SetParent(heroPreviewCon);
    }

    var ourTabContent = $('#' + tabName + 'Content');
    if(ourTabContent != null) ourTabContent.visible = true;

    // Process hooks
    if(onLoadTabHook[tabName]) {
        onLoadTabHook[tabName](tabName);
    }
}

function toggleShowBanned() {
    showBannedSkills = !showBannedSkills;

    // Update filters
    calculateFilters();
}

function toggleShowDisallowed() {
    showDisallowedSkills = !showDisallowedSkills;

    // Update filters
    calculateFilters();
}

function toggleShowTaken() {
    showTakenSkills = !showTakenSkills;

    // Update filters
    calculateFilters();
}

function toggleShowDraftSkills() {
    showNonDraftSkills = !showNonDraftSkills;

    // Update filters
    calculateFilters();
}

// Makes the given hero container selectable
function makeHeroSelectable(heroCon) {
    heroCon.SetPanelEvent('onactivate', function() {
        var heroName = heroCon.GetAttributeString('heroName', '');
        if(heroName == null || heroName.length <= 0) return;

        setSelectedHelperHero(heroName);
    });

    // Dragging
    heroCon.SetDraggable(true);

    $.RegisterEventHandler('DragStart', heroCon, function(panelID, dragCallbacks) {
        var heroName = heroCon.GetAttributeString('heroName', '');
        if(heroName == null || heroName.length <= 0) return;

        // Create a temp image to drag around
        var displayPanel = $.CreatePanel('DOTAHeroImage', $.GetContextPanel(), 'dragImage');
        displayPanel.heroname = heroName;
        dragCallbacks.displayPanel = displayPanel;
        dragCallbacks.offsetX = 0;
        dragCallbacks.offsetY = 0;
        displayPanel.SetAttributeString('heroName', heroName);

        // Hide skill info
        $.DispatchEvent('DOTAHideAbilityTooltip');

        // Highlight drop cell
        $('#pickingPhaseSelectedHeroImage').SetHasClass('lodSelectedDrop', true)
        $('#pickingPhaseSelectedHeroImageNone').SetHasClass('lodSelectedDrop', true)

        // Banning
        $('#pickingPhaseBans').SetHasClass('lodSelectedDrop', true)
    });

    $.RegisterEventHandler('DragEnd', heroCon, function(panelId, draggedPanel) {
        // Delete the draggable panel
        draggedPanel.deleted = true;
        draggedPanel.DeleteAsync(0.0);

        // Highlight drop cell
        $('#pickingPhaseSelectedHeroImage').SetHasClass('lodSelectedDrop', false);
        $('#pickingPhaseSelectedHeroImageNone').SetHasClass('lodSelectedDrop', false);

        // Banning
        $('#pickingPhaseBans').SetHasClass('lodSelectedDrop', false)

        var heroName = draggedPanel.GetAttributeString('heroName', '');
        if(heroName == null || heroName.length <= 0) return;

        // Can we select this as our hero?
        if(draggedPanel.GetAttributeInt('canSelectHero', 0) == 1) {
            chooseHero(heroName);
        }

        // Are we banning a hero?
        if(draggedPanel.GetAttributeInt('banThis', 0) == 1) {
            banHero(heroName);
        }
    });
}

function makeSkillSelectable(abcon) {
    abcon.SetPanelEvent('onactivate', function() {
        var abName = abcon.GetAttributeString('abilityname', '');
        if(abName == null || abName.length <= 0) return false;

        // Mark it as dropable
        setSelectedDropAbility(abName, abcon);

        // Find the owning hero
        var heroOwner = abilityHeroOwner[abName];
        if(heroOwner != null) {
            setSelectedHelperHero(heroOwner, true);
        }
    });

    // Dragging
    abcon.SetDraggable(true);

    $.RegisterEventHandler('DragStart', abcon, function(panelID, dragCallbacks) {
        var abName = abcon.GetAttributeString('abilityname', '');
        if(abName == null || abName.length <= 0) return false;

        setSelectedDropAbility(abName, abcon);

        // Create a temp image to drag around
        var displayPanel = $.CreatePanel('DOTAAbilityImage', $.GetContextPanel(), 'dragImage');
        displayPanel.abilityname = abName;
        dragCallbacks.displayPanel = displayPanel;
        dragCallbacks.offsetX = 0;
        dragCallbacks.offsetY = 0;
        displayPanel.SetAttributeString('abilityname', abName);

        // Hide skill info
        $.DispatchEvent('DOTAHideAbilityTooltip');

        // Banning
        $('#pickingPhaseBans').SetHasClass('lodSelectedDrop', true)
    });

    $.RegisterEventHandler('DragEnd', abcon, function(panelId, draggedPanel) {
        // Delete the draggable panel
        draggedPanel.deleted = true;
        draggedPanel.DeleteAsync(0.0);

        var dropSlot = draggedPanel.GetAttributeInt('activeSlot', -1);
        if(dropSlot != -1) {
            var abName = draggedPanel.GetAttributeString('abilityname', '');
            if(abName != null && abName.length > 0) {
                chooseNewAbility(dropSlot, abName);
            }
        }

        // Highlight nothing
        setSelectedDropAbility();

        // Are we banning a hero?
        if(draggedPanel.GetAttributeInt('banThis', 0) == 1) {
            var abName = draggedPanel.GetAttributeString('abilityname', '');
            if(abName != null && abName.length > 0) {
                banAbility(abName);
            }
        }

        // Banning
        $('#pickingPhaseBans').SetHasClass('lodSelectedDrop', false)
    });
}

function getHeroFilterInfo(heroName) {
    var shouldShow = true;

    // Are we using a draft array?
    if(shouldShow && heroDraft != null) {
        // Is this hero in our draft array?
        if(heroDraft[heroName] == null) {
            shouldShow = false;
        }
    }

    // Filter banned heroes
    if(shouldShow && bannedHeroes[heroName]) {
        shouldShow = false;
    }

    return {
        shouldShow: shouldShow,
        takenHero: allSelectedHeroes[heroName] != null
    };
}

// When the hero tab is shown
var firstHeroTabCall = true;
var heroFilterInfo = {};
function OnHeroTabShown(tabName) {
    // Only run this code once
    if(firstHeroTabCall) {
        var heroSearchText = '';

        calculateHeroFilters = function() {
            var searchParts = heroSearchText.split(/\s/g);

            for(var heroName in heroPanelMap) {
                var shouldShow = getHeroFilterInfo(heroName).shouldShow;

                // Filter by melee / ranged
                if(shouldShow && heroFilterInfo.classType) {
                    var info = heroData[heroName];
                    if(info) {
                        if(info.AttackCapabilities == 'DOTA_UNIT_CAP_MELEE_ATTACK' && heroFilterInfo.classType == 'ranged' || info.AttackCapabilities == 'DOTA_UNIT_CAP_RANGED_ATTACK' && heroFilterInfo.classType == 'melee') {
                            shouldShow = false;
                        }
                    }
                }

                // Filter by hero name
                if(shouldShow && heroSearchText.length > 0) {
                    // Check each part
                    for(var i=0; i<searchParts.length; ++i) {
                        if(heroName.indexOf(searchParts[i]) == -1 && $.Localize(heroName).toLowerCase().indexOf(searchParts[i]) == -1) {
                            shouldShow = false;
                            break;
                        }
                    }
                }

                var con = heroPanelMap[heroName];
                con.SetHasClass('should_hide_this_hero', !shouldShow);
            }
        }

        // Hook searchbox
        addInputChangedEvent($('#lodHeroSearchInput'), function(panel, newValue) {
            // Store the new text
            heroSearchText = newValue.toLowerCase();

            // Update list of abs
            calculateHeroFilters();
        });

        // Calculate hero filters
        calculateHeroFilters();
    }

    // No longer the first call
    firstHeroTabCall = false;
}

function onHeroFilterPressed(filterName) {
    switch(filterName) {
        case 'melee':
            if(heroFilterInfo.classType) {
                if(heroFilterInfo.classType == 'melee') {
                    delete heroFilterInfo.classType;
                } else {
                    heroFilterInfo.classType = 'melee';
                }
            } else {
                heroFilterInfo.classType = 'melee';
            }
        break;

        case 'ranged':
            if(heroFilterInfo.classType) {
                if(heroFilterInfo.classType == 'ranged') {
                    delete heroFilterInfo.classType;
                } else {
                    heroFilterInfo.classType = 'ranged';
                }
            } else {
                heroFilterInfo.classType = 'ranged';
            }
        break;

        case 'clear':
            delete heroFilterInfo.classType;
        break;
    }

    $('#heroPickingFiltersMelee').SetHasClass('lod_hero_filter_selected', heroFilterInfo.classType == 'melee');
    $('#heroPickingFiltersRanged').SetHasClass('lod_hero_filter_selected', heroFilterInfo.classType == 'ranged');
    $('#heroPickingFiltersClear').visible = heroFilterInfo.classType != null;

    // Calculate filters:
    calculateHeroFilters();
}

// When the main selection tab is shown
var firstBuildTabCall = true;
function OnMainSelectionTabShown() {
    if(firstBuildTabCall) {
        // Only do this once
        firstBuildTabCall = false;

        // The  container to work with
        var con = $('#pickingPhaseRecommendedBuildContainer');

        // Cleanup the current builds
        con.RemoveAndDeleteChildren();

        for(var i=0; i<recommendedBuilds.length; ++i) {
            var build = recommendedBuilds[i];

            addRecommendedBuild(
                con,
                build.heroName,
                build.build,
                build.attr,
                build.title
            );
        }
    }
}

// Adds a build to the main selection tab
var recBuildCounter = 0;
var recommenedBuildContainerList = [];
function addRecommendedBuild(con, hero, build, attr, title) {
    var buildCon = $.CreatePanel('Panel', con, 'recBuild_' + (++recBuildCounter));
    buildCon.BLoadLayout('file://{resources}/layout/custom_game/recommended_build.xml', false, false);
    buildCon.setBuildData(makeHeroSelectable, hookSkillInfo, makeSkillSelectable, hero, build, attr, title);
    buildCon.updateFilters(getSkillFilterInfo, getHeroFilterInfo);

    // Store the container
    recommenedBuildContainerList.push(buildCon);
}

// Updates the filters applied to recommended builds
function updateRecommendedBuildFilters() {
    // Loop over all recommended builds
    for(var i=0; i<recommenedBuildContainerList.length; ++i) {
        // Grab the con
        var con = recommenedBuildContainerList[i];

        // Push the filter function to the con
        con.updateFilters(getSkillFilterInfo, getHeroFilterInfo);
    }
}

// Updates the filters applied to the hero preview
function updateHeroPreviewFilters() {
    // Prepare the filter info
    prepareFilterInfo();

    // Remove any search text
    searchParts = [];

    for(var i=1; i<=16; ++i) {
        var abCon = $('#buildingHelperHeroPreviewSkill' + i);

        // Is it visible?
        if(abCon.visible) {
            // Grab ability name
            var abilityName = abCon.GetAttributeString('abilityname', '');

            // Grab filters
            var filterInfo = getSkillFilterInfo(abilityName);

            // Apply filters
            abCon.SetHasClass('disallowedSkill', filterInfo.disallowed);
            abCon.SetHasClass('bannedSkill', filterInfo.banned);
            abCon.SetHasClass('takenSkill', filterInfo.taken);
            abCon.SetHasClass('notDraftable', filterInfo.cantDraft);
        }
    }

    // Should we filter the hero image?
    var heroImageCon = $('#buildingHelperHeroPreviewHero');
    var heroFilterInfo = getHeroFilterInfo('npc_dota_hero_' + heroImageCon.heroname);

    heroImageCon.SetHasClass('should_hide_this_hero', !heroFilterInfo.shouldShow);
    heroImageCon.SetHasClass('takenHero', heroFilterInfo.takenHero);

    var heroImageText = $('#buildingHelperHeroPreviewHeroName');
    heroImageText.SetHasClass('should_hide_this_hero', !heroFilterInfo.shouldShow);
    heroImageText.SetHasClass('takenHero', heroFilterInfo.takenHero);
}

// Gets skill filter info
function getSkillFilterInfo(abilityName) {
    var shouldShow = true;
    var disallowed = false;
    var banned = false;
    var taken = false;
    var cantDraft = false;

    var cat = (flagDataInverse[abilityName] || {}).category;

    // Check if the category is banned
    if(!allowedCategories[cat]) {
        // Skill is disallowed
        disallowed = true;

        // If we should show banned skills
        if(!showDisallowedSkills) {
            shouldShow = false;
        }
    }

    // Check for bans
    if(bannedAbilities[abilityName]) {
        // Skill is banned
        banned = true;

        if(!showBannedSkills) {
            shouldShow = false;
        }
    }

    // Mark taken abilities
    if(takenAbilities[abilityName]) {
        if(uniqueSkillsMode == 1 && takenTeamAbilities[abilityName]) {
            // Team based unique skills
            // Skill is taken
            taken = true;

            if(!showTakenSkills) {
                shouldShow = false;
            }
        } else if(uniqueSkillsMode == 2) {
            // Global unique skills
            // Skill is taken
            taken = true;

            if(!showTakenSkills) {
                shouldShow = false;
            }
        }
    }

    // Check if the tab is active
    if(shouldShow && activeTabs[cat] == null) {
        shouldShow = false;
    }

    // Check if the search category is active
    if(shouldShow && searchCategory.length > 0) {
        if(!flagDataInverse[abilityName][searchCategory]) {
            shouldShow = false;
        }
    }

    // Check if hte search text is active
    if(shouldShow && searchText.length > 0) {
        for(var i=0; i<searchParts.length; ++i) {
            if(abilityName.indexOf(searchParts[i]) == -1 && $.Localize(abilityName).toLowerCase().indexOf(searchParts[i]) == -1) {
                shouldShow = false;
                break;
            }
        }
    }

    // Check draft array
    if(heroDraft != null) {
        if(!heroDraft[abilityHeroOwner[abilityName]]) {
            // Skill cant be drafted
            cantDraft = true;

            if(!showNonDraftSkills) {
                shouldShow = false;
            }
        }
    }

    return {
        shouldShow: shouldShow,
        disallowed: disallowed,
        banned: banned,
        taken: taken,
        cantDraft: cantDraft
    };
}

// Updates some of the filters ready for skill filtering
function prepareFilterInfo() {
    // Check on unique skills mode
    uniqueSkillsMode = optionValueList['lodOptionAdvancedUniqueSkills'] || 0;

    // Grab what to search for
    searchParts = searchText.split(/\s/g);
}

// When the skill tab is shown
var firstSkillTabCall = true;
var searchText = '';
var searchCategory = '';
var activeTabs = {};
var uniqueSkillsMode = 0;
var searchParts = [];
function OnSkillTabShown(tabName) {
    if(firstSkillTabCall) {
        // Empty the skills tab
        var con = $('#pickingPhaseSkillTabContentSkills');
        con.RemoveAndDeleteChildren();

        // Used to provide unique handles
        var unqiueCounter = 0;

        // A store for all abilities
        var abilityStore = {};

        // TODO: Clear filters


        // Filter processor
        searchText = '';
        searchCategory = '';

        activeTabs = {
            main: true,
            neutral: true,
            wraith: true,
            OP: true
        };

        calculateFilters = function() {
            // Array used to sort abilities
            var toSort = [];

            // Prepare skill filters
            prepareFilterInfo();

            // Loop over all abilties
            for(var abilityName in abilityStore) {
                var ab = abilityStore[abilityName];

                if(ab != null) {
                    var filterInfo = getSkillFilterInfo(abilityName);

                    ab.visible = filterInfo.shouldShow;
                    ab.SetHasClass('disallowedSkill', filterInfo.disallowed);
                    ab.SetHasClass('bannedSkill', filterInfo.banned);
                    ab.SetHasClass('takenSkill', filterInfo.taken);
                    ab.SetHasClass('notDraftable', filterInfo.cantDraft);

                    if(filterInfo.shouldShow) {
                        toSort.push(abilityName);
                    }
                }
            }

            // Do the sort
            toSort.sort(function(a, b) {
                var ownerA = abilityHeroOwner[a];
                var ownerB = abilityHeroOwner[b];

                if(ownerA == ownerB) {
                    var isUltA = isUltimateAbility(a);
                    var isUltB = isUltimateAbility(b);

                    if(isUltA & !isUltB) {
                        return 1;
                    }

                    if(!isUltA & isUltB) {
                        return -1;
                    }
                }

                if(a < b) {
                    return -1;
                } else if(a > b) {
                    return 1;
                } else {
                    return 0;
                }
            });

            for(var i=1; i<toSort.length; ++i) {
                var left = abilityStore[toSort[i-1]];
                var right = abilityStore[toSort[i]];

                con.MoveChildAfter(right, left);
            }
        }

        // Hook searchbox
        addInputChangedEvent($('#lodSkillSearchInput'), function(panel, newValue) {
            // Store the new text
            searchText = newValue.toLowerCase();

            // Update list of abs
            calculateFilters();
        });

        // Add input categories
        var dropdownCategories = $('#lodSkillCategoryHolder');
        dropdownCategories.RemoveAllOptions();
        dropdownCategories.SetPanelEvent('oninputsubmit', function() {
            // Update the category
            var sel = dropdownCategories.GetSelected();
            if(sel != null) {
                searchCategory = dropdownCategories.GetSelected().GetAttributeString('category', '');

                // Update the visible abilties
                calculateFilters();
            }
        });

        // Add header
        var categoryHeader = $.CreatePanel('Label', dropdownCategories, 'skillTabCategory' + (++unqiueCounter));
        categoryHeader.text = $.Localize('lod_cat_none');
        dropdownCategories.AddOption(categoryHeader);
        dropdownCategories.SetSelected('skillTabCategory' + unqiueCounter);

        // Add categories
        for(var category in flagData) {
            if(category == 'category') continue;

            var dropdownLabel = $.CreatePanel('Label', dropdownCategories, 'skillTabCategory' + (++unqiueCounter));
            dropdownLabel.text = $.Localize('lod_cat_' + category);
            dropdownLabel.SetAttributeString('category', category);
            dropdownCategories.AddOption(dropdownLabel);
        }


        // Start to add skills

        for(var abName in flagDataInverse) {
            // Create a new scope
            (function(abName) {
                // Create the image
                var abcon = $.CreatePanel('DOTAAbilityImage', con, 'skillTabSkill' + (++unqiueCounter));
                hookSkillInfo(abcon);
                abcon.abilityname = abName;
                abcon.SetAttributeString('abilityname', abName);
                abcon.SetHasClass('lodMiniAbility', true);

                //abcon.SetHasClass('disallowedSkill', true);

                makeSkillSelectable(abcon);

                // Store a reference to it
                abilityStore[abName] = abcon;
            })(abName);
        }

        /*
            Add Skill Tab Buttons
        */

        var tabButtonsContainer = $('#pickingPhaseTabFilterThingo');

        // List of tabs to show
        var tabList = [
            'main',
            'neutral',
            'wraith'
        ];

        // Used to store tabs to highlight them correctly
        var storedTabs = {};

        for(var i=0; i<tabList.length; ++i) {
            // New script scope!
            (function() {
                var tabName = tabList[i];
                var tabButton = $.CreatePanel('Button', tabButtonsContainer, 'tabButton_' + tabName);
                tabButton.AddClass('lodSkillTabButton');

                if(activeTabs[tabName]) {
                    tabButton.AddClass('lodSkillTabActivated');
                }

                // Add the text
                var tabLabel = $.CreatePanel('Label', tabButton, 'tabButton_text_' + tabName);
                tabLabel.text = $.Localize('lodCategory_' + tabName);

                tabButton.SetPanelEvent('onactivate', function() {
                    // When it is activated!

                    if(GameUI.IsControlDown()) {
                        if(activeTabs[tabName]) {
                            delete activeTabs[tabName];
                        } else {
                            activeTabs[tabName] = true;
                        }
                    } else {
                        // Reset active tabs
                        activeTabs = {};
                        activeTabs[tabName] = true;
                    }

                    // Fix highlights
                    for(var theTabName in storedTabs) {
                        var theTab = storedTabs[theTabName];
                        theTab.SetHasClass('lodSkillTabActivated', activeTabs[theTabName] == true);
                    }

                    // Recalculate which skills should be shown
                    calculateFilters();
                });

                // Store it
                storedTabs[tabName] = tabButton;
            })();
        }

        // Do initial calculation:
        calculateFilters();
    }

    // No longewr the first call
    firstSkillTabCall = false;
}

// Are we the host?
function isHost() {
    var playerInfo = Game.GetLocalPlayerInfo();
    if (!playerInfo) return false;
    return playerInfo.player_has_host_privileges;
}

// Sets an option to a value
function setOption(optionName, optionValue) {
    // Ensure we are the host
    if(!isHost()) return;

    // Don't send an update twice!
    if(lastOptionValues[optionName] && lastOptionValues[optionName] == optionValue) return;

    // Tell the server we changed a setting
    GameEvents.SendCustomGameEventToServer('lodOptionSet', {
        k: optionName,
        v: optionValue
    });
}

// Updates our selected hero
function chooseHero(heroName) {
    GameEvents.SendCustomGameEventToServer('lodChooseHero', {
        heroName:heroName
    });
}

// Tries to ban a hero
function banHero(heroName) {
    GameEvents.SendCustomGameEventToServer('lodBan', {
        heroName:heroName
    });
}

// Updates our selected primary attribute
function choosePrimaryAttr(newAttr) {
    GameEvents.SendCustomGameEventToServer('lodChooseAttr', {
        newAttr:newAttr
    });
}

// Attempts to ban an ability
function banAbility(abilityName) {
    var theSkill = abilityName;

    // No skills are selected anymore
    setSelectedDropAbility();

    // Push it to the server to validate
    GameEvents.SendCustomGameEventToServer('lodBan', {
        abilityName: abilityName
    });
}

// Updates our selected abilities
function chooseNewAbility(slot, abilityName) {
    var theSkill = abilityName;

    // No skills are selected anymore
    setSelectedDropAbility();

    // Can't select nothing
    if(theSkill.length <= 0) return;

    // Push it to the server to validate
    GameEvents.SendCustomGameEventToServer('lodChooseAbility', {
        slot: slot,
        abilityName: abilityName
    });
}

// Swaps two slots
function swapSlots(slot1, slot2) {
    // Push it to the server to validate
    GameEvents.SendCustomGameEventToServer('lodSwapSlots', {
        slot1: slot1,
        slot2: slot2
    });
}

// Adds a player to the list of unassigned players
function addUnassignedPlayer(playerID) {
    // Grab the panel to insert into
    var unassignedPlayersContainerNode = $('#unassignedPlayersContainer');
    if (unassignedPlayersContainerNode == null) return;

    // Create the new panel
    var newPlayerPanel = $.CreatePanel('Panel', unassignedPlayersContainerNode, 'unassignedPlayer');
    newPlayerPanel.SetAttributeInt('playerID', playerID);
    newPlayerPanel.BLoadLayout('file://{resources}/layout/custom_game/unassigned_player.xml', false, false);

    // Add this panel to the list of panels we've generated
    allPlayerPanels.push(newPlayerPanel);
}

// Adds a player to a team
function addPlayerToTeam(playerID, panel, reviewContainer) {
    // Validate the panel
    if(panel == null || reviewContainer == null) return;

    /*
        Create the panel at the top of the screen
    */

    // Create the new panel
    var newPlayerPanel = $.CreatePanel('Panel', panel, 'teamPlayer' + playerID);
    newPlayerPanel.SetAttributeInt('playerID', playerID);
    newPlayerPanel.BLoadLayout('file://{resources}/layout/custom_game/team_player.xml', false, false);
    newPlayerPanel.hookStuff(hookSkillInfo, makeSkillSelectable, makeHeroSelectable);

    // Check max slots
    var maxSlots = optionValueList['lodOptionCommonMaxSlots'];
    if(maxSlots != null) {
        newPlayerPanel.OnGetHeroSlotCount(maxSlots);
    }

    // Check for hero icon
    if(selectedHeroes[playerID] != null) {
        newPlayerPanel.OnGetHeroData(selectedHeroes[playerID]);
    }

    // Check for skill data
    if(selectedSkills[playerID] != null) {
        newPlayerPanel.OnGetHeroBuildData(selectedSkills[playerID]);
    }

    // Check for attr data
    if(selectedAttr[playerID] != null) {
        newPlayerPanel.OnGetNewAttribute(selectedAttr[playerID]);
    }

    // Check for ready state
    if(readyState[playerID] != null) {
        newPlayerPanel.setReadyState(readyState[playerID]);
    }

    // Add this panel to the list of panels we've generated
    allPlayerPanels.push(newPlayerPanel);
    activePlayerPanels[playerID] = newPlayerPanel;

    /*
        Create the panel in the review screen
    */

    // Create the new panel
    var newPlayerPanel = $.CreatePanel('Panel', reviewContainer, 'reviewPlayer' + playerID);
    newPlayerPanel.SetAttributeInt('playerID', playerID);
    newPlayerPanel.BLoadLayout('file://{resources}/layout/custom_game/team_player_review.xml', false, false);
    newPlayerPanel.hookStuff(hookSkillInfo, makeSkillSelectable, setSelectedHelperHero, playerID == Players.GetLocalPlayer());

    // Check max slots
    var maxSlots = optionValueList['lodOptionCommonMaxSlots'];
    if(maxSlots != null) {
        newPlayerPanel.OnGetHeroSlotCount(maxSlots);
    }

    // Check for hero icon
    if(selectedHeroes[playerID] != null) {
        newPlayerPanel.OnGetHeroData(selectedHeroes[playerID]);
    }

    // Check for skill data
    if(selectedSkills[playerID] != null) {
        newPlayerPanel.OnGetHeroBuildData(selectedSkills[playerID]);
    }

    // Check for attr data
    if(selectedAttr[playerID] != null) {
        newPlayerPanel.OnGetNewAttribute(selectedAttr[playerID]);
    }

    // Check for ready state
    if(readyState[playerID] != null) {
        newPlayerPanel.setReadyState(readyState[playerID]);
    }

    // Add this panel to the list of panels we've generated
    allPlayerPanels.push(newPlayerPanel);
    activeReviewPanels[playerID] = newPlayerPanel;
}

// Build the options categories
function buildOptionsCategories() {
    // Grab the main container for option categories
    var catContainer = $('#optionCategories');
    var optionContainer = $('#optionList');

    // Delete any children
    catContainer.RemoveAndDeleteChildren();
    optionContainer.RemoveAndDeleteChildren();

    // Reset option links
    allOptionLinks = {};

    // Loop over all the option labels
    for(var optionLabelText in allOptions) {
        // Create a new scope
        (function(optionLabelText, optionData) {
            // The button
            var optionCategory = $.CreatePanel('Button', catContainer, 'option_button_' + optionLabelText);
            optionCategory.SetAttributeString('cat', optionLabelText);
            //optionCategory.AddClass('PlayButton');
            //optionCategory.AddClass('RadioBox');
            //optionCategory.AddClass('HeroGridNavigationButtonBox');
            //optionCategory.AddClass('NavigationButtonGlow');
            optionCategory.AddClass('OptionButton');

            var innerPanel = $.CreatePanel('Panel', optionCategory, 'option_button_' + optionLabelText + '_fancy');
            innerPanel.AddClass('OptionButtonFancy');

            var innerPanelTwo = $.CreatePanel('Panel', optionCategory, 'option_button_' + optionLabelText + '_glow');
            innerPanelTwo.AddClass('OptionButtonGlow');

            // Check if this requires custom settings
            if(optionData.custom) {
                optionCategory.AddClass('optionButtonCustomRequired');
            }

            // Button text
            var optionLabel = $.CreatePanel('Label', optionCategory, 'option_button_' + optionLabelText + '_label');
            optionLabel.text = $.Localize(optionLabelText + '_lod');
            optionLabel.AddClass('OptionButtonLabel');

            // The panel
            var optionPanel = $.CreatePanel('Panel', optionContainer, 'option_panel_' + optionLabelText);
            optionPanel.AddClass('OptionPanel');

            if(optionData.custom) {
                optionPanel.AddClass('optionButtonCustomRequired');
            }

            // Build the fields
            var fieldData = optionData.fields;

            for(var i=0; i<fieldData.length; ++i) {
                // Create new script scope
                (function() {
                    // Grab info about this field
                    var info = fieldData[i];
                    var fieldName = info.name;
                    var sort = info.sort;
                    var values = info.values;

                    // Create the info
                    var mainSlot = $.CreatePanel('Panel', optionPanel, 'option_panel_main_' + fieldName);
                    mainSlot.AddClass('optionSlotPanel');
                    var infoLabel = $.CreatePanel('Label', mainSlot, 'option_panel_main_' + fieldName);
                    infoLabel.text = $.Localize(info.des);
                    infoLabel.AddClass('optionSlotPanelLabel');

                    mainSlot.SetPanelEvent('onmouseover', function() {
                        $('#optionInfoLabel').text = $.Localize(info.about);
                    });

                    // Is this a preset?
                    if(info.preset) {
                        mainSlot.AddClass('optionSlotPanelNoCustom');
                    }

                    var floatRightContiner = $.CreatePanel('Panel', mainSlot, 'option_panel_field_' + fieldName + '_container');
                    floatRightContiner.AddClass('optionsSlotPanelContainer');

                    // Create stores for the newly created items
                    var hostPanel;
                    var slavePanel = $.CreatePanel('Label', floatRightContiner, 'option_panel_field_' + fieldName + '_slave');
                    slavePanel.AddClass('optionsSlotPanelSlave');
                    slavePanel.AddClass('optionSlotPanelLabel');
                    slavePanel.text = 'Unknown';

                    switch(sort) {
                        case 'dropdown':
                            // Create the drop down
                            hostPanel = $.CreatePanel('DropDown', floatRightContiner, 'option_panel_field_' + fieldName);
                            hostPanel.AddClass('optionsSlotPanelHost');
                            hostPanel.AccessDropDownMenu().RemoveAndDeleteChildren();

                            // Maps values to panels
                            var valueToPanel = {};

                            for(var j=0; j<values.length; ++j) {
                                var valueInfo = values[j];
                                var fieldText = valueInfo.text;
                                var fieldValue = valueInfo.value;

                                var subPanel = $.CreatePanel('Label', hostPanel.AccessDropDownMenu(), 'option_panel_field_' + fieldName + '_' + fieldText);
                                subPanel.text = $.Localize(fieldText);
                                //subPanel.SetAttributeString('fieldText', fieldText);
                                subPanel.SetAttributeInt('fieldValue', fieldValue);
                                hostPanel.AddOption(subPanel);

                                // Store the map
                                valueToPanel[fieldValue] = 'option_panel_field_' + fieldName + '_' + fieldText;

                                if(j == values.length-1) {
                                    hostPanel.SetSelected(valueToPanel[fieldValue]);
                                }
                            }

                            // Mapping function
                            optionFieldMap[fieldName] = function(newValue) {
                                for(var i=0; i<values.length; ++i) {
                                    var valueInfo = values[i];
                                    var fieldText = valueInfo.text;
                                    var fieldValue = valueInfo.value;

                                    if(fieldValue == newValue) {
                                        var thePanel = valueToPanel[fieldValue];
                                        if(thePanel) {
                                            // Select that panel
                                            hostPanel.SetSelected(thePanel);

                                            // Update text
                                            slavePanel.text = $.Localize(fieldText);
                                            break;
                                        }
                                    }
                                }
                            }

                            // When the data changes
                            hostPanel.SetPanelEvent('oninputsubmit', function() {
                                // Grab the selected one
                                var selected = hostPanel.GetSelected();
                                //var fieldText = selected.GetAttributeString('fieldText', -1);
                                var fieldValue = selected.GetAttributeInt('fieldValue', -1);

                                // Sets an option
                                setOption(fieldName, fieldValue);
                            });
                        break;

                        case 'toggle':
                            // Create the toggle box
                            hostPanel = $.CreatePanel('ToggleButton', floatRightContiner, 'option_panel_field_' + fieldName);
                            hostPanel.AddClass('optionsSlotPanelHost');
                            hostPanel.AddClass('optionsHostToggleSelector');

                            // When the checkbox has been toggled
                            var checkboxToggled = function() {
                                // Check if it is checked or not
                                if(hostPanel.checked) {
                                    setOption(fieldName, 1);
                                    hostPanel.text = values[1].text;
                                    slavePanel.text = $.Localize(values[1].text);
                                } else {
                                    setOption(fieldName, 0);
                                    hostPanel.text = values[0].text;
                                    slavePanel.text = $.Localize(values[0].text);
                                }
                            }

                            // When the data changes
                            hostPanel.SetPanelEvent('onactivate', checkboxToggled);

                            // Mapping function
                            optionFieldMap[fieldName] = function(newValue) {
                                hostPanel.checked = newValue == 1;

                                if(hostPanel.checked) {
                                    hostPanel.text = $.Localize(values[1].text);
                                    slavePanel.text = $.Localize(values[1].text);
                                } else {
                                    hostPanel.text = $.Localize(values[0].text);
                                    slavePanel.text = $.Localize(values[0].text);
                                }
                            }

                            // When the main slot is pressed
                            mainSlot.SetPanelEvent('onactivate', function() {
                                if(!hostPanel.visible) return;

                                hostPanel.checked = !hostPanel.checked;
                                checkboxToggled();
                            });
                        break;
                    }
                })();
            }

            // Fix stuff
            $.CreatePanel('Label', optionPanel, 'option_panel_fixer_' + optionLabelText);

            // Store the reference
            allOptionLinks[optionLabelText] = {
                panel: optionPanel,
                button: optionCategory
            }

            // The function to run when it is activated
            function whenActivated() {
                // Disactivate all other ones
                for(var key in allOptionLinks) {
                    var data = allOptionLinks[key];

                    data.panel.SetHasClass('activeMenu', false);
                    data.button.SetHasClass('activeMenu', false);
                }

                // Activate our one
                optionPanel.SetHasClass('activeMenu', true);
                optionCategory.SetHasClass('activeMenu', true);

                // If we are the host, tell the server which menu we are looking at
                if(isHost()) {
                    GameEvents.SendCustomGameEventToServer('lodOptionsMenu', {v: optionLabelText});
                }
            }

            // When the button is clicked
            optionCategory.SetPanelEvent('onactivate', whenActivated);

            // Check if it is default
            if(optionData.default) {
                whenActivated();
            }
        })(optionLabelText, allOptions[optionLabelText]);
    }
}

// Player presses auto assign
function onAutoAssignPressed() {
    // Auto assign teams
    Game.AutoAssignPlayersToTeams();

    // Lock teams
    Game.SetTeamSelectionLocked(true);
}

// Player presses shuffle
function onShufflePressed() {
    // Shuffle teams
    Game.ShufflePlayerTeamAssignments();
}

// Player presses lock teams
function onLockPressed() {
    // Don't allow a forced start if there are unassigned players
    if (Game.GetUnassignedPlayerIDs().length > 0)
        return;

    // Lock the team selection so that no more team changes can be made
    Game.SetTeamSelectionLocked(true);
}

// Player presses unlock teams
function onUnlockPressed() {
    // Unlock Teams
    Game.SetTeamSelectionLocked(false);
}

// Lock options pressed
function onLockOptionsPressed() {
    // Ensure teams are locked
    if(!Game.GetTeamSelectionLocked()) return;

    // Lock options
    GameEvents.SendCustomGameEventToServer('lodOptionsLocked', {});
}

// Player tries to join radiant
function onJoinRadiantPressed() {
    // Attempt to join radiant
    Game.PlayerJoinTeam(DOTATeam_t.DOTA_TEAM_GOODGUYS);
}

// Player tries to join dire
function onJoinDirePressed() {
    // Attempt to join dire
    Game.PlayerJoinTeam(DOTATeam_t.DOTA_TEAM_BADGUYS);
}

// Player tries to join unassigned
function onJoinUnassignedPressed() {
    // Attempt to join unassigned
    Game.PlayerJoinTeam(DOTATeam_t.DOTA_TEAM_NOTEAM);
}

//--------------------------------------------------------------------------------------------------
// Update the unassigned players list and all of the team panels whenever a change is made to the
// player team assignments
//--------------------------------------------------------------------------------------------------
function OnTeamPlayerListChanged() {
    // Kill all of the old panels
    for(var i=0; i<allPlayerPanels.length; ++i) {
        // Grab the panel
        var panel = allPlayerPanels[i];

        // Kill the panel
        panel.DeleteAsync(0);
    }
    allPlayerPanels = [];
    activePlayerPanels = {};

    // Move all existing player panels back to the unassigned player list
    /*for ( var i = 0; i < g_PlayerPanels.length; ++i )
    {
        var playerPanel = g_PlayerPanels[ i ];
        playerPanel.SetParent( unassignedPlayersContainerNode );
    }*/

    // Create a panel for each of the unassigned players
    var unassignedPlayers = Game.GetUnassignedPlayerIDs();
    for(var i=0; i<unassignedPlayers.length; ++i) {
        // Add this player to the unassigned list
        addUnassignedPlayer(unassignedPlayers[i]);
    }

    // Add radiant players
    var radiantPlayers = Game.GetPlayerIDsOnTeam(DOTATeam_t.DOTA_TEAM_GOODGUYS);
    for(var i=0; i<radiantPlayers.length; ++i) {
        // Add this player to the unassigned list
        addPlayerToTeam(radiantPlayers[i], $('#theRadiantContainer'), $('#reviewRadiantTeam'));
    }

    // Add radiant players
    var direPlayers = Game.GetPlayerIDsOnTeam(DOTATeam_t.DOTA_TEAM_BADGUYS);
    for(var i=0; i<direPlayers.length; ++i) {
        // Add this player to the unassigned list
        addPlayerToTeam(direPlayers[i], $('#theDireContainer'), $('#reviewDireTeam'));
    }

    // Update all of the team panels moving the player panels for the
    // players assigned to each team to the corresponding team panel.
    /*for ( var i = 0; i < g_TeamPanels.length; ++i )
    {
        UpdateTeamPanel( g_TeamPanels[ i ] )
    }*/

    // Set the class on the panel to indicate if there are any unassigned players
    $('#mainSelectionRoot').SetHasClass('unassigned_players', unassignedPlayers.length != 0 );
    $('#mainSelectionRoot').SetHasClass('no_unassigned_players', unassignedPlayers.length == 0 );

    // Hide the correct stuff
    calculateHideEnemyPicks();

    // Set host privledges
    var playerInfo = Game.GetLocalPlayerInfo();
    if (!playerInfo) return;

    $('#mainSelectionRoot').SetHasClass('player_has_host_privileges', playerInfo.player_has_host_privileges);
}

//--------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------
function OnPlayerSelectedTeam( nPlayerId, nTeamId, bSuccess ) {
    var playerInfo = Game.GetLocalPlayerInfo();
    if (!playerInfo) return;

    // Check to see if the event is for the local player
    if (playerInfo.player_id === nPlayerId) {
        // Play a sound to indicate success or failure
        if (bSuccess) {
            Game.EmitSound('ui_team_select_pick_team');
        } else {
            Game.EmitSound('ui_team_select_pick_team_failed');
        }
    }
}

// A phase was changed
function OnPhaseChanged(table_name, key, data) {
    switch(key) {
        case 'phase':
            // Update the current phase
            currentPhase = data.v;

            // Update phase classes
            var masterRoot = $('#mainSelectionRoot');
            masterRoot.SetHasClass('phase_loading', currentPhase == PHASE_LOADING);
            masterRoot.SetHasClass('phase_option_selection', currentPhase == PHASE_OPTION_SELECTION);
            masterRoot.SetHasClass('phase_banning', currentPhase == PHASE_BANNING);
            masterRoot.SetHasClass('phase_selection', currentPhase == PHASE_SELECTION);
            masterRoot.SetHasClass('phase_all_random', currentPhase == PHASE_RANDOM_SELECTION);
            masterRoot.SetHasClass('phase_drafting', currentPhase == PHASE_DRAFTING);
            masterRoot.SetHasClass('phase_review', currentPhase == PHASE_REVIEW);
            masterRoot.SetHasClass('phase_ingame', currentPhase == PHASE_INGAME);

            // Progrss to the new phase
            SetSelectedPhase(currentPhase, true);
        break;

        case 'endOfTimer':
            // Store the end time
            endOfTimer = data.v;
        break;

        case 'activeTab':
            var newActiveTab = data.v;

            for(var key in allOptionLinks) {
                // Grab reference
                var info = allOptionLinks[key];
                var optionButton = info.button;

                // Set active one
                optionButton.SetHasClass('activeHostMenu', key == newActiveTab);
            }
        break;

        case 'freezeTimer':
            freezeTimer = data.v;
        break;
    }

    // Ensure we are hiding the correct enemy picks
    calculateHideEnemyPicks();
}

// An option just changed
function OnOptionChanged(table_name, key, data) {
    // Store new value
    optionValueList[key] = data.v;

    // Check if there is a mapping function available
    if(optionFieldMap[key]) {
        // Yep, run it!
        optionFieldMap[key](data.v);
    }

    // Check for the custom stuff
    if(key == 'lodOptionGamemode') {
        // Check if we are allowing custom settings
        allowCustomSettings = data.v == -1;
        $('#mainSelectionRoot').SetHasClass('allow_custom_settings', allowCustomSettings);
        $('#mainSelectionRoot').SetHasClass('disallow_custom_settings', !allowCustomSettings);
    }

    if(key == 'lodOptionCommonGamemode') {
        // Mirror draft options
        var showMirrorDraftOptions = data.v == 3;

        $('#option_panel_main_lodOptionMirrorHeroes').SetHasClass('showThis', showMirrorDraftOptions);
        $('#option_panel_main_lodOptionCommonMirrorHeroes').visible = showMirrorDraftOptions;
    }

    // Check for allowed categories changing
    if(key == 'lodOptionAdvancedHeroAbilities' || key == 'lodOptionAdvancedNeutralAbilities' || key == 'lodOptionAdvancedNeutralWraithNight' || key == 'lodOptionAdvancedOPAbilities') {
        onAllowedCategoriesChanged();
    }

    // Check if it's the number of slots allowed
    if(key == 'lodOptionCommonMaxSkills' || key == 'lodOptionCommonMaxSlots' || key == 'lodOptionCommonMaxUlts') {
        onMaxSlotsChanged();
    }

    // Check for banning phase
    if(key == 'lodOptionBanningMaxBans' || key == 'lodOptionBanningMaxHeroBans') {
        onMaxBansChanged();
    }

    // Check for unique abilities changing
    if(key == 'lodOptionAdvancedUniqueSkills') {
        calculateFilters();
        updateHeroPreviewFilters();
        updateRecommendedBuildFilters();
    }

    if(key == 'lodOptionAdvancedUniqueSkills') {
        $('#mainSelectionRoot').SetHasClass('unique_skills_mode', optionValueList['lodOptionAdvancedUniqueSkills'] > 0);
    }

    if(key == 'lodOptionAdvancedUniqueHeroes') {
        $('#mainSelectionRoot').SetHasClass('unique_heroes_mode', optionValueList['lodOptionAdvancedUniqueHeroes'] == 1);
    }

    if(key == 'lodOptionCommonGamemode') {
        onGamemodeChanged();
    }

    if(key == 'lodOptionAdvancedHidePicks') {
        // Hide enemy picks
        hideEnemyPicks = data.v == 1;
        calculateHideEnemyPicks();
    }

    if(key == 'lodOptionBanningMaxBans' || key == 'lodOptionBanningMaxHeroBans') {
        recalculateBanLimits();
    }
}

// Recalculates how many abilities / heroes we can ban
function recalculateBanLimits() {
    var maxHeroBans = optionValueList['lodOptionBanningMaxHeroBans'] || 0;
    var maxAbilityBans = optionValueList['lodOptionBanningMaxBans'] || 0;

    var heroBansLeft = maxHeroBans - currentHeroBans;
    var abilityBansLeft = maxAbilityBans - currentAbilityBans;

    var txt = '';
    var txtMainLeft = $.Localize('lodYouCanBan');
    var txtHero = '';
    var txtAb = '';

    if(heroBansLeft > 0) {
        if(heroBansLeft > 1) {
            txtHero = $.Localize('lodUptoHeroes');
        } else {
            txtHero = $.Localize('lodUptoOneHero');
        }
    }

    if(abilityBansLeft > 0) {
        if(abilityBansLeft > 1) {
            txtAb = $.Localize('lodUptoAbilities');
        } else {
            txtAb = $.Localize('lodUptoAbility');
        }
    }

    if(heroBansLeft > 0) {
        txt = txtMainLeft + txtHero;

        if(abilityBansLeft > 0) {
            txt += $.Localize('lodBanAnd') + txtAb;
        }
    } else if(abilityBansLeft) {
        txt = txtMainLeft + txtAb;
    } else {
        txt = $.Localize('lodNoMoreBans');
    }

    // Add full stop
    txt += '.';

    txt = txt.replace(/\{heroBansLeft\}/g, heroBansLeft);
    txt = txt.replace(/\{abilityBansLeft\}/g, abilityBansLeft);

    $('#lodBanLimits').text = txt;
}

// Recalculates what teams should be hidden
function calculateHideEnemyPicks() {
    // Hide picks
    var hideRadiantPicks = false;
    var hideDirePicks = false;

    if(hideEnemyPicks) {
        var playerInfo = Game.GetLocalPlayerInfo();
        if(playerInfo) {
            var teamID = playerInfo.player_team_id;

            if(teamID == DOTATeam_t.DOTA_TEAM_GOODGUYS) {
                hideDirePicks = true;
            }

            if(teamID == DOTATeam_t.DOTA_TEAM_BADGUYS) {
                hideRadiantPicks = true;
            }
        }
    }

    $('#theRadiantContainer').SetHasClass('hide_picks', hideRadiantPicks);
    $('#reviewRadiantTeam').SetHasClass('hide_picks', hideRadiantPicks);
    $('#theDireContainer').SetHasClass('hide_picks', hideDirePicks);
    $('#reviewDireTeam').SetHasClass('hide_picks', hideDirePicks);
}

// The gamemode has changed
function onGamemodeChanged() {
    var theGamemode = optionValueList['lodOptionCommonGamemode'];

    var noHeroSelection = false;

    if(theGamemode == 4) {
        // All Random
        noHeroSelection = true;
    }

    var masterRoot = $('#mainSelectionRoot');
    masterRoot.SetHasClass('no_hero_selection', noHeroSelection);

    // All random mode
    masterRoot.SetHasClass('all_random_mode', theGamemode == 4);
}

// Max number of bans has changed
function onMaxBansChanged() {
    var maxBans = optionValueList['lodOptionBanningMaxBans'];
    var maxHeroBans = optionValueList['lodOptionBanningMaxHeroBans'];

    if(maxBans != null && maxHeroBans != null) {
        var masterRoot = $('#mainSelectionRoot');
        masterRoot.SetHasClass('no_banning_phase', maxBans == 0 && maxHeroBans == 0);
    }
}

// The max number of slots / ults / regular abs has changed!
function onMaxSlotsChanged() {
    var maxSlots = optionValueList['lodOptionCommonMaxSlots'];
    var maxSkills = optionValueList['lodOptionCommonMaxSkills'];
    var maxUlts = optionValueList['lodOptionCommonMaxUlts'];

    // Ensure all variables are defined
    if(maxSlots == null || maxSkills == null || maxUlts == null) return;

    for(var i=1; i<=6; ++i) {
        var con = $('#lodYourAbility' + i);

        if(i <= maxSlots) {
            con.visible = true;
        } else {
            con.visible = false;
        }
    }

    // Push it
    for(var playerID in activePlayerPanels) {
        activePlayerPanels[playerID].OnGetHeroSlotCount(maxSlots);
    }

    for(var playerID in activeReviewPanels) {
        activeReviewPanels[playerID].OnGetHeroSlotCount(maxSlots);
    }
}

function onAllowedCategoriesChanged() {
    // Reset the allowed categories
    allowedCategories = {};

    if(optionValueList['lodOptionAdvancedHeroAbilities'] == 1) {
        allowedCategories['main'] = true;
    }

    if(optionValueList['lodOptionAdvancedNeutralAbilities'] == 1) {
        allowedCategories['neutral'] = true;
    }

    if(optionValueList['lodOptionAdvancedNeutralWraithNight'] == 1) {
        allowedCategories['wraith'] = true;
    }

    if(optionValueList['lodOptionAdvancedOPAbilities'] == 1) {
        allowedCategories['OP'] = true;
    }

    // Update the filters
    calculateFilters();
    updateHeroPreviewFilters();
    updateRecommendedBuildFilters();
}

// Changes which phase the player currently has selected
function SetSelectedPhase(newPhase, noSound) {
    if(newPhase > currentPhase) {
        Game.EmitSound('ui_team_select_pick_team_failed');
        return;
    }

    // Emit the click noise
    if(!noSound) Game.EmitSound('ui_team_select_pick_team');

    // Set the phase
    selectedPhase = newPhase;

    // Update CSS
    var masterRoot = $('#mainSelectionRoot');
    masterRoot.SetHasClass('phase_option_selection_selected', selectedPhase == PHASE_OPTION_SELECTION);
    masterRoot.SetHasClass('phase_banning_selected', selectedPhase == PHASE_BANNING);
    masterRoot.SetHasClass('phase_selection_selected', selectedPhase == PHASE_SELECTION);
    masterRoot.SetHasClass('phase_all_random_selected', selectedPhase == PHASE_RANDOM_SELECTION);
    masterRoot.SetHasClass('phase_drafting_selected', selectedPhase == PHASE_DRAFTING);
    masterRoot.SetHasClass('phase_review_selected', selectedPhase == PHASE_REVIEW);
}

// Return X:XX time (M:SS)
function getFancyTime(timeNumber) {
    var minutes = Math.floor(timeNumber / 60);
    var seconds = timeNumber % 60;

    if(seconds < 10) {
        seconds = '0' + seconds;
    }

    return minutes + ':' + seconds;
}

//--------------------------------------------------------------------------------------------------
// Update the state for the transition timer periodically
//--------------------------------------------------------------------------------------------------
function UpdateTimer() {
    /*var gameTime = Game.GetGameTime();
    var transitionTime = Game.GetStateTransitionTime();

    CheckForHostPrivileges();

    var mapInfo = Game.GetMapInfo();
    $( "#MapInfo" ).SetDialogVariable( "map_name", mapInfo.map_display_name );

    if ( transitionTime >= 0 )
    {
        $( "#StartGameCountdownTimer" ).SetDialogVariableInt( "countdown_timer_seconds", Math.max( 0, Math.floor( transitionTime - gameTime ) ) );
        $( "#StartGameCountdownTimer" ).SetHasClass( "countdown_active", true );
        $( "#StartGameCountdownTimer" ).SetHasClass( "countdown_inactive", false );
    }
    else
    {
        $( "#StartGameCountdownTimer" ).SetHasClass( "countdown_active", false );
        $( "#StartGameCountdownTimer" ).SetHasClass( "countdown_inactive", true );
    }

    var autoLaunch = Game.GetAutoLaunchEnabled();
    $( "#StartGameCountdownTimer" ).SetHasClass( "auto_start", autoLaunch );
    $( "#StartGameCountdownTimer" ).SetHasClass( "forced_start", ( autoLaunch == false ) );*/

    // Allow the ui to update its state based on team selection being locked or unlocked
    $('#mainSelectionRoot').SetHasClass('teams_locked', Game.GetTeamSelectionLocked());
    $('#mainSelectionRoot').SetHasClass('teams_unlocked', Game.GetTeamSelectionLocked() == false);

    // Container to place the time into
    var placeInto = null;

    // Phase specific stuff
    switch(currentPhase) {
        case PHASE_OPTION_SELECTION:
            placeInto = $('#lodOptionSelectionTimeRemaining');
        break;

        case PHASE_BANNING:
            placeInto = $('#lodBanningTimeRemaining');
        break;

        case PHASE_SELECTION:
            placeInto = $('#lodSelectionTimeRemaining');
        break;

        case PHASE_RANDOM_SELECTION:
            placeInto = $('#lodRandomSelectionTimeRemaining');
        break;

        case PHASE_REVIEW:
            placeInto = $('#lodReviewTimeRemaining');
        break;
    }

    if(placeInto != null) {
        // Workout how long is left
        var currentTime = Game.Time();
        var timeLeft = Math.ceil(endOfTimer - currentTime);

        // Freeze timer
        if(freezeTimer != -1) {
            timeLeft = freezeTimer;
        }

        // Place the text
        placeInto.text = '(' + getFancyTime(timeLeft) + ')';

        // Make it more obvious how long is left
        if(freezeTimer != -1) {
            lastTimerShow = -1;

            // Show no text
            $('#lodTimerWarningLabel').text = '';
        } else {
            // Set how long is left
            $('#lodTimerWarningLabel').text = getFancyTime(timeLeft);

            var shouldShowTimer = false;

            if(lastTimerShow == -1) {
                // Timer was frozen, show the time
                shouldShowTimer = true;
            } else {
                if(timeLeft < lastTimerShow) {
                    shouldShowTimer = true;
                }
            }

            // Should we show the timer?
            if(shouldShowTimer) {
                // Work out how long to show for
                var showDuration = 3;

                // Calculate when the next show should occur
                if(timeLeft <= 30) {
                    // Always show
                    showDuration = timeLeft;

                    lastTimerShow = 0;
                } else {
                    // Show once every 30 seconds
                    lastTimerShow = Math.floor((timeLeft-1) / 30) * 30 + 1
                }

                $('#lodTimerWarningLabel').SetHasClass('showLodWarningTimer', true);

                //$('#lodTimerWarningLabel').visible = true;
                $.Schedule(showDuration, function() {
                    //$('#lodTimerWarningLabel').visible = false;
                    $('#lodTimerWarningLabel').SetHasClass('showLodWarningTimer', false);
                });
            }
        }
    }

    $.Schedule(0.1, UpdateTimer);
}

//--------------------------------------------------------------------------------------------------
// Entry point called when the team select panel is created
//--------------------------------------------------------------------------------------------------
(function() {
    //$( "#mainTeamContainer" ).SetAcceptsFocus( true ); // Prevents the chat window from taking focus by default

    /*var teamsListRootNode = $( "#TeamsListRoot" );

    // Construct the panels for each team
    for ( var teamId of Game.GetAllTeamIDs() )
    {
        var teamNode = $.CreatePanel( "Panel", teamsListRootNode, "" );
        teamNode.AddClass( "team_" + teamId ); // team_1, etc.
        teamNode.SetAttributeInt( "team_id", teamId );
        teamNode.BLoadLayout( "file://{resources}/layout/custom_game/team_select_team.xml", false, false );

        // Add the team panel to the global list so we can get to it easily later to update it
        g_TeamPanels.push( teamNode );
    }*/

    // Grab the map's name
    var mapName = Game.GetMapInfo().map_display_name;

    // All Pick Only
    if(mapName == 'all_pick') {
        allOptions.presets.fields[0].values = [{
            text: 'lodOptionBalancedAllPick',
            value: 1
        }]
    }

    // Mirror Draft Only
    if(mapName == 'mirror_draft') {
        allOptions.presets.fields[0].values = [{
            text: 'lodOptionBalancedMirrorDraft',
            value: 3
        }]
    }

    // All Random Only
    if(mapName == 'all_random') {
        allOptions.presets.fields[0].values = [{
            text: 'lodOptionBalancedAllRandom',
            value: 4
        }]
    }

    // Automatically assign players to teams.
    Game.AutoAssignPlayersToTeams();

    // Do an initial update of the player team assignment
    OnTeamPlayerListChanged();

    // Start updating the timer, this function will schedule itself to be called periodically
    UpdateTimer();

    // Build the options categories
    buildOptionsCategories();

    // Register a listener for the event which is brodcast when the team assignment of a player is actually assigned
    $.RegisterForUnhandledEvent( "DOTAGame_TeamPlayerListChanged", OnTeamPlayerListChanged );

    // Register a listener for the event which is broadcast whenever a player attempts to pick a team
    $.RegisterForUnhandledEvent( "DOTAGame_PlayerSelectedCustomTeam", OnPlayerSelectedTeam );

    // Hook stuff
    hookAndFire('phase_pregame', OnPhaseChanged);
    hookAndFire('options', OnOptionChanged);
    hookAndFire('heroes', OnHeroDataChanged);
    hookAndFire('flags', OnFlagDataChanged);
    hookAndFire('selected_heroes', OnSelectedHeroesChanged);
    hookAndFire('selected_attr', OnSelectedAttrChanged);
    hookAndFire('selected_skills', OnSelectedSkillsChanged);
    hookAndFire('banned', OnSkillBanned);
    hookAndFire('ready', OnGetReadyState);
    hookAndFire('random_builds', OnGetRandomBuilds);
    //hookAndFire('selected_random_builds', OnSelectedRandomBuildChanged);
    hookAndFire('draft_array', OnGetDraftArray);

    // Listen for notifications
    GameEvents.Subscribe('lodNotification', function(data) {
        addNotification(data);
    });

    // Hook tab changes
    hookTabChange('pickingPhaseHeroTab', OnHeroTabShown);
    hookTabChange('pickingPhaseSkillTab', OnSkillTabShown);
    hookTabChange('pickingPhaseMainTab', OnMainSelectionTabShown);

    // Setup the tabs
    setupBuilderTabs();

    // Make input boxes nicer to use
    $('#mainSelectionRoot').SetPanelEvent('onactivate', focusNothing);

    // Toggle the show taken abilities button to be on
    $('#lodToggleButton').checked = true;

    // Disable clicking on the warning timer
    $('#lodTimerWarning').hittest = false;
})();
