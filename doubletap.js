UI.AddSliderInt("  L1mPeX", 0, 0);
UI.AddCheckbox("Better doubletap");
function on_ragebot_fire() {

    ragebot_target_exploit = Event.GetInt("exploit");
    if (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "shirazuDT")) {
        if (ragebot_target_exploit == 2) {
            UI.SetValue("Rage", "GENERAL", "Exploits", "Doubletap fast recovery", true);
        }
        else {
            UI.SetValue("Rage", "GENERAL", "Exploits", "Doubletap fast recovery", false);
        }
    }
}
Global.RegisterCallback("ragebot_fire", "on_ragebot_fire");

UI.AddCheckbox("Doubletap Teleport");
UI.SetValue("Rage", "GENERAL", "Exploits", "Teleport release", true);
function on_ragebot_fire() {
    ragebot_target_exploit = Event.GetInt("exploit");
    if (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "shirazuTeleportDT")) {
        (ragebot_target_exploit == 2) ? UI.ToggleHotkey("Rage", "GENERAL", "Exploits", "Doubletap") : UI.ToggleHotkey("Rage", "GENERAL", "Exploits", "Doubletap");
    }
}
Global.RegisterCallback("ragebot_fire", "on_ragebot_fire");

var last = 0
var shot = false
UI.AddCheckbox("FastestDTshirazu")
function lastShot() {
    if (Entity.GetLocalPlayer() == Entity.GetEntityFromUserID(Event.GetInt("userid")) && UI.IsHotkeyActive("Rage", "GENERAL", "Exploits", "Doubletap")) {

        last = Globals.Tickcount()
        shot = true
    }
}
var wasActive = true
var wasfding = false
var lastfding = 0
function cm() {
    if (!UI.GetValue("Script Items", "Fast DT Recharge") || (UI.IsHotkeyActive("Rage", "GENERAL", "Exploits", "Hide shots") && !UI.IsHotkeyActive("Rage", "GENERAL", "Exploits", "Doubletap"))) {
        Exploit.EnableRecharge()
        return
    }
    Exploit.DisableRecharge()
    if (!UI.IsHotkeyActive("Rage", "GENERAL", "Exploits", "Doubletap"))
        wasActive = false
    if (!wasActive && UI.IsHotkeyActive("Rage", "GENERAL", "Exploits", "Doubletap")) {
        Exploit.Recharge()
        wasActive = true
    }
    if (UI.IsHotkeyActive("Anti-Aim", "Extra", "Fake duck")) {
        wasfding = true
        lastfding = Globals.Tickcount()
    }
    if (!UI.IsHotkeyActive("Anti-Aim", "Extra", "Fake duck") && wasfding && Globals.Tickcount() - 2 > lastfding) {
        Exploit.Recharge()
        wasfding = false
    }

    if (last + 4 < Globals.Tickcount() && shot) {
        Exploit.Recharge()
        shot = false
    }
}
function roundStart() {
    if (!UI.GetValue("Script Items", "Fast DT Recharge") || (UI.IsHotkeyActive("Rage", "GENERAL", "Exploits", "Hide shots") && !UI.IsHotkeyActive("Rage", "GENERAL", "Exploits", "Doubletap"))) return
    if (Exploit.GetCharge() != 0) {
        Exploit.Recharge()
        last = Globals.Tickcount()
    }
}
Cheat.RegisterCallback("weapon_fire", "lastShot")
Cheat.RegisterCallback("CreateMove", "cm")
Cheat.RegisterCallback("round_start", "roundStart")
Cheat.RegisterCallback("round_prestart", "roundStart")
Cheat.RegisterCallback("round_end", "roundStart")

