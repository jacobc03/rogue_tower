var RPG = RPG || {};

RPG.BattleState = function () {
    "use strict";
    Phaser.State.call(this);
    
    this.prefab_classes = {
        "background": RPG.TilePrefab.prototype.constructor,
        "rectangle": RPG.Prefab.prototype.constructor,
        "player_unit": RPG.PlayerUnit.prototype.constructor,
        "enemy_unit": RPG.EnemyUnit.prototype.constructor
    };
    
    this.TEXT_STYLE = {font: "14px Arial", fill: "#FFFFFF"};
};

RPG.BattleState.prototype = Object.create(Phaser.State.prototype);
RPG.BattleState.prototype.constructor = RPG.BattleState;

RPG.BattleState.prototype.init = function (level_data, extra_parameters) {
    console.log(extra_parameters);
    "use strict";
    this.level_data = level_data;
    this.party_data = extra_parameters.party_data;
    
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
};


RPG.BattleState.prototype.create = function () {
    console.log(this.level_data);
    "use strict";
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    var group_name, prefab_name, player_unit_name, enemy_unit_name;
    
    this.groups = {};
    this.level_data.groups.forEach(function (group_name) {
        this.groups[group_name] = this.game.add.group();
    }, this);
    
    // create prefabs
    this.prefabs = {};
    for (prefab_name in this.level_data.prefabs) {
        if (this.level_data.prefabs.hasOwnProperty(prefab_name)) {
            // create prefab
            this.create_prefab(prefab_name, this.level_data.prefabs[prefab_name]);
        }
    }
    
    this.units = [];
    this.units = this.units.concat(this.groups.enemy_units.children);
    
    
    // create player units
    for (player_unit_name in this.party_data) {
        if (this.party_data.hasOwnProperty(player_unit_name)) {
            // create player units
            this.create_prefab(player_unit_name, this.party_data[player_unit_name]);
        }
    }
    
    
    this.init_hud();
    
    this.next_turn();
};

RPG.BattleState.prototype.create_prefab = function (prefab_name, prefab_data) {
    "use strict";
    var prefab;
    // create object according to its type
    if (this.prefab_classes.hasOwnProperty(prefab_data.type)) {
        prefab = new this.prefab_classes[prefab_data.type](this, prefab_name, prefab_data.position, prefab_data.propertie);
    }
};

RPG.BattleState.prototype.init_hud = function () {
    "use strict";
    var unit_index, player_unit_health;
    
    // show player actions
    this.show_player_actions({x: 106, y: 210});
    
    // show player units
    this.show_units("player_units", {x: 202, y: 210}, RPG.PlayerMenuItem.prototype.constructor);
    
    // show enemy units
    this.show_units("enemy_units", {x: 10, y: 210}, RPG.EnemyMenuItem.prototype.constructor);

};

RPG.BattleState.prototype.show_units = function (group_name, position, menu_item_constructor) {
    "use strict";
    var unit_index, menu_items, unit_menu_item, units_menu;
    
    // create units menu items
    unit_index = 0;
    menu_items = [];
    this.groups[group_name].forEach(function (unit) {
        unit_menu_item = new menu_item_constructor(this, unit.name + "_menu_item", {x: position.x, y: position.y + unit_index * 20}, {group: "hud", text: unit.name, style: Object.create(this.TEXT_STYLE)});
        unit_index += 1;
        menu_items.push(unit_menu_item);
    }, this);
    // create units menu
    units_menu = new RPG.Menu(this, group_name + "_menu", position, {group: "hud", menu_items: menu_items});
};

RPG.BattleState.prototype.show_player_actions = function (position) {
    "use strict";
    var actions, actions_menu_items, action_index, actions_menu;
    // available actions
    actions = [{text: "Attack", item_constructor: RPG.AttackMenuItem.prototype.constructor},
               {text: "Magic", item_constructor: RPG.MagicAttackMenuItem.prototype.constructor}];
    actions_menu_items = [];
    action_index = 0;
    // create a menu item for each action
    actions.forEach(function (action) {
        actions_menu_items.push(new action.item_constructor(this, action.text + "_menu_item", {x: position.x, y: position.y + action_index * 20}, {group: "hud", text: action.text, style: Object.create(this.TEXT_STYLE)}));
        action_index += 1;
    }, this);
    actions_menu = new RPG.Menu(this, "actions_menu", position, {group: "hud", menu_items: actions_menu_items});
};

RPG.BattleState.prototype.next_turn = function () {
    "use strict";
    // if all enemy units are dead, go back to the world state
    if (this.groups.enemy_units.countLiving() === 0) {
        this.end_battle();
    }
    
    // if all player units are dead, restart the game
    if (this.groups.player_units.countLiving() === 0) {
        this.game_over();
    }
    
    // takes the next unit
    this.current_unit = this.units.shift();
    // if the unit is alive, it acts, otherwise goes to the next turn
    if (this.current_unit.alive) {
        this.current_unit.act();
        this.units.push(this.current_unit);
    } else {
        this.next_turn();
    }
};

RPG.BattleState.prototype.game_over = function () {
    "use strict";
    // go back to WorldState restarting the player position
    this.game.state.start("gameOver", gameOver);
};

RPG.BattleState.prototype.end_battle = function () {
    "use strict";
    var received_experience;
    
    // receive battle reward
    received_experience = this.encounter.reward.experience;
    this.groups.player_units.forEach(function (player_unit) {
        // receive experience from enemy
        player_unit.receive_experience(received_experience / this.groups.player_units.children.length);
        // save current party stats
        this.party_data[player_unit.name].properties.stats = player_unit.stats;
    }, this);
    
    
    this.encounter.reward.items.forEach(function (item_object) {
        this.prefabs.inventory.collect_item(item_object);
    }, this);
    
    // go back to WorldState with the current party data
    this.game.state.start("BootState", true, false, "levelOne", {party_data: this.party_data});
};