UI.AddCheckbox("Better Doubletap");
function on_ragebot_fire() {
    if (!UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Better Doubletap")) {
        return;
    }
    player = Entity.GetLocalPlayer();
    weapon = Entity.GetWeapon(player);
    weaponName = Entity.GetName(weapon);
    Global.Print('Printing:');
    Global.Print(weaponName + '\n');
    if (!(weaponName.includes('g3sg1') || weaponName.includes('scar') || weaponName.includes('xm1014') || weaponName.includes('desert') || weaponName.includes('nova') || weaponName.includes('sawed off'))) {
        Global.Print('Includes Blacklisted Gun... Setting fast recovery true' + '\n');
        UI.SetValue("Rage", "GENERAL", "Exploits", "Doubletap fast recovery", true);
        return;
    }
    ragebot_target_exploit = Event.GetInt("exploit");
    if (ragebot_target_exploit == 2) {
        UI.SetValue("Rage", "GENERAL", "Exploits", "Doubletap fast recovery", true);
    } else {
        UI.SetValue("Rage", "GENERAL", "Exploits", "Doubletap fast recovery", false);
    }
}
Global.RegisterCallback("ragebot_fire", "on_ragebot_fire");

function onDraw() {
    Render.String(25, 495, 0, "DT", UI.IsHotkeyActive("Rage", "Exploits", "Doubletap") ? [0, 255, 0, 255] : [255, 0, 0, 255], 4.6);
}
Global.RegisterCallback("Draw", "onDraw");

currShot = 0;
currentYaw = 0;
function weaponFire() {
    ogYawOffset = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Base yaw:");

    UID = Event.GetInt("userid");
    entityID = Entity.GetEntityFromUserID(UID);

    localEntityID = Entity.GetLocalPlayer();



    if (entityID == localEntityID) {
        desiredYaw = 0;

        if (currShot == 1) {
            //User is on second shot
            desiredYaw = ogYawOffset;
            currShot = 0;
            if (UI.GetValue("Misc", "JAVSCRIPT", "Script items", "Chat info:")) {
                Cheat.PrintChat("[RESET] - Changed yaw to " + desiredYaw.toString());
            }
        }
        else {
            //User is on first shot
            desiredYaw = UI.GetValue("Misc", "JAVSCRIPT", "Script items", "Yaw flip:");
            if (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Random yaw:")) {
                desiredYaw = getRandomInt(-180, 180);
                Cheat.PrintChat("[RANDOM] - New yaw: " + desiredYaw.toString());
            }
            Cheat.PrintChat("[SWITCH] - Changed yaw to " + desiredYaw.toString());
            currShot++;
        }
        UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", desiredYaw);

    }
}

function playerDeathFunc() {

    attackerUID = Event.GetInt("attacker");
    victimUID = Event.GetInt("userid");

    attackerEntity = Entity.GetEntityFromUserID(attackerUID);
    victimEntity = Entity.GetEntityFromUserID(victimUID);
    localEntity = Entity.GetLocalPlayer();

    if (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Reset after you get a kill:") && attackerEntity == localEntity) {
        if (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Chat info:")) {
            Cheat.PrintChat("[RESET] - You got a kill.");
        }
        resetYaw();
    }
    if (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Reset after you are killed:") && victimEntity == localEntity) {
        if (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Chat info:")) {
            Cheat.PrintChat("[RESET] - You got killed.");
        }
        resetYaw();
    }
}

function roundStartFunc() {
    if (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Reset after round ends:")) {
        if (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Chat info:")) {
            Cheat.PrintChat("[RESET] - New round.");
        }
        resetYaw();
    }
}

function resetYaw() {
    if (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Chat info:")) {
        Cheat.PrintChat("Finished resetting yaw!");
    }
    currShot = 0;
    UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", ogYawOffset);
}

ogYawOffset = 0;

function drawUI() {
    UI.AddSliderInt("Yaw flip:", -180, 180);
    UI.AddSliderInt("Base yaw:", -180, 180);

    UI.AddCheckbox("SmartYAW types:");
    UI.AddCheckbox("Reset after you get a kill");
    UI.AddCheckbox("Reset after you are killed");
    UI.AddCheckbox("Reset after round ends");

    UI.AddCheckbox("Chat info");
}

function main() {
    ogYawOffset = UI.GetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset");
    drawUI();
    Cheat.RegisterCallback("round_start", "roundStartFunc");
    Cheat.RegisterCallback("player_death", "playerDeathFunc");
    Cheat.RegisterCallback("weapon_fire", "weaponFire");
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * ((max + 1) - min)) + min; //The maximum is inclusive and the minimum is inclusive
}

main();

var time, delay, shotsfired;

//Weapon fire event
function EVENT_WEAPON_FIRE() {
    iShotsFired = Event.GetInt("userid"); iShotsFired_index = Entity.GetEntityFromUserID(iShotsFired);

    if (Entity.GetLocalPlayer() == iShotsFired_index) {
        //Released only once
        if (shotsfired == 0) {
            time = Globals.Curtime();
            delay = time + 0.9;
        }
    }
}

function HUD_REDRAW() {
    curtime = Globals.Curtime();

    if (curtime <= delay) {
        shotsfired = 1;
        UI.ToggleHotkey("Anti-Aim", "Fake angles", "Inverter");
        //Render.String(Global.GetScreenSize()[0]/2, Global.GetScreenSize()[1]/2, 0, "works", [255,255,255,255], 4);  
    }
    else {
        UI.ToggleHotkey("Anti-Aim", "Fake angles", "Inverter");
        shotsfired = 0;
        //Render.String(Global.GetScreenSize()[0]/2, Global.GetScreenSize()[1]/2, 0, "not works", [255,255,255,255], 4);
    }
}

function getValue(name) {
    var value = UI.GetValue('Script Items', name);

    return value;
}

function Main() {
    Global.RegisterCallback("weapon_fire", "EVENT_WEAPON_FIRE");
    Global.RegisterCallback("Draw", "HUD_REDRAW");
}

Main();

function RADTODEG(radians) {
    return radians * 180 / Math.PI
}
function calcAngle(source, entityPos) {
    var delta = []
    delta[0] = source[0] - entityPos[0]
    delta[1] = source[1] - entityPos[1]
    delta[2] = source[2] - entityPos[2]
    var angles = []
    var viewangles = Local.GetViewAngles()
    angles[0] = RADTODEG(Math.atan(delta[2] / Math.hypot(delta[0], delta[1]))) - viewangles[0]
    angles[1] = RADTODEG(Math.atan(delta[1] / delta[0])) - viewangles[1]
    angles[2] = 0
    if (delta[0] >= 0)
        angles[1] += 180

    return angles
}
UI.AddSliderInt("Max brute FOV", 0, 35)
UI.AddCheckbox("Enable Antibruteforcing")
var shots = 0
function onBulletImpact() {
    var ent = Entity.GetEntityFromUserID(Event.GetInt("userid"))
    if (ent == Entity.GetLocalPlayer() || Entity.IsTeammate(ent))
        return
    var pos = [Event.GetFloat("x"), Event.GetFloat("y"), Event.GetFloat("z")]
    var ang = calcAngle(Entity.GetEyePosition(ent), pos)
    var angToLocal = calcAngle(Entity.GetEyePosition(ent), Entity.GetHitboxPosition(Entity.GetLocalPlayer(), 0))
    var delta = [angToLocal[0] - ang[0], angToLocal[1] - ang[1], 0]
    var FOV = Math.sqrt(delta[0] * delta[0] + delta[1] * delta[1])
    if (FOV < UI.GetValue("Max Brute FOV"))
        UI.ToggleHotkey("Anti-Aim", "Fake angles", "Inverter")
    if (UI.GetValue("Anti-Onetap ;)")) {
        shots++
        if (!(shots % 4)) UI.ToggleHotkey("Anti-Aim", "Fake angles", "Inverter")
    }
}
function playerhurt() {
    if (Entity.GetEntityFromUserID(Event.GetInt("userid")) == Entity.GetLocalPlayer())
        UI.ToggleHotkey("Anti-Aim", "Fake angles", "Inverter")
}
Cheat.RegisterCallback("player_hurt", "playerhurt")
Cheat.RegisterCallback("bullet_impact", "onBulletImpact")