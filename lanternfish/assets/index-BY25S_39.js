(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`// ABYSS TRACKER — a four-voice editable, looping 16-step music cartridge.
// Arrow keys select a cell. Z/C lower/raise its note, X clears. Space toggles playback.
// +/- changes tick length. 1..4 mutes a channel. R restores the authored pattern.
int notes[64];
int frequencies[25];
int muted[4];
int selected;
int track;
int tick;
int ticksPerStep;
int playing;
int step;
int lastFrame;
void number(int x,int y,int n) {
  byte s[4];
  s[0]='0'+n/10;
  s[1]='0'+n%10;
  s[2]=0;
  text(x,y,s);
}
void preset() {
  for(int i=0;i<64;i++)notes[i]=0;
  notes[0]=1;
  notes[3]=1;
  notes[6]=8;
  notes[8]=1;
  notes[11]=1;
  notes[14]=6;
  notes[16]=13;
  notes[18]=16;
  notes[21]=20;
  notes[23]=23;
  notes[25]=20;
  notes[28]=16;
  notes[30]=18;
  notes[32]=8;
  notes[36]=6;
  notes[40]=4;
  notes[44]=6;
  notes[48]=1;
  notes[50]=24;
  notes[52]=12;
  notes[54]=24;
  notes[56]=1;
  notes[58]=24;
  notes[60]=12;
  notes[62]=24;
  for(int i=0;i<4;i++)muted[i]=0;
}
void init() {
  frequencies[0]=0;
  frequencies[1]=131;
  frequencies[2]=139;
  frequencies[3]=147;
  frequencies[4]=156;
  frequencies[5]=165;
  frequencies[6]=175;
  frequencies[7]=185;
  frequencies[8]=196;
  frequencies[9]=208;
  frequencies[10]=220;
  frequencies[11]=233;
  frequencies[12]=247;
  frequencies[13]=262;
  frequencies[14]=277;
  frequencies[15]=294;
  frequencies[16]=311;
  frequencies[17]=330;
  frequencies[18]=349;
  frequencies[19]=370;
  frequencies[20]=392;
  frequencies[21]=415;
  frequencies[22]=440;
  frequencies[23]=466;
  frequencies[24]=494;
  preset();
  ticksPerStep=10;
  playing=1;
  step=0;
  tick=0;
  track=0;
  selected=0;
  lastFrame=frame();
}
void trigger() {
  for(int v=0;v<4;v++) {
    int n=notes[v*16+step];
    if(n>0&&!muted[v]) {
      int hz=frequencies[n];
      int wave=2;
      int volume=10;
      if(v==0)hz=hz/2;
      if(v==1) {
        hz=hz*2;
        wave=1;
        volume=6;
      }
      if(v==2) {
        wave=3;
        volume=5;
      }
      if(v==3) {
        wave=4;
        volume=7;
        hz=hz*8;
      }
      sound(v,hz,volume,wave);
      poke(0xFF76+v*8,1+v%3);
    }
  }
}
void draw() {
  clear(0);
  color(10);
  text(4,4,"ABYSS / PATTERN LAB");
  color(7);
  text(4,13,"4 VOICES  16 STEPS  TICK:");
  number(104,13,ticksPerStep);
  for(int v=0;v<4;v++) {
    color(7);
    if(v==0)text(4,28,"B");
    if(v==1)text(4,46,"L");
    if(v==2)text(4,64,"P");
    if(v==3)text(4,82,"N");
    if(muted[v]) {
      color(8);
      text(4,36,"-");
    }
    for(int s=0;s<16;s++) {
      int x=14+s*9;
      int y=26+v*18;
      int n=notes[v*16+s];
      color(1);
      if(s%4==0)color(2);
      rect(x,y,8,16);
      if(n) {
        color(4+v*2);
        rect(x+1,y+14-n/2,6,1+n/2);
      }
      if(s==step&&playing) {
        color(10);
        rect(x,y,8,1);
      }
      if(v==track&&s==selected) {
        color(6);
        rect(x,y+15,8,1);
        rect(x,y,1,16);
      }
    }
  }
  color(5);
  if(playing)text(4,101,"PLAY");
  else text(4,101,"STOP");
  color(7);
  text(28,101,"NOTE");
  number(49,101,notes[track*16+selected]);
  text(66,101,"SPACE: PLAY  +/-: SPEED");
  color(4);
  text(4,111,"ARROWS SELECT  Z/C NOTE  X REST  1-4 MUTE");
}
int main() {
  init();
  trigger();
  while(1) {
    int k=key();
    int at=track*16+selected;
    if(k==128)track=(track+3)%4;
    if(k==129)track=(track+1)%4;
    if(k==130)selected=(selected+15)%16;
    if(k==131)selected=(selected+1)%16;
    if(k=='z'||k=='Z') {
      if(notes[at]>0)notes[at]--;
    }
    if(k=='c'||k=='C') {
      if(notes[at]<24)notes[at]++;
    }
    if(k=='x'||k=='X')notes[at]=0;
    if(k==' ') {
      playing=!playing;
      if(!playing)silence();
    }
    if(k=='+'||k=='=') {
      if(ticksPerStep>3)ticksPerStep--;
    }
    if(k=='-') {
      if(ticksPerStep<24)ticksPerStep++;
    }
    if(k>='1'&&k<='4') {
      int v=k-'1';
      muted[v]=!muted[v];
      if(muted[v])sound(v,0,0,0);
    }
    if(k=='r'||k=='R')preset();
    if(playing) {
      int now=frame();
      tick=tick+((now-lastFrame)&32767);
      if(tick>=ticksPerStep) {
        tick=0;
        step=(step+1)%16;
        trigger();
      }
      lastFrame=now;
    }
    else lastFrame=frame();
    draw();
    wait();
  }
  return 0;
}
`,t=`; hello.lfa — the smallest LF-16 program worth running.
        .name "Hello, deep"
        .author "Claude"
start:  li r1, BLT_COLOR
        li r0, 1
        st [r1], r0
        li r1, BLT_CMD
        li r0, BLT_CLEAR
        st [r1], r0            ; clear the screen to 'deep'
        li r1, BLT_X
        li r0, 36
        st [r1], r0
        li r1, BLT_Y
        li r0, 54
        st [r1], r0
        li r1, BLT_COLOR
        li r0, 0x1A            ; lantern on deep
        st [r1], r0
        li r1, BLT_FLAGS
        li r0, BLT_SCALE2
        st [r1], r0
        li r1, BLT_SRC
        li r0, msg
        st [r1], r0
        li r1, BLT_CMD
        li r0, BLT_TEXT
        st [r1], r0
        li r2, msg
.say:   ldb r0, [r2]            ; echo the message to serial too
        cmp r0, 0
        jeq .done
        li r1, SERIAL_OUT
        st [r1], r0
        add r2, 1
        jmp .say
.done:  wait
        jmp .done
msg:    .asciz "Hello, deep!"
`,n=`; ============================================================================
;  LUMEN DRIFT: a lanternfish arcade game for the LF-16
;  by Claude
;
;  You are a small lanternfish carrying your own light through the deep. Eat the
;  drifting glow-motes to keep your light burning and stay clear of the anglers.
;  If your light fails, the dark takes a life.
;
;  Controls: arrows / WASD swim, Z or Enter start.
;
;  Techniques shown: double-buffered rendering with VIDEO_BASE + BLT_DST, the
;  blitter (FILL/SPRITE/TEXT/LINE/PIXEL), 4.4 fixed-point motion, table-driven
;  entities, a sine table, and a 4-voice sound track sequenced per frame.
;
;  Register conventions in this file:
;    r13 = 0xFF50 (blitter register block) for the whole program
;    r12 = address of the back buffer being drawn this frame
;    r0-r7 scratch (clobbered by helpers), r8-r11 loop state in top-level routines
; ============================================================================
        .name   "Lumen Drift"
        .author "Claude"

BUF_A    = 0x8000
BUF_B    = 0xC000
N_MOTE   = 10
N_ANG    = 4
N_SNOW   = 24
FIX      = 4            ; fractional bits of positions
PLAYER_W = 12
PLAYER_H = 6
TOP      = 12           ; play field starts below the HUD
FLOOR    = 108          ; nominal sea floor line

; blitter register offsets from r13
B_CMD = 0
B_X = 2
B_Y = 4
B_W = 6
B_H = 8
B_COL = 10
B_SRC = 12
B_FLG = 14
B_DST = 16

ST_TITLE = 0
ST_PLAY  = 1
ST_OVER  = 2

; ---------------------------------------------------------------------------
start:  li r13, BLT_CMD
        li r12, BUF_A
        li r1, IE
        li r0, INT_VBLANK         ; used only to wake \`wait\`; I stays 0
        st [r1], r0
        call init_world
        li r1, px
        li r0, 24 << FIX
        st [r1], r0
        li r0, ST_TITLE
        call set_state

main:   call update
        call render
        call music
        ; present: show the buffer we just drew, then wait for the frame to end
        li r1, VIDEO_BASE
        st [r1], r12
        call vsync
        xor r12, BUF_A ^ BUF_B    ; swap back buffer
        jmp main

vsync:  wait
        li r1, IF
        li r0, INT_VBLANK
        st [r1], r0
        li r1, frame
        ld r0, [r1]
        add r0, 1
        st [r1], r0
        ret

; ---------------------------------------------------------------------------
; input helper: r0 = held buttons, pressed = newly pressed this frame
read_pad:
        li r1, PAD
        ld r0, [r1]
        li r2, prev_pad
        ld r3, [r2]
        st [r2], r0
        not r3, r3
        and r3, r0
        li r2, pressed
        st [r2], r3
        ret

; ---------------------------------------------------------------------------
set_state:                        ; r0 = new state
        li r1, state
        st [r1], r0
        li r1, state_t
        li r2, 0
        st [r1], r2
        cmp r0, ST_PLAY
        jne .done
        call new_game
.done:  ret

update: call read_pad
        li r1, state_t
        ld r0, [r1]
        add r0, 1
        st [r1], r0
        call update_snow
        li r1, state
        ld r0, [r1]
        cmp r0, ST_PLAY
        jeq update_play
        ; title and game over: wait for START or A (after a short grace period)
        li r1, state_t
        ld r0, [r1]
        cmp r0, 40
        jltu .idle
        li r1, pressed
        ld r0, [r1]
        tst r0, BTN_START | BTN_A
        jeq .idle
        li r0, ST_PLAY
        call set_state
        call sfx_start
.idle:  ; keep the fish drifting on title and game over screens
        li r1, frame
        ld r0, [r1]
        shl r0, 1
        and r0, 63
        li r2, sintab
        add r2, r0
        ldbs r0, [r2]
        add r0, 58
        shl r0, FIX
        li r1, py
        st [r1], r0
        ret

; ---------------------------------------------------------------------------
new_game:
        li r1, score
        li r0, 0
        st [r1], r0
        li r1, lives
        li r0, 3
        st [r1], r0
        li r1, energy
        li r0, 100
        st [r1], r0
        li r1, invuln
        li r0, 60
        st [r1], r0
        li r1, px
        li r0, 24 << FIX
        st [r1], r0
        li r1, py
        li r0, 56 << FIX
        st [r1], r0
        li r1, vx
        li r0, 0
        st [r1], r0
        li r1, vy
        st [r1], r0
        li r1, mote_on
        li r2, N_MOTE
.m:     stb [r1], r0
        add r1, 1
        sub r2, 1
        jne .m
        li r1, ang_on
        li r2, N_ANG
.a:     stb [r1], r0
        add r1, 1
        sub r2, 1
        jne .a
        ret

; ---------------------------------------------------------------------------
update_play:
        call move_player
        call update_motes
        call update_anglers
        ; light drains one unit every 10 frames
        li r1, state_t
        ld r0, [r1]
        modu r0, 10
        jne .noDrain
        li r1, energy
        ld r0, [r1]
        sub r0, 1
        st [r1], r0
        jgt .noDrain
        ; the light went out: lose a life, relight at 60
        li r0, 60
        st [r1], r0
        call lose_life
.noDrain:
        li r1, invuln
        ld r0, [r1]
        cmp r0, 0
        jeq .ok
        sub r0, 1
        st [r1], r0
.ok:    ret

lose_life:
        call sfx_hit
        li r1, flash
        li r0, 6
        st [r1], r0
        li r1, invuln
        li r0, 90
        st [r1], r0
        li r1, lives
        ld r0, [r1]
        sub r0, 1
        st [r1], r0
        jgt .alive
        li r1, best
        ld r0, [r1]
        li r2, score
        ld r2, [r2]
        cmp r2, r0
        jleu .nobest
        st [r1], r2
.nobest:
        li r0, ST_OVER
        call set_state
        call sfx_over
.alive: ret

; ---------------------------------------------------------------------------
move_player:
        li r1, prev_pad
        ld r4, [r1]               ; held buttons
        li r1, vx
        ld r2, [r1]
        li r1, vy
        ld r3, [r1]
        tst r4, BTN_LEFT
        jeq .nl
        sub r2, 3
.nl:    tst r4, BTN_RIGHT
        jeq .nr
        add r2, 3
.nr:    tst r4, BTN_UP
        jeq .nu
        sub r3, 3
.nu:    tst r4, BTN_DOWN
        jeq .nd
        add r3, 3
.nd:    ; drag: v -= v/8 (arithmetic)
        mov r5, r2
        sar r5, 3
        sub r2, r5
        mov r5, r3
        sar r5, 3
        sub r3, r5
        li r1, vx
        st [r1], r2
        li r1, vy
        st [r1], r3
        ; integrate and clamp
        li r1, px
        ld r0, [r1]
        add r0, r2
        mov r6, r0
        li r0, 0
        li r2, (160 - PLAYER_W) << FIX
        call clamp
        st [r1], r6
        li r1, py
        ld r0, [r1]
        add r0, r3
        mov r6, r0
        li r0, TOP << FIX
        li r2, (FLOOR - PLAYER_H - 2) << FIX
        call clamp
        st [r1], r6
        ret

; clamp r6 into [r0, r2] (signed); preserves r1
clamp:  cmp r6, r0
        jge .lo
        mov r6, r0
.lo:    cmp r6, r2
        jle .hi
        mov r6, r2
.hi:    ret

; ---------------------------------------------------------------------------
; glow motes
update_motes:
        ; spawn one every 18 frames
        li r1, state_t
        ld r0, [r1]
        modu r0, 18
        jne .move
        li r8, 0
.find:  li r1, mote_on
        add r1, r8
        ldb r0, [r1]
        cmp r0, 0
        jeq .spawn
        add r8, 1
        cmp r8, N_MOTE
        jlt .find
        jmp .move
.spawn: li r0, 1
        stb [r1], r0
        mov r9, r8
        shl r9, 1
        li r1, mote_x
        add r1, r9
        li r0, 162 << FIX
        st [r1], r0
        call rand
        modu r0, FLOOR - TOP - 20
        add r0, TOP + 8
        li r1, mote_y
        add r1, r9
        st [r1], r0
        call rand
        li r1, mote_ph
        add r1, r9
        st [r1], r0
.move:  li r8, 0
.each:  li r1, mote_on
        add r1, r8
        ldb r0, [r1]
        cmp r0, 0
        jeq .next
        mov r9, r8
        shl r9, 1
        li r1, mote_x
        add r1, r9
        ld r0, [r1]
        sub r0, 10
        st [r1], r0
        cmp r0, -8 << FIX
        jgt .alive
        li r1, mote_on
        add r1, r8
        li r0, 0
        stb [r1], r0
        jmp .next
.alive: li r1, mote_ph
        add r1, r9
        ld r0, [r1]
        add r0, 1
        st [r1], r0
        ; collision with player: |mx - (px+6)| < 8 and |my - (py+3)| < 6
        li r1, mote_x
        add r1, r9
        ld r0, [r1]
        sar r0, FIX
        li r1, px
        ld r2, [r1]
        sar r2, FIX
        add r2, PLAYER_W / 2
        sub r0, r2
        call abs
        cmp r0, 8
        jge .next
        li r1, mote_y
        add r1, r9
        ld r0, [r1]
        call mote_wobble
        li r1, py
        ld r2, [r1]
        sar r2, FIX
        add r2, PLAYER_H / 2
        sub r0, r2
        call abs
        cmp r0, 6
        jge .next
        ; eat it
        li r1, mote_on
        add r1, r8
        li r0, 0
        stb [r1], r0
        li r1, score
        ld r0, [r1]
        add r0, 1
        st [r1], r0
        li r1, energy
        ld r0, [r1]
        add r0, 14
        cmp r0, 100
        jle .cap
        li r0, 100
.cap:   st [r1], r0
        call sfx_chime
.next:  add r8, 1
        cmp r8, N_MOTE
        jlt .each
        ret

; r0 = base y, r9 = slot*2 → r0 = y with a gentle sine wobble
mote_wobble:
        li r1, mote_ph
        add r1, r9
        ld r2, [r1]
        shr r2, 1
        and r2, 63
        li r1, sintab
        add r1, r2
        ldbs r2, [r1]
        sar r2, 3
        add r0, r2
        ret

abs:    cmp r0, 0
        jge .p
        neg r0, r0
.p:     ret

; ---------------------------------------------------------------------------
; anglers
update_anglers:
        ; level = score / 8, spawn interval = max(40, 110 - level*8)
        li r1, score
        ld r0, [r1]
        divu r0, 8
        mov r10, r0               ; r10 = level
        mul r0, 8
        li r2, 110
        sub r2, r0
        cmp r2, 40
        jge .ivl
        li r2, 40
.ivl:   li r1, spawn_t
        ld r0, [r1]
        add r0, 1
        st [r1], r0
        cmp r0, r2
        jltu .move
        li r0, 0
        st [r1], r0
        li r8, 0
.find:  li r1, ang_on
        add r1, r8
        ldb r0, [r1]
        cmp r0, 0
        jeq .spawn
        add r8, 1
        cmp r8, N_ANG
        jlt .find
        jmp .move
.spawn: li r0, 1
        stb [r1], r0
        mov r9, r8
        shl r9, 1
        li r1, ang_x
        add r1, r9
        li r0, 164 << FIX
        st [r1], r0
        call rand
        modu r0, FLOOR - TOP - 28
        add r0, TOP + 10
        li r1, ang_by
        add r1, r9
        st [r1], r0
        call rand
        li r1, ang_ph
        add r1, r9
        st [r1], r0
        ; speed = 9 + level*2 + random(0..5), capped at 30
        call rand
        modu r0, 6
        add r0, 9
        mov r2, r10
        shl r2, 1
        add r0, r2
        cmp r0, 30
        jle .spd
        li r0, 30
.spd:   li r1, ang_v
        add r1, r9
        st [r1], r0
.move:  li r8, 0
.each:  li r1, ang_on
        add r1, r8
        ldb r0, [r1]
        cmp r0, 0
        jeq .next
        mov r9, r8
        shl r9, 1
        li r1, ang_v
        add r1, r9
        ld r2, [r1]
        li r1, ang_x
        add r1, r9
        ld r0, [r1]
        sub r0, r2
        st [r1], r0
        cmp r0, -20 << FIX
        jgt .alive
        li r1, ang_on
        add r1, r8
        li r0, 0
        stb [r1], r0
        jmp .next
.alive: li r1, ang_ph
        add r1, r9
        ld r0, [r1]
        add r0, 1
        st [r1], r0
        ; hitbox: angler body ~ (x+3..x+14, y+3..y+10) vs player (px+1..px+11, py+1..py+5)
        li r1, invuln
        ld r0, [r1]
        cmp r0, 0
        jne .next
        call angler_pos           ; r0 = x, r1 = y (pixels)
        li r2, px
        ld r2, [r2]
        sar r2, FIX
        li r3, py
        ld r3, [r3]
        sar r3, FIX
        ; overlap test on x: ax+3 < p+11 and p+1 < ax+14
        mov r4, r0
        add r4, 3
        mov r5, r2
        add r5, 11
        cmp r4, r5
        jge .next
        mov r4, r2
        add r4, 1
        mov r5, r0
        add r5, 14
        cmp r4, r5
        jge .next
        ; y: ay+3 < py+5 and py+1 < ay+10
        mov r4, r1
        add r4, 3
        mov r5, r3
        add r5, 5
        cmp r4, r5
        jge .next
        mov r4, r3
        add r4, 1
        mov r5, r1
        add r5, 10
        cmp r4, r5
        jge .next
        call lose_life
.next:  add r8, 1
        cmp r8, N_ANG
        jlt .each
        ret

; r9 = slot*2 → r0 = x px, r1 = y px
angler_pos:
        li r1, ang_ph
        add r1, r9
        ld r2, [r1]
        and r2, 63
        li r1, sintab
        add r1, r2
        ldbs r2, [r1]
        sar r2, 2                 ; ±8 px bob
        li r1, ang_by
        add r1, r9
        ld r1, [r1]
        add r1, r2
        li r0, ang_x
        add r0, r9
        ld r0, [r0]
        sar r0, FIX
        ret

; ---------------------------------------------------------------------------
; marine snow drifts on every screen
init_world:
        li r8, 0
.s:     call rand
        modu r0, 160
        li r1, snow_x
        add r1, r8
        st [r1], r0
        call rand
        modu r0, 120 << 2
        li r1, snow_y
        add r1, r8
        st [r1], r0
        add r8, 2
        cmp r8, N_SNOW * 2
        jlt .s
        ; seafloor heights: a smoothed random walk
        li r8, 0
        li r9, 112
.f:     call rand
        modu r0, 5
        sub r0, 2
        add r9, r0
        mov r6, r9
        li r0, 106
        li r2, 116
        call clamp
        mov r9, r6
        li r1, floor_h
        add r1, r8
        stb [r1], r9
        add r8, 1
        cmp r8, 160
        jlt .f
        ret

update_snow:
        li r8, 0
.s:     li r1, snow_y
        add r1, r8
        ld r0, [r1]
        add r0, 1
        cmp r0, 120 << 2
        jlt .ok
        li r0, 0
.ok:    st [r1], r0
        li r1, frame
        ld r0, [r1]
        and r0, 3
        jne .n
        li r1, snow_x
        add r1, r8
        ld r0, [r1]
        sub r0, 1
        jge .x
        li r0, 159
.x:     st [r1], r0
.n:     add r8, 2
        cmp r8, N_SNOW * 2
        jlt .s
        ret

; ---------------------------------------------------------------------------
; rendering
render: st [r13+B_DST], r12
        li r0, 0
        st [r13+B_FLG], r0
        ; background: flash red briefly when hit
        li r1, flash
        ld r0, [r1]
        cmp r0, 0
        jeq .dark
        sub r0, 1
        st [r1], r0
        li r0, 1
        jmp .clr
.dark:  li r0, 0
.clr:   st [r13+B_COL], r0
        li r0, BLT_CLEAR
        st [r13+B_CMD], r0
        call draw_halo
        call draw_snow
        call draw_floor
        li r1, state
        ld r0, [r1]
        cmp r0, ST_PLAY
        jne .notplay
        call draw_motes
        call draw_anglers
        call draw_player
        call draw_hud
        ret
.notplay:
        call draw_player
        li r1, state
        ld r0, [r1]
        cmp r0, ST_TITLE
        jeq draw_title
        jmp draw_over

; light halo around the player: three nested discs
draw_halo:
        li r1, px
        ld r8, [r1]
        sar r8, FIX
        add r8, PLAYER_W / 2
        li r1, py
        ld r9, [r1]
        sar r9, FIX
        add r9, PLAYER_H / 2
        li r1, state
        ld r0, [r1]
        cmp r0, ST_PLAY
        jeq .e
        li r10, 100
        jmp .r
.e:     li r1, energy
        ld r10, [r1]
.r:     ; outer radius = 8 + energy/4 (+ flicker)
        mov r11, r10
        shr r11, 2
        add r11, 8
        li r1, frame
        ld r0, [r1]
        shr r0, 3
        and r0, 1
        add r11, r0
        mov r2, r11
        li r3, 1
        call disc
        mov r2, r11
        mul r2, 2
        divu r2, 3
        li r3, 2
        call disc
        mov r2, r11
        divu r2, 3
        add r2, 2
        li r3, 3
        call disc
        ret

; disc(center r8,r9, radius r2, colour r3) built from 4 horizontal bands
disc:   push r10
        push r11
        mov r10, r2               ; r
        mov r11, r3
        st [r13+B_COL], r11
        ; band table: (half-width%, y-from%, y-to%) of r, in tenths
        li r7, bands
.band:  ldb r4, [r7]              ; half width (tenths)
        cmp r4, 0
        jeq .done
        ldb r5, [r7+1]            ; y from
        ldb r6, [r7+2]            ; y to
        mul r4, r10
        divu r4, 10
        mul r5, r10
        divu r5, 10
        mul r6, r10
        divu r6, 10
        ; x = cx - hw, w = 2hw
        mov r0, r8
        sub r0, r4
        st [r13+B_X], r0
        shl r4, 1
        st [r13+B_W], r4
        ; height = to - from
        mov r3, r6
        sub r3, r5
        cmp r5, 0
        jne .two
        ; center band spans -to..to
        mov r1, r9
        sub r1, r6
        st [r13+B_Y], r1
        shl r6, 1
        st [r13+B_H], r6
        li r0, BLT_FILL
        st [r13+B_CMD], r0
        jmp .nextb
.two:   st [r13+B_H], r3
        mov r1, r9
        sub r1, r6
        st [r13+B_Y], r1
        li r0, BLT_FILL
        st [r13+B_CMD], r0
        mov r1, r9
        add r1, r5
        st [r13+B_Y], r1
        st [r13+B_CMD], r0
.nextb: add r7, 3
        jmp .band
.done:  pop r11
        pop r10
        ret

draw_snow:
        li r0, 7
        st [r13+B_COL], r0
        li r8, 0
.s:     li r1, snow_x
        add r1, r8
        ld r0, [r1]
        st [r13+B_X], r0
        li r1, snow_y
        add r1, r8
        ld r0, [r1]
        shr r0, 2
        st [r13+B_Y], r0
        li r0, BLT_PIXEL
        st [r13+B_CMD], r0
        add r8, 2
        cmp r8, N_SNOW * 2
        jlt .s
        ret

draw_floor:
        li r0, 1
        st [r13+B_COL], r0
        li r0, 119
        st [r13+B_H], r0
        li r8, 0
.f:     st [r13+B_X], r8
        st [r13+B_W], r8
        li r1, floor_h
        add r1, r8
        ldb r0, [r1]
        st [r13+B_Y], r0
        li r0, BLT_LINE
        st [r13+B_CMD], r0
        add r8, 1
        cmp r8, 160
        jlt .f
        ; three kelp strands swaying on the sine table
        li r0, 13
        st [r13+B_COL], r0
        li r10, kelp_x
.k:     ldb r8, [r10]
        cmp r8, 0
        jeq .kd
        li r1, floor_h
        add r1, r8
        ldb r9, [r1]              ; base y
        li r11, 0                 ; segment
.seg:   ; x offset = sin((frame + seg*6 + x) & 63) * seg / 32
        li r1, frame
        ld r0, [r1]
        mov r2, r11
        mul r2, 6
        add r0, r2
        add r0, r8
        shr r0, 1
        and r0, 63
        li r1, sintab
        add r1, r0
        ldbs r0, [r1]
        mul r0, r11
        sar r0, 5
        add r0, r8
        st [r13+B_X], r0
        st [r13+B_W], r0
        mov r0, r9
        mov r2, r11
        mul r2, 5
        sub r0, r2
        st [r13+B_Y], r0
        sub r0, 5
        st [r13+B_H], r0
        li r0, BLT_LINE
        st [r13+B_CMD], r0
        add r11, 1
        cmp r11, 6
        jlt .seg
        add r10, 1
        jmp .k
.kd:    ret

draw_motes:
        li r8, 0
.each:  li r1, mote_on
        add r1, r8
        ldb r0, [r1]
        cmp r0, 0
        jeq .next
        mov r9, r8
        shl r9, 1
        ; colour twinkles through lantern / glow / foam
        li r1, mote_ph
        add r1, r9
        ld r0, [r1]
        shr r0, 3
        modu r0, 3
        li r1, mote_cols
        add r1, r0
        ldb r0, [r1]
        st [r13+B_COL], r0
        li r1, mote_x
        add r1, r9
        ld r0, [r1]
        sar r0, FIX
        st [r13+B_X], r0
        li r1, mote_y
        add r1, r9
        ld r0, [r1]
        call mote_wobble
        st [r13+B_Y], r0
        li r0, 2
        st [r13+B_W], r0
        st [r13+B_H], r0
        li r0, BLT_FILL
        st [r13+B_CMD], r0
.next:  add r8, 1
        cmp r8, N_MOTE
        jlt .each
        ret

draw_anglers:
        li r8, 0
.each:  li r1, ang_on
        add r1, r8
        ldb r0, [r1]
        cmp r0, 0
        jeq .next
        mov r9, r8
        shl r9, 1
        call angler_pos
        ; lure glow first (behind the body)
        push r0
        push r1
        mov r2, r0
        sub r2, 1
        st [r13+B_X], r2
        mov r2, r1
        sub r2, 1
        st [r13+B_Y], r2
        li r2, 3
        st [r13+B_W], r2
        st [r13+B_H], r2
        li r2, 2
        st [r13+B_COL], r2
        li r2, BLT_FILL
        st [r13+B_CMD], r2
        pop r1
        pop r0
        li r2, angler_spr
        li r3, 16
        li r4, 12
        li r5, BLT_TRANSPARENT
        call sprite
.next:  add r8, 1
        cmp r8, N_ANG
        jlt .each
        ret

draw_player:
        ; blink while invulnerable
        li r1, state
        ld r0, [r1]
        cmp r0, ST_PLAY
        jne .show
        li r1, invuln
        ld r0, [r1]
        and r0, 4
        jne .skip
.show:  li r1, px
        ld r0, [r1]
        sar r0, FIX
        li r1, py
        ld r1, [r1]
        sar r1, FIX
        ; tail frame alternates every 8 frames, faster when swimming
        li r2, frame
        ld r2, [r2]
        and r2, 8
        li r2, fish_a
        jeq .fa
        li r2, fish_b
.fa:    li r3, PLAYER_W
        li r4, PLAYER_H
        li r5, BLT_TRANSPARENT
        call sprite
.skip:  ret

draw_hud:
        li r0, 0
        st [r13+B_COL], r0
        st [r13+B_X], r0
        st [r13+B_Y], r0
        li r0, 160
        st [r13+B_W], r0
        li r0, 9
        st [r13+B_H], r0
        li r0, BLT_FILL
        st [r13+B_CMD], r0
        li r0, 2
        li r1, 2
        li r2, s_score
        li r3, 7
        li r4, BLT_TRANSPARENT
        call text
        li r1, score
        ld r0, [r1]
        call itoa
        li r0, 26
        li r1, 2
        li r2, numbuf
        li r3, 10
        li r4, BLT_TRANSPARENT
        call text
        ; lives as little fish
        li r8, 0
.l:     li r1, lives
        ld r0, [r1]
        cmp r8, r0
        jge .ld
        mov r0, r8
        mul r0, 14
        add r0, 58
        li r1, 1
        li r2, fish_a
        li r3, PLAYER_W
        li r4, PLAYER_H
        li r5, BLT_TRANSPARENT
        call sprite
        add r8, 1
        jmp .l
.ld:    ; light meter
        li r0, 104
        li r1, 2
        li r2, s_light
        li r3, 7
        li r4, BLT_TRANSPARENT
        call text
        li r0, 126
        li r1, 3
        li r2, 32
        li r3, 3
        li r4, 1
        call fill
        li r1, energy
        ld r2, [r1]
        mul r2, 32
        divu r2, 100
        li r4, 10
        cmp r2, 8
        jgt .col
        li r4, 8                  ; coral when low
.col:   li r0, 126
        li r1, 3
        li r3, 3
        call fill
        ret

draw_title:
        li r0, 36
        li r1, 18
        li r2, s_title
        li r3, 10
        li r4, BLT_TRANSPARENT | BLT_SCALE2
        call text
        li r0, 30
        li r1, 36
        li r2, s_sub
        li r3, 5
        li r4, BLT_TRANSPARENT
        call text
        ; blinking prompt
        li r1, frame
        ld r0, [r1]
        and r0, 32
        jne .np
        li r0, 40
        li r1, 84
        li r2, s_press
        li r3, 6
        li r4, BLT_TRANSPARENT
        call text
.np:    li r0, 18
        li r1, 96
        li r2, s_help
        li r3, 7
        li r4, BLT_TRANSPARENT
        call text
        li r1, best
        ld r0, [r1]
        cmp r0, 0
        jeq .nb
        call itoa
        li r0, 58
        li r1, 104
        li r2, s_best
        li r3, 9
        li r4, BLT_TRANSPARENT
        call text
        li r0, 82
        li r1, 104
        li r2, numbuf
        li r3, 9
        li r4, BLT_TRANSPARENT
        call text
.nb:    ret

draw_over:
        li r0, 32
        li r1, 30
        li r2, s_over
        li r3, 8
        li r4, BLT_TRANSPARENT | BLT_SCALE2
        call text
        li r1, score
        ld r0, [r1]
        call itoa
        li r0, 50
        li r1, 50
        li r2, s_score
        li r3, 7
        li r4, BLT_TRANSPARENT
        call text
        li r0, 76
        li r1, 50
        li r2, numbuf
        li r3, 10
        li r4, BLT_TRANSPARENT
        call text
        li r1, best
        ld r0, [r1]
        call itoa
        li r0, 50
        li r1, 58
        li r2, s_best
        li r3, 7
        li r4, BLT_TRANSPARENT
        call text
        li r0, 76
        li r1, 58
        li r2, numbuf
        li r3, 9
        li r4, BLT_TRANSPARENT
        call text
        li r1, state_t
        ld r0, [r1]
        cmp r0, 40
        jltu .np
        li r1, frame
        ld r0, [r1]
        and r0, 32
        jne .np
        li r0, 40
        li r1, 84
        li r2, s_again
        li r3, 6
        li r4, BLT_TRANSPARENT
        call text
.np:    ret

; ---------------------------------------------------------------------------
; drawing helpers (clobber r0-r7 only)

; fill(x r0, y r1, w r2, h r3, colour r4)
fill:   st [r13+B_X], r0
        st [r13+B_Y], r1
        st [r13+B_W], r2
        st [r13+B_H], r3
        st [r13+B_COL], r4
        li r0, BLT_FILL
        st [r13+B_CMD], r0
        ret

; sprite(x r0, y r1, src r2, w r3, h r4, flags r5)
sprite: st [r13+B_X], r0
        st [r13+B_Y], r1
        st [r13+B_SRC], r2
        st [r13+B_W], r3
        st [r13+B_H], r4
        st [r13+B_FLG], r5
        li r0, BLT_SPRITE
        st [r13+B_CMD], r0
        li r0, 0
        st [r13+B_FLG], r0
        ret

; text(x r0, y r1, string r2, colour r3, flags r4)
text:   st [r13+B_X], r0
        st [r13+B_Y], r1
        st [r13+B_SRC], r2
        st [r13+B_COL], r3
        st [r13+B_FLG], r4
        li r0, BLT_TEXT
        st [r13+B_CMD], r0
        li r0, 0
        st [r13+B_FLG], r0
        ret

; itoa(r0) → numbuf = 4 zero-padded digits
itoa:   li r1, numbuf + 3
        li r2, 4
.d:     mov r3, r0
        modu r3, 10
        add r3, '0'
        stb [r1], r3
        divu r0, 10
        sub r1, 1
        sub r2, 1
        jne .d
        ret

rand:   li r0, RNG
        ld r0, [r0]
        ret

; ---------------------------------------------------------------------------
; sound: voice 0 chime, voice 1 hits, voice 2 bass, voice 3 melody
sfx_chime:
        li r1, score
        ld r0, [r1]
        modu r0, 5
        li r1, pentatonic
        shl r0, 1
        add r1, r0
        ld r0, [r1]
        li r1, SND_FREQ0
        st [r1], r0
        li r1, SND_WAVE0
        li r0, WAVE_TRIANGLE
        st [r1], r0
        li r1, SND_DECAY0
        li r0, 1
        st [r1], r0
        li r1, SND_VOL0
        li r0, 14
        st [r1], r0
        ret

sfx_hit:
        li r1, SND_FREQ1
        li r0, 180
        st [r1], r0
        li r1, SND_WAVE1
        li r0, WAVE_NOISE
        st [r1], r0
        li r1, SND_DECAY1
        li r0, 2
        st [r1], r0
        li r1, SND_VOL1
        li r0, 15
        st [r1], r0
        ret

sfx_start:
        li r1, SND_FREQ0
        li r0, 1047
        st [r1], r0
        li r1, SND_WAVE0
        li r0, WAVE_PULSE
        st [r1], r0
        li r1, SND_DECAY0
        li r0, 2
        st [r1], r0
        li r1, SND_VOL0
        li r0, 12
        st [r1], r0
        ret

sfx_over:
        li r1, SND_FREQ1
        li r0, 90
        st [r1], r0
        li r1, SND_WAVE1
        li r0, WAVE_SAW
        st [r1], r0
        li r1, SND_DECAY1
        li r0, 4
        st [r1], r0
        li r1, SND_VOL1
        li r0, 13
        st [r1], r0
        ret

; music: one melody step every 10 frames, bass every 40
music:  li r1, frame
        ld r0, [r1]
        modu r0, 10
        jne .done
        li r1, frame
        ld r0, [r1]
        divu r0, 10
        and r0, 31
        mov r8, r0
        shl r0, 1
        li r1, melody
        add r1, r0
        ld r0, [r1]
        cmp r0, 0
        jeq .bass
        li r1, SND_FREQ3
        st [r1], r0
        li r1, SND_WAVE3
        li r0, WAVE_TRIANGLE
        st [r1], r0
        li r1, SND_DECAY3
        li r0, 3
        st [r1], r0
        li r1, SND_VOL3
        li r0, 7
        st [r1], r0
.bass:  mov r0, r8
        and r0, 3
        jne .done
        mov r0, r8
        shr r0, 2
        shl r0, 1
        li r1, bassline
        add r1, r0
        ld r0, [r1]
        li r1, SND_FREQ2
        st [r1], r0
        li r1, SND_WAVE2
        li r0, WAVE_PULSE
        st [r1], r0
        li r1, SND_DECAY2
        li r0, 5
        st [r1], r0
        li r1, SND_VOL2
        li r0, 6
        st [r1], r0
.done:  ret

; ---------------------------------------------------------------------------
; data
s_title: .asciz "LUMEN DRIFT"
s_sub:   .asciz "a lanternfish in the deep"
s_press: .asciz "PRESS Z OR ENTER"
s_help:  .asciz "eat glow - flee the anglers"
s_score: .asciz "SCORE"
s_best:  .asciz "BEST"
s_light: .asciz "LIGHT"
s_over:  .asciz "LIGHTS OUT"
s_again: .asciz "PRESS Z TO DIVE"
numbuf:  .asciz "0000"
mote_cols: .byte 10, 11, 5
kelp_x:  .byte 18, 71, 133, 0
; disc bands: half-width, y-from, y-to (tenths of the radius)
bands:   .byte 10, 0, 4,  9, 4, 7,  7, 7, 9,  4, 9, 10,  0

        .align 2
pentatonic: .word 523, 587, 659, 784, 880
melody:  .word 587, 0, 698, 0, 880, 0, 784, 698
         .word 659, 0, 523, 0, 587, 0, 0, 0
         .word 440, 0, 523, 0, 698, 0, 659, 587
         .word 523, 0, 440, 0, 587, 0, 0, 0
bassline: .word 147, 117, 87, 110, 147, 117, 131, 110

sintab: .byte 0, 3, 6, 9, 12, 15, 18, 20, 23, 25, 27, 28, 30, 31, 31, 32, 32, 32, 31, 31, 30, 28, 27, 25, 23, 20, 18, 15, 12, 9, 6, 3
        .byte 0, -3, -6, -9, -12, -15, -18, -20, -23, -25, -27, -28, -30, -31, -31, -32, -32, -32, -31, -31, -30, -28, -27, -25, -23, -20, -18, -15, -12, -9, -6, -3

; lanternfish, 12x6, two tail frames (5 = photophores, 6 = eye)
fish_a: .pix "000004444000"
        .pix "300444444400"
        .pix "334444444640"
        .pix "034444444444"
        .pix "334445454440"
        .pix "300044444400"
fish_b: .pix "000004444000"
        .pix "030444444400"
        .pix "334444444640"
        .pix "334444444444"
        .pix "030445454440"
        .pix "000044444000"

; angler, 16x12, facing left: 9 stalk, A lure, 7 body, 6 teeth, 8 eye
angler_spr:
        .pix "0A00000000000000"
        .pix "0090000000000000"
        .pix "0009900000000000"
        .pix "0000097777700000"
        .pix "0007777777777000"
        .pix "0077877777777707"
        .pix "0676777777777777"
        .pix "0606777777777707"
        .pix "0666777777777700"
        .pix "0077777777777000"
        .pix "0000777777770000"
        .pix "0000007700000000"

; ---------------------------------------------------------------------------
; variables
        .align 2
frame:    .word 0
state:    .word 0
state_t:  .word 0
prev_pad: .word 0
pressed:  .word 0
score:    .word 0
best:     .word 0
lives:    .word 0
energy:   .word 0
invuln:   .word 0
flash:    .word 0
spawn_t:  .word 0
px:       .word 0
py:       .word 0
vx:       .word 0
vy:       .word 0
mote_x:   .fill N_MOTE * 2
mote_y:   .fill N_MOTE * 2
mote_ph:  .fill N_MOTE * 2
mote_on:  .fill N_MOTE
          .align 2
ang_x:    .fill N_ANG * 2
ang_by:   .fill N_ANG * 2
ang_ph:   .fill N_ANG * 2
ang_v:    .fill N_ANG * 2
ang_on:   .fill N_ANG
          .align 2
snow_x:   .fill N_SNOW * 2
snow_y:   .fill N_SNOW * 2
floor_h:  .fill 160
`,r=`// PRISM COURIER — a three-chamber crate puzzle for the LF-16.
// Arrows/WASD move. U undo, R restart, N next after clearing a chamber.
byte board[48];
byte undoBoard[48];
int player;
int oldPlayer;
int moves;
int oldMoves;
int undoReady;
int stage;
int solved;
void number(int x, int y, int n) {
  byte digits[7];
  int i=5;
  digits[6]=0;
  digits[5]='0';
  while(n>0) {
    digits[i]='0'+n%10;
    n=n/10;
    i--;
  }
  if(i==5)i=4;
  text(x,y,digits+i+1);
}
void load(byte* layout) {
  for(int i=0;i<48;i++) {
    board[i]=layout[i];
    if(board[i]=='@') {
      player=i;
      board[i]=' ';
    }
  }
  moves=0;
  undoReady=0;
  solved=0;
}
void restart() {
  if(stage==0)load("#########  .   ##  $   ##  @   ##      #########");
  if(stage==1)load("######### .  . ## $  $ ##  @   ##      #########");
  if(stage==2)load("######### . .  ## $ $  ##  #   ## @    #########");
}
int isBox(int at) {
  return board[at]=='$'||board[at]=='*';
}
int isFloor(int at) {
  return board[at]==' '||board[at]=='.';
}
void move(int dx) {
  if(solved)return;
  int target=player+dx;
  if(target<0||target>=48||board[target]=='#')return;
  int beyond=target+dx;
  if(isBox(target)) {
    if(beyond<0||beyond>=48||!isFloor(beyond))return;
  }
  for(int i=0;i<48;i++)undoBoard[i]=board[i];
  oldPlayer=player;
  oldMoves=moves;
  undoReady=1;
  if(isBox(target)) {
    if(board[beyond]=='.')board[beyond]='*';
    else board[beyond]='$';
    if(board[target]=='*')board[target]='.';
    else board[target]=' ';
    sound(0,220,9,2);
    poke(0xFF76,2);
  }
  else {
    sound(0,130,3,2);
    poke(0xFF76,1);
  }
  player=target;
  moves++;
  solved=1;
  for(int i=0;i<48;i++) {
    if(board[i]=='$')solved=0;
  }
  if(solved) {
    sound(1,660,12,2);
    poke(0xFF7E,8);
  }
}
void draw() {
  clear(0);
  color(10);
  text(4,4,"PRISM COURIER");
  color(7);
  text(4,13,"ROOM");
  number(25,13,stage+1);
  text(80,13,"MOVES");
  number(105,13,moves);
  for(int i=0;i<48;i++) {
    int x=32+(i%8)*12;
    int y=24+(i/8)*12;
    color(1);
    rect(x,y,11,11);
    if(board[i]=='#') {
      color(2);
      rect(x,y,11,11);
      color(3);
      rect(x,y,11,2);
    }
    if(board[i]=='.'||board[i]=='*') {
      color(12);
      rect(x+4,y+4,3,3);
    }
    if(isBox(i)) {
      if(board[i]=='*')color(12);
      else color(9);
      rect(x+2,y+2,7,7);
      color(10);
      rect(x+3,y+3,5,1);
    }
    if(i==player) {
      color(5);
      rect(x+3,y+2,5,7);
      pixel(x+6,y+3,6);
    }
  }
  if(solved) {
    color(11);
    if(stage<2)text(16,99,"CHAMBER CLEAR! N: NEXT");
    else text(12,99,"ALL LIGHTS HOME. YOU WIN!");
  }
  else {
    color(7);
    text(16,99,"ARROWS/WASD: MOVE CRATES");
  }
  color(4);
  text(24,109,"U: UNDO   R: RESTART");
}
int main() {
  stage=0;
  restart();
  while(1) {
    int k=key();
    if(k==128||k=='w'||k=='W')move(-8);
    if(k==129||k=='s'||k=='S')move(8);
    if(k==130||k=='a'||k=='A')move(-1);
    if(k==131||k=='d'||k=='D')move(1);
    if(k=='r'||k=='R')restart();
    if((k=='n'||k=='N')&&solved&&stage<2) {
      stage++;
      restart();
    }
    if((k=='u'||k=='U')&&undoReady) {
      for(int i=0;i<48;i++)board[i]=undoBoard[i];
      player=oldPlayer;
      moves=oldMoves;
      undoReady=0;
      solved=0;
    }
    draw();
    wait();
  }
  return 0;
}
`,i=`; ============================================================================
;  TIDEPOOL: an LF-16 audiovisual demo
;  code, graphics and music by Claude
;
;  Four scenes play in time with a four-voice chiptune (A minor: Am F C G):
;    1. caustic plasma under the title card
;    2. a bioluminescent star tunnel
;    3. a pulsing jellyfish
;    4. a sine-wave scroller
;  The scene clock is the music sequencer, so everything stays in sync and the
;  kick drum flashes the abyss colour.
;
;  Voices: 0 bass (pulse), 1 arpeggio (square), 2 melody (triangle), 3 drums (noise)
;  Registers: r13 = blitter block, r12 = back buffer (as in lumen-drift.lfa)
; ============================================================================
        .name   "Tidepool"
        .author "Claude"

BUF_A = 0x8000
BUF_B = 0xC000
STEP_FRAMES = 7              ; 16 steps per pattern ≈ 128 bpm
B_CMD = 0
B_X = 2
B_Y = 4
B_W = 6
B_H = 8
B_COL = 10
B_SRC = 12
B_FLG = 14
B_DST = 16
N_STAR = 64
CELL = 5                     ; plasma cell size in pixels (32 × 24 cells)

start:  li r13, BLT_CMD
        li r12, BUF_A
        li r1, IE
        li r0, INT_VBLANK
        st [r1], r0
        call init_stars

main:   call sequencer
        call draw_scene
        li r1, VIDEO_BASE
        st [r1], r12
        wait
        li r1, IF
        li r0, INT_VBLANK
        st [r1], r0
        li r1, frame
        ld r0, [r1]
        add r0, 1
        st [r1], r0
        xor r12, BUF_A ^ BUF_B
        jmp main

; ---------------------------------------------------------------------------
; music sequencer: advances step/pattern, plays notes, drives the scene clock
sequencer:
        ; arpeggio runs every frame across the current chord
        li r1, chord
        ld r0, [r1]
        mul r0, 8                 ; chord record: bass, a1, a2, a3 (words)
        li r2, chords
        add r2, r0
        li r1, frame
        ld r0, [r1]
        modu r0, 3
        shl r0, 1
        add r0, r2
        ld r0, [r0+2]
        li r1, SND_FREQ1
        st [r1], r0
        ; kick flash decays
        li r1, kick
        ld r0, [r1]
        cmp r0, 0
        jeq .k
        sub r0, 1
        st [r1], r0
.k:     li r1, kick
        ld r0, [r1]
        li r2, flashpal
        shl r0, 1
        add r2, r0
        ld r0, [r2]
        li r1, PALETTE0
        st [r1], r0
        ; step timing
        li r1, tick
        ld r0, [r1]
        add r0, 1
        cmp r0, STEP_FRAMES
        jltu .nostep
        li r0, 0
        st [r1], r0
        call play_step
        ret
.nostep:
        st [r1], r0
        ret

play_step:
        li r1, step
        ld r8, [r1]               ; r8 = step 0..15
        cmp r8, 0
        jne .notnew
        call new_pattern
.notnew:
        ; ---- bass on a syncopated pattern
        li r1, bass_rhythm
        add r1, r8
        ldb r0, [r1]
        cmp r0, 0
        jeq .nobass
        li r1, chord
        ld r0, [r1]
        mul r0, 8
        li r2, chords
        add r2, r0
        ld r0, [r2]
        li r1, bass_rhythm
        add r1, r8
        ldb r3, [r1]
        cmp r3, 2
        jne .b1
        shl r0, 1                 ; octave jump
.b1:    li r1, SND_FREQ0
        st [r1], r0
        li r1, SND_WAVE0
        li r0, WAVE_PULSE
        st [r1], r0
        li r1, SND_DECAY0
        li r0, 3
        st [r1], r0
        li r1, SND_VOL0
        li r0, 10
        st [r1], r0
.nobass:
        ; ---- arp voice level follows the section (quiet in the intro)
        li r1, SND_WAVE1
        li r0, WAVE_SQUARE
        st [r1], r0
        li r1, SND_DECAY1
        li r0, 0
        st [r1], r0
        li r1, section
        ld r0, [r1]
        li r1, arp_vol
        add r1, r0
        ldb r0, [r1]
        li r1, SND_VOL1
        st [r1], r0
        ; ---- drums: kick on quarters, hats on off-beats, snare-ish on 4 and 12
        mov r0, r8
        and r0, 3
        jne .nokick
        li r1, section
        ld r0, [r1]
        cmp r0, 0
        jeq .nokick               ; no drums during the intro
        li r1, SND_FREQ3
        li r0, 90
        st [r1], r0
        li r1, SND_WAVE3
        li r0, WAVE_NOISE
        st [r1], r0
        li r1, SND_DECAY3
        li r0, 1
        st [r1], r0
        li r1, SND_VOL3
        li r0, 15
        st [r1], r0
        li r1, kick
        li r0, 6
        st [r1], r0
        jmp .drumdone
.nokick:
        mov r0, r8
        and r0, 1
        jeq .drumdone
        li r1, section
        ld r0, [r1]
        cmp r0, 0
        jeq .drumdone
        li r1, SND_FREQ3
        li r0, 3000
        st [r1], r0
        li r1, SND_WAVE3
        li r0, WAVE_NOISE
        st [r1], r0
        li r1, SND_DECAY3
        li r0, 1
        st [r1], r0
        li r1, SND_VOL3
        li r0, 5
        st [r1], r0
.drumdone:
        ; ---- melody (from section 2 on)
        li r1, section
        ld r0, [r1]
        cmp r0, 2
        jltu .nomel
        li r1, chord
        ld r0, [r1]
        shl r0, 4
        add r0, r8
        shl r0, 1
        li r1, melody
        add r1, r0
        ld r0, [r1]
        cmp r0, 0
        jeq .nomel
        li r1, SND_FREQ2
        st [r1], r0
        li r1, SND_WAVE2
        li r0, WAVE_TRIANGLE
        st [r1], r0
        li r1, SND_DECAY2
        li r0, 4
        st [r1], r0
        li r1, SND_VOL2
        li r0, 11
        st [r1], r0
.nomel: ; advance
        li r1, step
        ld r0, [r1]
        add r0, 1
        and r0, 15
        st [r1], r0
        ret

; called at step 0: next chord, next pattern, maybe next scene
new_pattern:
        li r1, pattern
        ld r0, [r1]
        add r0, 1
        st [r1], r0
        sub r0, 1
        and r0, 3
        li r1, chord
        st [r1], r0
        ; section = song_map[pattern] (the song loops back after the scroller)
        li r1, pattern
        ld r0, [r1]
        sub r0, 1
        cmp r0, SONG_LEN
        jltu .in
        li r0, 2                  ; loop point: back to pattern 2
        li r1, pattern
        li r2, 3
        st [r1], r2
.in:    li r1, song_map
        add r1, r0
        ldb r0, [r1]
        li r1, section
        ld r2, [r1]
        st [r1], r0
        cmp r0, r2
        jeq .same
        li r1, scene_t
        li r0, 0
        st [r1], r0
.same:  ret

; ---------------------------------------------------------------------------
draw_scene:
        st [r13+B_DST], r12
        li r0, 0
        st [r13+B_FLG], r0
        li r1, scene_t
        ld r0, [r1]
        add r0, 1
        st [r1], r0
        li r1, section
        ld r0, [r1]
        li r1, scene_of
        add r1, r0
        ldb r0, [r1]
        cmp r0, 0
        jeq scene_plasma
        cmp r0, 1
        jeq scene_tunnel
        cmp r0, 2
        jeq scene_jelly
        jmp scene_scroller

; ---------------------------------------------------------------------------
; 1. caustic plasma: v = colT[x] + rowT[y] + diagT[x+y], mapped to a blue ramp
scene_plasma:
        li r1, frame
        ld r10, [r1]              ; t
        ; column terms
        li r8, 0
.ct:    mov r0, r8
        mul r0, 3
        add r0, r10
        call sin64
        li r1, colT
        add r1, r8
        add r1, r8
        st [r1], r0
        add r8, 1
        cmp r8, 32
        jlt .ct
        ; row terms (different speed)
        li r8, 0
.rt:    mov r0, r8
        mul r0, 4
        mov r2, r10
        shr r2, 1
        sub r0, r2
        call sin64
        li r1, rowT
        add r1, r8
        add r1, r8
        st [r1], r0
        add r8, 1
        cmp r8, 24
        jlt .rt
        ; diagonal terms
        li r8, 0
.dt:    mov r0, r8
        mul r0, 2
        mov r2, r10
        mul r2, 3
        shr r2, 1
        add r0, r2
        call sin64
        li r1, diagT
        add r1, r8
        add r1, r8
        st [r1], r0
        add r8, 1
        cmp r8, 56
        jlt .dt
        ; cells
        li r0, CELL
        st [r13+B_W], r0
        st [r13+B_H], r0
        li r9, 0                  ; cy
        li r6, BLT_FILL
.row:   mov r0, r9
        mul r0, CELL
        st [r13+B_Y], r0
        li r1, rowT
        add r1, r9
        add r1, r9
        ld r11, [r1]              ; row term
        li r8, 0                  ; cx
        li r7, 0                  ; pixel x
        li r4, colT
        li r5, diagT
        add r5, r9
        add r5, r9
.cell:  ld r0, [r4]
        add r0, r11
        ld r1, [r5]
        add r0, r1                ; -96..96
        add r0, 96
        shr r0, 5                 ; 0..6
        li r1, ramp
        add r1, r0
        ldb r0, [r1]
        st [r13+B_COL], r0
        st [r13+B_X], r7
        st [r13+B_CMD], r6
        add r4, 2
        add r5, 2
        add r7, CELL
        add r8, 1
        cmp r8, 32
        jlt .cell
        add r9, 1
        cmp r9, 24
        jlt .row
        ; title card during the intro sections
        li r1, section
        ld r0, [r1]
        cmp r0, 2
        jgeu .notitle
        li r0, 0x00
        st [r13+B_COL], r0
        li r0, 30
        st [r13+B_X], r0
        li r0, 46
        st [r13+B_Y], r0
        li r0, 100
        st [r13+B_W], r0
        li r0, 30
        st [r13+B_H], r0
        li r0, BLT_FILL
        st [r13+B_CMD], r0
        li r0, 48
        li r1, 50
        li r2, s_title
        li r3, 10
        li r4, BLT_TRANSPARENT | BLT_SCALE2
        call text
        li r0, 50
        li r1, 66
        li r2, s_by
        li r3, 5
        li r4, BLT_TRANSPARENT
        call text
.notitle:
        ret

; r0 = angle (any int) → r0 = sin * 32
sin64:  and r0, 63
        li r1, sintab
        add r1, r0
        ldbs r0, [r1]
        ret

; ---------------------------------------------------------------------------
; 2. star tunnel: 3-D points rushing toward the viewer
init_stars:
        li r8, 0
.s:     call new_star
        call rand
        and r0, 255
        add r0, 8
        li r1, star_z
        add r1, r8
        st [r1], r0
        add r8, 2
        cmp r8, N_STAR * 2
        jlt .s
        ret

; r8 = star index*2
new_star:
        call rand
        and r0, 127
        sub r0, 64
        li r1, star_x
        add r1, r8
        st [r1], r0
        call rand
        and r0, 127
        sub r0, 64
        li r1, star_y
        add r1, r8
        st [r1], r0
        li r1, star_z
        add r1, r8
        li r0, 264
        st [r1], r0
        ret

scene_tunnel:
        li r0, 0
        st [r13+B_COL], r0
        li r0, BLT_CLEAR
        st [r13+B_CMD], r0
        ; faint rings pulsing on the beat
        li r1, kick
        ld r0, [r1]
        cmp r0, 3
        jltu .norings
        li r0, 2
        st [r13+B_COL], r0
        li r0, 80
        st [r13+B_X], r0
        li r0, 0
        st [r13+B_Y], r0
        li r0, 80
        st [r13+B_W], r0
        li r0, 119
        st [r13+B_H], r0
        li r0, BLT_LINE
        st [r13+B_CMD], r0
.norings:
        li r8, 0
.each:  li r1, star_z
        add r1, r8
        ld r0, [r1]
        sub r0, 3
        st [r1], r0
        cmp r0, 6
        jgt .ok
        call new_star
        jmp .next
.ok:    mov r10, r0               ; z
        ; sx = 80 + x*48/z
        li r1, star_x
        add r1, r8
        ld r0, [r1]
        mul r0, 48
        divs r0, r10
        add r0, 80
        mov r2, r0
        li r1, star_y
        add r1, r8
        ld r0, [r1]
        mul r0, 48
        divs r0, r10
        add r0, 60
        mov r3, r0
        ; offscreen → respawn
        cmp r2, 0
        jlt .re
        cmp r2, 159
        jgt .re
        cmp r3, 0
        jlt .re
        cmp r3, 119
        jgt .re
        ; colour and size by depth
        mov r0, r10
        shr r0, 6                 ; 0..4
        li r1, star_cols
        add r1, r0
        ldb r0, [r1]
        st [r13+B_COL], r0
        st [r13+B_X], r2
        st [r13+B_Y], r3
        li r0, 1
        cmp r10, 70
        jgt .small
        li r0, 2
.small: st [r13+B_W], r0
        st [r13+B_H], r0
        li r0, BLT_FILL
        st [r13+B_CMD], r0
        jmp .next
.re:    call new_star
.next:  add r8, 2
        cmp r8, N_STAR * 2
        jlt .each
        li r0, 4
        li r1, 110
        li r2, s_tunnel
        li r3, 3
        li r4, BLT_TRANSPARENT
        call text
        ret

; ---------------------------------------------------------------------------
; 3. jellyfish: banded background, pulsing bell, trailing tentacles
scene_jelly:
        ; depth gradient
        li r9, 0
.g:     li r1, jelly_bg
        add r1, r9
        ldb r0, [r1]
        st [r13+B_COL], r0
        li r0, 0
        st [r13+B_X], r0
        mov r0, r9
        mul r0, 20
        st [r13+B_Y], r0
        li r0, 160
        st [r13+B_W], r0
        li r0, 20
        st [r13+B_H], r0
        li r0, BLT_FILL
        st [r13+B_CMD], r0
        add r9, 1
        cmp r9, 6
        jlt .g
        ; bell radius pulses with the kick
        li r1, kick
        ld r10, [r1]
        add r10, 22               ; radius
        ; centre drifts on a slow sine
        li r1, frame
        ld r0, [r1]
        shr r0, 2
        call sin64
        sar r0, 1
        add r0, 80
        mov r8, r0                ; cx
        li r1, frame
        ld r0, [r1]
        shr r0, 1
        add r0, 16
        call sin64
        sar r0, 2
        add r0, 44
        mov r9, r0                ; cy (bell rim)
        ; tentacles first (behind the bell)
        li r11, 0
.t:     ; tentacle x0 = cx - r + 6 + i*(2r-12)/6
        mov r0, r10
        shl r0, 1
        sub r0, 12
        mul r0, r11
        divu r0, 6
        add r0, r8
        sub r0, r10
        add r0, 6
        mov r6, r0                ; x base
        li r7, 0                  ; segment
        mov r5, r9                ; y
        mov r4, r6                ; previous x
.seg:   li r1, frame
        ld r0, [r1]
        mov r2, r7
        mul r2, 7
        sub r0, r2
        mov r2, r11
        mul r2, 11
        add r0, r2
        call sin64
        mul r0, r7
        sar r0, 4
        add r0, r6
        st [r13+B_X], r4
        st [r13+B_Y], r5
        st [r13+B_W], r0
        mov r4, r0
        add r5, 8
        st [r13+B_H], r5
        mov r0, r7
        li r1, tent_cols
        add r1, r0
        ldb r0, [r1]
        st [r13+B_COL], r0
        li r0, BLT_LINE
        st [r13+B_CMD], r0
        add r7, 1
        cmp r7, 7
        jlt .seg
        add r11, 1
        cmp r11, 7
        jlt .t
        ; bell: nested half-discs from rim upward
        mov r2, r10
        li r3, 15
        call dome
        mov r2, r10
        mul r2, 3
        shr r2, 2
        li r3, 5
        call dome
        mov r2, r10
        shr r2, 1
        li r3, 11
        call dome
        ; rim highlight
        li r0, 6
        st [r13+B_COL], r0
        mov r0, r8
        sub r0, r10
        st [r13+B_X], r0
        st [r13+B_Y], r9
        mov r0, r8
        add r0, r10
        st [r13+B_W], r0
        st [r13+B_H], r9
        li r0, BLT_LINE
        st [r13+B_CMD], r0
        li r0, 4
        li r1, 110
        li r2, s_jelly
        li r3, 5
        li r4, BLT_TRANSPARENT
        call text
        ret

; dome(centre r8, rim y r9, radius r2, colour r3): upper half-disc from 4 bands
dome:   push r10
        mov r10, r2
        st [r13+B_COL], r3
        li r7, dome_bands
.b:     ldb r4, [r7]              ; half-width (tenths)
        cmp r4, 0
        jeq .d
        ldb r5, [r7+1]            ; height from rim (tenths)
        mul r4, r10
        divu r4, 10
        mul r5, r10
        divu r5, 10
        mov r0, r8
        sub r0, r4
        st [r13+B_X], r0
        shl r4, 1
        st [r13+B_W], r4
        mov r0, r9
        sub r0, r5
        st [r13+B_Y], r0
        st [r13+B_H], r5
        li r0, BLT_FILL
        st [r13+B_CMD], r0
        add r7, 2
        jmp .b
.d:     pop r10
        ret

; ---------------------------------------------------------------------------
; 4. scroller: each character rides a sine wave, colours cycle
scene_scroller:
        li r0, 1
        st [r13+B_COL], r0
        li r0, BLT_CLEAR
        st [r13+B_CMD], r0
        ; horizon lines
        li r9, 0
.h:     mov r0, r9
        mul r0, r9
        add r0, 70
        st [r13+B_Y], r0
        st [r13+B_H], r0
        li r0, 0
        st [r13+B_X], r0
        li r0, 159
        st [r13+B_W], r0
        li r0, 2
        st [r13+B_COL], r0
        li r0, BLT_LINE
        st [r13+B_CMD], r0
        add r9, 1
        cmp r9, 7
        jlt .h
        ; scroll offset in pixels
        li r1, scene_t
        ld r10, [r1]
        shl r10, 1                ; 2 px per frame
        li r0, BLT_SCALE2 | BLT_TRANSPARENT
        st [r13+B_FLG], r0
        ; first visible char index = scroll / 8
        mov r8, r10
        shr r8, 3
        li r11, 0                 ; on-screen slot
.c:     mov r0, r8
        add r0, r11
        li r1, scroll_len
        ld r1, [r1]
        cmp r0, r1
        jgeu .wrap
        li r1, scroll_text
        add r1, r0
        ldb r2, [r1]
        ; x = slot*8 - (scroll & 7) + 160 - 160 (text starts off the right edge)
        mov r0, r11
        shl r0, 3
        mov r1, r10
        and r1, 7
        sub r0, r1
        st [r13+B_X], r0
        ; y = 30 + sin((index*5 + frame*2)) / 3
        mov r0, r8
        add r0, r11
        mul r0, 5
        li r1, frame
        ld r1, [r1]
        shl r1, 1
        add r0, r1
        call sin64
        divs r0, 3
        add r0, 30
        st [r13+B_Y], r0
        st [r13+B_SRC], r2
        mov r0, r8
        add r0, r11
        li r1, frame
        ld r1, [r1]
        shr r1, 2
        add r0, r1
        and r0, 3
        li r1, scroll_cols
        add r1, r0
        ldb r0, [r1]
        st [r13+B_COL], r0
        li r0, BLT_CHAR
        st [r13+B_CMD], r0
.skip:  add r11, 1
        cmp r11, 21
        jlt .c
        li r0, 0
        st [r13+B_FLG], r0
        ret
.wrap:  ; restart the scroller seamlessly
        li r1, scene_t
        li r0, 0
        st [r1], r0
        li r0, 0
        st [r13+B_FLG], r0
        ret

; ---------------------------------------------------------------------------
text:   st [r13+B_X], r0
        st [r13+B_Y], r1
        st [r13+B_SRC], r2
        st [r13+B_COL], r3
        st [r13+B_FLG], r4
        li r0, BLT_TEXT
        st [r13+B_CMD], r0
        li r0, 0
        st [r13+B_FLG], r0
        ret

rand:   li r0, RNG
        ld r0, [r0]
        ret

; ---------------------------------------------------------------------------
; data
s_title:  .asciz "TIDEPOOL"
s_by:     .asciz "an LF-16 demo"
s_tunnel: .asciz "into the photic dark"
s_jelly:  .asciz "aurelia aurita"
ramp:       .byte 0, 1, 2, 3, 4, 5, 6
star_cols:  .byte 6, 5, 4, 3, 2
jelly_bg:   .byte 3, 2, 2, 1, 1, 0
tent_cols:  .byte 15, 15, 5, 5, 4, 3, 2
scroll_cols: .byte 10, 9, 8, 15
arp_vol:    .byte 0, 3, 4, 5, 5, 4
; section per pattern: 0 intro, 1 plasma+drums, 2 tunnel, 3 tunnel+, 4 jelly, 5 scroller
song_map:   .byte 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5
SONG_LEN = 16
scene_of:   .byte 0, 0, 1, 1, 2, 3
; bass rhythm: 1 = root, 2 = octave
bass_rhythm: .byte 1, 0, 0, 1, 0, 0, 2, 0, 1, 0, 0, 1, 0, 2, 0, 0
; dome bands: half-width, height (tenths of radius), widest first
dome_bands: .byte 10, 3,  9, 5,  7, 7,  4, 9,  0

        .align 2
; chord records: bass, arp1, arp2, arp3  (Am F C G)
chords: .word 110, 440, 523, 659
        .word  87, 349, 440, 523
        .word 131, 330, 392, 523
        .word  98, 392, 494, 587
; melody: 16 steps per chord (0 = rest)
melody: .word 659, 0, 0, 880, 0, 784, 659, 0, 587, 0, 523, 0, 587, 0, 659, 0
        .word 523, 0, 0, 440, 0, 523, 587, 0, 659, 0, 0, 0, 587, 523, 0, 0
        .word 659, 0, 784, 0, 659, 0, 587, 523, 0, 0, 659, 0, 784, 0, 880, 0
        .word 784, 0, 0, 0, 659, 0, 587, 0, 0, 0, 494, 0, 587, 0, 0, 0
flashpal: .word 0x012, 0x012, 0x013, 0x124, 0x135, 0x146, 0x257
scroll_len: .word SCROLL_END - scroll_text
scroll_text:
        .ascii "                     TIDEPOOL * AN LF-16 DEMO * CODE, PIXELS AND MUSIC BY CLAUDE * "
        .ascii "EVERY EFFECT HERE IS THE BLITTER: FILL, LINE, CHAR, TEXT * "
        .ascii "THE STARS DIVIDE BY Z, THE JELLYFISH IS SEVEN WAVY LINES AND THREE DOMES * "
        .ascii "HELLO TO CODEX, WHO WROTE THE GLINT COMPILER THIS MACHINE RUNS * "
        .ascii "THANKS FOR WATCHING THE TIDE COME IN ...                     "
SCROLL_END:

sintab: .byte 0, 3, 6, 9, 12, 15, 18, 20, 23, 25, 27, 28, 30, 31, 31, 32, 32, 32, 31, 31, 30, 28, 27, 25, 23, 20, 18, 15, 12, 9, 6, 3
        .byte 0, -3, -6, -9, -12, -15, -18, -20, -23, -25, -27, -28, -30, -31, -31, -32, -32, -32, -31, -31, -30, -28, -27, -25, -23, -20, -18, -15, -12, -9, -6, -3

        .align 2
frame:   .word 0
tick:    .word STEP_FRAMES - 1
step:    .word 0
pattern: .word 0
chord:   .word 0
section: .word 0
scene_t: .word 0
kick:    .word 0
colT:    .fill 64
rowT:    .fill 48
diagT:   .fill 112
star_x:  .fill N_STAR * 2
star_y:  .fill N_STAR * 2
star_z:  .fill N_STAR * 2
`,a=`// LANTERNFISH MONITOR: runs on LF-16, communicates over SERIAL_IN/OUT.
// Mutable user workspace: 0x8000–0xAFFF. Monitor runs below it.
byte input[128];
int cursor;
int bad;
void hexDigit(int n) {
  if(n<10)putc('0'+n);
  else putc('A'+n-10);
}
void hexByte(int n) {
  hexDigit((n>>4)&15);
  hexDigit(n&15);
}
void hexWord(int n) {
  hexByte((n>>8)&255);
  hexByte(n&255);
}
int digit(int c) {
  if(c>='0'&&c<='9')return c-'0';
  if(c>='A'&&c<='F')return c-'A'+10;
  if(c>='a'&&c<='f')return c-'a'+10;
  return -1;
}
void spaces() {
  while(input[cursor]==' '||input[cursor]==9)cursor++;
}
int word() {
  spaces();
  int value=0;
  int count=0;
  while(digit(input[cursor])>=0) {
    value=(value<<4)|digit(input[cursor]);
    cursor++;
    count++;
  }
  if(count==0||count>4)bad=1;
  return value;
}
int allowed(int a) {
  return (a&0xC000)==0x8000 && (a&0xF000)!=0xB000;
}
void help() {
  puts("LANTERNFISH MONITOR 1.0\\n");
  puts("h               help\\nd ADDR COUNT    dump bytes (max 80 hex)\\np ADDR BYTE     poke\\nf ADDR COUNT BYTE  fill\\nl ADDR HEXBYTES load contiguous hex pairs\\ng ADDR          call code (RET returns)\\n");
  puts("All numbers hex. Write/run area 8000-AFFF.\\nExample: l 8000 00302A007030A0FF705300000003\\nThen g 8000 prints 42 and returns.\\n");
}
void execute(int address) {
  asm {
    ld r0, [fp-2]
    call r0
  }
}
void command() {
  cursor=1;
  bad=0;
  int cmd=input[0];
  if(cmd=='h'||cmd=='?') {
    help();
    return;
  }
  if(cmd=='d') {
    int addr=word();
    int count=word();
    if(bad||count<1||count>128) {
      puts("ERR dump arguments\\n");
      return;
    }
    for(int i=0;i<count;i++) {
      if(i%16==0) {
        hexWord(addr+i);
        puts(": ");
      }
      hexByte(peekb(addr+i));
      putc(' ');
      if(i%16==15)putc(10);
    }
    if(count%16)putc(10);
    return;
  }
  if(cmd=='p'||cmd=='f') {
    int addr=word();
    int count=1;
    if(cmd=='f')count=word();
    int value=word();
    if(bad||count<1||count>4096||!allowed(addr)||!allowed(addr+count-1)) {
      puts("ERR write range/arguments\\n");
      return;
    }
    for(int i=0;i<count;i++)pokeb(addr+i,value);
    puts("OK\\n");
    return;
  }
  if(cmd=='l') {
    int addr=word();
    spaces();
    int start=cursor;
    int count=0;
    while(input[cursor]) {
      if(input[cursor]==32||input[cursor]==9) {
        spaces();
        if(input[cursor])bad=1;
        break;
      }
      if(digit(input[cursor])<0||digit(input[cursor+1])<0) {
        bad=1;
        break;
      }
      count++;
      cursor+=2;
    }
    if(bad||count==0||!allowed(addr)||!allowed(addr+count-1)) {
      puts("ERR hex loader\\n");
      return;
    }
    cursor=start;
    for(int i=0;i<count;i++) {
      pokeb(addr+i,digit(input[cursor])*16+digit(input[cursor+1]));
      cursor+=2;
    }
    puts("LOADED ");
    hexWord(count);
    putc(10);
    return;
  }
  if(cmd=='g') {
    int addr=word();
    if(bad||!allowed(addr)||(addr&1)) {
      puts("ERR run address\\n");
      return;
    }
    puts("RUN\\n");
    execute(addr);
    puts("RETURN\\n");
    return;
  }
  puts("ERR unknown command; h for help\\n");
}
int main() {
  clear(0);
  color(10);
  text(8,12,"LANTERNFISH MONITOR");
  color(5);
  text(8,30,"A REAL LF-16 PROGRAM");
  color(7);
  text(8,48,"USE THE SERIAL CONSOLE");
  text(8,60,"H FOR HELP");
  text(8,78,"WORKSPACE: 8000-AFFF");
  help();
  while(1) {
    puts("lf> ");
    int length=0;
    int overflow=0;
    int c=0;
    while(c!=10&&c!=13) {
      c=serial();
      if(c==0)continue;
      if(c==8||c==127) {
        if(length>0) {
          length--;
          putc(8);
          putc(32);
          putc(8);
        }
        continue;
      }
      if(c!=10&&c!=13) {
        if(length<126) {
          input[length]=c;
          length++;
          putc(c);
        }
        else overflow=1;
      }
    }
    input[length]=0;
    putc(10);
    if(overflow)puts("ERR line too long\\n");
    else if(length>0)command();
  }
  return 0;
}
`,o=`00000 22202 55000 57575 36236 51245 25253 22000 12221 42224 05250 02720 00024 00700 00002 11244 75557 26227 61247 61216 55711 74616 34757 71244 75757 75716 02020 02024 12421 07070 42124 61202 25543 25755 65656 34443 65556 74647 74644 34553 55755 72227 11152 55655 44447 57755 65555 25552 65644 25563 65655 34216 72222 55557 55552 55775 55255 55222 71247 64446 44211 31113 25000 00007 42000 03553 44656 03443 11353 03743 12722 35316 44655 20222 10116 45655 62227 06755 00655 02552 06564 03531 03444 03216 27223 00557 00552 00577 00525 05316 07247 32623 22222 62326 03600`,s=new Uint8Array(475);o.split(` `).forEach((e,t)=>{for(let n=0;n<5;n++)s[t*5+n]=e.charCodeAt(n)-48});function c(e,t){return e<32||e>126||t<0||t>4?0:s[(e-32)*5+t]}var l=66666,u=49152,d=[18,292,567,618,941,2287,4095,2185,3924,4003,4072,2278,969,1430,2387,3182],f={PALETTE:65280,PAD:65312,KEY:65314,KEYSTAT:65316,FRAME:65328,CYCLO:65330,CYCHI:65332,TIMER:65334,RNG:65336,RNGSEED:65338,IE:65344,IF:65346,IVEC:65348,VIDEO_BASE:65350,BLT_CMD:65360,BLT_X:65362,BLT_Y:65364,BLT_W:65366,BLT_H:65368,BLT_COLOR:65370,BLT_SRC:65372,BLT_FLAGS:65374,BLT_DST:65376,SND:65392,SERIAL_OUT:65424,SERIAL_IN:65426,SERIAL_STAT:65428,DEBUG_NUM:65440,DEBUG_HEX:65442,POWER:65444},p=e=>e&32768?e-65536:e,m=new Uint8Array(256);for(let e=48;e<=69;e++)m[e]=1;m[66]=0,m[67]=0;for(let e of[80,81,82,83,84,85,96,98,100])m[e]=1;var h=class{mem=new Uint8Array(65536);r=new Uint16Array(16);pc=0;fZ=0;fN=0;fC=0;fV=0;fI=0;status=`running`;cycles=0;frameCycle=0;frame=0;instructions=0;palette=new Uint16Array(d);pad=0;keyQueue=[];serialIn=[];serialOut=[];onSerial;timerPeriod=0;timerAcc=0;rng=44257;ie=0;ifl=0;ivec=0;videoBase=u;displayBase=u;blt={x:0,y:0,w:0,h:0,color:0,src:0,flags:0,dst:u};voices=[0,1,2,3].map(()=>({freq:0,vol:0,wave:0,decay:0,decayCount:0}));stall=0;constructor(e,t=0,n=t){this.reset(e,t,n)}reset(e,t=0,n=t){this.mem.fill(0),e&&this.mem.set(e.subarray(0,65536-t),t),this.r.fill(0),this.r[15]=49152,this.pc=n&65535,this.fZ=this.fN=this.fC=this.fV=this.fI=0,this.status=`running`,this.cycles=this.frameCycle=this.frame=this.instructions=0,this.palette.set(d),this.pad=0,this.keyQueue=[],this.serialIn=[],this.serialOut=[],this.timerPeriod=this.timerAcc=0,this.rng=44257,this.ie=this.ifl=this.ivec=0,this.videoBase=this.displayBase=u,this.blt={x:0,y:0,w:0,h:0,color:0,src:0,flags:0,dst:u};for(let e of this.voices)e.freq=e.vol=e.wave=e.decay=e.decayCount=0}get flags(){return this.fZ|this.fN<<1|this.fC<<2|this.fV<<3|this.fI<<4}set flags(e){this.fZ=e&1,this.fN=e>>1&1,this.fC=e>>2&1,this.fV=e>>3&1,this.fI=e>>4&1}read8(e){if(e&=65535,e>=65280){let t=this.ioRead(e&-2);return e&1?t>>8:t&255}return this.mem[e]}read16(e){return e&=65535,e>=65279?e>=65280&&!(e&1)?this.ioRead(e):this.read8(e)|this.read8(e+1)<<8:this.mem[e]|this.mem[e+1]<<8}write8(e,t){if(e&=65535,e>=65280){let n=e&-2,r=this.ioPeek(n);this.ioWrite(n,e&1?r&255|(t&255)<<8:r&65280|t&255);return}this.mem[e]=t}write16(e,t){if(e&=65535,e>=65279){if(e>=65280&&!(e&1)){this.ioWrite(e,t&65535);return}this.write8(e,t&255),this.write8(e+1,t>>8&255);return}this.mem[e]=t,this.mem[e+1]=t>>8}peek8(e){if(e&=65535,e>=65280){let t=this.ioPeek(e&-2);return e&1?t>>8:t&255}return this.mem[e]}peek16(e){return this.peek8(e)|this.peek8(e+1)<<8}ioPeek(e){if(e<65312)return this.palette[e-65280>>1];if(e>=f.SND&&e<f.SND+32){let t=this.voices[e-f.SND>>3];return[t.freq,t.vol,t.wave,t.decay][e-f.SND>>1&3]}switch(e){case f.PAD:return this.pad;case f.KEY:return this.keyQueue.length?this.keyQueue[0]:0;case f.KEYSTAT:return this.keyQueue.length;case f.FRAME:return this.frame&65535;case f.CYCLO:return this.cycles&65535;case f.CYCHI:return Math.floor(this.cycles/65536)&65535;case f.TIMER:return this.timerPeriod;case f.RNG:return this.rng;case f.IE:return this.ie;case f.IF:return this.ifl;case f.IVEC:return this.ivec;case f.VIDEO_BASE:return this.videoBase;case f.BLT_X:return this.blt.x;case f.BLT_Y:return this.blt.y;case f.BLT_W:return this.blt.w;case f.BLT_H:return this.blt.h;case f.BLT_COLOR:return this.blt.color;case f.BLT_SRC:return this.blt.src;case f.BLT_FLAGS:return this.blt.flags;case f.BLT_DST:return this.blt.dst;case f.SERIAL_IN:return this.serialIn.length?this.serialIn[0]:0;case f.SERIAL_STAT:return this.serialIn.length}return 0}ioRead(e){switch(e){case f.KEY:return this.keyQueue.length?this.keyQueue.shift():0;case f.SERIAL_IN:return this.serialIn.length?this.serialIn.shift():0;case f.RNG:{let e=this.rng;return e^=e<<7&65535,e^=e>>9,e^=e<<8&65535,this.rng=e,e}}return this.ioPeek(e)}ioWrite(e,t){if(e<65312){this.palette[e-65280>>1]=t&4095;return}if(e>=f.SND&&e<f.SND+32){let n=this.voices[e-f.SND>>3];switch(e-f.SND>>1&3){case 0:n.freq=t;break;case 1:n.vol=Math.min(t,15),n.decayCount=0;break;case 2:n.wave=t;break;case 3:n.decay=t,n.decayCount=0}return}switch(e){case f.TIMER:this.timerPeriod=t,this.timerAcc=0;break;case f.RNGSEED:this.rng=t||44257;break;case f.IE:this.ie=t;break;case f.IF:this.ifl&=~t;break;case f.IVEC:this.ivec=t;break;case f.VIDEO_BASE:this.videoBase=t;break;case f.BLT_CMD:this.blit(t);break;case f.BLT_X:this.blt.x=t;break;case f.BLT_Y:this.blt.y=t;break;case f.BLT_W:this.blt.w=t;break;case f.BLT_H:this.blt.h=t;break;case f.BLT_COLOR:this.blt.color=t;break;case f.BLT_SRC:this.blt.src=t;break;case f.BLT_FLAGS:this.blt.flags=t;break;case f.BLT_DST:this.blt.dst=t;break;case f.SERIAL_OUT:this.emit(t&255);break;case f.DEBUG_NUM:this.emitString(String(t&32768?t-65536:t)+`
`);break;case f.DEBUG_HEX:this.emitString(`0x`+t.toString(16).toUpperCase().padStart(4,`0`)+`
`);break;case f.POWER:t===3565&&(this.status=`halted`)}}emit(e){this.serialOut.push(e),this.serialOut.length>65536&&this.serialOut.splice(0,32768),this.onSerial?.(e)}emitString(e){for(let t=0;t<e.length;t++)this.emit(e.charCodeAt(t))}serialText(){return String.fromCharCode(...this.serialOut)}pressKey(e){this.keyQueue.push(e&65535),this.ifl|=4}sendSerial(e){let t=typeof e==`string`?Array.from(e,e=>e.charCodeAt(0)&255):e;t.length&&(this.serialIn.push(...t),this.ifl|=8)}px(e,t,n,r){if(t<0||n<0||t>=160||n>=120)return;let i=e+n*80+(t>>1)&65535;this.mem[i]=t&1?this.mem[i]&240|r:this.mem[i]&15|r<<4}blit(e){let t=this.blt,n=e=>e&32768?e-65536:e,r=n(t.x),i=n(t.y),a=t.w,o=t.h,s=t.color&15,c=t.color>>4&15,l=t.flags&1,u=t.flags&2,d=t.flags&4,f=t.flags&8?2:1,p=t.dst,m=(e,t,n,r)=>Math.max(0,Math.min(e+n,160)-Math.max(e,0))*Math.max(0,Math.min(t+r,120)-Math.max(t,0)),h=0;switch(e){case 1:{let e=Math.max(r,0),t=Math.max(i,0),n=Math.min(r+a,160),c=Math.min(i+o,120);for(let r=t;r<c;r++)for(let t=e;t<n;t++)this.px(p,t,r,s);h=m(r,i,a,o);break}case 2:{let e=a+1>>1;for(let n=0;n<o;n++)for(let s=0;s<a;s++){let c=this.mem[t.src+n*e+(s>>1)&65535],m=s&1?c&15:c>>4;if(l&&m===0)continue;let h=u?a-1-s:s,g=d?o-1-n:n;for(let e=0;e<f;e++)for(let t=0;t<f;t++)this.px(p,r+h*f+t,i+g*f+e,m)}h=m(r,i,a*f,o*f);break}case 3:h=this.drawChar(p,r,i,t.src,s,c,l,f);break;case 4:{let e=r,t=i,c=n(a),l=n(o),u=Math.abs(c-e),d=e<c?1:-1,f=-Math.abs(l-t),m=t<l?1:-1,g=u+f;for(let n=0;n<4096&&(this.px(p,e,t,s),h++,e!==c||t!==l);n++){let n=2*g;n>=f&&(g+=f,e+=d),n<=u&&(g+=u,t+=m)}break}case 5:this.px(p,r,i,s),h=1;break;case 6:{let e=s|s<<4;for(let t=0;t<9600;t++)this.mem[p+t&65535]=e;h=19200;break}case 7:{let e=r,n=i,a=4*f,o=6*f;for(let i=0;i<4096;i++){let u=this.mem[t.src+i&65535];if(u===0)break;if(u===10){e=r,n+=o;continue}h+=this.drawChar(p,e,n,u,s,c,l,f),e+=a}t.x=e&65535,t.y=n&65535;break}default:return}this.stall+=8+Math.ceil(h/4)}drawChar(e,t,n,r,i,a,o,s){for(let l=0;l<6;l++){let u=c(r,l);for(let r=0;r<4;r++){let c=r<3&&u>>2-r&1;if(!c&&o)continue;let d=c?i:a;for(let i=0;i<s;i++)for(let a=0;a<s;a++)this.px(e,t+r*s+a,n+l*s+i,d)}}return 24*s*s}advance(e){if(this.cycles+=e,this.frameCycle+=e,this.timerPeriod){this.timerAcc+=e;let t=this.timerPeriod*256;this.timerAcc>=t&&(this.timerAcc%=t,this.ifl|=2)}this.frameCycle>=66666&&(this.frameCycle-=l,this.endFrame())}frameDone=!1;endFrame(){this.frame++,this.displayBase=this.videoBase,this.ifl|=1;for(let e of this.voices)e.decay&&e.vol>0&&++e.decayCount>=e.decay&&(e.decayCount=0,e.vol--);this.frameDone=!0}push(e){this.r[15]=this.r[15]-2&65535,this.write16(this.r[15],e)}pop(){let e=this.read16(this.r[15]);return this.r[15]=this.r[15]+2&65535,e}cond(e){switch(e){case 0:return this.fZ;case 1:return this.fZ^1;case 2:return this.fN^this.fV;case 3:return this.fN^this.fV^1;case 4:return this.fZ|this.fN^this.fV;case 5:return(this.fZ|this.fN^this.fV)^1;case 6:return this.fC;case 7:return this.fC^1;case 8:return this.fC|this.fZ;case 9:return(this.fC|this.fZ)^1;case 10:return this.fN;case 11:return this.fN^1;case 12:return this.fV;case 13:return this.fV^1;case 14:return 1}return-1}zn(e){this.fZ=+(e===0),this.fN=e>>15}logic(e){return e&=65535,this.zn(e),this.fC=0,this.fV=0,e}addf(e,t,n){let r=e+t+n,i=r&65535;return this.zn(i),this.fC=+(r>65535),this.fV=~(e^t)&(e^i)&32768?1:0,i}subf(e,t,n){let r=e-t-n,i=r&65535;return this.zn(i),this.fC=+(r<0),this.fV=(e^t)&(e^i)&32768?1:0,i}alu(e,t,n){switch(e){case 16:return n;case 17:return this.addf(t,n,0);case 18:return this.addf(t,n,this.fC);case 19:return this.subf(t,n,0);case 20:return this.subf(t,n,this.fC);case 21:return this.logic(t&n);case 22:return this.logic(t|n);case 23:return this.logic(t^n);case 24:case 25:case 26:{let r=n&15,i,a=0;return e===24?(i=t<<r&65535,r&&(a=t>>16-r&1)):e===25?(i=t>>>r,r&&(a=t>>r-1&1)):(i=p(t)>>r&65535,r&&(a=p(t)>>r-1&1)),this.zn(i),this.fC=a,this.fV=0,i}case 27:return this.stall+=3,this.logic(Math.imul(t,n));case 28:return this.stall+=12,this.logic(n===0?65535:Math.floor(t/n));case 29:return this.stall+=12,this.logic(n===0?t:t%n);case 30:return this.stall+=12,this.logic(n===0?65535:Math.trunc(p(t)/p(n)));case 31:return this.stall+=12,this.logic(n===0?t:p(t)%p(n));case 32:return this.subf(t,n,0),-1;case 33:return this.logic(t&n),-1;case 34:return this.logic(~n);case 35:return this.subf(0,n,0);case 36:return this.stall+=3,this.logic(Math.floor(t*n/65536));case 37:return this.stall+=3,this.logic(Math.floor(p(t)*p(n)/65536))}return-2}step(){if(this.status!==`running`&&this.status!==`waiting`&&this.status!==`break`)return 0;this.status===`break`&&(this.status=`running`);let e=this.ie&this.ifl;if(this.status===`waiting`){if(!e){let e=l-this.frameCycle;return this.timerPeriod&&(e=Math.min(e,this.timerPeriod*256-this.timerAcc)),e=Math.max(1,e),this.advance(e),e}this.status=`running`}if(e&&this.fI)return this.push(this.flags),this.push(this.pc),this.fI=0,this.pc=this.ivec,this.advance(6),6;let t=this.pc;if(t&1)return this.status=`fault`,0;let n=this.read16(t),r=n>>8,i=n>>4&15,a=n&15,o=1,s=0,c=t+2&65535;m[r]&&(s=this.read16(c),c=c+2&65535,o=2),this.stall=0;let u=this.r;if(this.pc=c,r>=16&&r<=37){let e=this.alu(r,u[i],u[a]);if(e===-2)return this.status=`illegal`,this.pc=t,0;e>=0&&(u[i]=e)}else if(r>=48&&r<=69&&r!==66&&r!==67){let e=this.alu(r-32,u[i],s);if(e===-2)return this.status=`illegal`,this.pc=t,0;e>=0&&(u[i]=e)}else switch(r){case 0:break;case 1:this.status=`halted`;break;case 2:this.status=`break`;break;case 3:this.pc=this.pop(),o+=1;break;case 4:this.pc=this.pop(),this.flags=this.pop(),o+=2;break;case 5:this.fI=1;break;case 6:this.fI=0;break;case 7:this.ie&this.ifl||(this.status=`waiting`);break;case 80:u[i]=this.read16(u[a]+s),o++;break;case 81:u[i]=this.read8(u[a]+s),o++;break;case 82:{let e=this.read8(u[a]+s);u[i]=e&128?e|65280:e,o++;break}case 83:this.write16(u[i]+s,u[a]),o++;break;case 84:this.write8(u[i]+s,u[a]&255),o++;break;case 85:u[i]=u[a]+s&65535;break;case 88:this.push(u[a]),o++;break;case 89:u[i]=this.pop(),o++;break;case 90:this.push(this.flags),o++;break;case 91:this.flags=this.pop(),o++;break;case 96:this.pc=s,o++;break;case 97:this.pc=u[a],o++;break;case 98:this.push(c),this.pc=s,o+=2;break;case 99:{let e=u[a];this.push(c),this.pc=e,o+=2;break}case 100:{let e=this.cond(i);if(e<0)return this.status=`illegal`,this.pc=t,0;e&&(this.pc=s,o++);break}case 101:{let e=this.cond(a);if(e<0)return this.status=`illegal`,this.pc=t,0;u[i]=e;break}default:return this.status=`illegal`,this.pc=t,0}return o+=this.stall,this.instructions++,this.advance(o),o}runFrame(e){this.frameDone=!1;let t=!0;if(!e||e.size===0){for(this.status===`break`&&(this.status=`running`);!this.frameDone;){let e=this.status;if(e!==`running`&&e!==`waiting`)return`stopped`;this.step()}return`frame`}for(;!this.frameDone;){let n=this.status;if(n!==`running`&&n!==`waiting`){if(n===`break`&&t)this.status=`running`;else return`stopped`}if(e&&!t&&e.has(this.pc)&&this.status===`running`)return`breakpoint`;t=!1,this.step()}return`frame`}runFrames(e){for(let t=0;t<e&&this.runFrame()!==`stopped`;t++);return this.status}renderRGBA(e,t=this.displayBase){let n=[];for(let e=0;e<16;e++){let t=this.palette[e];n.push([(t>>8&15)*17,(t>>4&15)*17,(t&15)*17])}let r=0;for(let i=0;i<120;i++)for(let a=0;a<80;a++){let o=this.mem[t+i*80+a&65535];for(let t of[o>>4,o&15]){let i=n[t];e[r++]=i[0],e[r++]=i[1],e[r++]=i[2],e[r++]=255}}}stateHash(){let e=2166136261,t=t=>{e^=t&255,e=Math.imul(e,16777619)};for(let e=0;e<65536;e++)t(this.mem[e]);for(let e=0;e<16;e++)t(this.r[e]),t(this.r[e]>>8);for(let e of[this.pc,this.flags,this.cycles,this.frame,this.ifl,this.rng])t(e),t(e>>8),t(e>>16);for(let e of this.voices)t(e.freq),t(e.freq>>8),t(e.vol),t(e.wave);return(e>>>0).toString(16).padStart(8,`0`)}},g={SCREEN:49152,SCREEN_W:160,SCREEN_H:120,BLT_FILL:1,BLT_SPRITE:2,BLT_CHAR:3,BLT_LINE:4,BLT_PIXEL:5,BLT_CLEAR:6,BLT_TEXT:7,BLT_TRANSPARENT:1,BLT_FLIPX:2,BLT_FLIPY:4,BLT_SCALE2:8,INT_VBLANK:1,INT_TIMER:2,INT_KEY:4,INT_SERIAL:8,BTN_UP:1,BTN_DOWN:2,BTN_LEFT:4,BTN_RIGHT:8,BTN_A:16,BTN_B:32,BTN_START:64,BTN_SELECT:128,WAVE_SQUARE:0,WAVE_PULSE:1,WAVE_TRIANGLE:2,WAVE_SAW:3,WAVE_NOISE:4};for(let[e,t]of Object.entries(f))e!==`SND`&&(g[e]=t);for(let e=0;e<16;e++)g[`PALETTE${e}`]=65280+e*2;for(let e=0;e<4;e++)g[`SND_FREQ${e}`]=65392+e*8,g[`SND_VOL${e}`]=65394+e*8,g[`SND_WAVE${e}`]=65396+e*8,g[`SND_DECAY${e}`]=65398+e*8;var _={eq:0,z:0,ne:1,nz:1,lt:2,ge:3,le:4,gt:5,ltu:6,c:6,geu:7,nc:7,leu:8,gtu:9,mi:10,pl:11,vs:12,vc:13,al:14},v=[`eq`,`ne`,`lt`,`ge`,`le`,`gt`,`ltu`,`geu`,`leu`,`gtu`,`mi`,`pl`,`vs`,`vc`,`al`],y={mov:16,add:17,adc:18,sub:19,sbc:20,and:21,or:22,xor:23,shl:24,shr:25,sar:26,mul:27,divu:28,modu:29,divs:30,mods:31,cmp:32,tst:33,mulhu:36,mulhs:37},b=Object.fromEntries(Object.entries(y).map(([e,t])=>[t,e])),x={nop:0,halt:1,brk:2,ret:3,reti:4,ei:5,di:6,wait:7,pushf:90,popf:91},S=Object.fromEntries(Object.entries(x).map(([e,t])=>[t,e])),ee={ld:80,ldb:81,ldbs:82,lea:85},te={st:83,stb:84},C=class extends Error{col;constructor(e,t){super(e),this.col=t}};function ne(e){let t=``;for(let n=0;n<e.length;n++){let r=e[n];if(r!==`\\`){t+=r;continue}let i=e[++n];switch(i){case`n`:t+=`
`;break;case`t`:t+=`	`;break;case`r`:t+=`\r`;break;case`0`:t+=`\0`;break;case`\\`:t+=`\\`;break;case`'`:t+=`'`;break;case`"`:t+=`"`;break;case`x`:t+=String.fromCharCode(parseInt(e.substr(n+1,2),16)),n+=2;break;default:throw new C(`unknown escape \\${i}`)}}return t}function re(e,t){let n=[],r=0;for(;r<e.length;){let i=e[r];if(i===` `||i===`	`){r++;continue}let a=t+r,o,s=e.slice(r);if((o=s.match(/^0x[0-9a-f_]+/i))||(o=s.match(/^\$[0-9a-f_]+/i)))n.push({t:`num`,v:o[0],n:parseInt(o[0].replace(/^(0x|\$)/i,``).replace(/_/g,``),16),col:a}),r+=o[0].length;else if(o=s.match(/^0b[01_]+/i))n.push({t:`num`,v:o[0],n:parseInt(o[0].slice(2).replace(/_/g,``),2),col:a}),r+=o[0].length;else if(o=s.match(/^[0-9][0-9_]*/)){if(/^[0-9][0-9_]*[a-z_]/i.test(s))throw new C(`bad number '${s.match(/^\w+/)[0]}'`,a);n.push({t:`num`,v:o[0],n:parseInt(o[0].replace(/_/g,``),10),col:a}),r+=o[0].length}else if(o=s.match(/^'(\\.|[^\\'])+'/)){let e=ne(o[0].slice(1,-1));if(e.length!==1)throw new C(`character literal must be one character`,a);n.push({t:`num`,v:o[0],n:e.charCodeAt(0),col:a}),r+=o[0].length}else if(o=s.match(/^"(\\.|[^\\"])*"/))n.push({t:`str`,v:ne(o[0].slice(1,-1)),col:a}),r+=o[0].length;else if(o=s.match(/^[A-Za-z_.][A-Za-z0-9_.]*/))n.push({t:`id`,v:o[0],col:a}),r+=o[0].length;else if(o=s.match(/^(<<|>>|[-+*/%&|^~()<>\[\],$])/))n.push({t:`op`,v:o[0],col:a}),r+=o[0].length;else throw new C(`unexpected character '${i}'`,a)}return n}var ie={"|":1,"^":2,"&":3,"<<":4,">>":4,"+":5,"-":5,"*":6,"/":6,"%":6},ae=class{toks;scope;i=0;constructor(e,t){this.toks=e,this.scope=t}peek(){return this.toks[this.i]}next(){return this.toks[this.i++]}done(){return this.i>=this.toks.length}expectOp(e){let t=this.next();if(!t||t.t!==`op`||t.v!==e)throw new C(`expected '${e}'`,t?.col)}isOp(e){let t=this.peek();return!!t&&t.t===`op`&&t.v===e}expr(e=1){let t=this.unary();for(;;){let n=this.peek();if(!n||n.t!==`op`||!(n.v in ie))break;let r=ie[n.v];if(r<e)break;this.i++;let i=this.expr(r+1);t={k:`bin`,op:n.v,l:t,r:i}}return t}unary(){let e=this.next();if(!e)throw new C(`expected expression`);if(e.t===`num`)return{k:`num`,n:e.n};if(e.t===`id`){if(oe.test(e.v))throw new C(`register '${e.v}' not allowed here`,e.col);return{k:`sym`,name:ce(e.v,this.scope()),col:e.col}}if(e.t===`op`){if(e.v===`(`){let e=this.expr();return this.expectOp(`)`),e}if(e.v===`$`)return{k:`here`};if(e.v===`-`||e.v===`~`||e.v===`<`||e.v===`>`||e.v===`+`)return{k:`un`,op:e.v,e:this.unary()}}throw new C(`unexpected '${e.v}' in expression`,e.col)}},oe=/^(r([0-9]|1[0-5])|sp|fp)$/i;function se(e){let t=e.toLowerCase();return t===`sp`?15:t===`fp`?14:parseInt(t.slice(1),10)}function ce(e,t){return e.startsWith(`.`)&&t?t+e:e}function le(e,t){let n=[],r=[[]],i=0;for(let t of e){if(t.t===`op`&&(t.v===`(`||t.v===`[`)&&i++,t.t===`op`&&(t.v===`)`||t.v===`]`)&&i--,t.t===`op`&&t.v===`,`&&i===0){r.push([]);continue}r[r.length-1].push(t)}if(r.length===1&&r[0].length===0)return n;for(let i of r){if(!i.length)throw new C(`empty operand`,e[0]?.col);if(i.length===1&&i[0].t===`id`&&oe.test(i[0].v)){n.push({k:`reg`,r:se(i[0].v)});continue}if(i.length===1&&i[0].t===`str`){n.push({k:`str`,s:i[0].v});continue}if(i[0].t===`op`&&i[0].v===`[`){let e=i[i.length-1];if(e.t!==`op`||e.v!==`]`)throw new C(`expected ']'`,e.col);let r=i.slice(1,-1);if(!r.length||r[0].t!==`id`||!oe.test(r[0].v))throw new C(`memory operand must be [reg], [reg+expr] or [reg-expr]`,i[0].col);let a=se(r[0].v);if(r.length===1){n.push({k:`mem`,r:a,off:null});continue}let o=r[1];if(o.t!==`op`||o.v!==`+`&&o.v!==`-`)throw new C(`expected '+' or '-' after register`,o.col);let s=new ae(r.slice(2),()=>t),c=s.expr();if(!s.done())throw new C(`unexpected token in memory operand`,s.peek().col);o.v===`-`&&(c={k:`un`,op:`-`,e:c}),n.push({k:`mem`,r:a,off:c});continue}let r=new ae(i,()=>t),a=r.expr();if(!r.done())throw new C(`unexpected '${r.peek().v}'`,r.peek().col);n.push({k:`expr`,e:a})}return n}function ue(e){let t=!1,n=!1;for(let r=0;r<e.length;r++){let i=e[r];if(i===`\\`&&(t||n)){r++;continue}if(i===`"`&&!n)t=!t;else if(i===`'`&&!t)n=!n;else if(!t&&!n&&(i===`;`||i===`/`&&e[r+1]===`/`))return e.slice(0,r)}return e}var de=new Set([`.org`,`.equ`,`.byte`,`.db`,`.word`,`.dw`,`.ascii`,`.asciz`,`.fill`,`.zero`,`.align`,`.include`,`.name`,`.author`,`.entry`,`.pix`]);function fe(e){return!!(e in x||e in y||e in ee||e in te||[`li`,`not`,`neg`,`push`,`pop`,`jmp`,`call`].includes(e)||e[0]===`j`&&e.slice(1)in _||e[0]===`s`&&e.slice(1)in _)}function pe(e,t={}){let n=t.file??`main.lfa`,r=[],i=[],a=new Map,o={},s=null,c=[],l=``,u=(e,n)=>{if(c.includes(n)){r.push({file:n,line:0,message:`recursive include of ${n}`});return}c.push(n);let a=e.split(/\r?\n/);for(let e=0;e<a.length;e++){let o=e+1;try{let r=ue(a[e]),s=1,c=r.match(/^\s*([A-Za-z_.][A-Za-z0-9_.]*)\s*:/),f;if(c){let e=c[1];e.startsWith(`.`)||(l=e),f=ce(e,l),s+=c[0].length,r=r.slice(c[0].length)}let p=r.trim();if(!p){f&&i.push({file:n,line:o,scope:l,label:f,opCol:s,args:[],addr:0,size:0});continue}let m=p.match(/^([A-Za-z_][A-Za-z0-9_.]*)\s*=\s*(.+)$/);if(m&&!f){let e=r.length-r.trimStart().length,t=new ae(re(m[2],s+e+p.indexOf(m[2])),()=>l),i=t.expr();if(!t.done())throw new C(`unexpected token after expression`,t.peek().col);d(m[1],{expr:i,file:n,line:o,scope:l});continue}let h=p.match(/^(\.?[A-Za-z_][A-Za-z0-9_]*)/);if(!h)throw new C(`expected instruction or directive`,s);let g=h[1].toLowerCase(),_=r.length-r.trimStart().length,v=s+_,y=p.slice(h[1].length);if(g.startsWith(`.`)&&!de.has(g))throw new C(`unknown directive '${h[1]}'`,v);if(!g.startsWith(`.`)&&!fe(g))throw new C(`unknown instruction '${h[1]}'`,v);let b=re(y,v+h[1].length);if(g===`.include`){if(f&&i.push({file:n,line:o,scope:l,label:f,opCol:v,args:[],addr:0,size:0}),b.length!==1||b[0].t!==`str`)throw new C(`.include expects a quoted file name`,v);let e=b[0].v,r=t.readFile?.(e);if(r===void 0)throw new C(`cannot include '${e}'`,v);u(r,e);continue}if(g===`.equ`){let e=le(b,l);if(e.length!==2||e[0].k!==`expr`||e[0].e.k!==`sym`||e[1].k!==`expr`)throw new C(`.equ NAME, expr`,v);d(e[0].e.name,{expr:e[1].e,file:n,line:o,scope:l});continue}let x=le(b,l);i.push({file:n,line:o,scope:l,label:f,op:g,opCol:v,args:x,addr:0,size:0})}catch(e){if(e instanceof C)r.push({file:n,line:o,col:e.col,message:e.message});else throw e}}c.pop()};function d(e,t){if(e in g)throw new C(`'${e}' is a predefined symbol`);if(a.has(e)){let t=a.get(e);throw new C(`duplicate symbol '${e}' (first defined at ${t.file}:${t.line})`)}a.set(e,t)}u(e,n);let f=0,p=(e,t)=>{switch(e.k){case`num`:return e.n;case`here`:return f;case`sym`:{if(e.name in g)return g[e.name];let n=a.get(e.name);if(!n){if(t)throw new C(`undefined symbol '${e.name}'`,e.col);return}if(n.value!==void 0)return n.value;if(n.expr){if(n.resolving)throw new C(`circular definition of '${e.name}'`,e.col);n.resolving=!0;let r=f;try{let e=p(n.expr,t);return e!==void 0&&(n.value=e),e}finally{n.resolving=!1,f=r}}if(t)throw new C(`symbol '${e.name}' has no value`,e.col);return}case`un`:{let n=p(e.e,t);if(n===void 0)return;switch(e.op){case`-`:return-n;case`+`:return n;case`~`:return~n;case`<`:return n&255;case`>`:return n>>8&255}return}case`bin`:{let n=p(e.l,t),r=p(e.r,t);if(n===void 0||r===void 0)return;switch(e.op){case`+`:return n+r;case`-`:return n-r;case`*`:return Math.imul(n,r);case`/`:if(r===0)throw new C(`division by zero`);return Math.trunc(n/r);case`%`:if(r===0)throw new C(`division by zero`);return n%r;case`&`:return n&r;case`|`:return n|r;case`^`:return n^r;case`<<`:return n<<r;case`>>`:return n>>r}}}},m=e=>p(e,!0),h=e=>{let t=e.op;return t in x?(v(e,0),2):t===`push`||t===`pop`||t===`not`||t===`neg`||t[0]===`s`&&t.slice(1)in _&&!(t in y)?2:t in y||t===`li`?e.args[1]?.k===`reg`&&t!==`li`?2:4:(t===`jmp`||t===`call`)&&e.args[0]?.k===`reg`?2:4};function v(e,t){if(e.args.length!==t)throw new C(`'${e.op}' takes ${t} operand${t===1?``:`s`}`,e.opCol)}let b=0,S=null,ne=!1,ie=0;for(let e of i)try{if(e.op===`.org`){f=b;let t=m(oe(e,0));if(t<0||t>65535)throw new C(`.org out of range`,e.opCol);if(ne&&t<b)throw new C(`.org cannot move backwards`,e.opCol);ne||(S=t),b=t}if(e.addr=b,e.label&&d(e.label,{value:b,file:e.file,line:e.line,scope:e.scope}),!e.op||e.op===`.org`)continue;if(f=b,e.size=se(e),!e.op.startsWith(`.`)&&b&1)throw new C(`instruction at odd address (use .align 2)`,e.opCol);if(e.size>0&&!ne&&(ne=!0,S===null&&(S=b)),b+=e.size,b>65536)throw new C(`program exceeds 64 KiB`,e.opCol);ie=Math.max(ie,b)}catch(t){if(t instanceof C)r.push({file:e.file,line:e.line,col:t.col??e.opCol,message:t.message});else throw t}function oe(e,t){let n=e.args[t];if(!n||n.k!==`expr`)throw new C(`${e.op} expects an expression`,e.opCol);return n.e}function se(e){let t=e.op;switch(t){case`.byte`:case`.db`:return e.args.reduce((e,t)=>e+(t.k===`str`?t.s.length:1),0);case`.word`:case`.dw`:return e.args.length*2;case`.ascii`:case`.asciz`:if(e.args.length!==1||e.args[0].k!==`str`)throw new C(`${t} expects a string`,e.opCol);return e.args[0].s.length+ +(t===`.asciz`);case`.pix`:if(e.args.length!==1||e.args[0].k!==`str`)throw new C(`.pix expects a string of hex digits`,e.opCol);return e.args[0].s.replace(/\s/g,``).length+1>>1;case`.fill`:case`.zero`:{let t=m(oe(e,0));if(t<0||t>65536)throw new C(`bad fill count`,e.opCol);return t}case`.align`:{let t=m(oe(e,0));if(t<=0||t>32768)throw new C(`bad alignment`,e.opCol);return(t-b%t)%t}case`.name`:case`.author`:case`.entry`:return 0}return h(e)}let pe=S??0,me=new Uint8Array(Math.max(0,ie-pe)),he=[],ge=(e,t)=>{e-pe>=0&&e-pe<me.length&&(me[e-pe]=t&255)},_e=(e,t)=>{ge(e,t),ge(e+1,t>>8)},ve=(e,t)=>{if(e<-32768||e>65535)throw new C(`value ${e} does not fit in 16 bits`,t);return e&65535},ye=(e,t)=>{if(e<-128||e>255)throw new C(`value ${e} does not fit in 8 bits`,t);return e&255};for(let e of i)if(e.op){f=e.addr;try{let t=e.op,n=e.addr;if(t.startsWith(`.`)){switch(t){case`.byte`:case`.db`:{let t=n;for(let n of e.args)if(n.k===`str`)for(let e of n.s)ge(t++,e.charCodeAt(0));else if(n.k===`expr`)ge(t++,ye(m(n.e),e.opCol));else throw new C(`.byte takes expressions or strings`,e.opCol);break}case`.word`:case`.dw`:{let t=n;for(let n of e.args){if(n.k!==`expr`)throw new C(`.word takes expressions`,e.opCol);_e(t,ve(m(n.e),e.opCol)),t+=2}break}case`.ascii`:case`.asciz`:{let t=e.args[0].s;for(let e=0;e<t.length;e++)ge(n+e,t.charCodeAt(e));break}case`.pix`:{let t=e.args[0].s.replace(/\s/g,``);if(!/^[0-9a-f]*$/i.test(t))throw new C(`.pix expects hex digits 0-9a-f`,e.opCol);for(let e=0;e<t.length;e+=2)ge(n+e/2,parseInt(t[e],16)<<4|(e+1<t.length?parseInt(t[e+1],16):0));break}case`.fill`:{let t=e.args[1]?ye(m(oe(e,1)),e.opCol):0;for(let r=0;r<e.size;r++)ge(n+r,t);break}case`.name`:case`.author`:if(e.args.length!==1||e.args[0].k!==`str`)throw new C(`${t} expects a string`,e.opCol);o[t===`.name`?`name`:`author`]=e.args[0].s;break;case`.entry`:s={e:oe(e,0),st:e}}e.size>0&&he.push([n,e.file,e.line]);continue}he.push([n,e.file,e.line]),E(e,n)}catch(t){if(t instanceof C)r.push({file:e.file,line:e.line,col:t.col??e.opCol,message:t.message});else throw t}}function be(e,t,n=`register`){let r=e.args[t];if(!r||r.k!==`reg`)throw new C(`operand ${t+1} of '${e.op}' must be a ${n}`,e.opCol);return r.r}function w(e,t){let n=e.args[t];if(!n||n.k!==`expr`)throw new C(`operand ${t+1} of '${e.op}' must be an expression`,e.opCol);return ve(m(n.e),e.opCol)}function T(e,t){let n=e.args[t];if(!n||n.k!==`mem`)throw new C(`operand ${t+1} of '${e.op}' must be a memory operand [reg+offset]`,e.opCol);return{r:n.r,off:n.off?ve(m(n.off),e.opCol):0}}function E(e,t){let n=e.op,r=(e,n,r)=>_e(t,e<<8|n<<4|r);if(n in x){v(e,0),r(x[n],0,0);return}if(n===`push`){v(e,1),r(88,0,be(e,0));return}if(n===`pop`){v(e,1),r(89,be(e,0),0);return}if(n===`not`||n===`neg`){v(e,2),r(n===`not`?34:35,be(e,0),be(e,1));return}if(n===`li`){v(e,2),r(48,be(e,0),0),_e(t+2,w(e,1));return}if(n in y){v(e,2);let i=be(e,0);e.args[1].k===`reg`?r(y[n],i,e.args[1].r):(r(y[n]+32,i,0),_e(t+2,w(e,1)));return}if(n in ee){v(e,2);let i=be(e,0),a=T(e,1);r(ee[n],i,a.r),_e(t+2,a.off);return}if(n in te){v(e,2);let i=T(e,0),a=be(e,1);r(te[n],i.r,a),_e(t+2,i.off);return}if(n===`jmp`||n===`call`){v(e,1),e.args[0].k===`reg`?r(n===`jmp`?97:99,0,e.args[0].r):(r(n===`jmp`?96:98,0,0),_e(t+2,w(e,0)));return}if(n[0]===`j`&&n.slice(1)in _){v(e,1),r(100,_[n.slice(1)],0),_e(t+2,w(e,0));return}if(n[0]===`s`&&n.slice(1)in _){v(e,1),r(101,be(e,0),_[n.slice(1)]);return}throw new C(`unknown instruction '${n}'`,e.opCol)}let xe=pe;if(s){let e=s;try{xe=ve(m(e.e))}catch(t){if(t instanceof C)r.push({file:e.st.file,line:e.st.line,message:t.message});else throw t}}let Se={};for(let[e,t]of a)try{let n=t.value??(t.expr?p(t.expr,!0):void 0);n!==void 0&&(Se[e]=n&65535)}catch(e){if(e instanceof C)r.push({file:t.file,line:t.line,message:e.message});else throw e}let Ce=new Set,we=r.filter(e=>{let t=`${e.file}:${e.line}:${e.message}`;return!Ce.has(t)&&(Ce.add(t),!0)});return we.sort((e,t)=>e.file===t.file?e.line-t.line:0),{ok:we.length===0,errors:we,image:me,origin:pe,entry:xe,symbols:Se,lines:he,meta:o}}var me=(e,t=4)=>`0x`+e.toString(16).toUpperCase().padStart(t,`0`);function he(e,t,n){let r=typeof e==`function`?e:t=>e[t&65535]??0,i=r(t)|r(t+1)<<8,a=i>>8,o=i>>4&15,s=i&15,c=m[a]?r(t+2)|r(t+3)<<8:0,l=m[a]?4:2,u=e=>e===15?`sp`:e===14?`fp`:`r`+e,d=e=>n?.(e)??me(e),f=(e,t)=>{let n=t&32768?t-65536:t;return n===0?`[${u(e)}]`:n<0?`[${u(e)}-${-n}]`:`[${u(e)}+${n}]`},p=e=>n?.(e)||(e>255?me(e):String(e));if(a in S)return{text:S[a],size:l};if(a in b)return{text:`${b[a]} ${u(o)}, ${u(s)}`,size:l};if(a===34||a===35)return{text:`${a===34?`not`:`neg`} ${u(o)}, ${u(s)}`,size:l};if(a===48)return{text:`li ${u(o)}, ${p(c)}`,size:l};if(a-32 in b&&a>=49&&a<=69)return{text:`${b[a-32]} ${u(o)}, ${p(c)}`,size:l};switch(a){case 80:return{text:`ld ${u(o)}, ${f(s,c)}`,size:l};case 81:return{text:`ldb ${u(o)}, ${f(s,c)}`,size:l};case 82:return{text:`ldbs ${u(o)}, ${f(s,c)}`,size:l};case 83:return{text:`st ${f(o,c)}, ${u(s)}`,size:l};case 84:return{text:`stb ${f(o,c)}, ${u(s)}`,size:l};case 85:return{text:`lea ${u(o)}, ${f(s,c)}`,size:l};case 88:return{text:`push ${u(s)}`,size:l};case 89:return{text:`pop ${u(o)}`,size:l};case 96:return{text:`jmp ${d(c)}`,size:l};case 97:return{text:`jmp ${u(s)}`,size:l};case 98:return{text:`call ${d(c)}`,size:l};case 99:return{text:`call ${u(s)}`,size:l};case 100:if(o<15)return{text:`j${v[o]} ${d(c)}`,size:l};break;case 101:if(s<15)return{text:`s${v[s]} ${u(o)}`,size:l}}return{text:`.word ${me(i)}`,size:2}}function ge(e){let t=``;for(let n=0;n<e.length;n++)t+=String.fromCharCode(e[n]);return btoa(t)}function _e(e){let t=atob(e),n=new Uint8Array(t.length);for(let e=0;e<t.length;e++)n[e]=t.charCodeAt(e);return n}function ve(e,t=`untitled`){return{format:`lanternfish-cart/1`,name:e.meta.name??t,author:e.meta.author??``,origin:e.origin,entry:e.entry,image:ge(e.image),symbols:e.symbols,lines:e.lines}}var ye=e=>typeof e==`number`&&Number.isInteger(e)&&e>=0&&e<=65535;function be(e){if(e.length>1e6)return{ok:!1,error:`file too large for a 64 KiB cartridge`};let t;try{t=JSON.parse(e)}catch{return{ok:!1,error:`not valid JSON`}}let n=t;if(!n||typeof n!=`object`||n.format!==`lanternfish-cart/1`)return{ok:!1,error:`not a lanternfish-cart/1 file`};if(typeof n.image!=`string`)return{ok:!1,error:`missing image`};let r=n.origin??0,i=n.entry??r;if(!ye(r))return{ok:!1,error:`origin must be an integer address 0-65535`};if(!ye(i))return{ok:!1,error:`entry must be an integer address 0-65535`};if(i&1)return{ok:!1,error:`entry must be even (instructions are word-aligned)`};let a;try{a=_e(n.image)}catch{return{ok:!1,error:`image is not base64`}}if(a.length===0)return{ok:!1,error:`image is empty`};if(r+a.length>65536)return{ok:!1,error:`image does not fit in memory`};let o={};if(n.symbols&&typeof n.symbols==`object`&&!Array.isArray(n.symbols))for(let[e,t]of Object.entries(n.symbols))ye(t)&&e.length<=64&&(o[e]=t);let s=Array.isArray(n.lines)?n.lines.filter(e=>Array.isArray(e)&&e.length===3&&ye(e[0])&&typeof e[1]==`string`&&Number.isInteger(e[2])&&e[2]>0):[];return{ok:!0,cart:{format:`lanternfish-cart/1`,name:typeof n.name==`string`?n.name.slice(0,64):`untitled`,author:typeof n.author==`string`?n.author.slice(0,64):``,origin:r,entry:i,image:a,symbols:o,lines:s}}}var w=class extends Error{t;constructor(e,t){super(t),this.t=e}},T={base:`int`,ptr:0},E=e=>e.ptr||e.base===`int`?2:1;function xe(e){let t=[],n=0,r=1,i=1,a=()=>{let t=e[n++];return t===`
`?(r++,i=1):i++,t},o=t=>{if(n>=e.length)throw new w(t,`Unclosed string`);let r=a(),i={n:`
`,r:`\r`,t:`	`,0:`\0`,"\\":`\\`,'"':`"`,"'":`'`};if(!(r in i))throw new w(t,`Unknown escape \\${r}`);return i[r]};for(;n<e.length;){let s=e[n];if(/\s/.test(s)){a();continue}let c={text:``,kind:`op`,line:r,col:i};if(e.startsWith(`//`,n)){for(;n<e.length&&a()!==`
`;);continue}if(e.startsWith(`/*`,n)){for(a(),a();n<e.length&&!e.startsWith(`*/`,n);)a();if(n===e.length)throw new w(c,`Unclosed comment`);a(),a();continue}if(/[A-Za-z_]/.test(s))for(c.kind=`id`;n<e.length&&/[A-Za-z0-9_]/.test(e[n]);)c.text+=a();else if(/[0-9]/.test(s)){for(c.kind=`num`;n<e.length&&/[A-Za-z0-9_]/.test(e[n]);)c.text+=a();if(!/^(0x[\da-f]+|0b[01]+|\d+)$/i.test(c.text))throw new w(c,`Invalid integer literal`)}else if(s===`"`||s===`'`){let t=a();c.kind=t===`"`?`str`:`num`;let r=``;for(;n<e.length&&e[n]!==t;){if(e[n]===`
`)throw new w(c,`Newline in string`);r+=a()===`\\`?o(c):e[n-1]}if(n===e.length)throw new w(c,`Unclosed string`);if(a(),[...r].some(e=>e.charCodeAt(0)>255))throw new w(c,`Strings and characters must use the byte character set (0–255)`);if(t===`'`){if(r.length!==1)throw new w(c,`Character literal must contain one character`);c.text=String(r.charCodeAt(0))}else c.text=r}else{let t=[`<<=`,`>>=`,`==`,`!=`,`<=`,`>=`,`&&`,`||`,`<<`,`>>`,`++`,`--`,`+=`,`-=`,`*=`,`/=`,`%=`,`&=`,`|=`,`^=`].find(t=>e.startsWith(t,n));if(t)for(let e=0;e<t.length;e++)c.text+=a();else if(`{}[]();,+-*/%&|^~!<>=?:`.includes(s))c.text=a();else throw new w(c,`Unexpected character ${s}`)}if(t.push(c),c.kind===`id`&&c.text===`asm`){for(;n<e.length&&/\s/.test(e[n]);)a();if(e[n]===`{`){let o={line:r,col:i};a(),t.push({text:`{`,kind:`op`,...o});let s={text:``,kind:`raw`,line:r,col:i};for(;n<e.length&&e[n]!==`}`;)s.text+=a();if(n===e.length)throw new w(c,`Unclosed asm block`);t.push(s),t.push({text:`}`,kind:`op`,line:r,col:i}),a()}}}return t.push({text:``,kind:`eof`,line:r,col:i}),t}var Se={"=":1,"+=":1,"-=":1,"*=":1,"/=":1,"%=":1,"&=":1,"|=":1,"^=":1,"<<=":1,">>=":1,"||":2,"&&":3,"|":4,"^":5,"&":6,"==":7,"!=":7,"<":8,"<=":8,">":8,">=":8,"<<":9,">>":9,"+":10,"-":10,"*":11,"/":11,"%":11},Ce=class{tokens;pos=0;globals=[];fns=[];constants=new Map;constructor(e){this.tokens=e}get t(){return this.tokens[this.pos]}pop(){return this.tokens[this.pos++]}is(e){return(this.t.kind===`id`||this.t.kind===`op`)&&this.t.text===e}match(e){return this.is(e)?(this.pop(),!0):!1}need(e){if(!this.match(e))throw new w(this.t,`Expected '${e}', found '${this.t.text||`end of file`}'`)}id(){let e=this.pop();if(e.kind!==`id`)throw new w(e,`Expected a name`);if(/^(if|else|while|for|break|continue|return|asm|int|byte|void|const)$/.test(e.text))throw new w(e,`Reserved word cannot be a name`);return e}type(){let e=this.pop();if(![`int`,`byte`,`void`].includes(e.text))throw new w(e,`Expected int, byte or void`);let t=0;for(;this.match(`*`);)t++;return{base:e.text,ptr:t}}decl(e,t,n){let r;if(this.match(`[`)){if(r=this.constant(this.expr()),r<1||r>4096)throw new w(t,`Array size must be 1–4096`);this.need(`]`)}let i;if(this.match(`=`)&&(i=this.expr()),e.base===`void`&&!e.ptr)throw new w(t,`Variables cannot have void type`);if(r&&i)throw new w(t,`Initialize arrays element by element`);let a={name:t.text,type:e,size:r,init:i,constant:n,t};if(n&&!i)throw new w(t,`const requires an initializer`);return a}parse(){for(;this.t.kind!==`eof`;){let e=this.match(`const`),t=this.type(),n=this.id();if(this.match(`(`)){if(e)throw new w(n,`A function cannot be const`);let r=[];if(!this.is(`)`)){if(this.is(`void`)&&this.tokens[this.pos+1].text===`)`)this.pop();else do{let e=this.type(),t=this.id();if(e.base===`void`&&!e.ptr)throw new w(t,`Parameter cannot be void`);r.push({name:t.text,type:e,constant:!1,t})}while(this.match(`,`))}if(this.need(`)`),r.length>4)throw new w(n,`Functions support at most four parameters`);this.fns.push({name:n.text,type:t,params:r,body:this.block(),t:n})}else{let r=this.decl(t,n,e);this.need(`;`),this.globals.push(r),e&&this.constants.set(r.name,this.constant(r.init)&(E(r.type)===1?255:65535))}}return this}block(){let e=this.t;this.need(`{`);let t=[];for(;!this.is(`}`);){if(this.t.kind===`eof`)throw new w(e,`Unclosed block`);t.push(this.statement())}return this.need(`}`),{kind:`block`,body:t,t:e}}statement(){let e=this.t;if(this.is(`{`))return this.block();if(this.match(`;`))return{kind:`empty`,t:e};if(this.match(`if`)){this.need(`(`);let t=this.expr();return this.need(`)`),{kind:`if`,test:t,then:this.statement(),otherwise:this.match(`else`)?this.statement():void 0,t:e}}if(this.match(`while`)){this.need(`(`);let t=this.expr();return this.need(`)`),{kind:`while`,test:t,then:this.statement(),t:e}}if(this.match(`for`)){this.need(`(`);let t=this.statement();if(![`empty`,`expr`,`decl`].includes(t.kind))throw new w(t.t,`for initializer must be a declaration or expression`);let n=this.is(`;`)?void 0:this.expr();this.need(`;`);let r=this.is(`)`)?void 0:this.expr();return this.need(`)`),{kind:`for`,init:t,test:n,post:r,then:this.statement(),t:e}}if(this.match(`return`)){let t=this.is(`;`)?void 0:this.expr();return this.need(`;`),{kind:`return`,expr:t,t:e}}if(this.match(`break`)||this.match(`continue`))return this.need(`;`),{kind:e.text,t:e};if(this.match(`asm`)){this.need(`{`);let t=this.pop();if(t.kind!==`raw`)throw new w(t,`Expected raw assembly`);return this.need(`}`),{kind:`asm`,raw:t.text,t:e}}if(this.t.kind===`id`&&[`int`,`byte`,`void`,`const`].includes(this.t.text)){let t=this.match(`const`),n=this.type(),r=this.id(),i=this.decl(n,r,t);return this.need(`;`),{kind:`decl`,decl:i,t:e}}let t=this.expr();return this.need(`;`),{kind:`expr`,expr:t,t:e}}expr(e=1){let t=this.unary();for(;(Se[this.t.text]??0)>=e;){let e=this.pop(),n=Se[e.text],r=this.expr(n+(n===1?0:1));t={kind:n===1?`assign`:`binary`,op:e.text,a:t,b:r,t:e}}return t}unary(){let e=this.t;if(e.kind===`op`&&[`-`,`+`,`!`,`~`,`*`,`&`,`++`,`--`].includes(e.text))return this.pop(),{kind:`unary`,op:e.text,a:this.unary(),t:e};let t;if(this.match(`(`))t=this.expr(),this.need(`)`);else if(e.kind===`num`){this.pop();let n=Number(e.text);if(!Number.isSafeInteger(n)||n>65535)throw new w(e,`Literal must fit in 16 bits`);t={kind:`number`,value:n,t:e}}else if(e.kind===`str`)this.pop(),t={kind:`string`,text:e.text,t:e};else if(e.kind===`id`)this.pop(),t={kind:`name`,text:e.text,t:e};else throw new w(e,`Expected an expression`);for(;;)if(this.match(`[`)){let n=this.expr();this.need(`]`),t={kind:`index`,a:t,b:n,t:e}}else if(this.match(`(`)){if(t.kind!==`name`)throw new w(e,`Only named functions can be called`);let n=[];if(!this.is(`)`))do n.push(this.expr());while(this.match(`,`));this.need(`)`),t={kind:`call`,text:t.text,args:n,t:e}}else if(this.is(`++`)||this.is(`--`))t={kind:`post`,op:this.pop().text,a:t,t:e};else break;return t}constant(e){let t=this.constantRaw(e)&65535;return t>=32768?t-65536:t}constantRaw(e){if(e.kind===`number`)return e.value;if(e.kind===`name`&&this.constants.has(e.text))return this.constants.get(e.text);if(e.kind===`unary`){let t=this.constant(e.a);switch(e.op){case`-`:return-t;case`+`:return t;case`~`:return~t;case`!`:return+!t}}if(e.kind===`binary`){let t=this.constant(e.a),n=this.constant(e.b);switch(e.op){case`+`:return t+n;case`-`:return t-n;case`*`:return t*n;case`/`:return n?Math.trunc(t/n):-1;case`%`:return n?t%n:t;case`<<`:return t<<(n&15);case`>>`:return t>>(n&15);case`&`:return t&n;case`|`:return t|n;case`^`:return t^n;case`==`:return+(t===n);case`!=`:return+(t!==n);case`<`:return+(t<n);case`<=`:return+(t<=n);case`>`:return+(t>n);case`>=`:return+(t>=n);case`&&`:return+(!!t&&!!n);case`||`:return+(!!t||!!n)}}throw new w(e.t,`Expected a constant expression`)}},we={print:{args:1,result:T},putc:{args:1,result:T},puts:{args:1,result:T},peek:{args:1,result:T},peekb:{args:1,result:T},poke:{args:2,result:T},pokeb:{args:2,result:T},random:{args:0,result:T},buttons:{args:0,result:T},key:{args:0,result:T},serial:{args:0,result:T},frame:{args:0,result:T},wait:{args:0,result:T},clear:{args:1,result:T},pixel:{args:3,result:T},rect:{args:4,result:T},line:{args:4,result:T},color:{args:1,result:T},text:{args:3,result:T},sound:{args:4,result:T},silence:{args:0,result:T},halt:{args:0,result:T}},Te=class{p;lines=[];map=[];next=0;globals=new Map;scopes=[];functions=new Map;strings=[];used=new Set;locals=0;exit=``;returnType=T;loops=[];constructor(e){this.p=e}emit(...e){this.lines.push(...e)}label(e=`L`){return`__g_${e}_${this.next++}`}fail(e,t){throw new w(e,t)}lookup(e,t){for(let t=this.scopes.length-1;t>=0;t--){let n=this.scopes[t].get(e);if(n)return n}let n=this.globals.get(e);return n||this.fail(t,`Unknown variable '${e}'`),n}generate(){for(let e of this.p.globals)(this.globals.has(e.name)||we[e.name])&&this.fail(e.t,`Duplicate or reserved name '${e.name}'`),this.globals.set(e.name,{type:e.type,size:e.size,label:`__global_${e.name}`,readonly:e.constant,constant:e.constant?this.p.constant(e.init)&(E(e.type)===1?255:65535):void 0});for(let e of this.p.fns)(this.functions.has(e.name)||this.globals.has(e.name)||we[e.name])&&this.fail(e.t,`Duplicate or reserved name '${e.name}'`),this.functions.set(e.name,e);let e=this.functions.get(`main`);(!e||e.params.length)&&this.fail(this.p.tokens[0],`Define main() with no parameters`),this.emit(`.name "Glint cartridge"`,`.author "Glint / LF-16"`,`.org 0`,`.entry __start`,`__start:`,`li sp, 0xBFF0`,`call __fn_main`,`halt`);for(let e of this.p.fns)this.fn(e);this.map.push({asmLine:this.lines.length+1,sourceLine:0}),this.runtime();for(let e of this.p.globals)if(!e.constant){if(this.emit(`.align 2`,`__global_${e.name}:`),e.size)this.emit(`.zero ${e.size*E(e.type)}`);else{let t=e.init?this.p.constant(e.init):0;this.emit(`${E(e.type)===1?`.byte`:`.word`} ${t&(E(e.type)===1?255:65535)}`)}}for(let e of this.strings)this.emit(`${e.label}:`,`.byte ${Array.from(e.text).map(e=>e.charCodeAt(0)&255).concat(0).join(`, `)}`);return this.emit(`.align 2`,`__glint_end:`),this.lines.join(`
`)+`
`}fn(e){this.scopes=[new Map],this.locals=0,this.exit=this.label(`return`),this.returnType=e.type,this.emit(`__fn_${e.name}:`,`push fp`,`mov fp, sp`);let t=this.lines.length;if(this.emit(`; local frame`),e.params.forEach((e,t)=>{this.locals+=2,this.scopes[0].set(e.name,{type:e.type,offset:-this.locals}),this.emit(`st [fp-${this.locals}], r${t}`)}),new Set(e.params.map(e=>e.name)).size!==e.params.length&&this.fail(e.t,`Duplicate parameter`),this.mark(e.body.t),e.body.kind===`block`)for(let t of e.body.body)this.statement(t);this.emit(`li r0, 0`,`${this.exit}:`,`mov sp, fp`,`pop fp`,`ret`),this.locals>8192&&this.fail(e.t,`Local frame exceeds 8192 bytes`),this.lines[t]=this.locals?`sub sp, ${this.locals}`:`nop`}mark(e){this.map.push({asmLine:this.lines.length+1,sourceLine:e.line}),this.emit(`; source line ${e.line}`)}statement(e){switch(this.mark(e.t),e.kind){case`empty`:break;case`block`:this.scopes.push(new Map);for(let t of e.body)this.statement(t);this.scopes.pop();break;case`decl`:{let t=e.decl,n=this.scopes.at(-1);(n.has(t.name)||we[t.name])&&this.fail(t.t,`Duplicate or reserved local '${t.name}'`),this.locals+=Math.ceil((t.size??1)*E(t.type)/2)*2;let r={type:t.type,size:t.size,offset:-this.locals,readonly:t.constant};n.set(t.name,r),t.init?(this.expression(t.init),this.emit(`${E(t.type)===1?`stb`:`st`} [fp-${this.locals}], r0`)):t.size||this.emit(`li r0, 0`,`${E(t.type)===1?`stb`:`st`} [fp-${this.locals}], r0`);break}case`expr`:this.expression(e.expr,!0);break;case`if`:{let t=this.label(`else`),n=this.label(`endif`);this.expression(e.test),this.emit(`cmp r0, 0`,`jeq ${t}`),this.statement(e.then),this.emit(`jmp ${n}`,`${t}:`),e.otherwise&&this.statement(e.otherwise),this.emit(`${n}:`);break}case`while`:case`for`:{this.scopes.push(new Map),e.init&&this.statement(e.init);let t=this.label(`loop`),n=this.label(`next`),r=this.label(`endloop`);this.loops.push({break:r,continue:n}),this.emit(`${t}:`),e.test&&(this.expression(e.test),this.emit(`cmp r0, 0`,`jeq ${r}`)),this.statement(e.then),this.emit(`${n}:`),e.post&&this.expression(e.post,!0),this.emit(`jmp ${t}`,`${r}:`),this.loops.pop(),this.scopes.pop();break}case`break`:case`continue`:{let t=this.loops.at(-1);t||this.fail(e.t,`${e.kind} outside a loop`),this.emit(`jmp ${t[e.kind]}`);break}case`return`:e.expr&&this.returnType.base===`void`&&!this.returnType.ptr&&this.fail(e.t,`A void function cannot return a value`),e.expr?this.expression(e.expr):this.emit(`li r0, 0`),this.returnType.base===`byte`&&!this.returnType.ptr&&this.emit(`and r0, 255`),this.emit(`jmp ${this.exit}`);break;case`asm`:this.emit(...e.raw.split(`
`))}}type(e){if(e.kind===`name`){let t=this.lookup(e.text,e.t);return t.size?{...t.type,ptr:t.type.ptr+1}:t.type}if(e.kind===`string`)return{base:`byte`,ptr:1};if(e.kind===`index`||e.kind===`unary`&&e.op===`*`){let t=this.type(e.a);return t.ptr||this.fail(e.t,`Dereference requires a pointer or array`),{...t,ptr:t.ptr-1}}if(e.kind===`unary`&&e.op===`&`){let t=this.type(e.a);return{...t,ptr:t.ptr+1}}if(e.kind===`call`)return we[e.text]?.result??this.functions.get(e.text)?.type??T;if(e.kind===`assign`||e.kind===`post`)return this.type(e.a);if(e.kind===`binary`&&[`+`,`-`].includes(e.op)){let t=this.type(e.a);if(t.ptr&&e.op===`-`&&this.type(e.b).ptr)return T;if(t.ptr)return t}return T}address(e,t=!1){if(e.kind===`name`){let n=this.lookup(e.text,e.t);return n.constant!==void 0&&this.fail(e.t,`Cannot take address of a global constant`),t&&(n.readonly||n.size)&&this.fail(e.t,`Cannot assign to a constant or whole array`),this.emit(n.label?`li r0, ${n.label}`:`lea r0, [fp${n.offset<0?``:`+`}${n.offset}]`),n.type}if(e.kind===`unary`&&e.op===`*`){let t=this.type(e);return this.expression(e.a),t}if(e.kind===`index`){let t=this.type(e);return this.expression(e.a),this.emit(`push r0`),this.expression(e.b),E(t)===2&&this.emit(`shl r0, 1`),this.emit(`pop r1`,`add r0, r1`),t}return this.fail(e.t,`Expression is not assignable`)}expression(e,t=!1){switch(!t&&e.kind===`call`&&this.type(e).base===`void`&&!this.type(e).ptr&&this.fail(e.t,`A void function does not produce a value`),e.kind){case`number`:this.emit(`li r0, ${e.value}`);return;case`string`:{let t=this.label(`str`);this.strings.push({label:t,text:e.text}),this.emit(`li r0, ${t}`);return}case`name`:{let t=this.lookup(e.text,e.t);if(t.constant!==void 0){this.emit(`li r0, ${t.constant&65535}`);return}this.address(e),t.size||this.emit(`${E(t.type)===1?`ldb`:`ld`} r0, [r0]`);return}case`index`:{let t=this.address(e);this.emit(`${E(t)===1?`ldb`:`ld`} r0, [r0]`);return}case`call`:{let t=this.functions.get(e.text),n=we[e.text];!t&&!n&&this.fail(e.t,`Unknown function '${e.text}'`);let r=n?.args??t.params.length;e.args.length!==r&&this.fail(e.t,`${e.text} expects ${r} arguments`);for(let t of e.args)this.expression(t),this.emit(`push r0`);for(let e=r-1;e>=0;e--)this.emit(`pop r${e}`);n?(this.used.add(e.text),this.emit(`call __rt_${e.text}`)):this.emit(`call __fn_${e.text}`);return}case`assign`:{let t=this.address(e.a,!0);this.emit(`push r0`),e.op!==`=`&&this.emit(`${E(t)===1?`ldb`:`ld`} r0, [r0]`,`push r0`),this.expression(e.b),e.op!==`=`&&(this.emit(`mov r1, r0`,`pop r0`),this.binary(e.op.slice(0,-1),t,this.type(e.b))),this.emit(`pop r1`,`${E(t)===1?`stb`:`st`} [r1], r0`),E(t)===1&&this.emit(`and r0, 255`);return}case`post`:case`unary`:{let t=e.op;if(t===`++`||t===`--`){let n=this.address(e.a,!0);this.emit(`mov r1, r0`,`${E(n)===1?`ldb`:`ld`} r0, [r1]`),e.kind===`post`&&this.emit(`mov r2, r0`),this.emit(`${t===`++`?`add`:`sub`} r0, ${n.ptr?E({...n,ptr:n.ptr-1}):1}`,`${E(n)===1?`stb`:`st`} [r1], r0`),e.kind===`post`?this.emit(`mov r0, r2`):E(n)===1&&this.emit(`and r0, 255`);return}if(t===`&`){this.address(e.a);return}this.expression(e.a),t===`*`?this.emit(`${E(this.type(e))===1?`ldb`:`ld`} r0, [r0]`):t===`-`?this.emit(`neg r0, r0`):t===`~`?this.emit(`not r0, r0`):t===`!`&&this.emit(`cmp r0, 0`,`seq r0`);return}case`binary`:if(e.op===`&&`||e.op===`||`){let t=this.label(`short`);this.expression(e.a),this.emit(`cmp r0, 0`,`sne r0`,`j${e.op===`&&`?`eq`:`ne`} ${t}`),this.expression(e.b),this.emit(`cmp r0, 0`,`sne r0`,`${t}:`);return}this.expression(e.a),this.emit(`push r0`),this.expression(e.b),this.emit(`mov r1, r0`,`pop r0`),this.binary(e.op,this.type(e.a),this.type(e.b));return}throw Error(`Unsupported expression: ${String(e)}`)}binary(e,t,n){t.ptr&&[`+`,`-`].includes(e)&&!n.ptr&&E({...t,ptr:t.ptr-1})===2&&this.emit(`shl r1, 1`);let r={"+":`add`,"-":`sub`,"*":`mul`,"/":`divs`,"%":`mods`,"&":`and`,"|":`or`,"^":`xor`,"<<":`shl`,">>":`sar`};if(r[e])this.emit(`${r[e]} r0, r1`),t.ptr&&n.ptr&&e===`-`&&E({...t,ptr:t.ptr-1})===2&&this.emit(`sar r0, 1`);else{let r={"==":`eq`,"!=":`ne`,"<":`lt`,"<=":`le`,">":`gt`,">=":`ge`},i=(t.ptr||n.ptr)&&[`<`,`<=`,`>`,`>=`].includes(e)?`u`:``;this.emit(`cmp r0, r1`,`s${r[e]}${i} r0`)}}runtime(){let e=(e,t)=>this.emit(`li r7, ${e}`,`st [r7], ${t}`),t=e=>this.emit(`li r7, ${e}`,`ld r0, [r7]`);for(let n of this.used){switch(this.emit(`__rt_${n}:`),n){case`print`:e(`DEBUG_NUM`,`r0`);break;case`putc`:e(`SERIAL_OUT`,`r0`);break;case`puts`:{let t=this.label(`puts`),n=this.label(`putsend`);this.emit(`mov r6, r0`,`${t}:`,`ldb r0, [r6]`,`cmp r0, 0`,`jeq ${n}`),e(`SERIAL_OUT`,`r0`),this.emit(`add r6, 1`,`jmp ${t}`,`${n}:`);break}case`peek`:case`peekb`:this.emit(`${n===`peek`?`ld`:`ldb`} r0, [r0]`);break;case`poke`:case`pokeb`:this.emit(`${n===`poke`?`st`:`stb`} [r0], r1`,`mov r0, r1`);break;case`random`:t(`RNG`),this.emit(`and r0, 32767`);break;case`buttons`:t(`PAD`);break;case`key`:t(`KEY`);break;case`serial`:t(`SERIAL_IN`);break;case`frame`:t(`FRAME`);break;case`wait`:{let e=this.label(`vblank`);t(`FRAME`),this.emit(`mov r6, r0`,`${e}:`),t(`FRAME`),this.emit(`cmp r0, r6`,`jeq ${e}`);break}case`color`:e(`BLT_COLOR`,`r0`);break;case`clear`:e(`BLT_COLOR`,`r0`),this.emit(`li r0, 6`),e(`BLT_CMD`,`r0`);break;case`pixel`:e(`BLT_X`,`r0`),e(`BLT_Y`,`r1`),e(`BLT_COLOR`,`r2`),this.emit(`li r0, 5`),e(`BLT_CMD`,`r0`);break;case`rect`:case`line`:e(`BLT_X`,`r0`),e(`BLT_Y`,`r1`),e(`BLT_W`,`r2`),e(`BLT_H`,`r3`),this.emit(`li r0, ${n===`rect`?1:4}`),e(`BLT_CMD`,`r0`);break;case`text`:e(`BLT_X`,`r0`),e(`BLT_Y`,`r1`),e(`BLT_SRC`,`r2`),this.emit(`li r0, 1`),e(`BLT_FLAGS`,`r0`),this.emit(`li r0, 7`),e(`BLT_CMD`,`r0`);break;case`sound`:this.emit(`and r0, 3`,`shl r0, 3`,`add r0, SND_FREQ0`,`st [r0], r1`,`and r2, 15`,`st [r0+2], r2`,`st [r0+4], r3`);break;case`silence`:this.emit(`li r0, 0`);for(let t=0;t<4;t++)e(`SND_VOL${t}`,`r0`);break;case`halt`:this.emit(`halt`)}this.emit(`ret`)}}};function Ee(e,t={}){let n=t.file??`main.glint`;try{if(e.length>2e5)throw new w({text:``,kind:`eof`,line:1,col:1},`Source exceeds 200 KB`);let t=new Ce(xe(e)).parse(),r=new Te(t),i=r.generate(),a=pe(i,{file:n});if(!a.ok)return{ok:!1,asm:``,map:[],errors:a.errors.map(e=>({file:n,line:r.map.filter(t=>t.asmLine<=e.line).at(-1)?.sourceLine||1,col:1,message:`Assembly escape or generated code: ${e.message}`}))};if((a.symbols.__glint_end??a.image.length)>45056||a.origin+a.image.length>45056)throw new w(t.tokens[0],`Program code and data exceed 0xB000; the upper 4 KiB below the framebuffer are reserved for the stack`);return{ok:!0,asm:i,errors:[],map:r.map}}catch(e){let t=e,r=e instanceof w?e.t:{line:1,col:1};return{ok:!1,asm:``,errors:[{file:n,line:r.line,col:r.col,message:e instanceof RangeError?`Expression nesting is too deep`:t.message??`Invalid source`}],map:[]}}}function De(e){return e.endsWith(`.glint`)?`glint`:`lfa`}function Oe(e,t,n={}){let r=De(e),i={ok:!1,lang:r,diagnostics:[],lineToAddr:new Map,addrLines:[],symbolsByAddr:new Map},a=t,o=null;if(r===`glint`){let n=Ee(t,{file:e});if(!n.ok)return{...i,diagnostics:n.errors.map(e=>({line:e.line,col:e.col,message:e.message,file:e.file}))};a=n.asm;let r=[...n.map].sort((e,t)=>e.asmLine-t.asmLine);o=e=>{let t=0,n=r.length-1,i=-1;for(;t<=n;){let a=t+n>>1;r[a].asmLine<=e?(i=a,t=a+1):n=a-1}return i<0?0:r[i].sourceLine},i.asmText=a}let s=r===`glint`?e.replace(/\.glint$/,`.lfa`):e,c=pe(a,{file:s,readFile:e=>n[e]}),l=new Map;for(let[e,t]of Object.entries(c.symbols))/^__global_|^__fn_/.test(e)?l.set(t,e.replace(/^__(global|fn)_/,``)):!l.has(t)&&!e.includes(`.`)&&!e.startsWith(`__L`)&&l.set(t,e);if(!c.ok){let e=c.errors.map(e=>({line:r===`glint`?o(e.line)||1:e.line,col:r===`glint`?void 0:e.col,message:r===`glint`?`internal assembly error: ${e.message} (asm line ${e.line})`:e.message,file:e.file}));return{...i,diagnostics:e,asm:c}}let u=[],d=new Map;for(let[e,t,n]of c.lines){if(t!==s)continue;let r=o?o(n):n;r&&(u.push([e,r]),d.has(r)||d.set(r,e))}return u.sort((e,t)=>e[0]-t[0]),{ok:!0,lang:r,diagnostics:[],asm:c,asmText:i.asmText,lineToAddr:d,addrLines:u,symbolsByAddr:l}}function ke(e,t){let n=e.addrLines,r=0,i=n.length-1,a=-1;for(;r<=i;){let e=r+i>>1;n[e][0]<=t?(a=e,r=e+1):i=e-1}return a<0?0:n[a][1]}var Ae=[],je=[];(()=>{let e=`lc,34,7n,7,7b,19,,,,2,,2,,,20,b,1c,l,g,,2t,7,2,6,2,2,,4,z,,u,r,2j,b,1m,9,9,,o,4,,9,,3,,5,17,3,1n,9,16,o,,x,1i,3,,i,,7,a,2,t,3,1k,,,7,2,2,2,3,9,,a,2,q,,2,3,1k,,,5,4,2,2,3,3,,u,2,3,,b,3,1k,,,8,,3,,3,k,2,m,6,,3,1k,,,7,2,2,2,3,7,3,a,2,u,,1n,5,3,3,,4,9,,14,5,1j,,,7,,3,,4,7,2,b,2,t,3,1k,,,7,,3,,4,7,2,b,2,f,,c,4,1j,2,,7,,3,,4,9,,a,2,t,3,1y,,4,6,,,,8,i,2,1p,,,8,c,8,2q,,,a,b,7,21,2,r,,,,,,4,2,1d,k,,2,5,b,,10,9,,2u,b,,6,n,4,4,3,g,4,d,,,3,6,,f,,jj,3,qa,4,s,3,t,2,u,2,1s,w,9,,19,3,,,39,2,y,,3a,c,4,c,63,5,1l,a,,,,,2,o,2,,1c,1a,2,c,k,5,1b,h,12,9,c,3,u,d,1k,e,1c,k,48,3,,l,4,,6,,2,3,5i,1s,ek,,5f,x,2da,3,3x,,2o,w,fe,6,2x,2,n9w,4,,a,w,2,28,2,7k,,3,,4,,n,5,4,,2b,2,1e,i,q,i,d,,12,8,p,d,18,4,1b,e,10,,1v,e,c,,8,2,1a,,1f,,,3,2,2,5,2,,,15,5,5,2,6k,8,,2,fn4,,kh,g,g,g,a6,2,gt,,6a,,45,5,1ae,3,,2,5,4,14,3,4,,4l,2,fx,4,1t,5,8t,2,25,6,1y,b,1d,4,3e,3,1h,f,15,,2,2,a,4,19,b,7,,1p,3,10,e,g,2,18,,c,3,1c,e,8,4,,2,2k,c,6,,2,,4d,c,l,4,1j,2,,7,2,2,2,3,9,,a,2,2,7,3,5,1v,9,,,2,,,4,,5,,,e,2,2a,i,n,,29,k,6j,7,2,9,r,2,2a,h,2y,d,2t,3,2,a,74,f,6t,6,,2,2,4,,,,2,3x,7,2,7,3,,s,a,14,7,,4,8,,9,b,1a,g,5i,8,5j,8,,8,2a,m,,e,3e,6,3,,,2,,7,,,1u,5,,2,,5,9n,4,9,2,,,1c,7,3,5,n,,44l,,6,f,8ug,i,1xc,5,1n,7,t4,,,1j,7,4,29,,b,2,f57,2,3mp,1a,2,n,f2,5,3,6,8,8,2,7,u,4,44,3,1iz,1j,4,1e,8,,e,,m,5,,f,11s,7,,h,2,7,,2,,5,2s,,4g,7,af,,1p,4,e4,4,72,2,6r,,2,,7,2,5,,d6,7,31,7,240,5`.split(`,`).map(e=>e?parseInt(e,36):1);for(let t=0,n=0;t<e.length;t++)(t%2?je:Ae).push(n+=e[t])})();function Me(e){if(e<768)return!1;for(let t=0,n=Ae.length;;){let r=t+n>>1;if(e<Ae[r])n=r;else if(e>=je[r])t=r+1;else return!0;if(t==n)return!1}}function Ne(e){return e>=127462&&e<=127487}var Pe=8205;function Fe(e,t,n=!0,r=!0){return(n?Ie:Le)(e,t,r)}function Ie(e,t,n){if(t==e.length)return t;t&&ze(e.charCodeAt(t))&&Be(e.charCodeAt(t-1))&&t--;let r=Re(e,t);for(t+=Ve(r);t<e.length;){let i=Re(e,t);if(r==Pe||i==Pe||n&&Me(i))t+=Ve(i),r=i;else if(Ne(i)){let n=0,r=t-2;for(;r>=0&&Ne(Re(e,r));)n++,r-=2;if(n%2==0)break;t+=2}else break}return t}function Le(e,t,n){for(;t>1;){let r=Ie(e,t-2,n);if(r<t)return r;t--}return 0}function Re(e,t){let n=e.charCodeAt(t);if(!Be(n)||t+1==e.length)return n;let r=e.charCodeAt(t+1);return ze(r)?(n-55296<<10)+(r-56320)+65536:n}function ze(e){return e>=56320&&e<57344}function Be(e){return e>=55296&&e<56320}function Ve(e){return e<65536?1:2}var D=class e{lineAt(e){if(e<0||e>this.length)throw RangeError(`Invalid position ${e} in document of length ${this.length}`);return this.lineInner(e,!1,1,0)}line(e){if(e<1||e>this.lines)throw RangeError(`Invalid line number ${e} in ${this.lines}-line document`);return this.lineInner(e,!0,1,0)}replace(e,t,n){[e,t]=Ze(this,e,t);let r=[];return this.decompose(0,e,r,2),n.length&&n.decompose(0,n.length,r,3),this.decompose(t,this.length,r,1),Ue.from(r,this.length-(t-e)+n.length)}append(e){return this.replace(this.length,this.length,e)}slice(e,t=this.length){[e,t]=Ze(this,e,t);let n=[];return this.decompose(e,t,n,0),Ue.from(n,t-e)}eq(e){if(e==this)return!0;if(e.length!=this.length||e.lines!=this.lines)return!1;let t=this.scanIdentical(e,1),n=this.length-this.scanIdentical(e,-1),r=new qe(this),i=new qe(e);for(let e=t,a=t;;){if(r.next(e),i.next(e),e=0,r.lineBreak!=i.lineBreak||r.done!=i.done||r.value!=i.value)return!1;if(a+=r.value.length,r.done||a>=n)return!0}}iter(e=1){return new qe(this,e)}iterRange(e,t=this.length){return new Je(this,e,t)}iterLines(e,t){let n;if(e==null)n=this.iter();else{t??=this.lines+1;let r=this.line(e).from;n=this.iterRange(r,Math.max(r,t==this.lines+1?this.length:t<=1?0:this.line(t-1).to))}return new Ye(n)}toString(){return this.sliceString(0)}toJSON(){let e=[];return this.flatten(e),e}constructor(){}static of(t){if(t.length==0)throw RangeError(`A document must have at least one line`);return t.length==1&&!t[0]?e.empty:t.length<=32?new He(t):Ue.from(He.split(t,[]))}},He=class e extends D{constructor(e,t=We(e)){super(),this.text=e,this.length=t}get lines(){return this.text.length}get children(){return null}lineInner(e,t,n,r){for(let i=0;;i++){let a=this.text[i],o=r+a.length;if((t?n:o)>=e)return new Xe(r,o,n,a);r=o+1,n++}}decompose(t,n,r,i){let a=t<=0&&n>=this.length?this:new e(Ke(this.text,t,n),Math.min(n,this.length)-Math.max(0,t));if(i&1){let t=r.pop(),n=Ge(a.text,t.text.slice(),0,a.length);if(n.length<=32)r.push(new e(n,t.length+a.length));else{let t=n.length>>1;r.push(new e(n.slice(0,t)),new e(n.slice(t)))}}else r.push(a)}replace(t,n,r){if(!(r instanceof e))return super.replace(t,n,r);[t,n]=Ze(this,t,n);let i=Ge(this.text,Ge(r.text,Ke(this.text,0,t)),n),a=this.length+r.length-(n-t);return i.length<=32?new e(i,a):Ue.from(e.split(i,[]),a)}sliceString(e,t=this.length,n=`
`){[e,t]=Ze(this,e,t);let r=``;for(let i=0,a=0;i<=t&&a<this.text.length;a++){let o=this.text[a],s=i+o.length;i>e&&a&&(r+=n),e<s&&t>i&&(r+=o.slice(Math.max(0,e-i),t-i)),i=s+1}return r}flatten(e){for(let t of this.text)e.push(t)}scanIdentical(){return 0}static split(t,n){let r=[],i=-1;for(let a of t)r.push(a),i+=a.length+1,r.length==32&&(n.push(new e(r,i)),r=[],i=-1);return i>-1&&n.push(new e(r,i)),n}},Ue=class e extends D{constructor(e,t){super(),this.children=e,this.length=t,this.lines=0;for(let t of e)this.lines+=t.lines}lineInner(e,t,n,r){for(let i=0;;i++){let a=this.children[i],o=r+a.length,s=n+a.lines-1;if((t?s:o)>=e)return a.lineInner(e,t,n,r);r=o+1,n=s+1}}decompose(e,t,n,r){for(let i=0,a=0;a<=t&&i<this.children.length;i++){let o=this.children[i],s=a+o.length;if(e<=s&&t>=a){let i=r&(a<=e|(s>=t?2:0));a>=e&&s<=t&&!i?n.push(o):o.decompose(e-a,t-a,n,i)}a=s+1}}replace(t,n,r){if([t,n]=Ze(this,t,n),r.lines<this.lines)for(let i=0,a=0;i<this.children.length;i++){let o=this.children[i],s=a+o.length;if(t>=a&&n<=s){let c=o.replace(t-a,n-a,r),l=this.lines-o.lines+c.lines;if(c.lines<l>>4&&c.lines>l>>6){let a=this.children.slice();return a[i]=c,new e(a,this.length-(n-t)+r.length)}return super.replace(a,s,c)}a=s+1}return super.replace(t,n,r)}sliceString(e,t=this.length,n=`
`){[e,t]=Ze(this,e,t);let r=``;for(let i=0,a=0;i<this.children.length&&a<=t;i++){let o=this.children[i],s=a+o.length;a>e&&i&&(r+=n),e<s&&t>a&&(r+=o.sliceString(e-a,t-a,n)),a=s+1}return r}flatten(e){for(let t of this.children)t.flatten(e)}scanIdentical(t,n){if(!(t instanceof e))return 0;let r=0,[i,a,o,s]=n>0?[0,0,this.children.length,t.children.length]:[this.children.length-1,t.children.length-1,-1,-1];for(;;i+=n,a+=n){if(i==o||a==s)return r;let e=this.children[i],c=t.children[a];if(e!=c)return r+e.scanIdentical(c,n);r+=e.length+1}}static from(t,n=t.reduce((e,t)=>e+t.length+1,-1)){let r=0;for(let e of t)r+=e.lines;if(r<32){let e=[];for(let n of t)n.flatten(e);return new He(e,n)}let i=Math.max(32,r>>5),a=i<<1,o=i>>1,s=[],c=0,l=-1,u=[];function d(t){let n;if(t.lines>a&&t instanceof e)for(let e of t.children)d(e);else t.lines>o&&(c>o||!c)?(f(),s.push(t)):t instanceof He&&c&&(n=u[u.length-1])instanceof He&&t.lines+n.lines<=32?(c+=t.lines,l+=t.length+1,u[u.length-1]=new He(n.text.concat(t.text),n.length+1+t.length)):(c+t.lines>i&&f(),c+=t.lines,l+=t.length+1,u.push(t))}function f(){c!=0&&(s.push(u.length==1?u[0]:e.from(u,l)),l=-1,c=u.length=0)}for(let e of t)d(e);return f(),s.length==1?s[0]:new e(s,n)}};D.empty=new He([``],0);function We(e){let t=-1;for(let n of e)t+=n.length+1;return t}function Ge(e,t,n=0,r=1e9){for(let i=0,a=0,o=!0;a<e.length&&i<=r;a++){let s=e[a],c=i+s.length;c>=n&&(c>r&&(s=s.slice(0,r-i)),i<n&&(s=s.slice(n-i)),o?(t[t.length-1]+=s,o=!1):t.push(s)),i=c+1}return t}function Ke(e,t,n){return Ge(e,[``],t,n)}var qe=class{constructor(e,t=1){this.dir=t,this.done=!1,this.lineBreak=!1,this.value=``,this.nodes=[e],this.offsets=[t>0?1:(e instanceof He?e.text.length:e.children.length)<<1]}nextInner(e,t){for(this.done=this.lineBreak=!1;;){let n=this.nodes.length-1,r=this.nodes[n],i=this.offsets[n],a=i>>1,o=r instanceof He?r.text.length:r.children.length;if(a==(t>0?o:0)){if(n==0)return this.done=!0,this.value=``,this;t>0&&this.offsets[n-1]++,this.nodes.pop(),this.offsets.pop()}else if((i&1)==(t>0?0:1)){if(this.offsets[n]+=t,e==0)return this.lineBreak=!0,this.value=`
`,this;e--}else if(r instanceof He){let i=r.text[a+(t<0?-1:0)];if(this.offsets[n]+=t,i.length>Math.max(0,e))return this.value=e==0?i:t>0?i.slice(e):i.slice(0,i.length-e),this;e-=i.length}else{let i=r.children[a+(t<0?-1:0)];e>i.length?(e-=i.length,this.offsets[n]+=t):(t<0&&this.offsets[n]--,this.nodes.push(i),this.offsets.push(t>0?1:(i instanceof He?i.text.length:i.children.length)<<1))}}}next(e=0){return e<0&&(this.nextInner(-e,-this.dir),e=this.value.length),this.nextInner(e,this.dir)}},Je=class{constructor(e,t,n){this.value=``,this.done=!1,this.cursor=new qe(e,t>n?-1:1),this.pos=t>n?e.length:0,this.from=Math.min(t,n),this.to=Math.max(t,n)}nextInner(e,t){if(t<0?this.pos<=this.from:this.pos>=this.to)return this.value=``,this.done=!0,this;e+=Math.max(0,t<0?this.pos-this.to:this.from-this.pos);let n=t<0?this.pos-this.from:this.to-this.pos;e>n&&(e=n),n-=e;let{value:r}=this.cursor.next(e);return this.pos+=(r.length+e)*t,this.value=r.length<=n?r:t<0?r.slice(r.length-n):r.slice(0,n),this.done=!this.value,this}next(e=0){return e<0?e=Math.max(e,this.from-this.pos):e>0&&(e=Math.min(e,this.to-this.pos)),this.nextInner(e,this.cursor.dir)}get lineBreak(){return this.cursor.lineBreak&&this.value!=``}},Ye=class{constructor(e){this.inner=e,this.afterBreak=!0,this.value=``,this.done=!1}next(e=0){let{done:t,lineBreak:n,value:r}=this.inner.next(e);return t&&this.afterBreak?(this.value=``,this.afterBreak=!1):t?(this.done=!0,this.value=``):n?this.afterBreak?this.value=``:(this.afterBreak=!0,this.next()):(this.value=r,this.afterBreak=!1),this}get lineBreak(){return!1}};typeof Symbol<`u`&&(D.prototype[Symbol.iterator]=function(){return this.iter()},qe.prototype[Symbol.iterator]=Je.prototype[Symbol.iterator]=Ye.prototype[Symbol.iterator]=function(){return this});var Xe=class{constructor(e,t,n,r){this.from=e,this.to=t,this.number=n,this.text=r}get length(){return this.to-this.from}};function Ze(e,t,n){return t=Math.max(0,Math.min(e.length,t)),[t,Math.max(t,Math.min(e.length,n))]}function O(e,t,n=!0,r=!0){return Fe(e,t,n,r)}function Qe(e){return e>=56320&&e<57344}function $e(e){return e>=55296&&e<56320}function et(e,t){let n=e.charCodeAt(t);if(!$e(n)||t+1==e.length)return n;let r=e.charCodeAt(t+1);return Qe(r)?(n-55296<<10)+(r-56320)+65536:n}function tt(e){return e<65536?1:2}var nt=/\r\n?|\n/,rt=(function(e){return e[e.Simple=0]=`Simple`,e[e.TrackDel=1]=`TrackDel`,e[e.TrackBefore=2]=`TrackBefore`,e[e.TrackAfter=3]=`TrackAfter`,e})(rt||={}),it=class e{constructor(e){this.sections=e}get length(){let e=0;for(let t=0;t<this.sections.length;t+=2)e+=this.sections[t];return e}get newLength(){let e=0;for(let t=0;t<this.sections.length;t+=2){let n=this.sections[t+1];e+=n<0?this.sections[t]:n}return e}get empty(){return this.sections.length==0||this.sections.length==2&&this.sections[1]<0}iterGaps(e){for(let t=0,n=0,r=0;t<this.sections.length;){let i=this.sections[t++],a=this.sections[t++];a<0?(e(n,r,i),r+=i):r+=a,n+=i}}iterChangedRanges(e,t=!1){ct(this,e,t)}get invertedDesc(){let t=[];for(let e=0;e<this.sections.length;){let n=this.sections[e++],r=this.sections[e++];r<0?t.push(n,r):t.push(r,n)}return new e(t)}composeDesc(e){return this.empty?e:e.empty?this:ut(this,e)}mapDesc(e,t=!1){return e.empty?this:lt(this,e,t)}mapPos(e,t=-1,n=rt.Simple){let r=0,i=0;for(let a=0;a<this.sections.length;){let o=this.sections[a++],s=this.sections[a++],c=r+o;if(s<0){if(c>e)return i+(e-r);i+=o}else{if(n!=rt.Simple&&c>=e&&(n==rt.TrackDel&&r<e&&c>e||n==rt.TrackBefore&&r<e||n==rt.TrackAfter&&c>e))return null;if(c>e||c==e&&t<0&&!o)return e==r||t<0?i:i+s;i+=s}r=c}if(e>r)throw RangeError(`Position ${e} is out of range for changeset of length ${r}`);return i}touchesRange(e,t=e){for(let n=0,r=0;n<this.sections.length&&r<=t;){let i=this.sections[n++],a=this.sections[n++],o=r+i;if(a>=0&&r<=t&&o>=e)return r<e&&o>t?`cover`:!0;r=o}return!1}toString(){let e=``;for(let t=0;t<this.sections.length;){let n=this.sections[t++],r=this.sections[t++];e+=(e?` `:``)+n+(r>=0?`:`+r:``)}return e}toJSON(){return this.sections}static fromJSON(t){if(!Array.isArray(t)||t.length%2||t.some(e=>typeof e!=`number`))throw RangeError(`Invalid JSON representation of ChangeDesc`);return new e(t)}static create(t){return new e(t)}},at=class e extends it{constructor(e,t){super(e),this.inserted=t}apply(e){if(this.length!=e.length)throw RangeError(`Applying change set to a document with the wrong length`);return ct(this,(t,n,r,i,a)=>e=e.replace(r,r+(n-t),a),!1),e}mapDesc(e,t=!1){return lt(this,e,t,!0)}invert(t){let n=this.sections.slice(),r=[];for(let e=0,i=0;e<n.length;e+=2){let a=n[e],o=n[e+1];if(o>=0){n[e]=o,n[e+1]=a;let s=e>>1;for(;r.length<s;)r.push(D.empty);r.push(a?t.slice(i,i+a):D.empty)}i+=a}return new e(n,r)}compose(e){return this.empty?e:e.empty?this:ut(this,e,!0)}map(e,t=!1){return e.empty?this:lt(this,e,t,!0)}iterChanges(e,t=!1){ct(this,e,t)}get desc(){return it.create(this.sections)}filter(t){let n=[],r=[],i=[],a=new dt(this);done:for(let e=0,o=0;;){let s=e==t.length?1e9:t[e++];for(;o<s||o==s&&a.len==0;){if(a.done)break done;let e=Math.min(a.len,s-o);ot(i,e,-1);let t=a.ins==-1?-1:a.off==0?a.ins:0;ot(n,e,t),t>0&&st(r,n,a.text),a.forward(e),o+=e}let c=t[e++];for(;o<c;){if(a.done)break done;let e=Math.min(a.len,c-o);ot(n,e,-1),ot(i,e,a.ins==-1?-1:a.off==0?a.ins:0),a.forward(e),o+=e}}return{changes:new e(n,r),filtered:it.create(i)}}toJSON(){let e=[];for(let t=0;t<this.sections.length;t+=2){let n=this.sections[t],r=this.sections[t+1];r<0?e.push(n):r==0?e.push([n]):e.push([n].concat(this.inserted[t>>1].toJSON()))}return e}static of(t,n,r){let i=[],a=[],o=0,s=null;function c(t=!1){if(!t&&!i.length)return;o<n&&ot(i,n-o,-1);let r=new e(i,a);s=s?s.compose(r.map(s)):r,i=[],a=[],o=0}function l(t){if(Array.isArray(t))for(let e of t)l(e);else if(t instanceof e){if(t.length!=n)throw RangeError(`Mismatched change set length (got ${t.length}, expected ${n})`);c(),s=s?s.compose(t.map(s)):t}else{let{from:e,to:s=e,insert:l}=t;if(e>s||e<0||s>n)throw RangeError(`Invalid change range ${e} to ${s} (in doc of length ${n})`);let u=l?typeof l==`string`?D.of(l.split(r||nt)):l:D.empty,d=u.length;if(e==s&&d==0)return;e<o&&c(),e>o&&ot(i,e-o,-1),ot(i,s-e,d),st(a,i,u),o=s}}return l(t),c(!s),s}static empty(t){return new e(t?[t,-1]:[],[])}static fromJSON(t){if(!Array.isArray(t))throw RangeError(`Invalid JSON representation of ChangeSet`);let n=[],r=[];for(let e=0;e<t.length;e++){let i=t[e];if(typeof i==`number`)n.push(i,-1);else if(!Array.isArray(i)||typeof i[0]!=`number`||i.some((e,t)=>t&&typeof e!=`string`))throw RangeError(`Invalid JSON representation of ChangeSet`);else if(i.length==1)n.push(i[0],0);else{for(;r.length<e;)r.push(D.empty);r[e]=D.of(i.slice(1)),n.push(i[0],r[e].length)}}return new e(n,r)}static createSet(t,n){return new e(t,n)}};function ot(e,t,n,r=!1){if(t==0&&n<=0)return;let i=e.length-2;i>=0&&n<=0&&n==e[i+1]?e[i]+=t:i>=0&&t==0&&e[i]==0?e[i+1]+=n:r?(e[i]+=t,e[i+1]+=n):e.push(t,n)}function st(e,t,n){if(n.length==0)return;let r=t.length-2>>1;if(r<e.length)e[e.length-1]=e[e.length-1].append(n);else{for(;e.length<r;)e.push(D.empty);e.push(n)}}function ct(e,t,n){let r=e.inserted;for(let i=0,a=0,o=0;o<e.sections.length;){let s=e.sections[o++],c=e.sections[o++];if(c<0)i+=s,a+=s;else{let l=i,u=a,d=D.empty;for(;l+=s,u+=c,c&&r&&(d=d.append(r[o-2>>1])),!(n||o==e.sections.length||e.sections[o+1]<0);)s=e.sections[o++],c=e.sections[o++];t(i,l,a,u,d),i=l,a=u}}}function lt(e,t,n,r=!1){let i=[],a=r?[]:null,o=new dt(e),s=new dt(t);for(let e=-1;;)if(o.done&&s.len||s.done&&o.len)throw Error(`Mismatched change set lengths`);else if(o.ins==-1&&s.ins==-1){let e=Math.min(o.len,s.len);ot(i,e,-1),o.forward(e),s.forward(e)}else if(s.ins>=0&&(o.ins<0||e==o.i||o.off==0&&(s.len<o.len||s.len==o.len&&!n))){let t=s.len;for(ot(i,s.ins,-1);t;){let n=Math.min(o.len,t);o.ins>=0&&e<o.i&&o.len<=n&&(ot(i,0,o.ins),a&&st(a,i,o.text),e=o.i),o.forward(n),t-=n}s.next()}else if(o.ins>=0){let t=0,n=o.len;for(;n;)if(s.ins==-1){let e=Math.min(n,s.len);t+=e,n-=e,s.forward(e)}else if(s.ins==0&&s.len<n)n-=s.len,s.next();else break;ot(i,t,e<o.i?o.ins:0),a&&e<o.i&&st(a,i,o.text),e=o.i,o.forward(o.len-n)}else if(o.done&&s.done)return a?at.createSet(i,a):it.create(i);else throw Error(`Mismatched change set lengths`)}function ut(e,t,n=!1){let r=[],i=n?[]:null,a=new dt(e),o=new dt(t);for(let e=!1;;)if(a.done&&o.done)return i?at.createSet(r,i):it.create(r);else if(a.ins==0)ot(r,a.len,0,e),a.next();else if(o.len==0&&!o.done)ot(r,0,o.ins,e),i&&st(i,r,o.text),o.next();else if(a.done||o.done)throw Error(`Mismatched change set lengths`);else{let t=Math.min(a.len2,o.len),n=r.length;if(a.ins==-1){let n=o.ins==-1?-1:o.off?0:o.ins;ot(r,t,n,e),i&&n&&st(i,r,o.text)}else o.ins==-1?(ot(r,a.off?0:a.len,t,e),i&&st(i,r,a.textBit(t))):(ot(r,a.off?0:a.len,o.off?0:o.ins,e),i&&!o.off&&st(i,r,o.text));e=(a.ins>t||o.ins>=0&&o.len>t)&&(e||r.length>n),a.forward2(t),o.forward(t)}}var dt=class{constructor(e){this.set=e,this.i=0,this.next()}next(){let{sections:e}=this.set;this.i<e.length?(this.len=e[this.i++],this.ins=e[this.i++]):(this.len=0,this.ins=-2),this.off=0}get done(){return this.ins==-2}get len2(){return this.ins<0?this.len:this.ins}get text(){let{inserted:e}=this.set,t=this.i-2>>1;return t>=e.length?D.empty:e[t]}textBit(e){let{inserted:t}=this.set,n=this.i-2>>1;return n>=t.length&&!e?D.empty:t[n].slice(this.off,e==null?void 0:this.off+e)}forward(e){e==this.len?this.next():(this.len-=e,this.off+=e)}forward2(e){this.ins==-1?this.forward(e):e==this.ins?this.next():(this.ins-=e,this.off+=e)}},ft=class e{constructor(e,t,n,r){this.from=e,this.to=t,this.flags=n,this.goalColumn=r}get anchor(){return this.flags&32?this.to:this.from}get head(){return this.flags&32?this.from:this.to}get empty(){return this.from==this.to}get assoc(){return this.flags&8?-1:this.flags&16?1:0}get undirectional(){return(this.flags&64)>0}get bidiLevel(){let e=this.flags&7;return e==7?null:e}map(t,n=-1){let r,i;return this.empty?r=i=t.mapPos(this.from,n):(r=t.mapPos(this.from,1),i=t.mapPos(this.to,-1)),r==this.from&&i==this.to?this:new e(r,i,this.flags,this.goalColumn)}extend(e,t=e,n=0){if(e<=this.anchor&&t>=this.anchor)return k.range(e,t,void 0,void 0,n);let r=Math.abs(e-this.anchor)>Math.abs(t-this.anchor)?e:t;return k.range(this.anchor,r,void 0,void 0,n)}eq(e,t=!1){return this.anchor==e.anchor&&this.head==e.head&&this.goalColumn==e.goalColumn&&(!t||!this.empty||this.assoc==e.assoc)}toJSON(){return{anchor:this.anchor,head:this.head}}static fromJSON(e){if(!e||typeof e.anchor!=`number`||typeof e.head!=`number`)throw RangeError(`Invalid JSON representation for SelectionRange`);return k.range(e.anchor,e.head)}static create(t,n,r,i){return new e(t,n,r,i)}},k=class e{constructor(e,t){this.ranges=e,this.mainIndex=t}map(t,n=-1){return t.empty?this:e.create(this.ranges.map(e=>e.map(t,n)),this.mainIndex)}eq(e,t=!1){if(this.ranges.length!=e.ranges.length||this.mainIndex!=e.mainIndex)return!1;for(let n=0;n<this.ranges.length;n++)if(!this.ranges[n].eq(e.ranges[n],t))return!1;return!0}get main(){return this.ranges[this.mainIndex]}asSingle(){return this.ranges.length==1?this:new e([this.main],0)}addRange(t,n=!0){return e.create([t].concat(this.ranges),n?0:this.mainIndex+1)}replaceRange(t,n=this.mainIndex){let r=this.ranges.slice();return r[n]=t,e.create(r,this.mainIndex)}toJSON(){return{ranges:this.ranges.map(e=>e.toJSON()),main:this.mainIndex}}static fromJSON(t){if(!t||!Array.isArray(t.ranges)||typeof t.main!=`number`||t.main>=t.ranges.length)throw RangeError(`Invalid JSON representation for EditorSelection`);return new e(t.ranges.map(e=>ft.fromJSON(e)),t.main)}static single(t,n=t){return new e([e.range(t,n)],0)}static create(t,n=0){if(t.length==0)throw RangeError(`A selection needs at least one range`);for(let r=0,i=0;i<t.length;i++){let a=t[i];if(a.empty?a.from<=r:a.from<r)return e.normalized(t.slice(),n);r=a.to}return new e(t,n)}static cursor(e,t=0,n,r){return ft.create(e,e,(t==0?0:t<0?8:16)|(n==null?7:Math.min(6,n)),r)}static range(e,t,n,r,i){let a=r==null?7:Math.min(6,r);return!i&&e!=t&&(i=t<e?1:-1),i&&(a|=i<0?8:16),t<e?ft.create(t,e,a|32,n):ft.create(e,t,a,n)}static undirectionalRange(e,t){return ft.create(e,t,64,void 0)}static normalized(t,n=0){let r=t[n];t.sort((e,t)=>e.from-t.from),n=t.indexOf(r);for(let r=1;r<t.length;r++){let i=t[r],a=t[r-1];if(i.empty?i.from<=a.to:i.from<a.to){let o=a.from,s=Math.max(i.to,a.to);r<=n&&n--,t.splice(--r,2,i.anchor>i.head?e.range(s,o):e.range(o,s))}}return new e(t,n)}};function pt(e,t){for(let n of e.ranges)if(n.to>t)throw RangeError(`Selection points outside of document`)}var mt=0,A=class e{constructor(e,t,n,r,i){this.combine=e,this.compareInput=t,this.compare=n,this.isStatic=r,this.id=mt++,this.default=e([]),this.extensions=typeof i==`function`?i(this):i}get reader(){return this}static define(t={}){return new e(t.combine||(e=>e),t.compareInput||((e,t)=>e===t),t.compare||(t.combine?(e,t)=>e===t:ht),!!t.static,t.enables)}of(e){return new gt([],this,0,e)}compute(e,t){if(this.isStatic)throw Error(`Can't compute a static facet`);return new gt(e,this,1,t)}computeN(e,t){if(this.isStatic)throw Error(`Can't compute a static facet`);return new gt(e,this,2,t)}from(e,t){return t||=e=>e,this.compute([e],n=>t(n.field(e)))}};function ht(e,t){return e==t||e.length==t.length&&e.every((e,n)=>e===t[n])}var gt=class{constructor(e,t,n,r){this.dependencies=e,this.facet=t,this.type=n,this.value=r,this.id=mt++}dynamicSlot(e){let t=this.value,n=this.facet.compareInput,r=this.id,i=e[r]>>1,a=this.type==2,o=!1,s=!1,c=[];for(let t of this.dependencies)t==`doc`?o=!0:t==`selection`?s=!0:(e[t.id]??1)&1||c.push(e[t.id]);return{create(e){return e.values[i]=t(e),1},update(e,r){if(o&&r.docChanged||s&&(r.docChanged||r.selection)||vt(e,c)){let r=t(e);if(a?!_t(r,e.values[i],n):!n(r,e.values[i]))return e.values[i]=r,1}return 0},reconfigure:(e,o)=>{let s,c=o.config.address[r];if(c!=null){let r=jt(o,c);if(this.dependencies.every(t=>t instanceof A?o.facet(t)===e.facet(t):t instanceof xt?o.field(t,!1)==e.field(t,!1):!0)||(a?_t(s=t(e),r,n):n(s=t(e),r)))return e.values[i]=r,0}else s=t(e);return e.values[i]=s,1}}}get extension(){return this}};function _t(e,t,n){if(e.length!=t.length)return!1;for(let r=0;r<e.length;r++)if(!n(e[r],t[r]))return!1;return!0}function vt(e,t){let n=!1;for(let r of t)At(e,r)&1&&(n=!0);return n}function yt(e,t,n){let r=n.map(t=>e[t.id]),i=n.map(e=>e.type),a=r.filter(e=>!(e&1)),o=e[t.id]>>1;function s(e){let n=[];for(let t=0;t<r.length;t++){let a=jt(e,r[t]);if(i[t]==2)for(let e of a)n.push(e);else n.push(a)}return t.combine(n)}return{create(e){for(let t of r)At(e,t);return e.values[o]=s(e),1},update(e,n){if(!vt(e,a))return 0;let r=s(e);return t.compare(r,e.values[o])?0:(e.values[o]=r,1)},reconfigure(e,i){let a=vt(e,r),c=i.config.facets[t.id],l=i.facet(t);if(c&&!a&&ht(n,c))return e.values[o]=l,0;let u=s(e);return t.compare(u,l)?(e.values[o]=l,0):(e.values[o]=u,1)}}}var bt=A.define({static:!0}),xt=class e{constructor(e,t,n,r,i){this.id=e,this.createF=t,this.updateF=n,this.compareF=r,this.spec=i,this.provides=void 0}static define(t){let n=new e(mt++,t.create,t.update,t.compare||((e,t)=>e===t),t);return t.provide&&(n.provides=t.provide(n)),n}create(e){return(e.facet(bt).find(e=>e.field==this)?.create||this.createF)(e)}slot(e){let t=e[this.id]>>1;return{create:e=>(e.values[t]=this.create(e),1),update:(e,n)=>{let r=e.values[t],i=this.updateF(r,n);return this.compareF(r,i)?0:(e.values[t]=i,1)},reconfigure:(e,n)=>{let r=e.facet(bt),i=n.facet(bt),a;return(a=r.find(e=>e.field==this))&&a!=i.find(e=>e.field==this)?(e.values[t]=a.create(e),1):n.config.address[this.id]==null?(e.values[t]=this.create(e),1):(e.values[t]=n.field(this),0)}}}init(e){return[this,bt.of({field:this,create:e})]}get extension(){return this}},St={lowest:4,low:3,default:2,high:1,highest:0};function Ct(e){return t=>new Tt(t,e)}var wt={highest:Ct(St.highest),high:Ct(St.high),default:Ct(St.default),low:Ct(St.low),lowest:Ct(St.lowest)},Tt=class{constructor(e,t){this.inner=e,this.prec=t}get extension(){return this}},Et=class e{of(e){return new Dt(this,e)}reconfigure(t){return e.reconfigure.of({compartment:this,extension:t})}get(e){return e.config.compartments.get(this)}},Dt=class{constructor(e,t){this.compartment=e,this.inner=t}get extension(){return this}},Ot=class e{constructor(e,t,n,r,i,a){for(this.base=e,this.compartments=t,this.dynamicSlots=n,this.address=r,this.staticValues=i,this.facets=a,this.statusTemplate=[];this.statusTemplate.length<n.length;)this.statusTemplate.push(0)}staticFacet(e){let t=this.address[e.id];return t==null?e.default:this.staticValues[t>>1]}static resolve(t,n,r){let i=[],a=Object.create(null),o=new Map;for(let e of kt(t,n,o))e instanceof xt?i.push(e):(a[e.facet.id]||(a[e.facet.id]=[])).push(e);let s=Object.create(null),c=[],l=[];for(let e of i)s[e.id]=l.length<<1,l.push(t=>e.slot(t));let u=r?.config.facets;for(let e in a){let t=a[e],n=t[0].facet,i=u&&u[e]||[];if(t.every(e=>e.type==0)){if(s[n.id]=c.length<<1|1,ht(i,t))c.push(r.facet(n));else{let e=n.combine(t.map(e=>e.value));c.push(r&&n.compare(e,r.facet(n))?r.facet(n):e)}}else{for(let e of t)e.type==0?(s[e.id]=c.length<<1|1,c.push(e.value)):(s[e.id]=l.length<<1,l.push(t=>e.dynamicSlot(t)));s[n.id]=l.length<<1,l.push(e=>yt(e,n,t))}}let d=l.map(e=>e(s));return new e(t,o,d,s,c,a)}};function kt(e,t,n){let r=[[],[],[],[],[]],i=new Map;function a(e,o){let s=i.get(e);if(s!=null){if(s<=o)return;let t=r[s].indexOf(e);t>-1&&r[s].splice(t,1),e instanceof Dt&&n.delete(e.compartment)}if(i.set(e,o),Array.isArray(e))for(let t of e)a(t,o);else if(e instanceof Dt){if(n.has(e.compartment))throw RangeError(`Duplicate use of compartment in extensions`);let r=t.get(e.compartment)||e.inner;n.set(e.compartment,r),a(r,o)}else if(e instanceof Tt)a(e.inner,e.prec);else if(e instanceof xt)r[o].push(e),e.provides&&a(e.provides,o);else if(e instanceof gt)r[o].push(e),e.facet.extensions&&a(e.facet.extensions,St.default);else{let t=e.extension;if(!t)throw Error(`Unrecognized extension value in extension set (${e}).`);if(t==e)throw Error(`Unrecognized extension value in extension set (${e}). This sometimes happens because multiple instances of @codemirror/state are loaded, breaking instanceof checks.`);a(t,o)}}return a(e,St.default),r.reduce((e,t)=>e.concat(t))}function At(e,t){if(t&1)return 2;let n=t>>1,r=e.status[n];if(r==4)throw Error(`Cyclic dependency between fields and/or facets`);if(r&2)return r;e.status[n]=4;let i=e.computeSlot(e,e.config.dynamicSlots[n]);return e.status[n]=2|i}function jt(e,t){return t&1?e.config.staticValues[t>>1]:e.values[t>>1]}var Mt=A.define(),Nt=A.define({combine:e=>e.some(e=>e),static:!0}),Pt=A.define({combine:e=>e.length?e[0]:void 0,static:!0}),Ft=A.define(),It=A.define(),Lt=A.define(),Rt=A.define({combine:e=>e.length?e[0]:!1}),zt=class{constructor(e,t){this.type=e,this.value=t}static define(){return new Bt}},Bt=class{of(e){return new zt(this,e)}},Vt=class{constructor(e){this.map=e}of(e){return new j(this,e)}},j=class e{constructor(e,t){this.type=e,this.value=t}map(t){let n=this.type.map(this.value,t);return n===void 0?void 0:n==this.value?this:new e(this.type,n)}is(e){return this.type==e}static define(e={}){return new Vt(e.map||(e=>e))}static mapEffects(e,t){if(!e.length)return e;let n=[];for(let r of e){let e=r.map(t);e&&n.push(e)}return n}};j.reconfigure=j.define(),j.appendConfig=j.define();var Ht=class e{constructor(t,n,r,i,a,o){this.startState=t,this.changes=n,this.selection=r,this.effects=i,this.annotations=a,this.scrollIntoView=o,this._doc=null,this._state=null,r&&pt(r,n.newLength),a.some(t=>t.type==e.time)||(this.annotations=a.concat(e.time.of(Date.now())))}static create(t,n,r,i,a,o){return new e(t,n,r,i,a,o)}get newDoc(){return this._doc||=this.changes.apply(this.startState.doc)}get newSelection(){return this.selection||this.startState.selection.map(this.changes)}get state(){return this._state||this.startState.applyTransaction(this),this._state}annotation(e){for(let t of this.annotations)if(t.type==e)return t.value}get docChanged(){return!this.changes.empty}get reconfigured(){return this.startState.config!=this.state.config}isUserEvent(t){let n=this.annotation(e.userEvent);return!!(n&&(n==t||n.length>t.length&&n.slice(0,t.length)==t&&n[t.length]==`.`))}};Ht.time=zt.define(),Ht.userEvent=zt.define(),Ht.addToHistory=zt.define(),Ht.remote=zt.define();function Ut(e,t){let n=[];for(let r=0,i=0;;){let a,o;if(r<e.length&&(i==t.length||t[i]>=e[r]))a=e[r++],o=e[r++];else if(i<t.length)a=t[i++],o=t[i++];else return n;!n.length||n[n.length-1]<a?n.push(a,o):n[n.length-1]<o&&(n[n.length-1]=o)}}function Wt(e,t,n){let r,i,a;return n?(r=t.changes,i=at.empty(t.changes.length),a=e.changes.compose(t.changes)):(r=t.changes.map(e.changes),i=e.changes.mapDesc(t.changes,!0),a=e.changes.compose(r)),{changes:a,selection:t.selection?t.selection.map(i):e.selection?.map(r),effects:j.mapEffects(e.effects,r).concat(j.mapEffects(t.effects,i)),annotations:e.annotations.length?e.annotations.concat(t.annotations):t.annotations,scrollIntoView:e.scrollIntoView||t.scrollIntoView}}function Gt(e,t,n){let r=t.selection,i=Xt(t.annotations);return t.userEvent&&(i=i.concat(Ht.userEvent.of(t.userEvent))),{changes:t.changes instanceof at?t.changes:at.of(t.changes||[],n,e.facet(Pt)),selection:r&&(r instanceof k?r:k.single(r.anchor,r.head)),effects:Xt(t.effects),annotations:i,scrollIntoView:!!t.scrollIntoView}}function Kt(e,t,n){let r=Gt(e,t.length?t[0]:{},e.doc.length);t.length&&t[0].filter===!1&&(n=!1);for(let i=1;i<t.length;i++){t[i].filter===!1&&(n=!1);let a=!!t[i].sequential;r=Wt(r,Gt(e,t[i],a?r.changes.newLength:e.doc.length),a)}let i=Ht.create(e,r.changes,r.selection,r.effects,r.annotations,r.scrollIntoView);return Jt(n?qt(i):i)}function qt(e){let t=e.startState,n=!0;for(let r of t.facet(Ft)){let t=r(e);if(t===!1){n=!1;break}Array.isArray(t)&&(n=n===!0?t:Ut(n,t))}if(n!==!0){let r,i;if(n===!1)i=e.changes.invertedDesc,r=at.empty(t.doc.length);else{let t=e.changes.filter(n);r=t.changes,i=t.filtered.mapDesc(t.changes).invertedDesc}e=Ht.create(t,r,e.selection&&e.selection.map(i),j.mapEffects(e.effects,i),e.annotations,e.scrollIntoView)}let r=t.facet(It);for(let n=r.length-1;n>=0;n--){let i=r[n](e);e=i instanceof Ht?i:Array.isArray(i)&&i.length==1&&i[0]instanceof Ht?i[0]:Kt(t,Xt(i),!1)}return e}function Jt(e){let t=e.startState,n=t.facet(Lt),r=e;for(let i=n.length-1;i>=0;i--){let a=n[i](e);a&&Object.keys(a).length&&(r=Wt(r,Gt(t,a,e.changes.newLength),!0))}return r==e?e:Ht.create(t,e.changes,e.selection,r.effects,r.annotations,r.scrollIntoView)}var Yt=[];function Xt(e){return e==null?Yt:Array.isArray(e)?e:[e]}var Zt=(function(e){return e[e.Word=0]=`Word`,e[e.Space=1]=`Space`,e[e.Other=2]=`Other`,e})(Zt||={}),Qt=/[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/,$t;try{$t=RegExp(`[\\p{Alphabetic}\\p{Number}_]`,`u`)}catch{}function en(e){if($t)return $t.test(e);for(let t=0;t<e.length;t++){let n=e[t];if(/\w/.test(n)||n>``&&(n.toUpperCase()!=n.toLowerCase()||Qt.test(n)))return!0}return!1}function tn(e){return t=>{if(!/\S/.test(t))return Zt.Space;if(en(t))return Zt.Word;for(let n=0;n<e.length;n++)if(t.indexOf(e[n])>-1)return Zt.Word;return Zt.Other}}var M=class e{constructor(e,t,n,r,i,a){this.config=e,this.doc=t,this.selection=n,this.values=r,this.status=e.statusTemplate.slice(),this.computeSlot=i,a&&(a._state=this);for(let e=0;e<this.config.dynamicSlots.length;e++)At(this,e<<1);this.computeSlot=null}field(e,t=!0){let n=this.config.address[e.id];if(n==null){if(t)throw RangeError(`Field is not present in this state`);return}return At(this,n),jt(this,n)}update(...e){return Kt(this,e,!0)}applyTransaction(t){let n=this.config,{base:r,compartments:i}=n;for(let e of t.effects)e.is(Et.reconfigure)?(n&&=(i=new Map,n.compartments.forEach((e,t)=>i.set(t,e)),null),i.set(e.value.compartment,e.value.extension)):e.is(j.reconfigure)?(n=null,r=e.value):e.is(j.appendConfig)&&(n=null,r=Xt(r).concat(e.value));let a;n?a=t.startState.values.slice():(n=Ot.resolve(r,i,this),a=new e(n,this.doc,this.selection,n.dynamicSlots.map(()=>null),(e,t)=>t.reconfigure(e,this),null).values);let o=t.startState.facet(Nt)?t.newSelection:t.newSelection.asSingle();new e(n,t.newDoc,o,a,(e,n)=>n.update(e,t),t)}replaceSelection(e){return typeof e==`string`&&(e=this.toText(e)),this.changeByRange(t=>({changes:{from:t.from,to:t.to,insert:e},range:k.cursor(t.from+e.length,-1)}))}changeByRange(e){let t=this.selection,n=e(t.ranges[0]),r=this.changes(n.changes),i=[n.range],a=Xt(n.effects);for(let n=1;n<t.ranges.length;n++){let o=e(t.ranges[n]),s=this.changes(o.changes),c=s.map(r);for(let e=0;e<n;e++)i[e]=i[e].map(c);let l=r.mapDesc(s,!0);i.push(o.range.map(l)),r=r.compose(c),a=j.mapEffects(a,c).concat(j.mapEffects(Xt(o.effects),l))}return{changes:r,selection:k.create(i,t.mainIndex),effects:a}}changes(t=[]){return t instanceof at?t:at.of(t,this.doc.length,this.facet(e.lineSeparator))}toText(t){return D.of(t.split(this.facet(e.lineSeparator)||nt))}sliceDoc(e=0,t=this.doc.length){return this.doc.sliceString(e,t,this.lineBreak)}facet(e){let t=this.config.address[e.id];return t==null?e.default:(At(this,t),jt(this,t))}toJSON(e){let t={doc:this.sliceDoc(),selection:this.selection.toJSON()};if(e)for(let n in e){let r=e[n];r instanceof xt&&this.config.address[r.id]!=null&&(t[n]=r.spec.toJSON(this.field(e[n]),this))}return t}static fromJSON(t,n={},r){if(!t||typeof t.doc!=`string`)throw RangeError(`Invalid JSON representation for EditorState`);let i=[];if(r){for(let e in r)if(Object.prototype.hasOwnProperty.call(t,e)){let n=r[e],a=t[e];i.push(n.init(e=>n.spec.fromJSON(a,e)))}}return e.create({doc:t.doc,selection:k.fromJSON(t.selection),extensions:n.extensions?i.concat([n.extensions]):i})}static create(t={}){let n=Ot.resolve(t.extensions||[],new Map),r=t.doc instanceof D?t.doc:D.of((t.doc||``).split(n.staticFacet(e.lineSeparator)||nt)),i=t.selection?t.selection instanceof k?t.selection:k.single(t.selection.anchor,t.selection.head):k.single(0);return pt(i,r.length),n.staticFacet(Nt)||(i=i.asSingle()),new e(n,r,i,n.dynamicSlots.map(()=>null),(e,t)=>t.create(e),null)}get tabSize(){return this.facet(e.tabSize)}get lineBreak(){return this.facet(e.lineSeparator)||`
`}get readOnly(){return this.facet(Rt)}phrase(t,...n){for(let n of this.facet(e.phrases))if(Object.prototype.hasOwnProperty.call(n,t)){t=n[t];break}return n.length&&(t=t.replace(/\$(\$|\d*)/g,(e,t)=>{if(t==`$`)return`$`;let r=+(t||1);return!r||r>n.length?e:n[r-1]})),t}languageDataAt(e,t,n=-1){let r=[];for(let i of this.facet(Mt))for(let a of i(this,t,n))Object.prototype.hasOwnProperty.call(a,e)&&r.push(a[e]);return r}charCategorizer(e){let t=this.languageDataAt(`wordChars`,e);return tn(t.length?t[0]:``)}wordAt(e){let{text:t,from:n,length:r}=this.doc.lineAt(e),i=this.charCategorizer(e),a=e-n,o=e-n;for(;a>0;){let e=O(t,a,!1);if(i(t.slice(e,a))!=Zt.Word)break;a=e}for(;o<r;){let e=O(t,o);if(i(t.slice(o,e))!=Zt.Word)break;o=e}return a==o?null:k.range(a+n,o+n)}};M.allowMultipleSelections=Nt,M.tabSize=A.define({combine:e=>e.length?e[0]:4}),M.lineSeparator=Pt,M.readOnly=Rt,M.phrases=A.define({compare(e,t){let n=Object.keys(e),r=Object.keys(t);return n.length==r.length&&n.every(n=>e[n]==t[n])}}),M.languageData=Mt,M.changeFilter=Ft,M.transactionFilter=It,M.transactionExtender=Lt,Et.reconfigure=j.define();function nn(e,t,n={}){let r={};for(let t of e)for(let e of Object.keys(t)){let i=t[e],a=r[e];if(a===void 0)r[e]=i;else if(a!==i&&i!==void 0){if(Object.hasOwnProperty.call(n,e))r[e]=n[e](a,i);else throw Error(`Config merge conflict for field `+e)}}for(let e in t)r[e]===void 0&&(r[e]=t[e]);return r}var rn=class{eq(e){return this==e}range(e,t=e){return on.create(e,t,this)}};rn.prototype.startSide=rn.prototype.endSide=0,rn.prototype.point=!1,rn.prototype.mapMode=rt.TrackDel;function an(e,t){return e==t||e.constructor==t.constructor&&e.eq(t)}var on=class e{constructor(e,t,n){this.from=e,this.to=t,this.value=n}static create(t,n,r){return new e(t,n,r)}};function sn(e,t){return e.from-t.from||e.value.startSide-t.value.startSide}var cn=class e{constructor(e,t,n,r){this.from=e,this.to=t,this.value=n,this.maxPoint=r}get length(){return ln(this.to)}findIndex(e,t,n,r=0){let i=n?this.to:this.from;for(let a=r,o=i.length;;){if(a==o)return a;let r=a+o>>1,s=i[r]-e||(n?this.value[r].endSide:this.value[r].startSide)-t;if(r==a)return s>=0?a:o;s>=0?o=r:a=r+1}}between(e,t,n,r){for(let i=this.findIndex(t,-1e9,!0),a=this.findIndex(n,1e9,!1,i);i<a;i++)if(r(this.from[i]+e,this.to[i]+e,this.value[i])===!1)return!1}map(t,n,r,i,a){let o=[],s=[],c=[],l=-1,u=-1;iter:for(let e=0;e<this.value.length;e++){let d=this.value[e],f=this.from[e]+t,p=this.to[e]+t,m,h;if(f==p){let e=n.mapPos(f,d.startSide,d.mapMode);if(e==null||(m=h=e,d.startSide!=d.endSide&&(h=n.mapPos(f,d.endSide),h<m)))continue}else if(m=n.mapPos(f,d.startSide),h=n.mapPos(p,d.endSide),m>h||m==h&&d.startSide>0&&d.endSide<=0)continue;if(!((h-m||d.endSide-d.startSide)<0)){if(l<0&&(l=m),d.point&&(u=Math.max(u,h-m)),(m-r||d.startSide-i)>=0)o.push(d),s.push(m-l),c.push(h-l),r=h,i=d.endSide;else{if(m==h)for(let e=o.length;e>0;e--){if((m-(c[e-1]+l)||d.startSide-o[e-1].endSide)>=0){o.splice(e,0,d),s.splice(e,0,m-l),c.splice(e,0,h-l);continue iter}if((m-(s[e-1]+l)||d.endSide-o[e-1].startSide)>0)break}a(m,h,d)}}}return{mapped:o.length?new e(s,c,o,u):null,pos:l}}},N=class e{constructor(e,t,n,r){this.chunkPos=e,this.chunk=t,this.nextLayer=n,this.maxPoint=r}static create(t,n,r,i){return new e(t,n,r,i)}get length(){let e=this.chunk.length-1;return e<0?0:Math.max(this.chunkEnd(e),this.nextLayer.length)}get size(){if(this.isEmpty)return 0;let e=this.nextLayer.size;for(let t of this.chunk)e+=t.value.length;return e}chunkEnd(e){return this.chunkPos[e]+this.chunk[e].length}update(t){let{add:n=[],sort:r=!1,filterFrom:i=0,filterTo:a=this.length}=t,o=t.filter;if(n.length==0&&!o)return this;if(r&&(n=n.slice().sort(sn)),this.isEmpty)return n.length?e.of(n):this;let s=new pn(this,null,-1).goto(0),c=0,l=[],u=new dn;for(;s.value||c<n.length;)if(c<n.length&&(s.from-n[c].from||s.startSide-n[c].value.startSide)>=0){let e=n[c++];u.addInner(e.from,e.to,e.value,!1)||l.push(e)}else s.rangeIndex==1&&s.chunkIndex<this.chunk.length&&(c==n.length||this.chunkEnd(s.chunkIndex)<n[c].from)&&(!o||i>this.chunkEnd(s.chunkIndex)||a<this.chunkPos[s.chunkIndex])&&u.addChunk(this.chunkPos[s.chunkIndex],this.chunk[s.chunkIndex])?s.nextChunk():((!o||i>s.to||a<s.from||o(s.from,s.to,s.value))&&(u.addInner(s.from,s.to,s.value,!1)||l.push(on.create(s.from,s.to,s.value))),s.next());return u.finishInner(this.nextLayer.isEmpty&&!l.length?e.empty:this.nextLayer.update({add:l,filter:o,filterFrom:i,filterTo:a}))}map(t){if(t.empty||this.isEmpty)return this;let n=[],r=[],i=-1,a,o=(e,t,n)=>{a||=new dn,a.addRange(e,t,n,!1)};for(let e=0;e<this.chunk.length;e++){let a=this.chunkPos[e],s=this.chunk[e],c=t.touchesRange(a,a+s.length);if(c===!1)i=Math.max(i,s.maxPoint),n.push(s),r.push(t.mapPos(a));else if(c===!0){let[e,c]=n.length?[ln(r)+ln(n).length,ln(ln(n).value).endSide]:[-1,-1],{mapped:l,pos:u}=s.map(a,t,e,c,o);l&&(i=Math.max(i,l.maxPoint),n.push(l),r.push(u))}}let s=this.nextLayer.map(t);return a&&(s=a.finishInner(s)),n.length==0?s:new e(r,n,s||e.empty,i)}between(e,t,n){if(!this.isEmpty){for(let r=0;r<this.chunk.length;r++){let i=this.chunkPos[r],a=this.chunk[r];if(t>=i&&e<=i+a.length&&a.between(i,e-i,t-i,n)===!1)return}this.nextLayer.between(e,t,n)}}iter(e=0){return mn.from([this]).goto(e)}get isEmpty(){return this.nextLayer==this}static iter(e,t=0){return mn.from(e).goto(t)}static compare(e,t,n,r,i=-1){let a=e.filter(e=>e.maxPoint>0||!e.isEmpty&&e.maxPoint>=i),o=t.filter(e=>e.maxPoint>0||!e.isEmpty&&e.maxPoint>=i),s=fn(a,o,n),c=new gn(a,s,i),l=new gn(o,s,i);n.iterGaps((e,t,n)=>_n(c,e,l,t,n,r)),n.empty&&n.length==0&&_n(c,0,l,0,0,r)}static eq(e,t,n=0,r){r??=1e9-1;let i=e.filter(e=>!e.isEmpty&&t.indexOf(e)<0),a=t.filter(t=>!t.isEmpty&&e.indexOf(t)<0);if(i.length!=a.length)return!1;if(!i.length)return!0;let o=fn(i,a),s=new gn(i,o,0).goto(n),c=new gn(a,o,0).goto(n);for(;;){if(s.to!=c.to||!vn(s.active,c.active)||s.point&&(!c.point||!an(s.point,c.point)))return!1;if(s.to>r)return!0;s.next(),c.next()}}static spans(e,t,n,r,i=-1){let a=new gn(e,null,i).goto(t),o=t,s=a.openStart;for(;;){let e=Math.min(a.to,n);if(a.point){let n=a.activeForPoint(a.to),i=a.pointFrom<t?n.length+1:a.point.startSide<0?n.length:Math.min(n.length,s);r.point(o,e,a.point,n,i,a.pointRank),s=Math.min(a.openEnd(e),n.length)}else e>o&&(r.span(o,e,a.active,s),s=a.openEnd(e));if(a.to>n)return s+(a.point&&a.to>n?1:0);o=a.to,a.next()}}static of(e,t=!1){let n=new dn;for(let r of e instanceof on?[e]:t?un(e):e)n.add(r.from,r.to,r.value);return n.finish()}static join(t){if(!t.length)return e.empty;let n=ln(t);for(let r=t.length-2;r>=0;r--)for(let i=t[r];i!=e.empty;i=i.nextLayer)n=new e(i.chunkPos,i.chunk,n,Math.max(i.maxPoint,n.maxPoint));return n}};N.empty=new N([],[],null,-1);function ln(e){return e[e.length-1]}function un(e){if(e.length>1)for(let t=e[0],n=1;n<e.length;n++){let r=e[n];if(sn(t,r)>0)return e.slice().sort(sn);t=r}return e}N.empty.nextLayer=N.empty;var dn=class e{finishChunk(e){this.chunks.push(new cn(this.from,this.to,this.value,this.maxPoint)),this.chunkPos.push(this.chunkStart),this.chunkStart=-1,this.setMaxPoint=Math.max(this.setMaxPoint,this.maxPoint),this.maxPoint=-1,e&&(this.from=[],this.to=[],this.value=[])}constructor(){this.chunks=[],this.chunkPos=[],this.chunkStart=-1,this.last=null,this.lastFrom=-1e9,this.lastTo=-1e9,this.from=[],this.to=[],this.value=[],this.maxPoint=-1,this.setMaxPoint=-1,this.nextLayer=null}add(e,t,n){this.addRange(e,t,n,!0)}addRange(t,n,r,i){this.addInner(t,n,r,i)||(this.nextLayer||=new e).addRange(t,n,r,i)}addInner(e,t,n,r){let i=e-this.lastTo||n.startSide-this.last.endSide;if(r&&i<=0&&(e-this.lastFrom||n.startSide-this.last.startSide)<0)throw Error("Ranges must be added sorted by `from` position and `startSide`");return i<0?!1:(this.from.length==250&&this.finishChunk(!0),this.chunkStart<0&&(this.chunkStart=e),this.from.push(e-this.chunkStart),this.to.push(t-this.chunkStart),this.last=n,this.lastFrom=e,this.lastTo=t,this.value.push(n),n.point&&(this.maxPoint=Math.max(this.maxPoint,t-e)),!0)}addChunk(e,t){if((e-this.lastTo||t.value[0].startSide-this.last.endSide)<0)return!1;this.from.length&&this.finishChunk(!0),this.setMaxPoint=Math.max(this.setMaxPoint,t.maxPoint),this.chunks.push(t),this.chunkPos.push(e);let n=t.value.length-1;return this.last=t.value[n],this.lastFrom=t.from[n]+e,this.lastTo=t.to[n]+e,!0}finish(){return this.finishInner(N.empty)}finishInner(e){if(this.from.length&&this.finishChunk(!1),this.chunks.length==0)return e;let t=N.create(this.chunkPos,this.chunks,this.nextLayer?this.nextLayer.finishInner(e):e,this.setMaxPoint);return this.from=null,t}};function fn(e,t,n){let r=new Map;for(let t of e)for(let e=0;e<t.chunk.length;e++)t.chunk[e].maxPoint<=0&&r.set(t.chunk[e],t.chunkPos[e]);let i=new Set;for(let e of t)for(let t=0;t<e.chunk.length;t++){let a=r.get(e.chunk[t]);a!=null&&(n?n.mapPos(a):a)==e.chunkPos[t]&&!n?.touchesRange(a,a+e.chunk[t].length)&&i.add(e.chunk[t])}return i}var pn=class{constructor(e,t,n,r=0){this.layer=e,this.skip=t,this.minPoint=n,this.rank=r}get startSide(){return this.value?this.value.startSide:0}get endSide(){return this.value?this.value.endSide:0}goto(e,t=-1e9){return this.chunkIndex=this.rangeIndex=0,this.gotoInner(e,t,!1),this}gotoInner(e,t,n){for(;this.chunkIndex<this.layer.chunk.length;){let t=this.layer.chunk[this.chunkIndex];if(!(this.skip&&this.skip.has(t)||this.layer.chunkEnd(this.chunkIndex)<e||t.maxPoint<this.minPoint))break;this.chunkIndex++,n=!1}if(this.chunkIndex<this.layer.chunk.length){let r=this.layer.chunk[this.chunkIndex].findIndex(e-this.layer.chunkPos[this.chunkIndex],t,!0);(!n||this.rangeIndex<r)&&this.setRangeIndex(r)}this.next()}forward(e,t){(this.to-e||this.endSide-t)<0&&this.gotoInner(e,t,!0)}next(){for(;;)if(this.chunkIndex==this.layer.chunk.length){this.from=this.to=1e9,this.value=null;break}else{let e=this.layer.chunkPos[this.chunkIndex],t=this.layer.chunk[this.chunkIndex],n=e+t.from[this.rangeIndex];if(this.from=n,this.to=e+t.to[this.rangeIndex],this.value=t.value[this.rangeIndex],this.setRangeIndex(this.rangeIndex+1),this.minPoint<0||this.value.point&&this.to-this.from>=this.minPoint)break}}setRangeIndex(e){if(e==this.layer.chunk[this.chunkIndex].value.length){if(this.chunkIndex++,this.skip)for(;this.chunkIndex<this.layer.chunk.length&&this.skip.has(this.layer.chunk[this.chunkIndex]);)this.chunkIndex++;this.rangeIndex=0}else this.rangeIndex=e}nextChunk(){this.chunkIndex++,this.rangeIndex=0,this.next()}compare(e){return this.from-e.from||this.startSide-e.startSide||this.rank-e.rank||this.to-e.to||this.endSide-e.endSide}},mn=class e{constructor(e){this.heap=e}static from(t,n=null,r=-1){let i=[];for(let e=0;e<t.length;e++)for(let a=t[e];!a.isEmpty;a=a.nextLayer)a.maxPoint>=r&&i.push(new pn(a,n,r,e));return i.length==1?i[0]:new e(i)}get startSide(){return this.value?this.value.startSide:0}goto(e,t=-1e9){for(let n of this.heap)n.goto(e,t);for(let e=this.heap.length>>1;e>=0;e--)hn(this.heap,e);return this.next(),this}forward(e,t){for(let n of this.heap)n.forward(e,t);for(let e=this.heap.length>>1;e>=0;e--)hn(this.heap,e);(this.to-e||this.value.endSide-t)<0&&this.next()}next(){if(this.heap.length==0)this.from=this.to=1e9,this.value=null,this.rank=-1;else{let e=this.heap[0];this.from=e.from,this.to=e.to,this.value=e.value,this.rank=e.rank,e.value&&e.next(),hn(this.heap,0)}}};function hn(e,t){for(let n=e[t];;){let r=(t<<1)+1;if(r>=e.length)break;let i=e[r];if(r+1<e.length&&i.compare(e[r+1])>=0&&(i=e[r+1],r++),n.compare(i)<0)break;e[r]=n,e[t]=i,t=r}}var gn=class{constructor(e,t,n){this.minPoint=n,this.active=[],this.activeTo=[],this.activeRank=[],this.minActive=-1,this.point=null,this.pointFrom=0,this.pointRank=0,this.to=-1e9,this.endSide=0,this.openStart=-1,this.cursor=mn.from(e,t,n)}goto(e,t=-1e9){return this.cursor.goto(e,t),this.active.length=this.activeTo.length=this.activeRank.length=0,this.minActive=-1,this.to=e,this.endSide=t,this.openStart=-1,this.next(),this}forward(e,t){for(;this.minActive>-1&&(this.activeTo[this.minActive]-e||this.active[this.minActive].endSide-t)<0;)this.removeActive(this.minActive);this.cursor.forward(e,t)}removeActive(e){yn(this.active,e),yn(this.activeTo,e),yn(this.activeRank,e),this.minActive=xn(this.active,this.activeTo)}addActive(e){let t=0,{value:n,to:r,rank:i}=this.cursor;for(;t<this.activeRank.length&&(i-this.activeRank[t]||r-this.activeTo[t])>0;)t++;bn(this.active,t,n),bn(this.activeTo,t,r),bn(this.activeRank,t,i),e&&bn(e,t,this.cursor.from),this.minActive=xn(this.active,this.activeTo)}next(){let e=this.to,t=this.point;this.point=null;let n=this.openStart<0?[]:null;for(;;){let r=this.minActive;if(r>-1&&(this.activeTo[r]-this.cursor.from||this.active[r].endSide-this.cursor.startSide)<0){if(this.activeTo[r]>e){this.to=this.activeTo[r],this.endSide=this.active[r].endSide;break}this.removeActive(r),n&&yn(n,r)}else if(!this.cursor.value){this.to=this.endSide=1e9;break}else if(this.cursor.from>e){this.to=this.cursor.from,this.endSide=this.cursor.startSide;break}else{let e=this.cursor.value;if(!e.point)this.addActive(n),this.cursor.next();else if(t&&this.cursor.to==this.to&&this.cursor.from<this.cursor.to)this.cursor.next();else{this.point=e,this.pointFrom=this.cursor.from,this.pointRank=this.cursor.rank,this.to=this.cursor.to,this.endSide=e.endSide,this.cursor.next(),this.forward(this.to,this.endSide);break}}}if(n){this.openStart=0;for(let t=n.length-1;t>=0&&n[t]<e;t--)this.openStart++}}activeForPoint(e){if(!this.active.length)return this.active;let t=[];for(let n=this.active.length-1;n>=0&&!(this.activeRank[n]<this.pointRank);n--)(this.activeTo[n]>e||this.activeTo[n]==e&&this.active[n].endSide>=this.point.endSide)&&t.push(this.active[n]);return t.reverse()}openEnd(e){let t=0;for(let n=this.activeTo.length-1;n>=0&&this.activeTo[n]>e;n--)t++;return t}};function _n(e,t,n,r,i,a){e.goto(t),n.goto(r);let o=r+i,s=r,c=r-t,l=!!a.boundChange;for(let t=!1;;){let r=e.to+c-n.to,i=r||e.endSide-n.endSide,u=i<0?e.to+c:n.to,d=Math.min(u,o);if(e.point||n.point?(e.point&&n.point&&an(e.point,n.point)&&vn(e.activeForPoint(e.to),n.activeForPoint(n.to))||a.comparePoint(s,d,e.point,n.point),t=!1):(t&&=(a.boundChange(s),!1),d>s&&!vn(e.active,n.active)&&a.compareRange(s,d,e.active,n.active),l&&d<o&&(r||e.openEnd(u)!=n.openEnd(u))&&(t=!0)),u>o)break;s=u,i<=0&&e.next(),i>=0&&n.next()}}function vn(e,t){if(e.length!=t.length)return!1;for(let n=0;n<e.length;n++)if(e[n]!=t[n]&&!an(e[n],t[n]))return!1;return!0}function yn(e,t){for(let n=t,r=e.length-1;n<r;n++)e[n]=e[n+1];e.pop()}function bn(e,t,n){for(let n=e.length-1;n>=t;n--)e[n+1]=e[n];e[t]=n}function xn(e,t){let n=-1,r=1e9;for(let i=0;i<t.length;i++)(t[i]-r||e[i].endSide-e[n].endSide)<0&&(n=i,r=t[i]);return n}function Sn(e,t,n=e.length){let r=0;for(let i=0;i<n&&i<e.length;)e.charCodeAt(i)==9?(r+=t-r%t,i++):(r++,i=O(e,i));return r}function Cn(e,t,n,r){for(let r=0,i=0;;){if(i>=t)return r;if(r==e.length)break;i+=e.charCodeAt(r)==9?n-i%n:1,r=O(e,r)}return r===!0?-1:e.length}for(var wn=`ͼ`,Tn=typeof Symbol>`u`?`__ͼ`:Symbol.for(wn),En=typeof Symbol>`u`?`__styleSet`+Math.floor(Math.random()*1e8):Symbol(`styleSet`),Dn=typeof globalThis<`u`?globalThis:typeof window<`u`?window:{},On=class{constructor(e,t){this.rules=[];let{finish:n}=t||{};function r(e){return/^@/.test(e)?[e]:e.split(/,\s*/)}function i(e,t,a,o){let s=[],c=/^@(\w+)\b/.exec(e[0]),l=c&&c[1]==`keyframes`;if(c&&t==null)return a.push(e[0]+`;`);for(let n in t){let o=t[n];if(/&/.test(n))i(n.split(/,\s*/).map(t=>e.map(e=>t.replace(/&/,e))).reduce((e,t)=>e.concat(t)),o,a);else if(o&&typeof o==`object`){if(!c)throw RangeError(`The value of a property (`+n+`) should be a primitive value.`);i(r(n),o,s,l)}else o!=null&&s.push(n.replace(/_.*/,``).replace(/[A-Z]/g,e=>`-`+e.toLowerCase())+`: `+o+`;`)}(s.length||l)&&a.push((n&&!c&&!o?e.map(n):e).join(`, `)+` {`+s.join(` `)+`}`)}for(let t in e)i(r(t),e[t],this.rules)}getRules(){return this.rules.join(`
`)}static newName(){let e=Dn[Tn]||1;return Dn[Tn]=e+1,wn+e.toString(36)}static mount(e,t,n){let r=e[En],i=n&&n.nonce;r?i&&r.setNonce(i):r=new An(e,i),r.mount(Array.isArray(t)?t:[t],e)}},kn=new Map,An=class{constructor(e,t){let n=e.ownerDocument||e,r=n.defaultView;if(!e.head&&e.adoptedStyleSheets&&r.CSSStyleSheet){let t=kn.get(n);if(t)return e[En]=t;this.sheet=new r.CSSStyleSheet,kn.set(n,this)}else this.styleTag=n.createElement(`style`),t&&this.styleTag.setAttribute(`nonce`,t);this.modules=[],e[En]=this}mount(e,t){let n=this.sheet,r=0,i=0,a=!1;for(let t=0;t<e.length;t++){let o=e[t],s=this.modules.indexOf(o);if(s<i&&s>-1&&(this.modules.splice(s,1),a=!0,i--,s=-1),s==-1){if(this.modules.splice(i++,0,o),a=!0,n)for(let e=0;e<o.rules.length;e++)n.insertRule(o.rules[e],r++)}else{for(;i<s;)r+=this.modules[i++].rules.length;r+=o.rules.length,i++}}if(n)t.adoptedStyleSheets.indexOf(this.sheet)<0&&(t.adoptedStyleSheets=[this.sheet,...t.adoptedStyleSheets]);else{if(a){let e=``;for(let t=0;t<this.modules.length;t++)e+=this.modules[t].getRules()+`
`;this.styleTag.textContent=e}let e=t.head||t;this.styleTag.parentNode!=e&&e.insertBefore(this.styleTag,e.firstChild)}}setNonce(e){this.styleTag&&this.styleTag.getAttribute(`nonce`)!=e&&this.styleTag.setAttribute(`nonce`,e)}},jn={8:`Backspace`,9:`Tab`,10:`Enter`,12:`NumLock`,13:`Enter`,16:`Shift`,17:`Control`,18:`Alt`,20:`CapsLock`,27:`Escape`,32:` `,33:`PageUp`,34:`PageDown`,35:`End`,36:`Home`,37:`ArrowLeft`,38:`ArrowUp`,39:`ArrowRight`,40:`ArrowDown`,44:`PrintScreen`,45:`Insert`,46:`Delete`,59:`;`,61:`=`,91:`Meta`,92:`Meta`,106:`*`,107:`+`,108:`,`,109:`-`,110:`.`,111:`/`,144:`NumLock`,145:`ScrollLock`,160:`Shift`,161:`Shift`,162:`Control`,163:`Control`,164:`Alt`,165:`Alt`,173:`-`,186:`;`,187:`=`,188:`,`,189:`-`,190:`.`,191:`/`,192:"`",219:`[`,220:`\\`,221:`]`,222:`'`},Mn={48:`)`,49:`!`,50:`@`,51:`#`,52:`$`,53:`%`,54:`^`,55:`&`,56:`*`,57:`(`,59:`:`,61:`+`,173:`_`,186:`:`,187:`+`,188:`<`,189:`_`,190:`>`,191:`?`,192:`~`,219:`{`,220:`|`,221:`}`,222:`"`},Nn=typeof navigator<`u`&&/Mac/.test(navigator.platform),Pn=typeof navigator<`u`&&/MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent),Fn=0;Fn<10;Fn++)jn[48+Fn]=jn[96+Fn]=String(Fn);for(var Fn=1;Fn<=24;Fn++)jn[Fn+111]=`F`+Fn;for(var Fn=65;Fn<=90;Fn++)jn[Fn]=String.fromCharCode(Fn+32),Mn[Fn]=String.fromCharCode(Fn);for(var In in jn)Mn.hasOwnProperty(In)||(Mn[In]=jn[In]);function Ln(e){var t=!(Nn&&e.metaKey&&e.shiftKey&&!e.ctrlKey&&!e.altKey||Pn&&e.shiftKey&&e.key&&e.key.length==1||e.key==`Unidentified`)&&e.key||(e.shiftKey?Mn:jn)[e.keyCode]||e.key||`Unidentified`;return t==`Esc`&&(t=`Escape`),t==`Del`&&(t=`Delete`),t==`Left`&&(t=`ArrowLeft`),t==`Up`&&(t=`ArrowUp`),t==`Right`&&(t=`ArrowRight`),t==`Down`&&(t=`ArrowDown`),t}function Rn(){var e=arguments[0];typeof e==`string`&&(e=document.createElement(e));var t=1,n=arguments[1];if(n&&typeof n==`object`&&n.nodeType==null&&!Array.isArray(n)){for(var r in n)if(Object.prototype.hasOwnProperty.call(n,r)){var i=n[r];typeof i==`string`?e.setAttribute(r,i):i!=null&&(e[r]=i)}t++}for(;t<arguments.length;t++)zn(e,arguments[t]);return e}function zn(e,t){if(typeof t==`string`)e.appendChild(document.createTextNode(t));else if(t!=null){if(t.nodeType!=null)e.appendChild(t);else if(Array.isArray(t))for(var n=0;n<t.length;n++)zn(e,t[n]);else throw RangeError(`Unsupported child node: `+t)}}var Bn=typeof navigator<`u`?navigator:{userAgent:``,vendor:``,platform:``},Vn=typeof document<`u`?document:{documentElement:{style:{}}},Hn=/Edge\/(\d+)/.exec(Bn.userAgent),Un=/MSIE \d/.test(Bn.userAgent),Wn=/Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(Bn.userAgent),Gn=!!(Un||Wn||Hn),Kn=!Gn&&/gecko\/(\d+)/i.test(Bn.userAgent),qn=!Gn&&/Chrome\/(\d+)/.exec(Bn.userAgent),Jn=`webkitFontSmoothing`in Vn.documentElement.style,Yn=!Gn&&/Apple Computer/.test(Bn.vendor),Xn=Yn&&(/Mobile\/\w+/.test(Bn.userAgent)||Bn.maxTouchPoints>2),P={mac:Xn||/Mac/.test(Bn.platform),windows:/Win/.test(Bn.platform),linux:/Linux|X11/.test(Bn.platform),ie:Gn,ie_version:Un?Vn.documentMode||6:Wn?+Wn[1]:Hn?+Hn[1]:0,gecko:Kn,gecko_version:Kn?+(/Firefox\/(\d+)/.exec(Bn.userAgent)||[0,0])[1]:0,chrome:!!qn,chrome_version:qn?+qn[1]:0,ios:Xn,android:/Android\b/.test(Bn.userAgent),webkit:Jn,webkit_version:Jn?+(/\bAppleWebKit\/(\d+)/.exec(Bn.userAgent)||[0,0])[1]:0,safari:Yn,safari_version:Yn?+(/\bVersion\/(\d+(\.\d+)?)/.exec(Bn.userAgent)||[0,0])[1]:0,tabSize:Vn.documentElement.style.tabSize==null?`-moz-tab-size`:`tab-size`};function Zn(e,t){for(let n in e)n==`class`&&t.class?t.class+=` `+e.class:n==`style`&&t.style?t.style+=`;`+e.style:t[n]=e[n];return t}var Qn=Object.create(null);function $n(e,t,n){if(e==t)return!0;e||=Qn,t||=Qn;let r=Object.keys(e),i=Object.keys(t);if(r.length-(n&&r.indexOf(n)>-1?1:0)!=i.length-(n&&i.indexOf(n)>-1?1:0))return!1;for(let a of r)if(a!=n&&(i.indexOf(a)==-1||e[a]!==t[a]))return!1;return!0}function er(e,t){for(let n=e.attributes.length-1;n>=0;n--){let r=e.attributes[n].name;t[r]??e.removeAttribute(r)}for(let n in t){let r=t[n];n==`style`?e.style.cssText=r:e.getAttribute(n)!=r&&e.setAttribute(n,r)}}function tr(e,t,n){let r=!1;if(t)for(let i in t)n&&i in n||(r=!0,i==`style`?e.style.cssText=``:e.removeAttribute(i));if(n)for(let i in n)t&&t[i]==n[i]||(r=!0,i==`style`?e.style.cssText=n[i]:e.setAttribute(i,n[i]));return r}function nr(e){let t=Object.create(null);for(let n=0;n<e.attributes.length;n++){let r=e.attributes[n];t[r.name]=r.value}return t}var rr=class{eq(e){return!1}updateDOM(e,t,n){return!1}compare(e){return this==e||this.constructor==e.constructor&&this.eq(e)}get estimatedHeight(){return-1}get lineBreaks(){return 0}ignoreEvent(e){return!0}coordsAt(e,t,n){return null}get isHidden(){return!1}get editable(){return!1}destroy(e){}},F=(function(e){return e[e.Text=0]=`Text`,e[e.WidgetBefore=1]=`WidgetBefore`,e[e.WidgetAfter=2]=`WidgetAfter`,e[e.WidgetRange=3]=`WidgetRange`,e})(F||={}),I=class extends rn{constructor(e,t,n,r){super(),this.startSide=e,this.endSide=t,this.widget=n,this.spec=r}get heightRelevant(){return!1}static mark(e){return new ir(e)}static widget(e){let t=Math.max(-1e4,Math.min(1e4,e.side||0)),n=!!e.block;return t+=n&&!e.inlineOrder?t>0?3e8:-4e8:t>0?1e8:-1e8,new or(e,t,t,n,e.widget||null,!1)}static replace(e){let t=!!e.block,n,r;if(e.isBlockGap)n=-5e8,r=4e8;else{let{start:i,end:a}=sr(e,t);n=(i?t?-3e8:-1:5e8)-1,r=(a?t?2e8:1:-6e8)+1}return new or(e,n,r,t,e.widget||null,!0)}static line(e){return new ar(e)}static set(e,t=!1){return N.of(e,t)}hasHeight(){return this.widget?this.widget.estimatedHeight>-1:!1}};I.none=N.empty;var ir=class e extends I{constructor(e){let{start:t,end:n}=sr(e);super(t?-1:5e8,n?1:-6e8,null,e),this.tagName=e.tagName||`span`,this.attrs=e.class&&e.attributes?Zn(e.attributes,{class:e.class}):e.class?{class:e.class}:e.attributes||Qn}eq(t){return this==t||t instanceof e&&this.tagName==t.tagName&&$n(this.attrs,t.attrs)}range(e,t=e){if(e>=t)throw RangeError(`Mark decorations may not be empty`);return super.range(e,t)}};ir.prototype.point=!1;var ar=class e extends I{constructor(e){super(-2e8,-2e8,null,e)}eq(t){return t instanceof e&&this.spec.class==t.spec.class&&$n(this.spec.attributes,t.spec.attributes)}range(e,t=e){if(t!=e)throw RangeError(`Line decoration ranges must be zero-length`);return super.range(e,t)}};ar.prototype.mapMode=rt.TrackBefore,ar.prototype.point=!0;var or=class e extends I{constructor(e,t,n,r,i,a){super(t,n,i,e),this.block=r,this.isReplace=a,this.mapMode=r?t<=0?rt.TrackBefore:rt.TrackAfter:rt.TrackDel}get type(){return this.startSide==this.endSide?this.startSide<=0?F.WidgetBefore:F.WidgetAfter:F.WidgetRange}get heightRelevant(){return this.block||!!this.widget&&(this.widget.estimatedHeight>=5||this.widget.lineBreaks>0)}eq(t){return t instanceof e&&cr(this.widget,t.widget)&&this.block==t.block&&this.startSide==t.startSide&&this.endSide==t.endSide}range(e,t=e){if(this.isReplace&&(e>t||e==t&&this.startSide>0&&this.endSide<=0))throw RangeError(`Invalid range for replacement decoration`);if(!this.isReplace&&t!=e)throw RangeError(`Widget decorations can only have zero-length ranges`);return super.range(e,t)}};or.prototype.point=!0;function sr(e,t=!1){let{inclusiveStart:n,inclusiveEnd:r}=e;return n??=e.inclusive,r??=e.inclusive,{start:n??t,end:r??t}}function cr(e,t){return e==t||!!(e&&t&&e.compare(t))}function lr(e,t,n,r=0){let i=n.length-1;i>=0&&n[i]+r>=e?n[i]=Math.max(n[i],t):n.push(e,t)}var ur=class e extends rn{constructor(e,t,n){super(),this.tagName=e,this.attributes=t,this.rank=n}eq(t){return t==this||t instanceof e&&this.tagName==t.tagName&&$n(this.attributes,t.attributes)}static create(t){return new e(t.tagName,t.attributes||Qn,t.rank==null?50:Math.max(0,Math.min(t.rank,100)))}static set(e,t=!1){return N.of(e,t)}};ur.prototype.startSide=ur.prototype.endSide=-1;function dr(e){let t;return t=e.nodeType==11?e.getSelection?e:e.ownerDocument:e,t.getSelection()}function fr(e,t){return t?e==t||e.contains(t.nodeType==1?t:t.parentNode):!1}function pr(e,t){if(!t.anchorNode)return!1;try{return fr(e,t.anchorNode)}catch{return!1}}function mr(e){return e.nodeType==3?jr(e,0,e.nodeValue.length).getClientRects():e.nodeType==1?e.getClientRects():[]}function hr(e,t,n,r){return n?vr(e,t,n,r,-1)||vr(e,t,n,r,1):!1}function gr(e){for(var t=0;;t++)if(e=e.previousSibling,!e)return t}function _r(e){return e.nodeType==1&&/^(DIV|P|LI|UL|OL|BLOCKQUOTE|DD|DT|H\d|SECTION|PRE)$/.test(e.nodeName)}function vr(e,t,n,r,i){for(;;){if(e==n&&t==r)return!0;if(t==(i<0?0:yr(e))){if(e.nodeName==`DIV`)return!1;let n=e.parentNode;if(!n||n.nodeType!=1)return!1;t=gr(e)+(i<0?0:1),e=n}else if(e.nodeType==1){if(e=e.childNodes[t+(i<0?-1:0)],e.nodeType==1&&e.contentEditable==`false`)return!1;t=i<0?yr(e):0}else return!1}}function yr(e){return e.nodeType==3?e.nodeValue.length:e.childNodes.length}function br(e,t){let{left:n,right:r}=e;if(n==r)return e;let i=t?n:r;return{left:i,right:i,top:e.top,bottom:e.bottom}}function xr(e){let t=e.visualViewport;return t?{left:0,right:t.width,top:0,bottom:t.height}:{left:0,right:e.innerWidth,top:0,bottom:e.innerHeight}}function Sr(e,t){let n=t.width/e.offsetWidth,r=t.height/e.offsetHeight;return(n>.995&&n<1.005||!isFinite(n)||Math.abs(t.width-e.offsetWidth)<1)&&(n=1),(r>.995&&r<1.005||!isFinite(r)||Math.abs(t.height-e.offsetHeight)<1)&&(r=1),{scaleX:n,scaleY:r}}function Cr(e,t,n,r,i,a,o,s){let c=e.ownerDocument,l=c.defaultView||window;for(let u=e,d=!1;u&&!d;)if(u.nodeType==1){let e,f=u==c.body,p=1,m=1;if(f)e=xr(l);else{if(/^(fixed|sticky)$/.test(getComputedStyle(u).position)&&(d=!0),u.scrollHeight<=u.clientHeight&&u.scrollWidth<=u.clientWidth){u=u.assignedSlot||u.parentNode;continue}let t=u.getBoundingClientRect();({scaleX:p,scaleY:m}=Sr(u,t)),e={left:t.left,right:t.left+u.clientWidth*p,top:t.top,bottom:t.top+u.clientHeight*m}}let h=0,g=0;if(i==`nearest`)t.top<e.top+o?(g=t.top-(e.top+o),n>0&&t.bottom>e.bottom+g&&(g=t.bottom-e.bottom+o)):t.bottom>e.bottom-o&&(g=t.bottom-e.bottom+o,n<0&&t.top-g<e.top&&(g=t.top-(e.top+o)));else{let r=t.bottom-t.top,a=e.bottom-e.top;g=(i==`center`&&r<=a?t.top+r/2-a/2:i==`start`||i==`center`&&n<0?t.top-o:t.bottom-a+o)-e.top}if(r==`nearest`?t.left<e.left+a?(h=t.left-(e.left+a),n>0&&t.right>e.right+h&&(h=t.right-e.right+a)):t.right>e.right-a&&(h=t.right-e.right+a,n<0&&t.left<e.left+h&&(h=t.left-(e.left+a))):h=(r==`center`?t.left+(t.right-t.left)/2-(e.right-e.left)/2:r==`start`==s?t.left-a:t.right-(e.right-e.left)+a)-e.left,h||g){if(f)l.scrollBy(h,g);else{let e=0,n=0;if(g){let e=u.scrollTop;u.scrollTop+=g/m,n=(u.scrollTop-e)*m}if(h){let t=u.scrollLeft;u.scrollLeft+=h/p,e=(u.scrollLeft-t)*p}t={left:t.left-e,top:t.top-n,right:t.right-e,bottom:t.bottom-n},e&&Math.abs(e-h)<1&&(r=`nearest`),n&&Math.abs(n-g)<1&&(i=`nearest`)}}if(f)break;(t.top<e.top||t.bottom>e.bottom||t.left<e.left||t.right>e.right)&&(t={left:Math.max(t.left,e.left),right:Math.min(t.right,e.right),top:Math.max(t.top,e.top),bottom:Math.min(t.bottom,e.bottom)}),u=u.assignedSlot||u.parentNode}else if(u.nodeType==11)u=u.host;else break}function wr(e,t=!0){let n=e.ownerDocument,r=null,i=null;for(let a=e.parentNode;a&&!(a==n.body||(!t||r)&&i);)if(a.nodeType==1)!i&&a.scrollHeight>a.clientHeight&&(i=a),t&&!r&&a.scrollWidth>a.clientWidth&&(r=a),a=a.assignedSlot||a.parentNode;else if(a.nodeType==11)a=a.host;else break;return{x:r,y:i}}var Tr=class{constructor(){this.anchorNode=null,this.anchorOffset=0,this.focusNode=null,this.focusOffset=0}eq(e){return this.anchorNode==e.anchorNode&&this.anchorOffset==e.anchorOffset&&this.focusNode==e.focusNode&&this.focusOffset==e.focusOffset}setRange(e){let{anchorNode:t,focusNode:n}=e;this.set(t,Math.min(e.anchorOffset,t?yr(t):0),n,Math.min(e.focusOffset,n?yr(n):0))}set(e,t,n,r){this.anchorNode=e,this.anchorOffset=t,this.focusNode=n,this.focusOffset=r}};function Er(e){let t=[];for(let n=e;n;n=n.nodeType==11?n.host:n.parentNode)n.nodeType==1&&t.push({node:n,left:n.scrollLeft,top:n.scrollTop});return t}function Dr(e,t=!0){for(let{node:n,left:r,top:i}of e)t&&n.scrollTop!=i&&(n.scrollTop=i),n.scrollLeft!=r&&(n.scrollLeft=r)}var Or=null;P.safari&&P.safari_version>=26&&(Or=!1);function kr(e){if(e.setActive)return e.setActive();if(Or)return e.focus(Or);let t=Er(e);e.focus(Or==null?{get preventScroll(){return Or={preventScroll:!0},!0}}:void 0),Or||(Or=!1,Dr(t))}var Ar;function jr(e,t,n=t){let r=Ar||=document.createRange();return r.setEnd(e,n),r.setStart(e,t),r}function Mr(e,t,n,r){let i={key:t,code:t,keyCode:n,which:n,cancelable:!0};r&&({altKey:i.altKey,ctrlKey:i.ctrlKey,shiftKey:i.shiftKey,metaKey:i.metaKey}=r);let a=new KeyboardEvent(`keydown`,i);a.synthetic=!0,e.dispatchEvent(a);let o=new KeyboardEvent(`keyup`,i);return o.synthetic=!0,e.dispatchEvent(o),a.defaultPrevented||o.defaultPrevented}function Nr(e){for(;e;){if(e&&(e.nodeType==9||e.nodeType==11&&e.host))return e;e=e.assignedSlot||e.parentNode}return null}function Pr(e,t){let n=t.focusNode,r=t.focusOffset;if(!n||t.anchorNode!=n||t.anchorOffset!=r)return!1;for(r=Math.min(r,yr(n));;)if(r){if(n.nodeType!=1)return!1;let e=n.childNodes[r-1];e.contentEditable==`false`?r--:(n=e,r=yr(n))}else if(n==e)return!0;else r=gr(n),n=n.parentNode}function Fr(e){return e instanceof Window?e.pageYOffset>Math.max(0,e.document.documentElement.scrollHeight-e.innerHeight-4):e.scrollTop>Math.max(1,e.scrollHeight-e.clientHeight-4)}function Ir(e,t){for(let n=e,r=t;;)if(n.nodeType==3&&r>0)return{node:n,offset:r};else if(n.nodeType==1&&r>0){if(n.contentEditable==`false`)return null;n=n.childNodes[r-1],r=yr(n)}else if(n.parentNode&&!_r(n))r=gr(n),n=n.parentNode;else return null}function Lr(e,t){for(let n=e,r=t;;)if(n.nodeType==3&&r<n.nodeValue.length)return{node:n,offset:r};else if(n.nodeType==1&&r<n.childNodes.length){if(n.contentEditable==`false`)return null;n=n.childNodes[r],r=0}else if(n.parentNode&&!_r(n))r=gr(n)+1,n=n.parentNode;else return null}var Rr=class e{constructor(e,t,n=!0){this.node=e,this.offset=t,this.precise=n}static before(t,n){return new e(t.parentNode,gr(t),n)}static after(t,n){return new e(t.parentNode,gr(t)+1,n)}},L=(function(e){return e[e.LTR=0]=`LTR`,e[e.RTL=1]=`RTL`,e})(L||={}),zr=L.LTR,Br=L.RTL;function Vr(e){let t=[];for(let n=0;n<e.length;n++)t.push(1<<e[n]);return t}var Hr=Vr(`88888888888888888888888888888888888666888888787833333333337888888000000000000000000000000008888880000000000000000000000000088888888888888888888888888888888888887866668888088888663380888308888800000000000000000000000800000000000000000000000000000008`),Ur=Vr(`4444448826627288999999999992222222222222222222222222222222222222222222222229999999999999999999994444444444644222822222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222999999949999999229989999223333333333`),Wr=Object.create(null),Gr=[];for(let e of[`()`,`[]`,`{}`]){let t=e.charCodeAt(0),n=e.charCodeAt(1);Wr[t]=n,Wr[n]=-t}function Kr(e){return e<=247?Hr[e]:1424<=e&&e<=1524?2:1536<=e&&e<=1785?Ur[e-1536]:1774<=e&&e<=2220?4:8192<=e&&e<=8204?256:64336<=e&&e<=65023?4:1}var qr=/[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac\ufb50-\ufdff]/,Jr=class{get dir(){return this.level%2?Br:zr}constructor(e,t,n){this.from=e,this.to=t,this.level=n}side(e,t){return this.dir==t==e?this.to:this.from}forward(e,t){return e==(this.dir==t)}static find(e,t,n,r){let i=-1;for(let a=0;a<e.length;a++){let o=e[a];if(o.from<=t&&o.to>=t){if(o.level==n)return a;(i<0||(r==0?e[i].level>o.level:r<0?o.from<t:o.to>t))&&(i=a)}}if(i<0)throw RangeError(`Index out of range`);return i}};function Yr(e,t){if(e.length!=t.length)return!1;for(let n=0;n<e.length;n++){let r=e[n],i=t[n];if(r.from!=i.from||r.to!=i.to||r.direction!=i.direction||!Yr(r.inner,i.inner))return!1}return!0}var R=[];function Xr(e,t,n,r,i){for(let a=0;a<=r.length;a++){let o=a?r[a-1].to:t,s=a<r.length?r[a].from:n,c=a?256:i;for(let t=o,n=c,r=c;t<s;t++){let i=Kr(e.charCodeAt(t));i==512?i=n:i==8&&r==4&&(i=16),R[t]=i==4?2:i,i&7&&(r=i),n=i}for(let e=o,t=c,r=c;e<s;e++){let i=R[e];if(i==128)e<s-1&&t==R[e+1]&&t&24?i=R[e]=t:R[e]=256;else if(i==64){let i=e+1;for(;i<s&&R[i]==64;)i++;let a=e&&t==8||i<n&&R[i]==8?r==1?1:8:256;for(let t=e;t<i;t++)R[t]=a;e=i-1}else i==8&&r==1&&(R[e]=1);t=i,i&7&&(r=i)}}}function Zr(e,t,n,r,i){let a=i==1?2:1;for(let o=0,s=0,c=0;o<=r.length;o++){let l=o?r[o-1].to:t,u=o<r.length?r[o].from:n;for(let t=l,n,r,o;t<u;t++)if(r=Wr[n=e.charCodeAt(t)]){if(r<0){for(let e=s-3;e>=0;e-=3)if(Gr[e+1]==-r){let n=Gr[e+2],r=n&2?i:n&4?n&1?a:i:0;r&&(R[t]=R[Gr[e]]=r),s=e;break}}else if(Gr.length==189)break;else Gr[s++]=t,Gr[s++]=n,Gr[s++]=c}else if((o=R[t])==2||o==1){let e=o==i;c=+!e;for(let t=s-3;t>=0;t-=3){let n=Gr[t+2];if(n&2)break;if(e)Gr[t+2]|=2;else{if(n&4)break;Gr[t+2]|=4}}}}}function Qr(e,t,n,r){for(let i=0,a=r;i<=n.length;i++){let o=i?n[i-1].to:e,s=i<n.length?n[i].from:t;for(let c=o;c<s;){let o=R[c];if(o==256){let o=c+1;for(;;)if(o==s){if(i==n.length)break;o=n[i++].to,s=i<n.length?n[i].from:t}else if(R[o]==256)o++;else break;let l=a==1,u=l==((o<t?R[o]:r)==1)?l?1:2:r;for(let t=o,r=i,a=r?n[r-1].to:e;t>c;)t==a&&(t=n[--r].from,a=r?n[r-1].to:e),R[--t]=u;c=o}else a=o,c++}}}function $r(e,t,n,r,i,a,o){let s=r%2?2:1;if(r%2==i%2)for(let c=t,l=0;c<n;){let t=!0,u=!1;if(l==a.length||c<a[l].from){let e=R[c];e!=s&&(t=!1,u=e==16)}let d=!t&&s==1?[]:null,f=t?r:r+1,p=c;run:for(;;)if(l<a.length&&p==a[l].from){if(u)break run;let m=a[l];if(!t)for(let e=m.to,t=l+1;;){if(e==n)break run;if(t<a.length&&a[t].from==e)e=a[t++].to;else if(R[e]==s)break run;else break}l++,d?d.push(m):(m.from>c&&o.push(new Jr(c,m.from,f)),ei(e,m.direction==zr==!(f%2)?r:r+1,i,m.inner,m.from,m.to,o),c=m.to),p=m.to}else if(p==n||(t?R[p]!=s:R[p]==s))break;else p++;d?$r(e,c,p,r+1,i,d,o):c<p&&o.push(new Jr(c,p,f)),c=p}else for(let c=n,l=a.length;c>t;){let n=!0,u=!1;if(!l||c>a[l-1].to){let e=R[c-1];e!=s&&(n=!1,u=e==16)}let d=!n&&s==1?[]:null,f=n?r:r+1,p=c;run:for(;;)if(l&&p==a[l-1].to){if(u)break run;let m=a[--l];if(!n)for(let e=m.from,n=l;;){if(e==t)break run;if(n&&a[n-1].to==e)e=a[--n].from;else if(R[e-1]==s)break run;else break}d?d.push(m):(m.to<c&&o.push(new Jr(m.to,c,f)),ei(e,m.direction==zr==!(f%2)?r:r+1,i,m.inner,m.from,m.to,o),c=m.from),p=m.from}else if(p==t||(n?R[p-1]!=s:R[p-1]==s))break;else p--;d?$r(e,p,c,r+1,i,d,o):p<c&&o.push(new Jr(p,c,f)),c=p}}function ei(e,t,n,r,i,a,o){let s=t%2?2:1;Xr(e,i,a,r,s),Zr(e,i,a,r,s),Qr(i,a,r,s),$r(e,i,a,t,n,r,o)}function ti(e,t,n){if(!e)return[new Jr(0,0,+(t==Br))];if(t==zr&&!n.length&&!qr.test(e))return ni(e.length);if(n.length)for(;e.length>R.length;)R[R.length]=256;let r=[],i=t==zr?0:1;return ei(e,i,i,n,0,e.length,r),r}function ni(e){return[new Jr(0,e,0)]}var ri=``;function ii(e,t,n,r,i){if(!e.length)return null;let a=r.head-e.from,o;if(r.head==e.from&&r.assoc<0){if(!i)return null;a=t[o=0].side(!1,n)}else if(r.head==e.to&&r.assoc>0){if(i)return null;a=t[o=t.length-1].side(!0,n)}else o=Jr.find(t,a,r.bidiLevel??-1,r.assoc);let s=t[o],c=s.side(i,n);if(a==c){let e=o+=i?1:-1;if(e<0||e>=t.length)return null;s=t[o=e],a=s.side(!i,n),c=s.side(i,n)}let l=O(e.text,a,s.forward(i,n));(l<s.from||l>s.to)&&(l=c),ri=e.text.slice(Math.min(a,l),Math.max(a,l));let u=o==(i?t.length-1:0)?null:t[o+(i?1:-1)];if(l==c){if(!u)return i?k.cursor(e.to,1):k.cursor(e.from,-1);if(u.level+ +!i<s.level)return k.cursor(u.side(!i,n)+e.from,u.forward(i,n)?1:-1,u.level)}return k.cursor(l+e.from,s.forward(i,n)?-1:1,s.level)}function ai(e,t,n){for(let r=t;r<n;r++){let t=Kr(e.charCodeAt(r));if(t==1)return zr;if(t==2||t==4)return Br}return zr}var oi=A.define(),si=A.define(),ci=A.define(),li=A.define(),ui=A.define(),di=A.define(),fi=A.define(),pi=A.define(),mi=A.define(),hi=A.define({combine:e=>e.some(e=>e)}),gi=A.define({combine:e=>e.some(e=>e)}),_i=A.define(),vi=class e{constructor(e,t,n,r,i,a=!1){this.range=e,this.y=t,this.x=n,this.yMargin=r,this.xMargin=i,this.isSnapshot=a}map(t){return t.empty?this:new e(this.range.map(t),this.y,this.x,this.yMargin,this.xMargin,this.isSnapshot)}clip(t){return this.range.to<=t.doc.length?this:new e(k.cursor(t.doc.length),this.y,this.x,this.yMargin,this.xMargin,this.isSnapshot)}},yi=j.define({map:(e,t)=>e.map(t)}),bi=j.define();function xi(e,t,n){let r=e.facet(li);r.length?r[0](t):window.onerror&&window.onerror(String(t),n,void 0,void 0,t)||(n?console.error(n+`:`,t):console.error(t))}var Si=A.define({combine:e=>!e.length||e[0]}),Ci=0,wi=A.define({combine(e){return e.filter((t,n)=>{for(let r=0;r<n;r++)if(e[r].plugin==t.plugin)return!1;return!0})}}),Ti=class e{constructor(e,t,n,r,i){this.id=e,this.create=t,this.domEventHandlers=n,this.domEventObservers=r,this.baseExtensions=i(this),this.extension=this.baseExtensions.concat(wi.of({plugin:this,arg:void 0}))}of(e){return this.baseExtensions.concat(wi.of({plugin:this,arg:e}))}static define(t,n){let{eventHandlers:r,eventObservers:i,provide:a,decorations:o}=n||{};return new e(Ci++,t,r,i,e=>{let t=[];return o&&t.push(ki.of(t=>{let n=t.plugin(e);return n?o(n):I.none})),a&&t.push(a(e)),t})}static fromClass(t,n){return e.define((e,n)=>new t(e,n),n)}},Ei=class{constructor(e){this.spec=e,this.mustUpdate=null,this.value=null}get plugin(){return this.spec&&this.spec.plugin}update(e){if(!this.value){if(this.spec)try{this.value=this.spec.plugin.create(e,this.spec.arg)}catch(t){xi(e.state,t,`CodeMirror plugin crashed`),this.deactivate()}}else if(this.mustUpdate){let e=this.mustUpdate;if(this.mustUpdate=null,this.value.update)try{this.value.update(e)}catch(t){if(xi(e.state,t,`CodeMirror plugin crashed`),this.value.destroy)try{this.value.destroy()}catch{}this.deactivate()}}return this}destroy(e){if(this.value?.destroy)try{this.value.destroy()}catch(t){xi(e.state,t,`CodeMirror plugin crashed`)}}deactivate(){this.spec=this.value=null}},Di=A.define(),Oi=A.define(),ki=A.define(),Ai=A.define(),ji=A.define(),Mi=A.define(),Ni=A.define();function Pi(e,t){let n=e.state.facet(Ni);if(!n.length)return n;let r=n.map(t=>t instanceof Function?t(e):t),i=[];return N.spans(r,t.from,t.to,{point(){},span(e,n,r,a){let o=e-t.from,s=n-t.from,c=i;for(let e=r.length-1;e>=0;e--,a--){let n=r[e].spec.bidiIsolate,i;if(n??=ai(t.text,o,s),a>0&&c.length&&(i=c[c.length-1]).to==o&&i.direction==n)i.to=s,c=i.inner;else{let e={from:o,to:s,direction:n,inner:[]};c.push(e),c=e.inner}}}}),i}var Fi=A.define();function Ii(e){let t=0,n=0,r=0,i=0;for(let a of e.state.facet(Fi)){let o=a(e);o&&(o.left!=null&&(t=Math.max(t,o.left)),o.right!=null&&(n=Math.max(n,o.right)),o.top!=null&&(r=Math.max(r,o.top)),o.bottom!=null&&(i=Math.max(i,o.bottom)))}return{left:t,right:n,top:r,bottom:i}}var Li=A.define(),Ri=class e{constructor(e,t,n,r){this.fromA=e,this.toA=t,this.fromB=n,this.toB=r}join(t){return new e(Math.min(this.fromA,t.fromA),Math.max(this.toA,t.toA),Math.min(this.fromB,t.fromB),Math.max(this.toB,t.toB))}addToSet(e){let t=e.length,n=this;for(;t>0;t--){let r=e[t-1];if(!(r.fromA>n.toA)){if(r.toA<n.fromA)break;n=n.join(r),e.splice(t-1,1)}}return e.splice(t,0,n),e}static extendWithRanges(t,n){if(n.length==0)return t;let r=[];for(let i=0,a=0,o=0;;){let s=i<t.length?t[i].fromB:1e9,c=a<n.length?n[a]:1e9,l=Math.min(s,c);if(l==1e9)break;let u=l+o,d=l,f=u;for(;;)if(a<n.length&&n[a]<=d){let e=n[a+1];a+=2,d=Math.max(d,e);for(let e=i;e<t.length&&t[e].fromB<=d;e++)o=t[e].toA-t[e].toB;f=Math.max(f,e+o)}else if(i<t.length&&t[i].fromB<=d){let e=t[i++];d=Math.max(d,e.toB),f=Math.max(f,e.toA),o=e.toA-e.toB}else break;r.push(new e(u,f,l,d))}return r}},zi=class e{constructor(e,t,n){this.view=e,this.state=t,this.transactions=n,this.flags=0,this.startState=e.state,this.changes=at.empty(this.startState.doc.length);for(let e of n)this.changes=this.changes.compose(e.changes);let r=[];this.changes.iterChangedRanges((e,t,n,i)=>r.push(new Ri(e,t,n,i))),this.changedRanges=r}static create(t,n,r){return new e(t,n,r)}get viewportChanged(){return(this.flags&4)>0}get viewportMoved(){return(this.flags&8)>0}get heightChanged(){return(this.flags&2)>0}get geometryChanged(){return this.docChanged||(this.flags&18)>0}get focusChanged(){return(this.flags&1)>0}get docChanged(){return!this.changes.empty}get selectionSet(){return this.transactions.some(e=>e.selection)}get empty(){return this.flags==0&&this.transactions.length==0}},Bi=[],z=class{constructor(e,t,n=0){this.dom=e,this.length=t,this.flags=n,this.parent=null,e.cmTile=this}get breakAfter(){return this.flags&1}get children(){return Bi}isWidget(){return!1}get isHidden(){return!1}isComposite(){return!1}isLine(){return!1}isText(){return!1}isBlock(){return!1}get domAttrs(){return null}sync(e){if(this.flags|=2,this.flags&4){this.flags&=-5;let e=this.domAttrs;e&&er(this.dom,e)}}toString(){return this.constructor.name+(this.children.length?`(${this.children})`:``)+(this.breakAfter?`#`:``)}destroy(){this.parent=null}setDOM(e){this.dom=e,e.cmTile=this}get posAtStart(){return this.parent?this.parent.posBefore(this):0}get posAtEnd(){return this.posAtStart+this.length}posBefore(e,t=this.posAtStart){let n=t;for(let t of this.children){if(t==e)return n;n+=t.length+t.breakAfter}throw RangeError(`Invalid child in posBefore`)}posAfter(e){return this.posBefore(e)+e.length}covers(e){return!0}coordsIn(e,t,n){return null}domPosFor(e,t){let n=gr(this.dom),r=this.length?e>0:t>0;return new Rr(this.parent.dom,n+ +!!r,e==0||e==this.length)}markDirty(e){this.flags&=-3,e&&(this.flags|=4),this.parent&&this.parent.flags&2&&this.parent.markDirty(!1)}get overrideDOMText(){return null}get root(){for(let e=this;e;e=e.parent)if(e instanceof Ui)return e;return null}static get(e){return e.cmTile}},Vi=class extends z{constructor(e){super(e,0),this._children=[]}isComposite(){return!0}get children(){return this._children}get lastChild(){return this.children.length?this.children[this.children.length-1]:null}append(e){this.children.push(e),e.parent=this}sync(e){if(this.flags&2)return;super.sync(e);let t=this.dom,n=null,r,i=e?.node==t?e:null,a=0;for(let o of this.children){if(o.sync(e),a+=o.length+o.breakAfter,r=n?n.nextSibling:t.firstChild,i&&r!=o.dom&&(i.written=!0),o.dom.parentNode==t)for(;r&&r!=o.dom;)r=Hi(r);else t.insertBefore(o.dom,r);n=o.dom}for(r=n?n.nextSibling:t.firstChild,i&&r&&(i.written=!0);r;)r=Hi(r);this.length=a}};function Hi(e){let t=e.nextSibling;return e.parentNode.removeChild(e),t}var Ui=class extends Vi{constructor(e,t){super(t),this.view=e}owns(e){for(;e;e=e.parent)if(e==this)return!0;return!1}isBlock(){return!0}nearest(e){for(;;){if(!e)return null;let t=z.get(e);if(t&&this.owns(t))return t;e=e.parentNode}}blockTiles(e){for(let t=[],n=this,r=0,i=0;;)if(r==n.children.length){if(!t.length)return;n=n.parent,n.breakAfter&&i++,r=t.pop()}else{let a=n.children[r++];if(a instanceof Wi)t.push(r),n=a,r=0;else{let t=i+a.length,n=e(a,i);if(n!==void 0)return n;i=t+a.breakAfter}}}resolveBlock(e,t){let n,r=-1,i,a=-1;if(this.blockTiles((o,s)=>{let c=s+o.length;if(e>=s&&e<=c){if(o.isWidget()&&t>=-1&&t<=1){if(o.flags&32)return!0;o.flags&16&&(n=void 0)}(s<e||e==c&&(t<-1?o.length:o.covers(1)))&&(!n||!o.isWidget()&&n.isWidget())&&(n=o,r=e-s),(c>e||e==s&&(t>1?o.length:o.covers(-1)))&&(!i||!o.isWidget()&&i.isWidget())&&(i=o,a=e-s)}}),!n&&!i)throw Error(`No tile at position `+e);return n&&t<0||!i?{tile:n,offset:r}:{tile:i,offset:a}}},Wi=class e extends Vi{constructor(e,t){super(e),this.wrapper=t}isBlock(){return!0}covers(e){return this.children.length?e<0?this.children[0].covers(-1):this.lastChild.covers(1):!1}get domAttrs(){return this.wrapper.attributes}static of(t,n){let r=new e(n||document.createElement(t.tagName),t);return n||(r.flags|=4),r}},Gi=class e extends Vi{constructor(e,t){super(e),this.attrs=t}isLine(){return!0}static start(t,n,r){let i=new e(n||document.createElement(`div`),t);return(!n||!r)&&(i.flags|=4),i}get domAttrs(){return this.attrs}resolveInline(e,t,n){let r=null,i=-1,a=null,o=-1;function s(e,c){for(let l=0,u=0;l<e.children.length&&u<=c;l++){let d=e.children[l],f=u+d.length;f>=c&&(d.isComposite()?s(d,c-u):(!a||a.isHidden&&(t>0&&!(a.flags&32)||n&&qi(a,d)))&&(f>c||d.flags&32&&t<=1)?(a=d,o=c-u):(u<c||d.flags&16&&!d.isHidden&&t>=-1)&&(r=d,i=c-u)),u=f}}s(this,e);let c=(t<0?r:a)||r||a;return c?{tile:c,offset:c==r?i:o}:null}coordsIn(e,t,n){let r=this.resolveInline(e,t,!0);return r?r.tile.coordsIn(Math.max(0,r.offset),t,n):Ki(this)}domIn(e,t){let n=this.resolveInline(e,t);if(n){let{tile:e,offset:r}=n;if(this.dom.contains(e.dom))return e.isText()?new Rr(e.dom,Math.min(e.dom.nodeValue.length,r)):e.domPosFor(r,e.flags&16?1:e.flags&32?-1:t);let i=n.tile.parent,a=!1;for(let e of i.children){if(a)return new Rr(e.dom,0);e==n.tile&&(a=!0)}}return new Rr(this.dom,0)}};function Ki(e){let t=e.dom.lastChild;if(!t)return e.dom.getBoundingClientRect();let n=mr(t);return n[n.length-1]||null}function qi(e,t){let n=e.coordsIn(0,1),r=t.coordsIn(0,1);return n&&r&&r.top<n.bottom}var Ji=class e extends Vi{constructor(e,t){super(e),this.mark=t}get domAttrs(){return this.mark.attrs}static of(t,n){let r=new e(n||document.createElement(t.tagName),t);return n||(r.flags|=4),r}},Yi=class e extends z{constructor(e,t){super(e,t.length),this.text=t}sync(e){this.flags&2||(super.sync(e),this.dom.nodeValue!=this.text&&(e&&e.node==this.dom&&(e.written=!0),this.dom.nodeValue=this.text))}isText(){return!0}toString(){return JSON.stringify(this.text)}coordsIn(e,t,n){let r=this.dom.nodeValue.length;e>r&&(e=r);let i=e,a=e,o=0;e==0&&t<0||e==r&&t>=0?P.chrome||P.gecko||(e?(i--,o=1):a<r&&(a++,o=-1)):t<0?i--:a<r&&a++;let s=jr(this.dom,i,a).getClientRects();if(!s.length)return null;let c=s[(o?o<0:t>=0)?0:s.length-1];return P.safari&&!o&&c.width==0&&(c=Array.prototype.find.call(s,e=>e.width)||c),n==null?c:br(c,(o?o>0:t<0)==n)}static of(t,n){let r=new e(n||document.createTextNode(t),t);return n||(r.flags|=2),r}},Xi=class e extends z{constructor(e,t,n,r){super(e,t,r),this.widget=n}isWidget(){return!0}get isHidden(){return this.widget.isHidden}covers(e){return this.flags&48?!1:(this.flags&(e<0?64:128))>0}coordsIn(e,t){return this.coordsInWidget(e,t,!1)}coordsInWidget(e,t,n){let r=this.widget.coordsAt(this.dom,e,t);if(r)return r;if(n)return br(this.dom.getBoundingClientRect(),this.length?e==0:t<=0);{let t=this.dom.getClientRects(),n=null;if(!t.length)return null;let r=this.flags&16?!0:this.flags&32?!1:e>0;for(let i=r?t.length-1:0;n=t[i],!(e>0?i==0:i==t.length-1||n.top<n.bottom);i+=r?-1:1);return br(n,!r)}}get overrideDOMText(){if(!this.length)return D.empty;let{root:e}=this;if(!e)return D.empty;let t=this.posAtStart;return e.view.state.doc.slice(t,t+this.length)}destroy(){super.destroy(),this.widget.destroy(this.dom)}static of(t,n,r,i,a){return a||(a=t.toDOM(n),t.editable||(a.contentEditable=`false`)),new e(a,r,t,i)}},Zi=class extends z{constructor(e){let t=document.createElement(`img`);t.className=`cm-widgetBuffer`,t.setAttribute(`aria-hidden`,`true`),super(t,0,e)}get isHidden(){return!0}get overrideDOMText(){return D.empty}coordsIn(e,t,n){let r=this.dom.getBoundingClientRect();return n==null?r:br(r,t>0==n)}},Qi=class{constructor(e){this.index=0,this.beforeBreak=!1,this.parents=[],this.tile=e}advance(e,t,n){let{tile:r,index:i,beforeBreak:a,parents:o}=this;for(;e||t>0;)if(!r.isComposite()){let t=r.length;if(i<t&&e){let a=Math.min(e,t-i);n&&n.skip(r,i,i+a),e-=a,i+=a}if(i==t)a=!!r.breakAfter,{tile:r,index:i}=o.pop(),i++;else if(!e)break}else if(a){if(!e)break;n&&n.break(),e--,a=!1}else if(i==r.children.length){if(!e&&!o.length)break;n&&n.leave(r),a=!!r.breakAfter,{tile:r,index:i}=o.pop(),i++}else{let s=r.children[i],c=s.breakAfter;(t>0?s.length<=e:s.length<e)&&(!n||n.skip(s,0,s.length)!==!1||!s.isComposite)?(a=!!c,i++,e-=s.length):(o.push({tile:r,index:i}),r=s,i=0,n&&s.isComposite()&&n.enter(s))}return this.tile=r,this.index=i,this.beforeBreak=a,this}get root(){return this.parents.length?this.parents[0].tile:this.tile}},$i=class{constructor(e,t,n,r){this.from=e,this.to=t,this.wrapper=n,this.rank=r}},ea=class{constructor(e,t,n){this.cache=e,this.root=t,this.blockWrappers=n,this.curLine=null,this.lastBlock=null,this.afterWidget=null,this.pos=0,this.wrappers=[],this.wrapperPos=0}addText(e,t,n,r){this.flushBuffer();let i=this.ensureMarks(t,n),a=i.lastChild;if(a&&a.isText()&&!(a.flags&8)&&a.length+e.length<512){this.cache.reused.set(a,2);let t=i.children[i.children.length-1]=new Yi(a.dom,a.text+e);t.parent=i}else i.append(r||Yi.of(e,this.cache.find(Yi)?.dom));this.pos+=e.length,this.afterWidget=null}addComposition(e,t){let n=this.curLine;n.dom!=t.line.dom&&(n.setDOM(this.cache.reused.has(t.line)?ua(t.line.dom):t.line.dom),this.cache.reused.set(t.line,2));let r=n;for(let e=t.marks.length-1;e>=0;e--){let n=t.marks[e],i=r.lastChild;if(i instanceof Ji&&i.mark.eq(n.mark))i.dom!=n.dom&&i.setDOM(ua(n.dom)),r=i;else{let{dom:e}=n;this.cache.reused.get(n)&&z.get(n.dom)&&(e=ua(n.dom));let t=Ji.of(n.mark,e);r.append(t),r=t}this.cache.reused.set(n,2)}let i=z.get(e.text);i&&this.cache.reused.set(i,2);let a=new Yi(e.text,e.text.nodeValue);a.flags|=8,this.pos=e.range.toB,r.append(a)}addInlineWidget(e,t,n){let r=this.afterWidget&&e.flags&48&&(this.afterWidget.flags&48)==(e.flags&48);r||this.flushBuffer();let i=this.ensureMarks(t,n);!r&&!(e.flags&16)&&i.append(this.getBuffer(1)),i.append(e),this.pos+=e.length,this.afterWidget=e}addMark(e,t,n){this.flushBuffer(),this.ensureMarks(t,n).append(e),this.pos+=e.length,this.afterWidget=null}addBlockWidget(e){this.getBlockPos().append(e),this.pos+=e.length,this.lastBlock=e,this.endLine()}continueWidget(e){let t=this.afterWidget||this.lastBlock;t.length+=e,this.pos+=e}addLineStart(e,t){e||=sa;let n=Gi.start(e,t||this.cache.find(Gi)?.dom,!!t);this.getBlockPos().append(this.lastBlock=this.curLine=n)}addLine(e){this.getBlockPos().append(e),this.pos+=e.length,this.lastBlock=e,this.endLine()}addBreak(){this.lastBlock.flags|=1,this.endLine(),this.pos++}addLineStartIfNotCovered(e){this.blockPosCovered()||this.addLineStart(e)}ensureLine(e){this.curLine||this.addLineStart(e)}ensureMarks(e,t){let n=this.curLine;for(let r=e.length-1;r>=0;r--){let i=e[r],a;if(t>0&&(a=n.lastChild)&&a instanceof Ji&&a.mark.eq(i))n=a,t--;else{let e=Ji.of(i,this.cache.find(Ji,e=>e.mark.eq(i))?.dom);n.append(e),n=e,t=0}}return n}endLine(){if(this.curLine){this.flushBuffer();let e=this.curLine.lastChild;(!e||!aa(this.curLine,!1)||e.dom.nodeName!=`BR`&&e.isWidget()&&!(P.ios&&aa(this.curLine,!0)))&&this.curLine.append(this.cache.findWidget(fa,0,32)||new Xi(fa.toDOM(),0,fa,32)),this.curLine=this.afterWidget=null}}updateBlockWrappers(){this.wrapperPos>this.pos+1e4&&(this.blockWrappers.goto(this.pos),this.wrappers.length=0);for(let e=this.wrappers.length-1;e>=0;e--)this.wrappers[e].to<this.pos&&this.wrappers.splice(e,1);for(let e=this.blockWrappers;e.value&&e.from<=this.pos;e.next())if(e.to>=this.pos){let t=e.rank*102+e.value.rank,n=new $i(e.from,e.to,e.value,t),r=this.wrappers.length;for(;r>0&&(this.wrappers[r-1].rank-n.rank||this.wrappers[r-1].to-n.to)<0;)r--;this.wrappers.splice(r,0,n)}this.wrapperPos=this.pos}getBlockPos(){this.updateBlockWrappers();let e=this.root;for(let t of this.wrappers){let n=e.lastChild;if(t.from<this.pos&&n instanceof Wi&&n.wrapper.eq(t.wrapper))e=n;else{let n=Wi.of(t.wrapper,this.cache.find(Wi,e=>e.wrapper.eq(t.wrapper))?.dom);e.append(n),e=n}}return e}blockPosCovered(){let e=this.lastBlock;return e!=null&&!e.breakAfter&&(!e.isWidget()||(e.flags&160)>0)}getBuffer(e){let t=2|(e<0?16:32),n=this.cache.find(Zi,void 0,1);return n&&(n.flags=t),n||new Zi(t)}flushBuffer(){this.afterWidget&&!(this.afterWidget.flags&32)&&(this.afterWidget.parent.append(this.getBuffer(-1)),this.afterWidget=null)}},ta=class{constructor(e){this.skipCount=0,this.text=``,this.textOff=0,this.cursor=e.iter()}skip(e){this.textOff+e<=this.text.length?this.textOff+=e:(this.skipCount+=e-(this.text.length-this.textOff),this.text=``,this.textOff=0)}next(e){if(this.textOff==this.text.length){let{value:t,lineBreak:n,done:r}=this.cursor.next(this.skipCount);if(this.skipCount=0,r)throw Error(`Ran out of text content when drawing inline views`);this.text=t;let i=this.textOff=Math.min(e,t.length);return n?null:t.slice(0,i)}let t=Math.min(this.text.length,this.textOff+e),n=this.text.slice(this.textOff,t);return this.textOff=t,n}},na=[Xi,Gi,Yi,Ji,Zi,Wi,Ui];for(let e=0;e<na.length;e++)na[e].bucket=e;var ra=class{constructor(e){this.view=e,this.buckets=na.map(()=>[]),this.index=na.map(()=>0),this.reused=new Map}add(e){let t=e.constructor.bucket,n=this.buckets[t];n.length<6?n.push(e):n[this.index[t]=(this.index[t]+1)%6]=e}find(e,t,n=2){let r=e.bucket,i=this.buckets[r],a=this.index[r];for(let e=0;e<i.length;e++){let o=(e+a)%i.length,s=i[o];if((!t||t(s))&&!this.reused.has(s))return i.splice(o,1),o<a&&this.index[r]--,this.reused.set(s,n),s}return null}findWidget(e,t,n){let r=this.buckets[0];if(r.length)for(let i=0,a=0;;i++){if(i==r.length){if(a)return null;a=1,i=0}let o=r[i];if(!this.reused.has(o)&&(a==0?o.widget.compare(e):o.widget.constructor==e.constructor&&e.updateDOM(o.dom,this.view,o.widget)))return r.splice(i,1),i<this.index[0]&&this.index[0]--,o.widget==e&&o.length==t&&(o.flags&497)==n?(this.reused.set(o,1),o):(this.reused.set(o,2),new Xi(o.dom,t,e,o.flags&-498|n))}}reuse(e){return this.reused.set(e,1),e}maybeReuse(e,t=2){if(!this.reused.has(e))return this.reused.set(e,t),e.dom}clear(){for(let e=0;e<this.buckets.length;e++)this.buckets[e].length=this.index[e]=0}},ia=class{constructor(e,t,n,r,i){this.view=e,this.decorations=r,this.disallowBlockEffectsFor=i,this.openWidget=!1,this.openMarks=0,this.cache=new ra(e),this.text=new ta(e.state.doc),this.builder=new ea(this.cache,new Ui(e,e.contentDOM),N.iter(n)),this.cache.reused.set(t,2),this.old=new Qi(t),this.reuseWalker={skip:(e,t,n)=>{if(this.cache.add(e),e.isComposite())return!1},enter:e=>this.cache.add(e),leave:()=>{},break:()=>{}}}run(e,t){let n=t&&this.getCompositionContext(t.text);for(let r=0,i=0,a=0;;){let o=a<e.length?e[a++]:null,s=o?o.fromA:this.old.root.length;if(s>r){let e=s-r;this.preserve(e,!a,!o),r=s,i+=e}if(!o)break;t&&o.fromA<=t.range.fromA&&o.toA>=t.range.toA?(this.forward(o.fromA,t.range.fromA,t.range.fromA<t.range.toA?1:-1),this.emit(i,t.range.fromB),this.builder.flushBuffer(),this.cache.clear(),this.builder.addComposition(t,n),this.text.skip(t.range.toB-t.range.fromB),this.forward(t.range.fromA,o.toA),this.emit(t.range.toB,o.toB)):(this.forward(o.fromA,o.toA),this.emit(i,o.toB)),i=o.toB,r=o.toA}return this.builder.curLine&&this.builder.endLine(),this.builder.root}preserve(e,t,n){let r=la(this.old),i=this.openMarks;this.old.advance(e,n?1:-1,{skip:(e,t,n)=>{if(e.isWidget()){if(this.openWidget)this.builder.continueWidget(n-t);else{let a=n>0||t<e.length?Xi.of(e.widget,this.view,n-t,e.flags&496,this.cache.maybeReuse(e)):this.cache.reuse(e);a.flags&256?(a.flags&=-2,this.builder.addBlockWidget(a)):(this.builder.ensureLine(null),this.builder.addInlineWidget(a,r,i),i=r.length)}}else if(e.isText())this.builder.ensureLine(null),!t&&n==e.length&&!this.cache.reused.has(e)?this.builder.addText(e.text,r,i,this.cache.reuse(e)):(this.cache.add(e),this.builder.addText(e.text.slice(t,n),r,i)),i=r.length;else if(e.isLine())e.flags&=-2,this.cache.reused.set(e,1),this.builder.addLine(e);else if(e instanceof Zi)this.cache.add(e);else if(e instanceof Ji)this.builder.ensureLine(null),this.builder.addMark(e,r,i),this.cache.reused.set(e,1),i=r.length;else return!1;this.openWidget=!1},enter:e=>{e.isLine()?this.builder.addLineStart(e.attrs,this.cache.maybeReuse(e)):(this.cache.add(e),e instanceof Ji&&r.unshift(e.mark)),this.openWidget=!1},leave:e=>{e.isLine()?r.length&&=i=0:e instanceof Ji&&(r.shift(),i=Math.min(i,r.length))},break:()=>{this.builder.addBreak(),this.openWidget=!1}}),this.text.skip(e)}emit(e,t){let n=null,r=this.builder,i=-1,a=N.spans(this.decorations,e,t,{point:(e,t,a,o,s,c)=>{if(a instanceof or){if(this.disallowBlockEffectsFor[c]){if(a.block)throw RangeError(`Block decorations may not be specified via plugins`);if(t>this.view.state.doc.lineAt(e).to)throw RangeError(`Decorations that replace line breaks may not be specified via plugins`)}if(i=o.length,s>o.length)r.continueWidget(t-e);else{let i=a.widget||(a.block?da.block:da.inline),c=oa(a),l=this.cache.findWidget(i,t-e,c)||Xi.of(i,this.view,t-e,c);a.block?(a.startSide>0&&r.addLineStartIfNotCovered(n),r.addBlockWidget(l)):(r.ensureLine(n),r.addInlineWidget(l,o,s))}n=null}else n=ca(n,a);t>e&&this.text.skip(t-e)},span:(e,t,a,o)=>{for(let i=e;i<t;){let s=this.text.next(Math.min(512,t-i));s==null?(r.addLineStartIfNotCovered(n),r.addBreak(),i++):(r.ensureLine(n),r.addText(s,a,i==e?o:a.length),i+=s.length),n=null}i=a.length}});i>-1&&(this.openWidget=a>i),this.openWidget||r.addLineStartIfNotCovered(n),this.openMarks=a}forward(e,t,n=1){t-e<=10?this.old.advance(t-e,n,this.reuseWalker):(this.old.advance(5,-1,this.reuseWalker),this.old.advance(t-e-10,-1),this.old.advance(5,n,this.reuseWalker))}getCompositionContext(e){let t=[],n=null;for(let r=e.parentNode;;r=r.parentNode){let e=z.get(r);if(r==this.view.contentDOM)break;e instanceof Ji?t.push(e):e?.isLine()?n=e:e instanceof Wi||(r.nodeName==`DIV`&&!n?n=new Gi(r,sa):n||t.push(Ji.of(new ir({tagName:r.nodeName.toLowerCase(),attributes:nr(r)}),r)))}return n?{line:n,marks:t}:null}};function aa(e,t){let n=e=>{for(let r of e.children)if((t?r.isText():r.length)||n(r))return!0;return!1};return n(e)}function oa(e){let t=e.isReplace?(e.startSide<0?64:0)|(e.endSide>0?128:0):e.startSide>0?32:16;return e.block&&(t|=256),t}var sa={class:`cm-line`};function ca(e,t){let n=t.spec.attributes,r=t.spec.class;return!n&&!r?e:(e||={class:`cm-line`},n&&Zn(n,e),r&&(e.class+=` `+r),e)}function la(e){let t=[];for(let n=e.parents.length;n>1;n--){let r=n==e.parents.length?e.tile:e.parents[n].tile;r instanceof Ji&&t.push(r.mark)}return t}function ua(e){let t=z.get(e);return t&&t.setDOM(e.cloneNode()),e}var da=class extends rr{constructor(e){super(),this.tag=e}eq(e){return e.tag==this.tag}toDOM(){return document.createElement(this.tag)}updateDOM(e){return e.nodeName.toLowerCase()==this.tag}get isHidden(){return!0}};da.inline=new da(`span`),da.block=new da(`div`);var fa=new class extends rr{toDOM(){return document.createElement(`br`)}get isHidden(){return!0}get editable(){return!0}},pa=class{constructor(e){this.view=e,this.decorations=[],this.blockWrappers=[],this.dynamicDecorationMap=[!1],this.domChanged=null,this.hasComposition=null,this.editContextFormatting=I.none,this.lastCompositionAfterCursor=!1,this.minWidth=0,this.minWidthFrom=0,this.minWidthTo=0,this.impreciseAnchor=null,this.impreciseHead=null,this.forceSelection=!1,this.lastUpdate=Date.now(),this.updateDeco(),this.tile=new Ui(e,e.contentDOM),this.updateInner([new Ri(0,0,0,e.state.doc.length)],null)}update(e){let t=e.changedRanges;this.minWidth>0&&t.length&&(t.every(({fromA:e,toA:t})=>t<this.minWidthFrom||e>this.minWidthTo)?(this.minWidthFrom=e.changes.mapPos(this.minWidthFrom,1),this.minWidthTo=e.changes.mapPos(this.minWidthTo,1)):this.minWidth=this.minWidthFrom=this.minWidthTo=0),this.updateEditContextFormatting(e);let n=-1;this.view.inputState.composing>=0&&!this.view.observer.editContext&&(this.domChanged?.newSel?n=this.domChanged.newSel.head:!wa(e.changes,this.hasComposition)&&!e.selectionSet&&(n=e.state.selection.main.head));let r=n>-1?_a(this.view,e.changes,n):null;if(this.domChanged=null,this.hasComposition){let{from:n,to:r}=this.hasComposition;t=new Ri(n,r,e.changes.mapPos(n,-1),e.changes.mapPos(r,1)).addToSet(t.slice())}this.hasComposition=r?{from:r.range.fromB,to:r.range.toB}:null,(P.ie||P.chrome)&&!r&&e&&e.state.doc.lines!=e.startState.doc.lines&&(this.forceSelection=!0);let i=this.decorations,a=this.blockWrappers;this.updateDeco();let o=ba(i,this.decorations,e.changes);o.length&&(t=Ri.extendWithRanges(t,o));let s=Sa(a,this.blockWrappers,e.changes);return s.length&&(t=Ri.extendWithRanges(t,s)),r&&!t.some(e=>e.fromA<=r.range.fromA&&e.toA>=r.range.toA)&&(t=r.range.addToSet(t.slice())),this.tile.flags&2&&t.length==0?!1:(this.updateInner(t,r),e.transactions.length&&(this.lastUpdate=Date.now()),!0)}updateInner(e,t){this.view.viewState.mustMeasureContent=!0;let{observer:n}=this.view;n.ignore(()=>{if(t||e.length){let n=this.tile,r=new ia(this.view,n,this.blockWrappers,this.decorations,this.dynamicDecorationMap);t&&z.get(t.text)&&r.cache.reused.set(z.get(t.text),2),this.tile=r.run(e,t),ma(n,r.cache.reused)}this.tile.dom.style.height=this.view.viewState.contentHeight/this.view.scaleY+`px`,this.tile.dom.style.flexBasis=this.minWidth?this.minWidth+`px`:``;let r=P.chrome||P.ios?{node:n.selectionRange.focusNode,written:!1}:void 0;this.tile.sync(r),r&&(r.written||n.selectionRange.focusNode!=r.node||!this.tile.dom.contains(r.node))&&(this.forceSelection=!0),this.tile.dom.style.height=``});let r=[];if(this.view.viewport.from||this.view.viewport.to<this.view.state.doc.length)for(let e of this.tile.children)e.isWidget()&&e.widget instanceof Ta&&r.push(e.dom);n.updateGaps(r)}updateEditContextFormatting(e){this.editContextFormatting=this.editContextFormatting.map(e.changes);for(let t of e.transactions)for(let e of t.effects)e.is(bi)&&(this.editContextFormatting=e.value)}updateSelection(e=!1,t=!1){(e||!this.view.observer.selectionRange.focusNode)&&this.view.observer.readSelectionRange();let{dom:n}=this.tile,r=this.view.root.activeElement,i=r==n,a=!i&&!(this.view.state.facet(Si)||n.tabIndex>-1)&&pr(n,this.view.observer.selectionRange)&&!(r&&n.contains(r));if(!(i||t||a))return;let o=this.forceSelection;this.forceSelection=!1;let s=this.view.state.selection.main,c,l;if(s.empty?l=c=this.inlineDOMNearPos(s.anchor,s.assoc||1):(l=this.inlineDOMNearPos(s.head,s.head==s.from?1:-1),c=this.inlineDOMNearPos(s.anchor,s.anchor==s.from?1:-1)),P.gecko&&s.empty&&!this.hasComposition&&ha(c)){let e=document.createTextNode(``);this.view.observer.ignore(()=>c.node.insertBefore(e,c.node.childNodes[c.offset]||null)),c=l=new Rr(e,0),o=!0}let u=this.view.observer.selectionRange;(o||!u.focusNode||(!hr(c.node,c.offset,u.anchorNode,u.anchorOffset)||!hr(l.node,l.offset,u.focusNode,u.focusOffset))&&!this.suppressWidgetCursorChange(u,s))&&(this.view.observer.ignore(()=>{P.android&&P.chrome&&n.contains(u.focusNode)&&Ca(u.focusNode,n)&&(n.blur(),n.focus({preventScroll:!0}));let e=dr(this.view.root);if(e){if(s.empty){if(P.gecko){let e=va(c.node,c.offset);if(e&&e!=3){let t=(e==1?Ir:Lr)(c.node,c.offset);t&&(c=new Rr(t.node,t.offset))}}e.collapse(c.node,c.offset),s.bidiLevel!=null&&e.caretBidiLevel!==void 0&&(e.caretBidiLevel=s.bidiLevel)}else if(e.extend){e.collapse(c.node,c.offset);try{e.extend(l.node,l.offset)}catch{}}else{let t=document.createRange();s.anchor>s.head&&([c,l]=[l,c]),t.setEnd(l.node,l.offset),t.setStart(c.node,c.offset),e.removeAllRanges(),e.addRange(t)}}a&&this.view.root.activeElement==n&&(n.blur(),r&&r.focus())}),this.view.observer.setSelectionRange(c,l)),this.impreciseAnchor=c.precise?null:new Rr(u.anchorNode,u.anchorOffset),this.impreciseHead=l.precise?null:new Rr(u.focusNode,u.focusOffset)}suppressWidgetCursorChange(e,t){return this.hasComposition&&t.empty&&hr(e.focusNode,e.focusOffset,e.anchorNode,e.anchorOffset)&&this.posFromDOM(e.focusNode,e.focusOffset)==t.head}enforceCursorAssoc(){if(this.hasComposition)return;let{view:e}=this,t=e.state.selection.main,n=dr(e.root),{anchorNode:r,anchorOffset:i}=e.observer.selectionRange;if(!n||!t.empty||!t.assoc||!n.modify)return;let a=this.lineAt(t.head,t.assoc);if(!a)return;let o=a.posAtStart;if(t.head==o||t.head==o+a.length)return;let s=this.coordsAt(t.head,-1),c=this.coordsAt(t.head,1);if(!s||!c||s.bottom>c.top)return;let l=this.domAtPos(t.head+t.assoc,t.assoc);n.collapse(l.node,l.offset),n.modify(`move`,t.assoc<0?`forward`:`backward`,`lineboundary`),e.observer.readSelectionRange();let u=e.observer.selectionRange;e.docView.posFromDOM(u.anchorNode,u.anchorOffset)!=t.from&&n.collapse(r,i)}posFromDOM(e,t){let n=this.tile.nearest(e);if(!n)return this.tile.dom.compareDocumentPosition(e)&2?0:this.view.state.doc.length;let r=n.posAtStart;if(n.isComposite()){let i;if(e==n.dom)i=n.dom.childNodes[t];else{let r=yr(e)==0?0:t==0?-1:1;for(;;){let t=e.parentNode;if(t==n.dom)break;r==0&&t.firstChild!=t.lastChild&&(r=e==t.firstChild?-1:1),e=t}i=r<0?e:e.nextSibling}if(i==n.dom.firstChild)return r;for(;i&&!z.get(i);)i=i.nextSibling;if(!i)return r+n.length;for(let e=0,t=r;;e++){let r=n.children[e];if(r.dom==i)return t;t+=r.length+r.breakAfter}}else if(n.isText())return e==n.dom?r+t:r+(t?n.length:0);else return r}domAtPos(e,t){let{tile:n,offset:r}=this.tile.resolveBlock(e,t);return n.isWidget()?n.domPosFor(r,t):n.domIn(r,t)}inlineDOMNearPos(e,t){let n,r=-1,i=!1,a,o=-1,s=!1;return this.tile.blockTiles((t,c)=>{if(t.isWidget()){if(t.flags&32&&c>=e)return!0;t.flags&16&&(i=!0)}else{let l=c+t.length;if(c<=e&&(n=t,r=e-c,i=l<e),l>=e&&!a&&(a=t,o=e-c,s=c>e),c>e&&a)return!0}}),!n&&!a?this.domAtPos(e,t):(i&&a?n=null:s&&n&&(a=null),n&&t<0||!a?n.domIn(r,t):a.domIn(o,t))}coordsAt(e,t,n){let{tile:r,offset:i}=this.tile.resolveBlock(e,t);return r.isWidget()?r.widget instanceof Ta?null:r.coordsInWidget(i,t,!0):r.coordsIn(i,t,n)}lineAt(e,t){let{tile:n}=this.tile.resolveBlock(e,t);return n.isLine()?n:null}coordsForChar(e){let{tile:t,offset:n}=this.tile.resolveBlock(e,1);if(!t.isLine())return null;function r(e,t){if(e.isComposite())for(let n of e.children){if(n.length>=t){let e=r(n,t);if(e)return e}if(t-=n.length,t<0)break}else if(e.isText()&&t<e.length){let n=O(e.text,t);if(n==t)return null;let r=jr(e.dom,t,n).getClientRects();for(let e=0;e<r.length;e++){let t=r[e];if(e==r.length-1||t.top<t.bottom&&t.left<t.right)return t}}return null}return r(t,n)}measureVisibleLineHeights(e){let t=[],{from:n,to:r}=e,i=this.view.contentDOM.clientWidth,a=i>Math.max(this.view.scrollDOM.clientWidth,this.minWidth)+1,o=-1,s=this.view.textDirection==L.LTR,c=0,l=(e,u,d)=>{for(let f=0;f<e.children.length&&!(u>r);f++){let r=e.children[f],p=u+r.length,m=r.dom.getBoundingClientRect(),{height:h}=m;if(d&&!f&&(c+=m.top-d.top),r instanceof Wi)p>n&&l(r,u,m);else if(u>=n&&(c>0&&t.push(-c),t.push(h+c),c=0,a)){let e=r.dom.lastChild,t=e?mr(e):[];if(t.length){let e=t[t.length-1],n=s?e.right-m.left:m.right-e.left;n>o&&(o=n,this.minWidth=i,this.minWidthFrom=u,this.minWidthTo=p)}}d&&f==e.children.length-1&&(c+=d.bottom-m.bottom),u=p+r.breakAfter}};return l(this.tile,0,null),t}textDirectionAt(e){let{tile:t}=this.tile.resolveBlock(e,1);return getComputedStyle(t.dom).direction==`rtl`?L.RTL:L.LTR}measureTextSize(){let e=this.tile.blockTiles(e=>{if(e.isLine()&&e.children.length&&e.length<=20){let t=0,n;for(let r of e.children){if(!r.isText()||/[^ -~]/.test(r.text))return;let e=mr(r.dom);if(e.length!=1)return;t+=e[0].width,n=e[0].height}if(t)return{lineHeight:e.dom.getBoundingClientRect().height,charWidth:t/e.length,textHeight:n}}});if(e)return e;let t=document.createElement(`div`),n,r,i;return t.className=`cm-line`,t.style.width=`99999px`,t.style.position=`absolute`,t.textContent=`abc def ghi jkl mno pqr stu`,this.view.observer.ignore(()=>{this.tile.dom.appendChild(t);let e=mr(t.firstChild)[0];n=t.getBoundingClientRect().height,r=e&&e.width?e.width/27:7,i=e&&e.height?e.height:n,t.remove()}),{lineHeight:n,charWidth:r,textHeight:i}}computeBlockGapDeco(){let e=[],t=this.view.viewState;for(let n=0,r=0;;r++){let i=r==t.viewports.length?null:t.viewports[r],a=i?i.from-1:this.view.state.doc.length;if(a>n){let r=(t.lineBlockAt(a).bottom-t.lineBlockAt(n).top)/this.view.scaleY;e.push(I.replace({widget:new Ta(r),block:!0,inclusive:!0,isBlockGap:!0}).range(n,a))}if(!i)break;n=i.to+1}return I.set(e)}updateDeco(){let e=1,t=this.view.state.facet(ki).map(t=>(this.dynamicDecorationMap[e++]=typeof t==`function`)?t(this.view):t),n=!1,r=this.view.state.facet(ji).map((e,t)=>{let r=typeof e==`function`;return r&&(n=!0),r?e(this.view):e});for(r.length&&(this.dynamicDecorationMap[e++]=n,t.push(N.join(r))),this.decorations=[this.editContextFormatting,...t,this.computeBlockGapDeco(),this.view.viewState.lineGapDeco];e<this.decorations.length;)this.dynamicDecorationMap[e++]=!1;this.blockWrappers=this.view.state.facet(Ai).map(e=>typeof e==`function`?e(this.view):e)}scrollIntoView(e){if(e.isSnapshot){let t=this.view.viewState.lineBlockAt(e.range.head);this.view.scrollDOM.scrollTop=t.top-e.yMargin,this.view.scrollDOM.scrollLeft=e.xMargin;return}for(let t of this.view.state.facet(_i))try{if(t(this.view,e.range,e))return!0}catch(e){xi(this.view.state,e,`scroll handler`)}let{range:t}=e,n=this.coordsAt(t.head,t.assoc||(t.head>t.anchor?-1:1)),r;if(!n)return;!t.empty&&(r=this.coordsAt(t.anchor,t.anchor>t.head?-1:1))&&(n={left:Math.min(n.left,r.left),top:Math.min(n.top,r.top),right:Math.max(n.right,r.right),bottom:Math.max(n.bottom,r.bottom)});let i=Ii(this.view),a={left:n.left-i.left,top:n.top-i.top,right:n.right+i.right,bottom:n.bottom+i.bottom},{offsetWidth:o,offsetHeight:s}=this.view.scrollDOM;if(Cr(this.view.scrollDOM,a,t.head<t.anchor?-1:1,e.x,e.y,Math.max(Math.min(e.xMargin,o),-o),Math.max(Math.min(e.yMargin,s),-s),this.view.textDirection==L.LTR),window.visualViewport&&window.innerHeight-window.visualViewport.height>1&&(n.top>window.visualViewport.offsetTop+window.visualViewport.height||n.bottom<window.visualViewport.offsetTop)){let e=this.view.docView.lineAt(t.head,1);if(e){let t=Er(e.dom);e.dom.scrollIntoView({block:`nearest`}),Dr(t,!1)}}}lineHasWidget(e){let t=e=>e.isWidget()||e.children.some(t);return t(this.tile.resolveBlock(e,1).tile)}destroy(){ma(this.tile)}};function ma(e,t){let n=t?.get(e);if(n!=1){n??e.destroy();for(let n of e.children)ma(n,t)}}function ha(e){return e.node.nodeType==1&&e.node.firstChild&&(e.offset==0||e.node.childNodes[e.offset-1].contentEditable==`false`)&&(e.offset==e.node.childNodes.length||e.node.childNodes[e.offset].contentEditable==`false`)}function ga(e,t){let n=e.observer.selectionRange;if(!n.focusNode)return null;let r=Ir(n.focusNode,n.focusOffset),i=Lr(n.focusNode,n.focusOffset),a=r||i;if(i&&r&&i.node!=r.node){let t=z.get(i.node);if(!t||t.isText()&&t.text!=i.node.nodeValue)a=i;else if(e.docView.lastCompositionAfterCursor){let e=z.get(r.node);!e||e.isText()&&e.text!=r.node.nodeValue||(a=i)}}if(e.docView.lastCompositionAfterCursor=a!=r,!a)return null;let o=t-a.offset;return{from:o,to:o+a.node.nodeValue.length,node:a.node}}function _a(e,t,n){let r=ga(e,n);if(!r)return null;let{node:i,from:a,to:o}=r,s=i.nodeValue;if(/[\n\r]/.test(s)||e.state.doc.sliceString(r.from,r.to)!=s)return null;let c=t.invertedDesc;return{range:new Ri(c.mapPos(a),c.mapPos(o),a,o),text:i}}function va(e,t){return e.nodeType==1?(t&&e.childNodes[t-1].contentEditable==`false`?1:0)|(t<e.childNodes.length&&e.childNodes[t].contentEditable==`false`?2:0):0}var ya=class{constructor(){this.changes=[]}compareRange(e,t){lr(e,t,this.changes)}comparePoint(e,t){lr(e,t,this.changes)}boundChange(e){lr(e,e,this.changes)}};function ba(e,t,n){let r=new ya;return N.compare(e,t,n,r),r.changes}var xa=class{constructor(){this.changes=[]}compareRange(e,t){lr(e,t,this.changes)}comparePoint(){}boundChange(e){lr(e,e,this.changes)}};function Sa(e,t,n){let r=new xa;return N.compare(e,t,n,r),r.changes}function Ca(e,t){for(let n=e;n&&n!=t;n=n.assignedSlot||n.parentNode)if(n.nodeType==1&&n.contentEditable==`false`)return!0;return!1}function wa(e,t){let n=!1;return t&&e.iterChangedRanges((e,r)=>{e<t.to&&r>t.from&&(n=!0)}),n}var Ta=class extends rr{constructor(e){super(),this.height=e}toDOM(){let e=document.createElement(`div`);return e.className=`cm-gap`,this.updateDOM(e),e}eq(e){return e.height==this.height}updateDOM(e){return e.style.height=this.height+`px`,!0}get editable(){return!0}get estimatedHeight(){return this.height}ignoreEvent(){return!1}};function Ea(e,t,n=1){let r=e.charCategorizer(t),i=e.doc.lineAt(t),a=t-i.from;if(i.length==0)return k.cursor(t);a==0?n=1:a==i.length&&(n=-1);let o=a,s=a;n<0?o=O(i.text,a,!1):s=O(i.text,a);let c=r(i.text.slice(o,s));for(;o>0;){let e=O(i.text,o,!1);if(r(i.text.slice(e,o))!=c)break;o=e}for(;s<i.length;){let e=O(i.text,s);if(r(i.text.slice(s,e))!=c)break;s=e}return k.undirectionalRange(o+i.from,s+i.from)}function Da(e,t,n,r,i){let a=Math.round((r-t.left)*e.defaultCharacterWidth);if(e.lineWrapping&&n.height>e.defaultLineHeight*1.5){let t=e.viewState.heightOracle.textHeight,r=Math.floor((i-n.top-(e.defaultLineHeight-t)*.5)/t);a+=r*e.viewState.heightOracle.lineLength}let o=e.state.sliceDoc(n.from,n.to);return n.from+Cn(o,a,e.state.tabSize)}function Oa(e,t,n){let r=e.lineBlockAt(t);if(Array.isArray(r.type)){let e;for(let i of r.type){if(i.from>t)break;if(!(i.to<t)){if(i.from<t&&i.to>t)return i;(!e||i.type==F.Text&&(e.type!=i.type||(n<0?i.from<t:i.to>t)))&&(e=i)}}return e||r}return r}function ka(e,t,n,r){let i=Oa(e,t.head,t.assoc||-1),a=!r||i.type!=F.Text||!(e.lineWrapping||i.widgetLineBreaks)?null:e.coordsAtPos(t.assoc<0&&t.head>i.from?t.head-1:t.head);if(a){let t=e.dom.getBoundingClientRect(),r=e.textDirectionAt(i.from),o=e.posAtCoords({x:n==(r==L.LTR)?t.right-1:t.left+1,y:(a.top+a.bottom)/2});if(o!=null)return k.cursor(o,n?-1:1)}return k.cursor(n?i.to:i.from,n?-1:1)}function Aa(e,t,n,r){let i=e.state.doc.lineAt(t.head),a=e.bidiSpans(i),o=e.textDirectionAt(i.from);for(let s=t,c=null;;){let t=ii(i,a,o,s,n),l=ri;if(!t){if(i.number==(n?e.state.doc.lines:1))return s;l=`
`,i=e.state.doc.line(i.number+(n?1:-1)),a=e.bidiSpans(i),t=n?k.cursor(i.from,-1):k.cursor(i.to,1)}if(!c){if(!r)return t;c=r(l)}else if(!c(l))return s;s=t}}function ja(e,t,n){let r=e.state.charCategorizer(t),i=r(n);return e=>{let t=r(e);return i==Zt.Space&&(i=t),i==t}}function Ma(e,t,n,r){let i=t.head,a=n?1:-1;if(i==(n?e.state.doc.length:0))return k.cursor(i,t.assoc);let o=t.goalColumn,s,c=e.contentDOM.getBoundingClientRect(),l=e.coordsAtPos(i,t.assoc||((t.empty?n:t.head==t.from)?1:-1)),u=e.documentTop;if(l)o??=l.left-c.left,s=a<0?l.top:l.bottom;else{let t=e.viewState.lineBlockAt(i);o??=Math.min(c.right-c.left,e.defaultCharacterWidth*(i-t.from)),s=(a<0?t.top:t.bottom)+u}let d=c.left+o,f=e.viewState.heightOracle.textHeight>>1,p=r??f;for(let t=0;;t+=f){let r=s+(p+t)*a,i=La(e,{x:d,y:r},!1,a);if(n?r>c.bottom:r<c.top)return k.cursor(i.pos,i.assoc);let l=e.coordsAtPos(i.pos,i.assoc),u=l?(l.top+l.bottom)/2:0;if(!l||(n?u>s:u<s))return k.cursor(i.pos,i.assoc,void 0,o)}}function Na(e,t,n){for(;;){let r=0;for(let i of e)i.between(t-1,t+1,(e,i,a)=>{if(t>e&&t<i){let a=r||n||(t-e<i-t?-1:1);t=a<0?e:i,r=a}});if(!r)return t}}function Pa(e,t){let n=null;for(let r=0;r<t.ranges.length;r++){let i=t.ranges[r],a=null;if(i.empty){let t=Na(e,i.from,0);t!=i.from&&(a=k.cursor(t,-1))}else{let t=Na(e,i.from,-1),n=Na(e,i.to,1);(t!=i.from||n!=i.to)&&(a=i.undirectional?k.undirectionalRange(i.from,i.to):k.range(i.from==i.anchor?t:n,i.from==i.head?t:n))}a&&(n||=t.ranges.slice(),n[r]=a)}return n?k.create(n,t.mainIndex):t}function Fa(e,t,n){let r=Na(e.state.facet(Mi).map(t=>t(e)),n.from,t.head>n.from?-1:1);return r==n.from?n:k.cursor(r,r<n.from?1:-1)}var Ia=class{constructor(e,t){this.pos=e,this.assoc=t}};function La(e,t,n,r){let i=e.contentDOM.getBoundingClientRect(),a=i.top+e.viewState.paddingTop,{x:o,y:s}=t,c=s-a,l;for(;;){if(c<0)return new Ia(0,1);if(c>e.viewState.docHeight)return new Ia(e.state.doc.length,-1);if(l=e.elementAtHeight(c),r==null)break;if(l.type==F.Text){if(r<0?l.to<e.viewport.from:l.from>e.viewport.to)break;let t=e.docView.coordsAt(r<0?l.from:l.to,r>0?-1:1);if(t&&(r<0?t.top<=c+a:t.bottom>=c+a))break}let t=e.viewState.heightOracle.textHeight/2;c=r>0?l.bottom+t:l.top-t}if(e.viewport.from>=l.to||e.viewport.to<=l.from){if(n)return null;if(l.type==F.Text){let t=Da(e,i,l,o,s);return new Ia(t,t==l.from?1:-1)}}if(l.type!=F.Text)return c<(l.top+l.bottom)/2?new Ia(l.from,1):new Ia(l.to,-1);let u=e.docView.lineAt(l.from,2);return(!u||u.length!=l.length)&&(u=e.docView.lineAt(l.from,-2)),new Ra(e,o,s,e.textDirectionAt(l.from)).scanTile(u,l.from)}var Ra=class{constructor(e,t,n,r){this.view=e,this.x=t,this.y=n,this.baseDir=r,this.line=null,this.spans=null}bidiSpansAt(e){return(!this.line||this.line.from>e||this.line.to<e)&&(this.line=this.view.state.doc.lineAt(e),this.spans=this.view.bidiSpans(this.line)),this}baseDirAt(e,t){let{line:n,spans:r}=this.bidiSpansAt(e);return r[Jr.find(r,e-n.from,-1,t)].level==this.baseDir}dirAt(e,t){let{line:n,spans:r}=this.bidiSpansAt(e);return r[Jr.find(r,e-n.from,-1,t)].dir}bidiIn(e,t){let{spans:n,line:r}=this.bidiSpansAt(e);return n.length>1||n.length&&(n[0].level!=this.baseDir||n[0].to+r.from<t)}scan(e,t,n=!1){let r=0,i=e.length-1,a=new Set,o=this.bidiIn(e[0],e[i]),s,c,l=-1,u=1e9,d;search:for(;r<i;){let n=i-r,f=r+i>>1;adjust:if(a.has(f)){for(let e=1;e<n;e++){let t=f+e;if(t>=i&&(t-=n),!a.has(t)){f=t;break adjust}}break search}a.add(f);let p=t(f),m=0;if(p)for(let e=0;e<p.length;e++){let t=p[e];if(!(t.width==0&&p.length>1)){if(t.bottom<this.y)(!s||s.bottom<t.bottom)&&(s=t),m=1;else if(t.top>this.y)(!c||c.top>t.top)&&(c=t),m=-1;else{let e=t.left>this.x?this.x-t.left:t.right<this.x?this.x-t.right:0,n=Math.abs(e);n<u&&(l=f,u=n,d=t),e&&(m=e<0==(this.baseDir==L.LTR)?-1:1)}}}m==-1&&(!o||this.baseDirAt(e[f],1))?i=f:m==1&&(!o||this.baseDirAt(e[f+1],-1))&&(r=f+1)}if(!d){if(!c&&!s)return{i:0,after:!1};let n=s&&(!c||this.y-s.bottom<c.top-this.y)?s:c;return this.y=(n.top+n.bottom)/2,this.scan(e,t,!0)}if(u&&!n){let{top:n,bottom:r}=d;if(s&&s.bottom>(n+n+r)/3)return this.y=s.bottom-1,this.scan(e,t,!0);if(c&&c.top<(n+r+r)/3)return this.y=c.top+1,this.scan(e,t,!0)}let f=(o?this.dirAt(e[l],1):this.baseDir)==L.LTR;return{i:l,after:this.x>(d.left+d.right)/2==f}}scanText(e,t){let n=[];for(let r=0;r<e.length;r=O(e.text,r))n.push(t+r);n.push(t+e.length);let r=this.scan(n,r=>{let i=n[r]-t,a=n[r+1]-t;return jr(e.dom,i,a).getClientRects()});return r.after?new Ia(n[r.i+1],-1):new Ia(n[r.i],1)}scanTile(e,t){if(!e.length)return new Ia(t,1);if(e.children.length==1){let n=e.children[0];if(n.isText())return this.scanText(n,t);if(n.isComposite())return this.scanTile(n,t)}let n=[t];for(let r=0,i=t;r<e.children.length;r++)n.push(i+=e.children[r].length);let r=this.scan(n,t=>{let n=e.children[t];return n.flags&48?null:(n.dom.nodeType==1?n.dom:jr(n.dom,0,n.length)).getClientRects()}),i=e.children[r.i],a=n[r.i];return i.isText()?this.scanText(i,a):i.isComposite()?this.scanTile(i,a):r.after?new Ia(n[r.i+1],-1):new Ia(a,1)}},za=`￿`,Ba=class{constructor(e,t){this.points=e,this.view=t,this.text=``,this.lineSeparator=t.state.facet(M.lineSeparator)}append(e){this.text+=e}lineBreak(){this.text+=za}readRange(e,t){if(!e)return this;let n=e.parentNode;for(let r=e;;){this.findPointBefore(n,r);let e=this.text.length;this.readNode(r);let i=z.get(r),a=r.nextSibling;if(a==t){i?.breakAfter&&!a&&n!=this.view.contentDOM&&this.lineBreak();break}let o=z.get(a);(i&&o?i.breakAfter:(i?i.breakAfter:_r(r))||_r(a)&&(r.nodeName!=`BR`||i?.isWidget())&&this.text.length>e)&&!Ha(a,t)&&this.lineBreak(),r=a}return this.findPointBefore(n,t),this}readTextNode(e){let t=e.nodeValue;for(let n of this.points)n.node==e&&(n.pos=this.text.length+Math.min(n.offset,t.length));for(let n=0,r=this.lineSeparator?null:/\r\n?|\n/g;;){let i=-1,a=1,o;if(this.lineSeparator?(i=t.indexOf(this.lineSeparator,n),a=this.lineSeparator.length):(o=r.exec(t))&&(i=o.index,a=o[0].length),this.append(t.slice(n,i<0?t.length:i)),i<0)break;if(this.lineBreak(),a>1)for(let t of this.points)t.node==e&&t.pos>this.text.length&&(t.pos-=a-1);n=i+a}}readNode(e){let t=z.get(e),n=t&&t.overrideDOMText;if(n!=null){this.findPointInside(e,n.length);for(let e=n.iter();!e.next().done;)e.lineBreak?this.lineBreak():this.append(e.value)}else e.nodeType==3?this.readTextNode(e):e.nodeName==`BR`?e.nextSibling&&this.lineBreak():e.nodeType==1&&this.readRange(e.firstChild,null)}findPointBefore(e,t){for(let n of this.points)n.node==e&&e.childNodes[n.offset]==t&&(n.pos=this.text.length)}findPointInside(e,t){for(let n of this.points)(e.nodeType==3?n.node==e:e.contains(n.node))&&(n.pos=this.text.length+(Va(e,n.node,n.offset)?t:0))}};function Va(e,t,n){for(;;){if(!t||n<yr(t))return!1;if(t==e)return!0;n=gr(t)+1,t=t.parentNode}}function Ha(e,t){let n;for(;e!=t&&e;e=e.nextSibling){let t=z.get(e);if(!t?.isWidget())return!1;t&&(n||=[]).push(t)}if(n){for(let e of n)if(e.overrideDOMText?.length)return!1}return!0}var Ua=class{constructor(e,t){this.node=e,this.offset=t,this.pos=-1}},Wa=class{constructor(e,t,n,r){this.typeOver=r,this.bounds=null,this.text=``,this.domChanged=t>-1;let{impreciseHead:i,impreciseAnchor:a}=e.docView,o=e.state.selection;if(e.state.readOnly&&t>-1)this.newSel=null;else if(t>-1&&(this.bounds=Ga(e.docView.tile,t,n,0))){let t=i||a?[]:Xa(e),n=new Ba(t,e);n.readRange(this.bounds.startDOM,this.bounds.endDOM),this.text=n.text,this.newSel=Za(t,this.bounds.from)}else{let t=e.observer.selectionRange,n=i&&i.node==t.focusNode&&i.offset==t.focusOffset||!fr(e.contentDOM,t.focusNode)?o.main.head:e.docView.posFromDOM(t.focusNode,t.focusOffset),r=a&&a.node==t.anchorNode&&a.offset==t.anchorOffset||!fr(e.contentDOM,t.anchorNode)?o.main.anchor:e.docView.posFromDOM(t.anchorNode,t.anchorOffset),s=e.viewport;if((P.ios||P.chrome)&&n!=r&&Math.min(n,r)<=o.main.from&&Math.max(n,r)>=o.main.to&&(s.from>0||s.to<e.state.doc.length)){let t=Math.min(n,r),i=Math.max(n,r),a=s.from-t,o=s.to-i;(a==0||a==1||t==0)&&(o==0||o==-1||i==e.state.doc.length)&&(n=0,r=e.state.doc.length)}if(e.inputState.composing>-1&&o.ranges.length>1)this.newSel=o.replaceRange(k.range(r,n));else if(e.lineWrapping&&r==n&&!(o.main.empty&&o.main.head==n)&&e.inputState.lastTouchTime>Date.now()-100){let t=e.coordsAtPos(n,-1),r=0;t&&(r=e.inputState.lastTouchY<=t.bottom?-1:1),this.newSel=k.create([k.cursor(n,r)])}else this.newSel=k.single(r,n)}}};function Ga(e,t,n,r){if(e.isComposite()){let i=-1,a=-1,o=-1,s=-1;for(let c=0,l=r,u=r;c<e.children.length;c++){let r=e.children[c],d=l+r.length;if(l<t&&d>n)return Ga(r,t,n,l);if(d>=t&&i==-1&&(i=c,a=l),l>n&&r.dom.parentNode==e.dom){o=c,s=u;break}u=d,l=d+r.breakAfter}return{from:a,to:s<0?r+e.length:s,startDOM:(i?e.children[i-1].dom.nextSibling:null)||e.dom.firstChild,endDOM:o<e.children.length&&o>=0?e.children[o].dom:null}}return e.isText()?{from:r,to:r+e.length,startDOM:e.dom,endDOM:e.dom.nextSibling}:null}function Ka(e,t){let n,{newSel:r}=t,{state:i}=e,a=i.selection.main,o=e.inputState.lastKeyTime>Date.now()-100?e.inputState.lastKeyCode:-1;if(t.bounds){let{from:e,to:r}=t.bounds,s=a.from,c=null;(o===8||P.android&&t.text.length<r-e)&&(s=a.to,c=`end`);let l=i.doc.sliceString(e,r,za),u,d;!a.empty&&a.from>=e&&a.to<=r&&(t.typeOver||l!=t.text)&&l.slice(0,a.from-e)==t.text.slice(0,a.from-e)&&l.slice(a.to-e)==t.text.slice(u=t.text.length-(l.length-(a.to-e)))?n={from:a.from,to:a.to,insert:D.of(t.text.slice(a.from-e,u).split(za))}:(d=Ya(l,t.text,s-e,c))&&(P.chrome&&o==13&&d.toB==d.from+2&&t.text.slice(d.from,d.toB)==`￿￿`&&d.toB--,n={from:e+d.from,to:e+d.toA,insert:D.of(t.text.slice(d.from,d.toB).split(za))})}else r&&(!e.hasFocus&&i.facet(Si)||Qa(r,a))&&(r=null);if(!n&&!r)return!1;if((P.mac||P.android)&&n&&n.from==n.to&&n.from==a.head-1&&/^\. ?$/.test(n.insert.toString())&&e.contentDOM.getAttribute(`autocorrect`)==`off`?(r&&n.insert.length==2&&(r=k.single(r.main.anchor-1,r.main.head-1)),n={from:n.from,to:n.to,insert:D.of([n.insert.toString().replace(`.`,` `)])}):i.doc.lineAt(a.from).to<a.to&&e.docView.lineHasWidget(a.to)&&e.inputState.insertingTextAt>Date.now()-50?n={from:a.from,to:a.to,insert:i.toText(e.inputState.insertingText)}:P.chrome&&n&&n.from==n.to&&n.from==a.head&&n.insert.toString()==`
 `&&e.lineWrapping&&(r&&=k.single(r.main.anchor-1,r.main.head-1),n={from:a.from,to:a.to,insert:D.of([` `])}),n)return qa(e,n,r,o);if(r&&!Qa(r,a)){let t=!1,n=`select`;return e.inputState.lastSelectionTime>Date.now()-50&&(e.inputState.lastSelectionOrigin==`select`&&(t=!0),n=e.inputState.lastSelectionOrigin,n==`select.pointer`&&(r=Pa(i.facet(Mi).map(t=>t(e)),r))),e.dispatch({selection:r,scrollIntoView:t,userEvent:n}),!0}return!1}function qa(e,t,n,r=-1){if(P.ios&&e.inputState.flushIOSKey(t))return!0;let i=e.state.selection.main;if(P.android&&(t.to==i.to&&(t.from==i.from||t.from==i.from-1&&e.state.sliceDoc(t.from,i.from)==` `)&&t.insert.length==1&&t.insert.lines==2&&Mr(e.contentDOM,`Enter`,13)||(t.from==i.from-1&&t.to==i.to&&t.insert.length==0||r==8&&t.insert.length<t.to-t.from&&t.to>i.head)&&Mr(e.contentDOM,`Backspace`,8)||t.from==i.from&&t.to==i.to+1&&t.insert.length==0&&Mr(e.contentDOM,`Delete`,46)))return!0;let a=t.insert.toString();e.inputState.composing>=0&&e.inputState.composing++;let o,s=()=>o||=Ja(e,t,n);return e.state.facet(di).some(n=>n(e,t.from,t.to,a,s))||e.dispatch(s()),!0}function Ja(e,t,n){let r,i=e.state,a=i.selection.main,o=-1;if(t.from==t.to&&t.from<a.from||t.from>a.to){let n=t.from<a.from?-1:1,r=n<0?a.from:a.to,s=Na(i.facet(Mi).map(t=>t(e)),r,n);t.from==s&&(o=s)}if(o>-1)r={changes:t,selection:k.cursor(t.from+t.insert.length,-1)};else if(t.from>=a.from&&t.to<=a.to&&t.to-t.from>=(a.to-a.from)/3&&(!n||n.main.empty&&n.main.from==t.from+t.insert.length)&&e.inputState.composing<0){let n=a.from<t.from?i.sliceDoc(a.from,t.from):``,o=a.to>t.to?i.sliceDoc(t.to,a.to):``;r=i.replaceSelection(e.state.toText(n+t.insert.sliceString(0,void 0,e.state.lineBreak)+o))}else{let o=i.changes(t),s=n&&n.main.to<=o.newLength?n.main:void 0;if(i.selection.ranges.length>1&&(e.inputState.composing>=0||e.inputState.compositionPendingChange)&&t.to<=a.to+10&&t.to>=a.to-10){let c=e.state.sliceDoc(t.from,t.to),l,u=n&&ga(e,n.main.head);if(u){let e=t.insert.length-(t.to-t.from);l={from:u.from,to:u.to-e}}else l=e.state.doc.lineAt(a.head);let d=a.to-t.to;r=i.changeByRange(n=>{if(n.from==a.from&&n.to==a.to)return{changes:o,range:s||n.map(o)};let r=n.to-d,u=r-c.length;if(e.state.sliceDoc(u,r)!=c||r>=l.from&&u<=l.to)return{range:n};let f=i.changes({from:u,to:r,insert:t.insert}),p=n.to-a.to;return{changes:f,range:s?k.range(Math.max(0,s.anchor+p),Math.max(0,s.head+p)):n.map(f)}})}else r={changes:o,selection:s&&i.selection.replaceRange(s)}}let s=`input.type`;return(e.composing||e.inputState.compositionPendingChange&&e.inputState.compositionEndedAt>Date.now()-50)&&(e.inputState.compositionPendingChange=!1,s+=`.compose`,e.inputState.compositionFirstChange&&(s+=`.start`,e.inputState.compositionFirstChange=!1)),i.update(r,{userEvent:s,scrollIntoView:!0})}function Ya(e,t,n,r){let i=Math.min(e.length,t.length),a=0;for(;a<i&&e.charCodeAt(a)==t.charCodeAt(a);)a++;if(a==i&&e.length==t.length)return null;let o=e.length,s=t.length;for(;o>0&&s>0&&e.charCodeAt(o-1)==t.charCodeAt(s-1);)o--,s--;if(r==`end`){let e=Math.max(0,a-Math.min(o,s));n-=o+e-a}if(o<a&&e.length<t.length){let e=n<=a&&n>=o?a-n:0;a-=e,s=a+(s-o),o=a}else if(s<a){let e=n<=a&&n>=s?a-n:0;a-=e,o=a+(o-s),s=a}return{from:a,toA:o,toB:s}}function Xa(e){let t=[];if(e.root.activeElement!=e.contentDOM)return t;let{anchorNode:n,anchorOffset:r,focusNode:i,focusOffset:a}=e.observer.selectionRange;return n&&(t.push(new Ua(n,r)),(i!=n||a!=r)&&t.push(new Ua(i,a))),t}function Za(e,t){if(e.length==0)return null;let n=e[0].pos,r=e.length==2?e[1].pos:n;return n<0||r<0?null:n==r?k.create([k.cursor(r+t,-1)]):k.single(n+t,r+t)}function Qa(e,t){return t.head==e.main.head&&t.anchor==e.main.anchor}var $a=class{setSelectionOrigin(e){this.lastSelectionOrigin=e,this.lastSelectionTime=Date.now()}constructor(e){this.view=e,this.lastKeyCode=0,this.lastKeyTime=0,this.touchActive=!1,this.lastTouchTime=0,this.lastTouchX=0,this.lastTouchY=0,this.lastFocusTime=0,this.lastScrollTop=0,this.lastScrollLeft=0,this.lastWheelEvent=0,this.pendingIOSKey=void 0,this.lastIOSMomentumScroll=0,this.tabFocusMode=-1,this.lastSelectionOrigin=null,this.lastSelectionTime=0,this.lastContextMenu=0,this.scrollHandlers=[],this.handlers=Object.create(null),this.composing=-1,this.compositionFirstChange=null,this.compositionEndedAt=0,this.compositionPendingKey=!1,this.compositionPendingChange=!1,this.insertingText=``,this.insertingTextAt=0,this.mouseSelection=null,this.draggedContent=null,this.handleEvent=this.handleEvent.bind(this),this.notifiedFocused=e.hasFocus,P.safari&&e.contentDOM.addEventListener(`input`,()=>null),P.gecko&&Lo(e.contentDOM.ownerDocument)}handleEvent(e){mo(this.view,e)&&!this.ignoreDuringComposition(e)&&(e.type==`keydown`&&this.keydown(e)||(this.view.updateState==0?this.runHandlers(e.type,e):Promise.resolve().then(()=>this.runHandlers(e.type,e))))}runHandlers(e,t){let n=this.handlers[e];if(n){for(let e of n.observers)e(this.view,t);for(let e of n.handlers){if(t.defaultPrevented)break;if(e(this.view,t)){t.preventDefault();break}}}}ensureHandlers(e){let t=no(e),n=this.handlers,r=this.view.contentDOM;for(let e in t)if(e!=`scroll`){let i=!t[e].handlers.length,a=n[e];a&&i!=!a.handlers.length&&(r.removeEventListener(e,this.handleEvent),a=null),a||r.addEventListener(e,this.handleEvent,{passive:i})}for(let e in n)e!=`scroll`&&!t[e]&&r.removeEventListener(e,this.handleEvent);this.handlers=t}keydown(e){if(this.lastKeyCode=e.keyCode,this.lastKeyTime=Date.now(),e.keyCode==9&&this.tabFocusMode>-1&&(!this.tabFocusMode||Date.now()<=this.tabFocusMode))return!0;if(this.tabFocusMode>0&&e.keyCode!=27&&ao.indexOf(e.keyCode)<0&&(this.tabFocusMode=-1),P.android&&P.chrome&&!e.synthetic&&(e.keyCode==13||e.keyCode==8))return this.view.observer.delayAndroidKey(e.key,e.keyCode),!0;if(P.ios&&!e.synthetic&&!e.altKey&&!e.metaKey&&(ro.some(t=>t.keyCode==e.keyCode)&&!e.ctrlKey||io.indexOf(e.key)>-1&&e.ctrlKey)){let t={ctrlKey:e.ctrlKey,altKey:e.altKey,metaKey:e.metaKey,shiftKey:e.shiftKey};t.shiftKey&&P.ios&&!/^(off|none)$/.test(this.view.contentDOM.autocapitalize)&&eo(this.view.win)&&(t.shiftKey=!1);let n=this.pendingIOSKey={key:e.key,keyCode:e.keyCode,mods:t};return setTimeout(()=>{this.pendingIOSKey==n&&this.flushIOSKey()},50),!0}return e.keyCode!=229&&this.view.observer.forceFlush(),!1}flushIOSKey(e){let t=this.pendingIOSKey;return!t||this.view.observer.pendingRecords().length||t.key==`Enter`&&e&&e.from<e.to&&/^\S+$/.test(e.insert.toString())?!1:(this.pendingIOSKey=void 0,Mr(this.view.contentDOM,t.key,t.keyCode,t.mods))}ignoreDuringComposition(e){return!/^key/.test(e.type)||e.synthetic?!1:this.composing>0?!0:P.safari&&!P.ios&&this.compositionPendingKey&&Date.now()-this.compositionEndedAt<100?(this.compositionPendingKey=!1,!0):!1}startMouseSelection(e){this.mouseSelection&&this.mouseSelection.destroy(),this.mouseSelection=e}update(e){this.view.observer.update(e),this.mouseSelection&&this.mouseSelection.update(e),this.draggedContent&&e.docChanged&&(this.draggedContent=this.draggedContent.map(e.changes)),e.transactions.length&&(this.lastKeyCode=this.lastSelectionTime=0)}destroy(){this.mouseSelection&&this.mouseSelection.destroy()}};function eo(e){return e.visualViewport?e.visualViewport.height*e.visualViewport.scale/e.document.documentElement.clientHeight<.85:!1}function to(e,t){return(n,r)=>{try{return t.call(e,r,n)}catch(e){xi(n.state,e)}}}function no(e){let t=Object.create(null);function n(e){return t[e]||(t[e]={observers:[],handlers:[]})}for(let t of e){let e=t.spec,r=e&&e.plugin.domEventHandlers,i=e&&e.plugin.domEventObservers;if(r)for(let e in r){let i=r[e];i&&n(e).handlers.push(to(t.value,i))}if(i)for(let e in i){let r=i[e];r&&n(e).observers.push(to(t.value,r))}}for(let e in ho)n(e).handlers.push(ho[e]);for(let e in go)n(e).observers.push(go[e]);return t}var ro=[{key:`Backspace`,keyCode:8,inputType:`deleteContentBackward`},{key:`Enter`,keyCode:13,inputType:`insertParagraph`},{key:`Enter`,keyCode:13,inputType:`insertLineBreak`},{key:`Delete`,keyCode:46,inputType:`deleteContentForward`}],io=`dthko`,ao=[16,17,18,20,91,92,224,225],oo=6;function so(e){return Math.max(0,e)*.7+8}function co(e,t){return Math.max(Math.abs(e.clientX-t.clientX),Math.abs(e.clientY-t.clientY))}var lo=class{constructor(e,t,n,r){this.view=e,this.startEvent=t,this.style=n,this.mustSelect=r,this.scrollSpeed={x:0,y:0},this.scrolling=-1,this.lastEvent=t,this.scrollParents=wr(e.contentDOM),this.atoms=e.state.facet(Mi).map(t=>t(e));let i=e.contentDOM.ownerDocument;i.addEventListener(`mousemove`,this.move=this.move.bind(this)),i.addEventListener(`mouseup`,this.up=this.up.bind(this)),this.extend=t.shiftKey,this.multiple=e.state.facet(M.allowMultipleSelections)&&uo(e,t),this.dragging=po(e,t)&&Eo(t)==1?null:!1}start(e){this.dragging===!1&&this.select(e)}move(e){if(e.buttons==0)return this.destroy();if(this.dragging||this.dragging==null&&co(this.startEvent,e)<10)return;this.select(this.lastEvent=e);let t=0,n=0,r=0,i=0,a=this.view.win.innerWidth,o=this.view.win.innerHeight;this.scrollParents.x&&({left:r,right:a}=this.scrollParents.x.getBoundingClientRect()),this.scrollParents.y&&({top:i,bottom:o}=this.scrollParents.y.getBoundingClientRect());let s=Ii(this.view);e.clientX-s.left<=r+oo?t=-so(r-e.clientX):e.clientX+s.right>=a-oo&&(t=so(e.clientX-a)),e.clientY-s.top<=i+oo?n=-so(i-e.clientY):e.clientY+s.bottom>=o-oo&&(n=so(e.clientY-o)),this.setScrollSpeed(t,n)}up(e){this.dragging??this.select(this.lastEvent),this.dragging||e.preventDefault(),this.destroy()}destroy(){this.setScrollSpeed(0,0);let e=this.view.contentDOM.ownerDocument;e.removeEventListener(`mousemove`,this.move),e.removeEventListener(`mouseup`,this.up),this.view.inputState.mouseSelection=this.view.inputState.draggedContent=null}setScrollSpeed(e,t){this.scrollSpeed={x:e,y:t},e||t?this.scrolling<0&&(this.scrolling=setInterval(()=>this.scroll(),50)):this.scrolling>-1&&(clearInterval(this.scrolling),this.scrolling=-1)}scroll(){let{x:e,y:t}=this.scrollSpeed;e&&this.scrollParents.x&&(this.scrollParents.x.scrollLeft+=e,e=0),t&&this.scrollParents.y&&(this.scrollParents.y.scrollTop+=t,t=0),(e||t)&&this.view.win.scrollBy(e,t),this.dragging===!1&&this.select(this.lastEvent)}select(e){let{view:t}=this,n=Pa(this.atoms,this.style.get(e,this.extend,this.multiple));(this.mustSelect||!n.eq(t.state.selection,this.dragging===!1))&&this.view.dispatch({selection:n,userEvent:`select.pointer`}),this.mustSelect=!1}update(e){e.transactions.some(e=>e.isUserEvent(`input.type`))?this.destroy():this.style.update(e)&&setTimeout(()=>this.select(this.lastEvent),20)}};function uo(e,t){let n=e.state.facet(oi);return n.length?n[0](t):P.mac?t.metaKey:t.ctrlKey}function fo(e,t){let n=e.state.facet(si);return n.length?n[0](t):P.mac?!t.altKey:!t.ctrlKey}function po(e,t){let{main:n}=e.state.selection;if(n.empty)return!1;let r=dr(e.root);if(!r||r.rangeCount==0)return!0;let i=r.getRangeAt(0).getClientRects();for(let e=0;e<i.length;e++){let n=i[e];if(n.left<=t.clientX&&n.right>=t.clientX&&n.top<=t.clientY&&n.bottom>=t.clientY)return!0}return!1}function mo(e,t){if(!t.bubbles)return!0;if(t.defaultPrevented)return!1;for(let n=t.target,r;n!=e.contentDOM;n=n.parentNode)if(!n||n.nodeType==11||(r=z.get(n))&&r.isWidget()&&!r.isHidden&&r.widget.ignoreEvent(t))return!1;return!0}var ho=Object.create(null),go=Object.create(null),_o=P.ie&&P.ie_version<15||P.ios&&P.webkit_version<604;function vo(e){let t=e.dom.parentNode;if(!t)return;let n=t.appendChild(document.createElement(`textarea`));n.style.cssText=`position: fixed; left: -10000px; top: 10px`,n.focus(),setTimeout(()=>{e.focus(),n.remove(),bo(e,n.value)},50)}function yo(e,t,n){for(let r of e.facet(t))n=r(n,e);return n}function bo(e,t){t=yo(e.state,pi,t);let{state:n}=e,r,i=1,a=n.toText(t),o=a.lines==n.selection.ranges.length;if(Mo!=null&&n.selection.ranges.every(e=>e.empty)&&Mo==a.toString()){let e=-1;r=n.changeByRange(r=>{let s=n.doc.lineAt(r.from);if(s.from==e)return{range:r};e=s.from;let c=n.toText((o?a.line(i++).text:t)+n.lineBreak);return{changes:{from:s.from,insert:c},range:k.cursor(r.from+c.length,-1)}})}else r=o?n.changeByRange(e=>{let t=a.line(i++);return{changes:{from:e.from,to:e.to,insert:t.text},range:k.cursor(e.from+t.length,-1)}}):n.replaceSelection(a);e.dispatch(r,{userEvent:`input.paste`,scrollIntoView:!0})}go.scroll=e=>{let t=e.inputState;t.lastScrollTop=e.scrollDOM.scrollTop,t.lastScrollLeft=e.scrollDOM.scrollLeft,P.ios&&!t.touchActive&&(t.lastIOSMomentumScroll=Date.now())},go.wheel=go.mousewheel=e=>{e.inputState.lastWheelEvent=Date.now()},ho.keydown=(e,t)=>(e.inputState.setSelectionOrigin(`select`),t.keyCode==27&&e.inputState.tabFocusMode!=0&&(e.inputState.tabFocusMode=Date.now()+2e3),!1),go.touchstart=(e,t)=>{let n=e.inputState,r=t.targetTouches[0];n.touchActive=!0,n.lastTouchTime=Date.now(),r&&(n.lastTouchX=r.clientX,n.lastTouchY=r.clientY),n.setSelectionOrigin(`select.pointer`)},go.touchmove=e=>{e.inputState.setSelectionOrigin(`select.pointer`)},go.touchend=(e,t)=>{e.inputState.touchActive=!1},ho.mousedown=(e,t)=>{if(e.observer.flush(),e.inputState.lastTouchTime>Date.now()-2e3)return!1;let n=null;for(let r of e.state.facet(ci))if(n=r(e,t),n)break;if(!n&&t.button==0&&(n=Do(e,t)),n){let r=!e.hasFocus;e.inputState.startMouseSelection(new lo(e,t,n,r)),r&&e.observer.ignore(()=>{kr(e.contentDOM);let t=e.root.activeElement;t&&!t.contains(e.contentDOM)&&t.blur()});let i=e.inputState.mouseSelection;if(i)return i.start(t),i.dragging===!1}else e.inputState.setSelectionOrigin(`select.pointer`);return!1};function xo(e,t,n,r){if(r==1)return k.cursor(t,n);if(r==2)return Ea(e.state,t,n);{let r=e.docView.lineAt(t,n),i=e.state.doc.lineAt(r?r.posAtEnd:t),a=r?r.posAtStart:i.from,o=r?r.posAtEnd:i.to;return o<e.state.doc.length&&o==i.to&&o++,k.undirectionalRange(a,o)}}var So=P.ie&&P.ie_version<=11,Co=null,wo=0,To=0;function Eo(e){if(!So)return e.detail;let t=Co,n=To;return Co=e,To=Date.now(),wo=!t||n>Date.now()-400&&Math.abs(t.clientX-e.clientX)<2&&Math.abs(t.clientY-e.clientY)<2?(wo+1)%3:1}function Do(e,t){let n=e.posAndSideAtCoords({x:t.clientX,y:t.clientY},!1),r=Eo(t),i=e.state.selection;return{update(e){e.docChanged&&(n.pos=e.changes.mapPos(n.pos),i=i.map(e.changes))},get(t,a,o){let s=e.posAndSideAtCoords({x:t.clientX,y:t.clientY},!1),c,l=xo(e,s.pos,s.assoc,r);if(n.pos!=s.pos&&!a){let t=xo(e,n.pos,n.assoc,r),i=Math.min(t.from,l.from),a=Math.max(t.to,l.to);l=i<l.from?k.range(i,a,l.assoc):k.range(a,i,l.assoc)}return a?i.replaceRange(i.main.extend(l.from,l.to,l.assoc)):o&&r==1&&i.ranges.length>1&&(c=Oo(i,s.pos))?c:o?i.addRange(l):k.create([l])}}}function Oo(e,t){for(let n=0;n<e.ranges.length;n++){let{from:r,to:i}=e.ranges[n];if(r<=t&&i>=t)return k.create(e.ranges.slice(0,n).concat(e.ranges.slice(n+1)),e.mainIndex==n?0:e.mainIndex-+(e.mainIndex>n))}return null}ho.dragstart=(e,t)=>{let{selection:{main:n}}=e.state;if(t.target.draggable){let r=e.docView.tile.nearest(t.target);if(r&&r.isWidget()){let e=r.posAtStart,t=e+r.length;(e>=n.to||t<=n.from)&&(n=k.undirectionalRange(e,t))}}let{inputState:r}=e;return r.mouseSelection&&(r.mouseSelection.dragging=!0),r.draggedContent=n,t.dataTransfer&&(t.dataTransfer.setData(`Text`,yo(e.state,mi,e.state.sliceDoc(n.from,n.to))),t.dataTransfer.effectAllowed=`copyMove`),!1},ho.dragend=e=>(e.inputState.draggedContent=null,!1);function ko(e,t,n,r){if(n=yo(e.state,pi,n),!n)return;let i=e.posAtCoords({x:t.clientX,y:t.clientY},!1),{draggedContent:a}=e.inputState,o=r&&a&&fo(e,t)?{from:a.from,to:a.to}:null,s={from:i,insert:n},c=e.state.changes(o?[o,s]:s);e.focus(),e.dispatch({changes:c,selection:{anchor:c.mapPos(i,-1),head:c.mapPos(i,1)},userEvent:o?`move.drop`:`input.drop`}),e.inputState.draggedContent=null}ho.drop=(e,t)=>{if(!t.dataTransfer)return!1;if(e.state.readOnly)return!0;let n=t.dataTransfer.files;if(n&&n.length){let r=Array(n.length),i=0,a=()=>{++i==n.length&&ko(e,t,r.filter(e=>e!=null).join(e.state.lineBreak),!1)};for(let e=0;e<n.length;e++){let t=new FileReader;t.onerror=a,t.onload=()=>{/[\x00-\x08\x0e-\x1f]{2}/.test(t.result)||(r[e]=t.result),a()},t.readAsText(n[e])}return!0}{let n=t.dataTransfer.getData(`Text`);if(n)return ko(e,t,n,!0),!0}return!1},ho.paste=(e,t)=>{if(e.state.readOnly)return!0;e.observer.flush();let n=_o?null:t.clipboardData;return n?(bo(e,n.getData(`text/plain`)||n.getData(`text/uri-list`)),!0):(vo(e),!1)};function Ao(e,t){let n=e.dom.parentNode;if(!n)return;let r=n.appendChild(document.createElement(`textarea`));r.style.cssText=`position: fixed; left: -10000px; top: 10px`,r.value=t,r.focus(),r.selectionEnd=t.length,r.selectionStart=0,setTimeout(()=>{r.remove(),e.focus()},50)}function jo(e){let t=[],n=[],r=!1;for(let r of e.selection.ranges)r.empty||(t.push(e.sliceDoc(r.from,r.to)),n.push(r));if(!t.length){let i=-1;for(let{from:r}of e.selection.ranges){let a=e.doc.lineAt(r);a.number>i&&(t.push(a.text),n.push({from:a.from,to:Math.min(e.doc.length,a.to+1)})),i=a.number}r=!0}return{text:yo(e,mi,t.join(e.lineBreak)),ranges:n,linewise:r}}var Mo=null;ho.copy=ho.cut=(e,t)=>{if(!pr(e.contentDOM,e.observer.selectionRange))return!1;let{text:n,ranges:r,linewise:i}=jo(e.state);if(!n&&!i)return!1;Mo=i?n:null,t.type==`cut`&&!e.state.readOnly&&e.dispatch({changes:r,scrollIntoView:!0,userEvent:`delete.cut`});let a=_o?null:t.clipboardData;return a?(a.clearData(),a.setData(`text/plain`,n),!0):(Ao(e,n),!1)};var No=zt.define();function Po(e,t){let n=[];for(let r of e.facet(fi)){let i=r(e,t);i&&n.push(i)}return n.length?e.update({effects:n,annotations:No.of(!0)}):null}function Fo(e){setTimeout(()=>{let t=e.hasFocus;if(t!=e.inputState.notifiedFocused){let n=Po(e.state,t);n?e.dispatch(n):e.update([])}},10)}go.focus=e=>{e.inputState.lastFocusTime=Date.now(),!e.scrollDOM.scrollTop&&(e.inputState.lastScrollTop||e.inputState.lastScrollLeft)&&(e.scrollDOM.scrollTop=e.inputState.lastScrollTop,e.scrollDOM.scrollLeft=e.inputState.lastScrollLeft),Fo(e)},go.blur=e=>{e.observer.clearSelectionRange(),Fo(e)},go.compositionstart=go.compositionupdate=e=>{if(!e.observer.editContext&&(e.inputState.compositionFirstChange??(e.inputState.compositionFirstChange=!0),e.inputState.composing<0)){let{main:t}=e.state.selection;!t.empty&&e.lineBlockAt(t.from).from!=e.lineBlockAt(t.to).from&&e.dispatch({changes:e.state.selection.ranges.filter(e=>!e.empty).map(e=>({from:e.from,to:e.to})),userEvent:`input`}),e.inputState.composing=0}},go.compositionend=e=>{e.observer.editContext||(e.inputState.composing=-1,e.inputState.compositionEndedAt=Date.now(),e.inputState.compositionPendingKey=!0,e.inputState.compositionPendingChange=e.observer.pendingRecords().length>0,e.inputState.compositionFirstChange=null,P.chrome&&P.android?e.observer.flushSoon():e.inputState.compositionPendingChange?Promise.resolve().then(()=>e.observer.flush()):setTimeout(()=>{e.inputState.composing<0&&e.docView.hasComposition&&e.update([])},50))},go.contextmenu=e=>{e.inputState.lastContextMenu=Date.now()},ho.beforeinput=(e,t)=>{if((t.inputType==`insertText`||t.inputType==`insertCompositionText`)&&(e.inputState.insertingText=t.data,e.inputState.insertingTextAt=Date.now()),t.inputType==`insertReplacementText`&&e.observer.editContext){let n=t.dataTransfer?.getData(`text/plain`),r=t.getTargetRanges();if(n&&r.length){let t=r[0];return qa(e,{from:e.posAtDOM(t.startContainer,t.startOffset),to:e.posAtDOM(t.endContainer,t.endOffset),insert:e.state.toText(n)},null),!0}}let n;if(P.chrome&&P.android&&(n=ro.find(e=>e.inputType==t.inputType))&&(e.observer.delayAndroidKey(n.key,n.keyCode),n.key==`Backspace`||n.key==`Delete`)){let t=window.visualViewport?.height||0;setTimeout(()=>{(window.visualViewport?.height||0)>t+10&&e.hasFocus&&(e.contentDOM.blur(),e.focus())},100)}return P.ios&&t.inputType==`deleteContentForward`&&e.observer.flushSoon(),P.safari&&t.inputType==`insertText`&&e.inputState.composing>=0&&setTimeout(()=>go.compositionend(e,t),20),!1};var Io=new Set;function Lo(e){Io.has(e)||(Io.add(e),e.addEventListener(`copy`,()=>{}),e.addEventListener(`cut`,()=>{}))}var Ro=[`pre-wrap`,`normal`,`pre-line`,`break-spaces`],zo=!1;function Bo(){zo=!1}var Vo=class{constructor(e){this.lineWrapping=e,this.doc=D.empty,this.heightSamples={},this.lineHeight=14,this.charWidth=7,this.textHeight=14,this.lineLength=30}heightForGap(e,t){let n=this.doc.lineAt(t).number-this.doc.lineAt(e).number+1;return this.lineWrapping&&(n+=Math.max(0,Math.ceil((t-e-n*this.lineLength*.5)/this.lineLength))),this.lineHeight*n}heightForLine(e){return this.lineWrapping?(1+Math.max(0,Math.ceil((e-this.lineLength)/Math.max(1,this.lineLength-5))))*this.lineHeight:this.lineHeight}setDoc(e){return this.doc=e,this}mustRefreshForWrapping(e){return Ro.indexOf(e)>-1!=this.lineWrapping}mustRefreshForHeights(e){let t=!1;for(let n=0;n<e.length;n++){let r=e[n];r<0?n++:this.heightSamples[Math.floor(r*10)]||(t=!0,this.heightSamples[Math.floor(r*10)]=!0)}return t}refresh(e,t,n,r,i,a){let o=Ro.indexOf(e)>-1,s=Math.abs(t-this.lineHeight)>.3||this.lineWrapping!=o;if(this.lineWrapping=o,this.lineHeight=t,this.charWidth=n,this.textHeight=r,this.lineLength=i,s){this.heightSamples={};for(let e=0;e<a.length;e++){let t=a[e];t<0?e++:this.heightSamples[Math.floor(t*10)]=!0}}return s}},Ho=class{constructor(e,t){this.from=e,this.heights=t,this.index=0}get more(){return this.index<this.heights.length}},Uo=class e{constructor(e,t,n,r,i){this.from=e,this.length=t,this.top=n,this.height=r,this._content=i}get type(){return typeof this._content==`number`?F.Text:Array.isArray(this._content)?this._content:this._content.type}get to(){return this.from+this.length}get bottom(){return this.top+this.height}get widget(){return this._content instanceof or?this._content.widget:null}get widgetLineBreaks(){return typeof this._content==`number`?this._content:0}join(t){let n=(Array.isArray(this._content)?this._content:[this]).concat(Array.isArray(t._content)?t._content:[t]);return new e(this.from,this.length+t.length,this.top,this.height+t.height,n)}},B=(function(e){return e[e.ByPos=0]=`ByPos`,e[e.ByHeight=1]=`ByHeight`,e[e.ByPosNoHeight=2]=`ByPosNoHeight`,e})(B||={}),Wo=.001,Go=class e{constructor(e,t,n=2){this.length=e,this.height=t,this.flags=n}get outdated(){return(this.flags&2)>0}set outdated(e){this.flags=(e?2:0)|this.flags&-3}setHeight(e){this.height!=e&&(Math.abs(this.height-e)>Wo&&(zo=!0),this.height=e)}replace(t,n,r){return e.of(r)}decomposeLeft(e,t){t.push(this)}decomposeRight(e,t){t.push(this)}applyChanges(e,t,n,r){let i=this,a=n.doc;for(let o=r.length-1;o>=0;o--){let{fromA:s,toA:c,fromB:l,toB:u}=r[o],d=i.lineAt(s,B.ByPosNoHeight,n.setDoc(t),0,0),f=d.to>=c?d:i.lineAt(c,B.ByPosNoHeight,n,0,0);for(u+=f.to-c,c=f.to;o>0&&d.from<=r[o-1].toA;)s=r[o-1].fromA,l=r[o-1].fromB,o--,s<d.from&&(d=i.lineAt(s,B.ByPosNoHeight,n,0,0));l+=d.from-s,s=d.from;let p=es.build(n.setDoc(a),e,l,u);i=Ko(i,i.replace(s,c,p))}return i.updateHeight(n,0)}static empty(){return new Yo(0,0,0)}static of(t){if(t.length==1)return t[0];let n=0,r=t.length,i=0,a=0;for(;;)if(n==r){if(i>a*2){let e=t[n-1];e.break?t.splice(--n,1,e.left,null,e.right):t.splice(--n,1,e.left,e.right),r+=1+e.break,i-=e.size}else if(a>i*2){let e=t[r];e.break?t.splice(r,1,e.left,null,e.right):t.splice(r,1,e.left,e.right),r+=2+e.break,a-=e.size}else break}else if(i<a){let e=t[n++];e&&(i+=e.size)}else{let e=t[--r];e&&(a+=e.size)}let o=!1;return t[n-1]==null?(o=!0,n--):t[n]??(o=!0,r++),new Zo(e.of(t.slice(0,n)),o,e.of(t.slice(r)))}};function Ko(e,t){return e==t?e:(e.constructor!=t.constructor&&(zo=!0),t)}Go.prototype.size=1;var qo=I.replace({}),Jo=class extends Go{constructor(e,t,n){super(e,t),this.deco=n,this.spaceAbove=0}mainBlock(e,t){return new Uo(t,this.length,e+this.spaceAbove,this.height-this.spaceAbove,this.deco||0)}blockAt(e,t,n,r){return this.spaceAbove&&e<n+this.spaceAbove?new Uo(r,0,n,this.spaceAbove,qo):this.mainBlock(n,r)}lineAt(e,t,n,r,i){let a=this.mainBlock(r,i);return this.spaceAbove?this.blockAt(0,n,r,i).join(a):a}forEachLine(e,t,n,r,i,a){e<=i+this.length&&t>=i&&a(this.lineAt(0,B.ByPos,n,r,i))}setMeasuredHeight(e){let t=e.heights[e.index++];t<0?(this.spaceAbove=-t,t=e.heights[e.index++]):this.spaceAbove=0,this.setHeight(t)}updateHeight(e,t=0,n=!1,r){return r&&r.from<=t&&r.more&&this.setMeasuredHeight(r),this.outdated=!1,this}toString(){return`block(${this.length})`}},Yo=class e extends Jo{constructor(e,t,n){super(e,t,null),this.collapsed=0,this.widgetHeight=0,this.breaks=0,this.spaceAbove=n}mainBlock(e,t){return new Uo(t,this.length,e+this.spaceAbove,this.height-this.spaceAbove,this.breaks)}replace(t,n,r){let i=r[0];return r.length==1&&(i instanceof e||i instanceof Xo&&i.flags&4)&&Math.abs(this.length-i.length)<10?(i instanceof Xo?i=new e(i.length,this.height,this.spaceAbove):i.height=this.height,this.outdated||(i.outdated=!1),i):Go.of(r)}updateHeight(e,t=0,n=!1,r){return r&&r.from<=t&&r.more?this.setMeasuredHeight(r):(n||this.outdated)&&(this.spaceAbove=0,this.setHeight(Math.max(this.widgetHeight,e.heightForLine(this.length-this.collapsed))+this.breaks*e.lineHeight)),this.outdated=!1,this}toString(){return`line(${this.length}${this.collapsed?-this.collapsed:``}${this.widgetHeight?`:`+this.widgetHeight:``})`}},Xo=class e extends Go{constructor(e){super(e,0)}heightMetrics(e,t){let n=e.doc.lineAt(t).number,r=e.doc.lineAt(t+this.length).number,i=r-n+1,a,o=0;if(e.lineWrapping){let t=Math.min(this.height,e.lineHeight*i);a=t/i,this.length>i+1&&(o=(this.height-t)/(this.length-i-1))}else a=this.height/i;return{firstLine:n,lastLine:r,perLine:a,perChar:o}}blockAt(e,t,n,r){let{firstLine:i,lastLine:a,perLine:o,perChar:s}=this.heightMetrics(t,r);if(t.lineWrapping){let i=r+(e<t.lineHeight?0:Math.round(Math.max(0,Math.min(1,(e-n)/this.height))*this.length)),a=t.doc.lineAt(i),c=o+a.length*s,l=Math.max(n,e-c/2);return new Uo(a.from,a.length,l,c,0)}{let r=Math.max(0,Math.min(a-i,Math.floor((e-n)/o))),{from:s,length:c}=t.doc.line(i+r);return new Uo(s,c,n+o*r,o,0)}}lineAt(e,t,n,r,i){if(t==B.ByHeight)return this.blockAt(e,n,r,i);if(t==B.ByPosNoHeight){let{from:t,to:r}=n.doc.lineAt(e);return new Uo(t,r-t,0,0,0)}let{firstLine:a,perLine:o,perChar:s}=this.heightMetrics(n,i),c=n.doc.lineAt(e),l=o+c.length*s,u=c.number-a,d=r+o*u+s*(c.from-i-u);return new Uo(c.from,c.length,Math.max(r,Math.min(d,r+this.height-l)),l,0)}forEachLine(e,t,n,r,i,a){e=Math.max(e,i),t=Math.min(t,i+this.length);let{firstLine:o,perLine:s,perChar:c}=this.heightMetrics(n,i);for(let l=e,u=r;l<=t;){let t=n.doc.lineAt(l);if(l==e){let n=t.number-o;u+=s*n+c*(e-i-n)}let r=s+c*t.length;a(new Uo(t.from,t.length,u,r,0)),u+=r,l=t.to+1}}replace(t,n,r){let i=this.length-n;if(i>0){let t=r[r.length-1];t instanceof e?r[r.length-1]=new e(t.length+i):r.push(null,new e(i-1))}if(t>0){let n=r[0];n instanceof e?r[0]=new e(t+n.length):r.unshift(new e(t-1),null)}return Go.of(r)}decomposeLeft(t,n){n.push(new e(t-1),null)}decomposeRight(t,n){n.push(null,new e(this.length-t-1))}updateHeight(t,n=0,r=!1,i){let a=n+this.length;if(i&&i.from<=n+this.length&&i.more){let r=[],o=Math.max(n,i.from),s=-1;for(i.from>n&&r.push(new e(i.from-n-1).updateHeight(t,n));o<=a&&i.more;){let e=t.doc.lineAt(o).length;r.length&&r.push(null);let n=i.heights[i.index++],a=0;n<0&&(a=-n,n=i.heights[i.index++]),s==-1?s=n:Math.abs(n-s)>=Wo&&(s=-2);let c=new Yo(e,n,a);c.outdated=!1,r.push(c),o+=e+1}o<=a&&r.push(null,new e(a-o).updateHeight(t,o));let c=Go.of(r);return(s<0||Math.abs(c.height-this.height)>=Wo||Math.abs(s-this.heightMetrics(t,n).perLine)>=Wo)&&(zo=!0),Ko(this,c)}return(r||this.outdated)&&(this.setHeight(t.heightForGap(n,n+this.length)),this.outdated=!1),this}toString(){return`gap(${this.length})`}},Zo=class extends Go{constructor(e,t,n){super(e.length+ +!!t+n.length,e.height+n.height,+!!t|(e.outdated||n.outdated?2:0)),this.left=e,this.right=n,this.size=e.size+n.size}get break(){return this.flags&1}blockAt(e,t,n,r){let i=n+this.left.height;return e<i?this.left.blockAt(e,t,n,r):this.right.blockAt(e,t,i,r+this.left.length+this.break)}lineAt(e,t,n,r,i){let a=r+this.left.height,o=i+this.left.length+this.break,s=t==B.ByHeight?e<a:e<o,c=s?this.left.lineAt(e,t,n,r,i):this.right.lineAt(e,t,n,a,o);if(this.break||(s?c.to<o:c.from>o))return c;let l=t==B.ByPosNoHeight?B.ByPosNoHeight:B.ByPos;return s?c.join(this.right.lineAt(o,l,n,a,o)):this.left.lineAt(o,l,n,r,i).join(c)}forEachLine(e,t,n,r,i,a){let o=r+this.left.height,s=i+this.left.length+this.break;if(this.break)e<s&&this.left.forEachLine(e,t,n,r,i,a),t>=s&&this.right.forEachLine(e,t,n,o,s,a);else{let c=this.lineAt(s,B.ByPos,n,r,i);e<c.from&&this.left.forEachLine(e,Math.min(t,c.from-1),n,r,i,a),c.to>=e&&c.from<=t&&a(c),t>c.to&&this.right.forEachLine(Math.max(e,c.to+1),t,n,o,s,a)}}replace(e,t,n){let r=this.left.length+this.break;if(t<r)return this.balanced(this.left.replace(e,t,n),this.right);if(e>this.left.length)return this.balanced(this.left,this.right.replace(e-r,t-r,n));let i=[];e>0&&this.decomposeLeft(e,i);let a=i.length;for(let e of n)i.push(e);if(e>0&&Qo(i,a-1),t<this.length){let e=i.length;this.decomposeRight(t,i),Qo(i,e)}return Go.of(i)}decomposeLeft(e,t){let n=this.left.length;if(e<=n)return this.left.decomposeLeft(e,t);t.push(this.left),this.break&&(n++,e>=n&&t.push(null)),e>n&&this.right.decomposeLeft(e-n,t)}decomposeRight(e,t){let n=this.left.length,r=n+this.break;if(e>=r)return this.right.decomposeRight(e-r,t);e<n&&this.left.decomposeRight(e,t),this.break&&e<r&&t.push(null),t.push(this.right)}balanced(e,t){return e.size>2*t.size||t.size>2*e.size?Go.of(this.break?[e,null,t]:[e,t]):(this.left=Ko(this.left,e),this.right=Ko(this.right,t),this.setHeight(e.height+t.height),this.outdated=e.outdated||t.outdated,this.size=e.size+t.size,this.length=e.length+this.break+t.length,this)}updateHeight(e,t=0,n=!1,r){let{left:i,right:a}=this,o=t+i.length+this.break,s=null;return r&&r.from<=t+i.length&&r.more?s=i=i.updateHeight(e,t,n,r):i.updateHeight(e,t,n),r&&r.from<=o+a.length&&r.more?s=a=a.updateHeight(e,o,n,r):a.updateHeight(e,o,n),s?this.balanced(i,a):(this.height=this.left.height+this.right.height,this.outdated=!1,this)}toString(){return this.left+(this.break?` `:`-`)+this.right}};function Qo(e,t){let n,r;e[t]==null&&(n=e[t-1])instanceof Xo&&(r=e[t+1])instanceof Xo&&e.splice(t-1,3,new Xo(n.length+1+r.length))}var $o=5,es=class e{constructor(e,t){this.pos=e,this.oracle=t,this.nodes=[],this.lineStart=-1,this.lineEnd=-1,this.covering=null,this.writtenTo=e}get isCovered(){return this.covering&&this.nodes[this.nodes.length-1]==this.covering}span(e,t){if(this.lineStart>-1){let e=Math.min(t,this.lineEnd),n=this.nodes[this.nodes.length-1];n instanceof Yo?n.length+=e-this.pos:(e>this.pos||!this.isCovered)&&this.nodes.push(new Yo(e-this.pos,-1,0)),this.writtenTo=e,t>e&&(this.nodes.push(null),this.writtenTo++,this.lineStart=-1)}this.pos=t}point(e,t,n){if(e<t||n.heightRelevant){let r=n.widget?n.widget.estimatedHeight:0,i=n.widget?n.widget.lineBreaks:0;r<0&&(r=this.oracle.lineHeight);let a=t-e;n.block?this.addBlock(new Jo(a,r,n)):(a||i||r>=$o)&&this.addLineDeco(r,i,a)}else t>e&&this.span(e,t);this.lineEnd>-1&&this.lineEnd<this.pos&&(this.lineEnd=this.oracle.doc.lineAt(this.pos).to)}enterLine(){if(this.lineStart>-1)return;let{from:e,to:t}=this.oracle.doc.lineAt(this.pos);this.lineStart=e,this.lineEnd=t,this.writtenTo<e&&((this.writtenTo<e-1||this.nodes[this.nodes.length-1]==null)&&this.nodes.push(this.blankContent(this.writtenTo,e-1)),this.nodes.push(null)),this.pos>e&&this.nodes.push(new Yo(this.pos-e,-1,0)),this.writtenTo=this.pos}blankContent(e,t){let n=new Xo(t-e);return this.oracle.doc.lineAt(e).to==t&&(n.flags|=4),n}ensureLine(){this.enterLine();let e=this.nodes.length?this.nodes[this.nodes.length-1]:null;if(e instanceof Yo)return e;let t=new Yo(0,-1,0);return this.nodes.push(t),t}addBlock(e){this.enterLine();let t=e.deco;t&&t.startSide>0&&!this.isCovered&&this.ensureLine(),this.nodes.push(e),this.writtenTo=this.pos+=e.length,t&&t.endSide>0&&(this.covering=e)}addLineDeco(e,t,n){let r=this.ensureLine();r.length+=n,r.collapsed+=n,r.widgetHeight=Math.max(r.widgetHeight,e),r.breaks+=t,this.writtenTo=this.pos+=n}finish(e){let t=this.nodes.length==0?null:this.nodes[this.nodes.length-1];this.lineStart>-1&&!(t instanceof Yo)&&!this.isCovered?this.nodes.push(new Yo(0,-1,0)):(this.writtenTo<this.pos||t==null)&&this.nodes.push(this.blankContent(this.writtenTo,this.pos));let n=e;for(let e of this.nodes)e instanceof Yo&&e.updateHeight(this.oracle,n),n+=e?e.length:1;return this.nodes}static build(t,n,r,i){let a=new e(r,t);return N.spans(n,r,i,a,0),a.finish(r)}};function ts(e,t,n){let r=new ns;return N.compare(e,t,n,r,0),r.changes}var ns=class{constructor(){this.changes=[]}compareRange(){}comparePoint(e,t,n,r){(e<t||n&&n.heightRelevant||r&&r.heightRelevant)&&lr(e,t,this.changes,5)}};function rs(e,t){let n=e.getBoundingClientRect(),r=e.ownerDocument,i=r.defaultView||window,a=Math.max(0,n.left),o=Math.min(i.innerWidth,n.right),s=Math.max(0,n.top),c=Math.min(i.innerHeight,n.bottom);for(let t=e.parentNode;t&&t!=r.body;)if(t.nodeType==1){let n=t,r=window.getComputedStyle(n);if((n.scrollHeight>n.clientHeight||n.scrollWidth>n.clientWidth)&&r.overflow!=`visible`){let r=n.getBoundingClientRect();a=Math.max(a,r.left),o=Math.min(o,r.right),s=Math.max(s,r.top),c=Math.min(t==e.parentNode?i.innerHeight:c,r.bottom)}t=r.position==`absolute`||r.position==`fixed`?n.offsetParent:n.parentNode}else if(t.nodeType==11)t=t.host;else break;return{left:a-n.left,right:Math.max(a,o)-n.left,top:s-(n.top+t),bottom:Math.max(s,c)-(n.top+t)}}function is(e){let t=e.getBoundingClientRect(),n=e.ownerDocument.defaultView||window;return t.left<n.innerWidth&&t.right>0&&t.top<n.innerHeight&&t.bottom>0}function as(e,t){let n=e.getBoundingClientRect();return{left:0,right:n.right-n.left,top:t,bottom:n.bottom-(n.top+t)}}var os=class{constructor(e,t,n,r){this.from=e,this.to=t,this.size=n,this.displaySize=r}static same(e,t){if(e.length!=t.length)return!1;for(let n=0;n<e.length;n++){let r=e[n],i=t[n];if(r.from!=i.from||r.to!=i.to||r.size!=i.size)return!1}return!0}draw(e,t){return I.replace({widget:new ss(this.displaySize*(t?e.scaleY:e.scaleX),t)}).range(this.from,this.to)}},ss=class extends rr{constructor(e,t){super(),this.size=e,this.vertical=t}eq(e){return e.size==this.size&&e.vertical==this.vertical}toDOM(){let e=document.createElement(`div`);return this.vertical?e.style.height=this.size+`px`:(e.style.width=this.size+`px`,e.style.height=`2px`,e.style.display=`inline-block`),e}get estimatedHeight(){return this.vertical?this.size:-1}},cs=class{constructor(e,t){this.view=e,this.state=t,this.pixelViewport={left:0,right:window.innerWidth,top:0,bottom:0},this.inView=!0,this.paddingTop=0,this.paddingBottom=0,this.contentDOMWidth=0,this.contentDOMHeight=0,this.editorHeight=0,this.editorWidth=0,this.scaleX=1,this.scaleY=1,this.scrollOffset=0,this.scrolledToBottom=!1,this.scrollAnchorPos=0,this.scrollAnchorHeight=-1,this.scaler=ms,this.scrollTarget=null,this.printing=!1,this.mustMeasureContent=!0,this.defaultTextDirection=L.LTR,this.visibleRanges=[],this.mustEnforceCursorAssoc=!1;let n=t.facet(Oi).some(e=>typeof e!=`function`&&e.class==`cm-lineWrapping`);this.heightOracle=new Vo(n),this.stateDeco=hs(t),this.heightMap=Go.empty().applyChanges(this.stateDeco,D.empty,this.heightOracle.setDoc(t.doc),[new Ri(0,0,0,t.doc.length)]);for(let e=0;e<2&&(this.viewport=this.getViewport(0,null),this.updateForViewport());e++);this.updateViewportLines(),this.lineGaps=this.ensureLineGaps([]),this.lineGapDeco=I.set(this.lineGaps.map(e=>e.draw(this,!1))),this.scrollParent=e.scrollDOM,this.computeVisibleRanges()}updateForViewport(){let e=[this.viewport],{main:t}=this.state.selection;for(let n=0;n<=1;n++){let r=n?t.head:t.anchor;if(!e.some(({from:e,to:t})=>r>=e&&r<=t)){let{from:t,to:n}=this.lineBlockAt(r);e.push(new ls(t,n))}}return this.viewports=e.sort((e,t)=>e.from-t.from),this.updateScaler()}updateScaler(){let e=this.scaler;return this.scaler=this.heightMap.height<=7e6?ms:new gs(this.heightOracle,this.heightMap,this.viewports),e.eq(this.scaler)?0:2}updateViewportLines(){this.viewportLines=[],this.heightMap.forEachLine(this.viewport.from,this.viewport.to,this.heightOracle.setDoc(this.state.doc),0,0,e=>{this.viewportLines.push(_s(e,this.scaler))})}update(e,t=null){this.state=e.state;let n=this.stateDeco;this.stateDeco=hs(this.state);let r=e.changedRanges,i=Ri.extendWithRanges(r,ts(n,this.stateDeco,e?e.changes:at.empty(this.state.doc.length))),a=this.heightMap.height,o=this.scrolledToBottom?null:this.scrollAnchorAt(this.scrollOffset);Bo(),this.heightMap=this.heightMap.applyChanges(this.stateDeco,e.startState.doc,this.heightOracle.setDoc(this.state.doc),i),(this.heightMap.height!=a||zo)&&(e.flags|=2),o?(this.scrollAnchorPos=e.changes.mapPos(o.from,-1),this.scrollAnchorHeight=o.top):(this.scrollAnchorPos=-1,this.scrollAnchorHeight=a);let s=i.length?this.mapViewport(this.viewport,e.changes):this.viewport;(t&&(t.range.head<s.from||t.range.head>s.to)||!this.viewportIsAppropriate(s))&&(s=this.getViewport(0,t));let c=s.from!=this.viewport.from||s.to!=this.viewport.to;this.viewport=s,e.flags|=this.updateForViewport(),(c||!e.changes.empty||e.flags&2)&&this.updateViewportLines(),(this.lineGaps.length||this.viewport.to-this.viewport.from>4e3)&&this.updateLineGaps(this.ensureLineGaps(this.mapLineGaps(this.lineGaps,e.changes))),e.flags|=this.computeVisibleRanges(e.changes),t&&(this.scrollTarget=t),!this.mustEnforceCursorAssoc&&(e.selectionSet||e.focusChanged)&&e.view.lineWrapping&&e.state.selection.main.empty&&e.state.selection.main.assoc&&!e.state.facet(gi)&&(this.mustEnforceCursorAssoc=!0)}measure(){let{view:e}=this,t=e.contentDOM,n=window.getComputedStyle(t),r=this.heightOracle,i=n.whiteSpace;this.defaultTextDirection=n.direction==`rtl`?L.RTL:L.LTR;let a=this.heightOracle.mustRefreshForWrapping(i)||this.mustMeasureContent===`refresh`,o=t.getBoundingClientRect(),s=a||this.mustMeasureContent||this.contentDOMHeight!=o.height;this.contentDOMHeight=o.height,this.mustMeasureContent=!1;let c=0,l=0;if(o.width&&o.height){let{scaleX:e,scaleY:n}=Sr(t,o);(e>.005&&Math.abs(this.scaleX-e)>.005||n>.005&&Math.abs(this.scaleY-n)>.005)&&(this.scaleX=e,this.scaleY=n,c|=16,a=s=!0)}let u=(parseInt(n.paddingTop)||0)*this.scaleY,d=(parseInt(n.paddingBottom)||0)*this.scaleY;(this.paddingTop!=u||this.paddingBottom!=d)&&(this.paddingTop=u,this.paddingBottom=d,c|=18),this.editorWidth!=e.scrollDOM.clientWidth&&(r.lineWrapping&&(s=!0),this.editorWidth=e.scrollDOM.clientWidth,c|=16);let f=wr(this.view.contentDOM,!1).y;f!=this.scrollParent&&(this.scrollParent=f,this.scrollAnchorHeight=-1,this.scrollOffset=0);let p=this.getScrollOffset();this.scrollOffset!=p&&(this.scrollAnchorHeight=-1,this.scrollOffset=p),this.scrolledToBottom=Fr(this.scrollParent||e.win);let m=(this.printing?as:rs)(t,this.paddingTop),h=m.top-this.pixelViewport.top,g=m.bottom-this.pixelViewport.bottom;this.pixelViewport=m;let _=this.pixelViewport.bottom>this.pixelViewport.top&&this.pixelViewport.right>this.pixelViewport.left;if(_!=this.inView&&(this.inView=_,_&&(s=!0)),!this.inView&&!this.scrollTarget&&!is(e.dom))return 0;let v=o.width;if((this.contentDOMWidth!=v||this.editorHeight!=e.scrollDOM.clientHeight)&&(this.contentDOMWidth=o.width,this.editorHeight=e.scrollDOM.clientHeight,c|=16),s){let t=e.docView.measureVisibleLineHeights(this.viewport);if(r.mustRefreshForHeights(t)&&(a=!0),a||r.lineWrapping&&Math.abs(v-this.contentDOMWidth)>r.charWidth){let{lineHeight:n,charWidth:o,textHeight:s}=e.docView.measureTextSize();a=n>0&&r.refresh(i,n,o,s,Math.max(5,v/o),t),a&&(e.docView.minWidth=0,c|=16)}h>0&&g>0?l=Math.max(h,g):h<0&&g<0&&(l=Math.min(h,g)),Bo();for(let n of this.viewports){let i=n.from==this.viewport.from?t:e.docView.measureVisibleLineHeights(n);this.heightMap=(a?Go.empty().applyChanges(this.stateDeco,D.empty,this.heightOracle,[new Ri(0,0,0,e.state.doc.length)]):this.heightMap).updateHeight(r,0,a,new Ho(n.from,i))}zo&&(c|=2)}let y=!this.viewportIsAppropriate(this.viewport,l)||this.scrollTarget&&(this.scrollTarget.range.head<this.viewport.from||this.scrollTarget.range.head>this.viewport.to);return y&&(c&2&&(c|=this.updateScaler()),this.viewport=this.getViewport(l,this.scrollTarget),c|=this.updateForViewport()),(c&2||y)&&this.updateViewportLines(),(this.lineGaps.length||this.viewport.to-this.viewport.from>4e3)&&this.updateLineGaps(this.ensureLineGaps(a?[]:this.lineGaps,e)),c|=this.computeVisibleRanges(),this.mustEnforceCursorAssoc&&(this.mustEnforceCursorAssoc=!1,e.docView.enforceCursorAssoc()),c}get visibleTop(){return this.scaler.fromDOM(this.pixelViewport.top)}get visibleBottom(){return this.scaler.fromDOM(this.pixelViewport.bottom)}getViewport(e,t){let n=.5-Math.max(-.5,Math.min(.5,e/1e3/2)),r=this.heightMap,i=this.heightOracle,{visibleTop:a,visibleBottom:o}=this,s=new ls(r.lineAt(a-n*1e3,B.ByHeight,i,0,0).from,r.lineAt(o+(1-n)*1e3,B.ByHeight,i,0,0).to);if(t){let{head:e}=t.range;if(e<s.from||e>s.to){let n=Math.min(this.editorHeight,this.pixelViewport.bottom-this.pixelViewport.top),a=r.lineAt(e,B.ByPos,i,0,0),o;o=t.y==`center`?(a.top+a.bottom)/2-n/2:t.y==`start`||t.y==`nearest`&&e<s.from?a.top:a.bottom-n,s=new ls(r.lineAt(o-500,B.ByHeight,i,0,0).from,r.lineAt(o+n+500,B.ByHeight,i,0,0).to)}}return s}mapViewport(e,t){let n=t.mapPos(e.from,-1),r=t.mapPos(e.to,1);return new ls(this.heightMap.lineAt(n,B.ByPos,this.heightOracle,0,0).from,this.heightMap.lineAt(r,B.ByPos,this.heightOracle,0,0).to)}viewportIsAppropriate({from:e,to:t},n=0){if(!this.inView)return!0;let{top:r}=this.heightMap.lineAt(e,B.ByPos,this.heightOracle,0,0),{bottom:i}=this.heightMap.lineAt(t,B.ByPos,this.heightOracle,0,0),{visibleTop:a,visibleBottom:o}=this;return(e==0||r<=a-Math.max(10,Math.min(-n,250)))&&(t==this.state.doc.length||i>=o+Math.max(10,Math.min(n,250)))&&r>a-2e3&&i<o+2e3}mapLineGaps(e,t){if(!e.length||t.empty)return e;let n=[];for(let r of e)t.touchesRange(r.from,r.to)||n.push(new os(t.mapPos(r.from),t.mapPos(r.to),r.size,r.displaySize));return n}ensureLineGaps(e,t){let n=this.heightOracle.lineWrapping,r=n?1e4:2e3,i=r>>1,a=r<<1;if(this.defaultTextDirection!=L.LTR&&!n)return[];let o=[],s=(r,a,c,l)=>{if(a-r<i)return;let u=this.state.selection.main,d=[u.from];u.empty||d.push(u.to);for(let e of d)if(e>r&&e<a){s(r,e-10,c,l),s(e+10,a,c,l);return}let f=ps(e,e=>e.from>=c.from&&e.to<=c.to&&Math.abs(e.from-r)<i&&Math.abs(e.to-a)<i&&!d.some(t=>e.from<t&&e.to>t));if(!f){if(a<c.to&&t&&n&&t.visibleRanges.some(e=>e.from<=a&&e.to>=a)){let e=t.moveToLineBoundary(k.cursor(a),!1,!0).head;e>r&&(a=e)}let e=this.gapSize(c,r,a,l);f=new os(r,a,e,n||e<2e6?e:2e6)}o.push(f)},c=t=>{if(t.length<a||t.type!=F.Text)return;let i=us(t.from,t.to,this.stateDeco);if(i.total<a)return;let o=this.scrollTarget?this.scrollTarget.range.head:null,c,l;if(n){let e=r/this.heightOracle.lineLength*this.heightOracle.lineHeight,n,a;if(o!=null){let r=fs(i,o),s=((this.visibleBottom-this.visibleTop)/2+e)/t.height;n=r-s,a=r+s}else n=(this.visibleTop-t.top-e)/t.height,a=(this.visibleBottom-t.top+e)/t.height;c=ds(i,n),l=ds(i,a)}else{let n=i.total*this.heightOracle.charWidth,a=r*this.heightOracle.charWidth,s=0;if(n>2e6)for(let n of e)n.from>=t.from&&n.from<t.to&&n.size!=n.displaySize&&n.from*this.heightOracle.charWidth+s<this.pixelViewport.left&&(s=n.size-n.displaySize);let u=this.pixelViewport.left+s,d=this.pixelViewport.right+s,f,p;if(o!=null){let e=fs(i,o),t=((d-u)/2+a)/n;f=e-t,p=e+t}else f=(u-a)/n,p=(d+a)/n;c=ds(i,f),l=ds(i,p)}c>t.from&&s(t.from,c,t,i),l<t.to&&s(l,t.to,t,i)};for(let e of this.viewportLines)Array.isArray(e.type)?e.type.forEach(c):c(e);return o}gapSize(e,t,n,r){let i=fs(r,n)-fs(r,t);return this.heightOracle.lineWrapping?e.height*i:r.total*this.heightOracle.charWidth*i}updateLineGaps(e){os.same(e,this.lineGaps)||(this.lineGaps=e,this.lineGapDeco=I.set(e.map(e=>e.draw(this,this.heightOracle.lineWrapping))))}computeVisibleRanges(e){let t=this.stateDeco;this.lineGaps.length&&(t=t.concat(this.lineGapDeco));let n=[];N.spans(t,this.viewport.from,this.viewport.to,{span(e,t){n.push({from:e,to:t})},point(){}},20);let r=0;if(n.length!=this.visibleRanges.length)r=12;else for(let t=0;t<n.length&&!(r&8);t++){let i=this.visibleRanges[t],a=n[t];(i.from!=a.from||i.to!=a.to)&&(r|=4,e&&e.mapPos(i.from,-1)==a.from&&e.mapPos(i.to,1)==a.to||(r|=8))}return this.visibleRanges=n,r}lineBlockAt(e){return e>=this.viewport.from&&e<=this.viewport.to&&this.viewportLines.find(t=>t.from<=e&&t.to>=e)||_s(this.heightMap.lineAt(e,B.ByPos,this.heightOracle,0,0),this.scaler)}lineBlockAtHeight(e){return e>=this.viewportLines[0].top&&e<=this.viewportLines[this.viewportLines.length-1].bottom&&this.viewportLines.find(t=>t.top<=e&&t.bottom>=e)||_s(this.heightMap.lineAt(this.scaler.fromDOM(e),B.ByHeight,this.heightOracle,0,0),this.scaler)}getScrollOffset(){return this.scrollParent==this.view.scrollDOM?this.scrollParent.scrollTop*this.scaleY:(this.scrollParent?this.scrollParent.getBoundingClientRect().top:0)-this.view.contentDOM.getBoundingClientRect().top}scrollAnchorAt(e){let t=this.lineBlockAtHeight(e+8);return t.from>=this.viewport.from||this.viewportLines[0].top-e>200?t:this.viewportLines[0]}elementAtHeight(e){return _s(this.heightMap.blockAt(this.scaler.fromDOM(e),this.heightOracle,0,0),this.scaler)}get docHeight(){return this.scaler.toDOM(this.heightMap.height)}get contentHeight(){return this.docHeight+this.paddingTop+this.paddingBottom}},ls=class{constructor(e,t){this.from=e,this.to=t}};function us(e,t,n){let r=[],i=e,a=0;return N.spans(n,e,t,{span(){},point(e,t){e>i&&(r.push({from:i,to:e}),a+=e-i),i=t}},20),i<t&&(r.push({from:i,to:t}),a+=t-i),{total:a,ranges:r}}function ds({total:e,ranges:t},n){if(n<=0)return t[0].from;if(n>=1)return t[t.length-1].to;let r=Math.floor(e*n);for(let e=0;;e++){let{from:n,to:i}=t[e],a=i-n;if(r<=a)return n+r;r-=a}}function fs(e,t){let n=0;for(let{from:r,to:i}of e.ranges){if(t<=i){n+=t-r;break}n+=i-r}return n/e.total}function ps(e,t){for(let n of e)if(t(n))return n}var ms={toDOM(e){return e},fromDOM(e){return e},scale:1,eq(e){return e==this}};function hs(e){let t=e.facet(ki).filter(e=>typeof e!=`function`),n=e.facet(ji).filter(e=>typeof e!=`function`);return n.length&&t.push(N.join(n)),t}var gs=class e{constructor(e,t,n){let r=0,i=0,a=0;this.viewports=n.map(({from:n,to:i})=>{let a=t.lineAt(n,B.ByPos,e,0,0).top,o=t.lineAt(i,B.ByPos,e,0,0).bottom;return r+=o-a,{from:n,to:i,top:a,bottom:o,domTop:0,domBottom:0}}),this.scale=(7e6-r)/(t.height-r);for(let e of this.viewports)e.domTop=a+(e.top-i)*this.scale,a=e.domBottom=e.domTop+(e.bottom-e.top),i=e.bottom}toDOM(e){for(let t=0,n=0,r=0;;t++){let i=t<this.viewports.length?this.viewports[t]:null;if(!i||e<i.top)return r+(e-n)*this.scale;if(e<=i.bottom)return i.domTop+(e-i.top);n=i.bottom,r=i.domBottom}}fromDOM(e){for(let t=0,n=0,r=0;;t++){let i=t<this.viewports.length?this.viewports[t]:null;if(!i||e<i.domTop)return n+(e-r)/this.scale;if(e<=i.domBottom)return i.top+(e-i.domTop);n=i.bottom,r=i.domBottom}}eq(t){return t instanceof e&&this.scale==t.scale&&this.viewports.length==t.viewports.length&&this.viewports.every((e,n)=>e.from==t.viewports[n].from&&e.to==t.viewports[n].to)}};function _s(e,t){if(t.scale==1)return e;let n=t.toDOM(e.top),r=t.toDOM(e.bottom);return new Uo(e.from,e.length,n,r-n,Array.isArray(e._content)?e._content.map(e=>_s(e,t)):e._content)}var vs=A.define({combine:e=>e.join(` `)}),ys=A.define({combine:e=>e.indexOf(!0)>-1}),bs=On.newName(),xs=On.newName(),Ss=On.newName(),Cs={"&light":`.`+xs,"&dark":`.`+Ss};function ws(e,t,n){return new On(t,{finish(t){return/&/.test(t)?t.replace(/&\w*/,t=>{if(t==`&`)return e;if(!n||!n[t])throw RangeError(`Unsupported selector: ${t}`);return n[t]}):e+` `+t}})}var Ts=ws(`.`+bs,{"&":{position:`relative !important`,boxSizing:`border-box`,"&.cm-focused":{outline:`1px dotted #212121`},display:`flex !important`,flexDirection:`column`},".cm-scroller":{display:`flex !important`,alignItems:`flex-start !important`,fontFamily:`monospace`,lineHeight:1.4,height:`100%`,overflowX:`auto`,position:`relative`,zIndex:0,overflowAnchor:`none`},".cm-content":{margin:0,flexGrow:2,flexShrink:0,display:`block`,whiteSpace:`pre`,wordWrap:`normal`,boxSizing:`border-box`,minHeight:`100%`,padding:`4px 0`,outline:`none`,"&[contenteditable=true]":{WebkitUserModify:`read-write-plaintext-only`}},".cm-lineWrapping":{whiteSpace_fallback:`pre-wrap`,whiteSpace:`break-spaces`,wordBreak:`break-word`,overflowWrap:`anywhere`,flexShrink:1},"&light .cm-content":{caretColor:`black`},"&dark .cm-content":{caretColor:`white`},".cm-line":{display:`block`,padding:`0 2px 0 6px`},".cm-layer":{userSelect:`none`,position:`absolute`,left:0,top:0,contain:`size style`,"& > *":{position:`absolute`}},"&light .cm-selectionBackground":{background:`#d9d9d9`},"&dark .cm-selectionBackground":{background:`#222`},"&light.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground":{background:`#d7d4f0`},"&dark.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground":{background:`#233`},".cm-cursorLayer":{pointerEvents:`none`},"&.cm-focused > .cm-scroller > .cm-cursorLayer":{animation:`steps(1) cm-blink 1.2s infinite`},"@keyframes cm-blink":{"0%":{},"50%":{opacity:0},"100%":{}},"@keyframes cm-blink2":{"0%":{},"50%":{opacity:0},"100%":{}},".cm-cursor, .cm-dropCursor":{borderLeft:`1.2px solid black`,marginLeft:`-0.6px`,pointerEvents:`none`},".cm-cursor":{display:`none`},"&dark .cm-cursor":{borderLeftColor:`#ddd`},".cm-selectionHandle":{backgroundColor:`currentColor`,width:`1.5px`},".cm-selectionHandle-start::before, .cm-selectionHandle-end::before":{content:`""`,backgroundColor:`inherit`,borderRadius:`50%`,width:`8px`,height:`8px`,position:`absolute`,left:`-3.25px`},".cm-selectionHandle-start::before":{top:`-8px`},".cm-selectionHandle-end::before":{bottom:`-8px`},".cm-dropCursor":{position:`absolute`},"&.cm-focused > .cm-scroller > .cm-cursorLayer .cm-cursor":{display:`block`},".cm-iso":{unicodeBidi:`isolate`},".cm-announced":{position:`fixed`,top:`-10000px`},"@media print":{".cm-announced":{display:`none`}},"&light .cm-activeLine":{backgroundColor:`#cceeff44`},"&dark .cm-activeLine":{backgroundColor:`#99eeff33`},"&light .cm-specialChar":{color:`red`},"&dark .cm-specialChar":{color:`#f78`},".cm-gutters":{flexShrink:0,display:`flex`,height:`100%`,boxSizing:`border-box`,zIndex:200},".cm-gutters-before":{insetInlineStart:0},".cm-gutters-after":{insetInlineEnd:0},"&light .cm-gutters":{backgroundColor:`#f5f5f5`,color:`#6c6c6c`,border:`0px solid #ddd`,"&.cm-gutters-before":{borderRightWidth:`1px`},"&.cm-gutters-after":{borderLeftWidth:`1px`}},"&dark .cm-gutters":{backgroundColor:`#333338`,color:`#ccc`},".cm-gutter":{display:`flex !important`,flexDirection:`column`,flexShrink:0,boxSizing:`border-box`,minHeight:`100%`,overflow:`hidden`},".cm-gutterElement":{boxSizing:`border-box`},".cm-lineNumbers .cm-gutterElement":{padding:`0 3px 0 5px`,minWidth:`20px`,textAlign:`right`,whiteSpace:`nowrap`},"&light .cm-activeLineGutter":{backgroundColor:`#e2f2ff`},"&dark .cm-activeLineGutter":{backgroundColor:`#222227`},".cm-panels":{boxSizing:`border-box`,position:`sticky`,left:0,right:0,zIndex:300},"&light .cm-panels":{backgroundColor:`#f5f5f5`,color:`black`},".cm-panels-top":{top:`0`},".cm-panels-bottom":{bottom:`0`},"&light .cm-panels-top":{borderBottom:`1px solid #ddd`},"&light .cm-panels-bottom":{borderTop:`1px solid #ddd`},"&dark .cm-panels":{backgroundColor:`#333338`,color:`white`},".cm-dialog":{padding:`2px 19px 4px 6px`,position:`relative`,"& label":{fontSize:`80%`}},".cm-dialog-close":{position:`absolute`,top:`3px`,right:`4px`,backgroundColor:`inherit`,border:`none`,font:`inherit`,fontSize:`14px`,padding:`0`},".cm-tab":{display:`inline-block`,overflow:`hidden`,verticalAlign:`bottom`},".cm-widgetBuffer":{verticalAlign:`text-top`,height:`1em`,width:0,display:`inline`},".cm-placeholder":{color:`#888`,display:`inline-block`,verticalAlign:`top`,userSelect:`none`},".cm-highlightSpace":{background:`radial-gradient(circle at 50% 55%, #aaa 20%, transparent 0) no-repeat`,backgroundSize:`.4em`,backgroundPosition:`calc(min(50%, 0px)) center`},".cm-highlightTab":{backgroundImage:`url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="20"><path stroke="%23888" stroke-width="1" fill="none" d="M1 10H196L190 5M190 15L196 10M197 4L197 16"/></svg>')`,backgroundSize:`auto 100%`,backgroundPosition:`right 90%`,backgroundRepeat:`no-repeat`},".cm-trailingSpace":{backgroundColor:`#ff332255`},".cm-button":{verticalAlign:`middle`,color:`inherit`,fontSize:`70%`,padding:`.2em 1em`,borderRadius:`1px`},"&light .cm-button":{backgroundImage:`linear-gradient(#eff1f5, #d9d9df)`,border:`1px solid #888`,"&:active":{backgroundImage:`linear-gradient(#b4b4b4, #d0d3d6)`}},"&dark .cm-button":{backgroundImage:`linear-gradient(#393939, #111)`,border:`1px solid #888`,"&:active":{backgroundImage:`linear-gradient(#111, #333)`}},".cm-textfield":{verticalAlign:`middle`,color:`inherit`,fontSize:`70%`,border:`1px solid silver`,padding:`.2em .5em`},"&light .cm-textfield":{backgroundColor:`white`},"&dark .cm-textfield":{border:`1px solid #555`,backgroundColor:`inherit`}},Cs),Es={childList:!0,characterData:!0,subtree:!0,attributes:!0,characterDataOldValue:!0},Ds=P.ie&&P.ie_version<=11,Os=class{constructor(e){this.view=e,this.active=!1,this.editContext=null,this.selectionRange=new Tr,this.selectionChanged=!1,this.delayedFlush=-1,this.resizeTimeout=-1,this.queue=[],this.delayedAndroidKey=null,this.flushingAndroidKey=-1,this.lastChange=0,this.scrollTargets=[],this.intersection=null,this.resizeScroll=null,this.intersecting=!1,this.gapIntersection=null,this.gaps=[],this.printQuery=null,this.parentCheck=-1,this.dom=e.contentDOM,this.observer=new MutationObserver(t=>{for(let e of t)this.queue.push(e);(P.ie&&P.ie_version<=11||P.ios&&e.composing)&&t.some(e=>e.type==`childList`&&e.removedNodes.length||e.type==`characterData`&&e.oldValue.length>e.target.nodeValue.length)?this.flushSoon():this.flush()}),window.EditContext&&P.android&&e.constructor.EDIT_CONTEXT!==!1&&!(P.chrome&&P.chrome_version<126)&&(this.editContext=new Ms(e),e.state.facet(Si)&&(e.contentDOM.editContext=this.editContext.editContext)),Ds&&(this.onCharData=e=>{this.queue.push({target:e.target,type:`characterData`,oldValue:e.prevValue}),this.flushSoon()}),this.onSelectionChange=this.onSelectionChange.bind(this),this.onResize=this.onResize.bind(this),this.onPrint=this.onPrint.bind(this),this.onScroll=this.onScroll.bind(this),window.matchMedia&&(this.printQuery=window.matchMedia(`print`)),typeof ResizeObserver==`function`&&(this.resizeScroll=new ResizeObserver(()=>{this.view.docView?.lastUpdate<Date.now()-75&&this.onResize()}),this.resizeScroll.observe(e.scrollDOM)),this.addWindowListeners(this.win=e.win),this.start(),typeof IntersectionObserver==`function`&&(this.intersection=new IntersectionObserver(e=>{this.parentCheck<0&&(this.parentCheck=setTimeout(this.listenForScroll.bind(this),1e3)),e.length>0&&e[e.length-1].intersectionRatio>0!=this.intersecting&&(this.intersecting=!this.intersecting,this.intersecting!=this.view.inView&&this.onScrollChanged(document.createEvent(`Event`)))},{threshold:[0,.001]}),this.intersection.observe(this.dom),this.gapIntersection=new IntersectionObserver(e=>{e.length>0&&e[e.length-1].intersectionRatio>0&&this.onScrollChanged(document.createEvent(`Event`))},{})),this.listenForScroll(),this.readSelectionRange()}onScrollChanged(e){this.view.inputState.runHandlers(`scroll`,e),this.intersecting&&this.view.measure()}onScroll(e){this.intersecting&&this.flush(!1),this.editContext&&this.view.requestMeasure(this.editContext.measureReq),this.onScrollChanged(e)}onResize(){this.resizeTimeout<0&&(this.resizeTimeout=setTimeout(()=>{this.resizeTimeout=-1,this.view.requestMeasure()},50))}onPrint(e){(e.type!=`change`&&e.type||e.matches)&&(this.view.viewState.printing=!0,this.view.measure(),setTimeout(()=>{this.view.viewState.printing=!1,this.view.requestMeasure()},500))}updateGaps(e){if(this.gapIntersection&&(e.length!=this.gaps.length||this.gaps.some((t,n)=>t!=e[n]))){this.gapIntersection.disconnect();for(let t of e)this.gapIntersection.observe(t);this.gaps=e}}onSelectionChange(e){let t=this.selectionChanged;if(!this.readSelectionRange()||this.delayedAndroidKey)return;let{view:n}=this,r=this.selectionRange;if(n.state.facet(Si)?n.root.activeElement!=this.dom:!pr(this.dom,r))return;let i=r.anchorNode&&n.docView.tile.nearest(r.anchorNode);if(i&&i.isWidget()&&i.widget.ignoreEvent(e)){t||(this.selectionChanged=!1);return}(P.ie&&P.ie_version<=11||P.android&&P.chrome)&&!n.state.selection.main.empty&&r.focusNode&&hr(r.focusNode,r.focusOffset,r.anchorNode,r.anchorOffset)?this.flushSoon():this.flush(!1)}readSelectionRange(){let{view:e}=this,t=dr(e.root);if(!t)return!1;let n=P.safari&&e.root.nodeType==11&&e.root.activeElement==this.dom&&js(this.view,t)||t;if(!n||this.selectionRange.eq(n))return!1;let r=pr(this.dom,n);return r&&!this.selectionChanged&&e.inputState.lastFocusTime>Date.now()-200&&e.inputState.lastTouchTime<Date.now()-300&&Pr(this.dom,n)?(this.view.inputState.lastFocusTime=0,e.docView.updateSelection(),!1):(this.selectionRange.setRange(n),r&&(this.selectionChanged=!0),!0)}setSelectionRange(e,t){this.selectionRange.set(e.node,e.offset,t.node,t.offset),this.selectionChanged=!1}clearSelectionRange(){this.selectionRange.set(null,0,null,0)}listenForScroll(){this.parentCheck=-1;let e=0,t=null;for(let n=this.dom;n;)if(n.nodeType==1)!t&&e<this.scrollTargets.length&&this.scrollTargets[e]==n?e++:t||=this.scrollTargets.slice(0,e),t&&t.push(n),n=n.assignedSlot||n.parentNode;else if(n.nodeType==11)n=n.host;else break;if(e<this.scrollTargets.length&&!t&&(t=this.scrollTargets.slice(0,e)),t){for(let e of this.scrollTargets)e.removeEventListener(`scroll`,this.onScroll);for(let e of this.scrollTargets=t)e.addEventListener(`scroll`,this.onScroll)}}ignore(e){if(!this.active)return e();try{return this.stop(),e()}finally{this.start(),this.clear()}}start(){this.active||=(this.observer.observe(this.dom,Es),Ds&&this.dom.addEventListener(`DOMCharacterDataModified`,this.onCharData),!0)}stop(){this.active&&(this.active=!1,this.observer.disconnect(),Ds&&this.dom.removeEventListener(`DOMCharacterDataModified`,this.onCharData))}clear(){this.processRecords(),this.queue.length=0,this.selectionChanged=!1}delayAndroidKey(e,t){if(!this.delayedAndroidKey){let e=()=>{let e=this.delayedAndroidKey;e&&(this.clearDelayedAndroidKey(),this.view.inputState.lastKeyCode=e.keyCode,this.view.inputState.lastKeyTime=Date.now(),!this.flush()&&e.force&&Mr(this.dom,e.key,e.keyCode))};this.flushingAndroidKey=this.view.win.requestAnimationFrame(e)}(!this.delayedAndroidKey||e==`Enter`)&&(this.delayedAndroidKey={key:e,keyCode:t,force:this.lastChange<Date.now()-50||!!this.delayedAndroidKey?.force})}clearDelayedAndroidKey(){this.win.cancelAnimationFrame(this.flushingAndroidKey),this.delayedAndroidKey=null,this.flushingAndroidKey=-1}flushSoon(){this.delayedFlush<0&&(this.delayedFlush=this.view.win.requestAnimationFrame(()=>{this.delayedFlush=-1,this.flush()}))}forceFlush(){this.delayedFlush>=0&&(this.view.win.cancelAnimationFrame(this.delayedFlush),this.delayedFlush=-1),this.flush()}pendingRecords(){for(let e of this.observer.takeRecords())this.queue.push(e);return this.queue}processRecords(){let e=this.pendingRecords();e.length&&(this.queue=[]);let t=-1,n=-1,r=!1;for(let i of e){let e=this.readMutation(i);e&&(e.typeOver&&(r=!0),t==-1?{from:t,to:n}=e:(t=Math.min(e.from,t),n=Math.max(e.to,n)))}return{from:t,to:n,typeOver:r}}readChange(){let{from:e,to:t,typeOver:n}=this.processRecords(),r=this.selectionChanged&&pr(this.dom,this.selectionRange);if(e<0&&!r)return null;e>-1&&(this.lastChange=Date.now()),this.view.inputState.lastFocusTime=0,this.selectionChanged=!1;let i=new Wa(this.view,e,t,n);return this.view.docView.domChanged={newSel:i.newSel?i.newSel.main:null},i}flush(e=!0){if(this.delayedFlush>=0||this.delayedAndroidKey)return!1;e&&this.readSelectionRange();let t=this.readChange();if(!t)return this.view.requestMeasure(),!1;let n=this.view.state,r=Ka(this.view,t);return this.view.state==n&&(t.domChanged||t.newSel&&!Qa(this.view.state.selection,t.newSel.main))&&this.view.update([]),r}readMutation(e){let t=this.view.docView.tile.nearest(e.target);if(!t||t.isWidget())return null;if(t.markDirty(e.type==`attributes`),e.type==`childList`){let n=ks(t,e.previousSibling||e.target.previousSibling,-1),r=ks(t,e.nextSibling||e.target.nextSibling,1);return{from:n?t.posAfter(n):t.posAtStart,to:r?t.posBefore(r):t.posAtEnd,typeOver:!1}}return e.type==`characterData`?{from:t.posAtStart,to:t.posAtEnd,typeOver:e.target.nodeValue==e.oldValue}:null}setWindow(e){e!=this.win&&(this.removeWindowListeners(this.win),this.win=e,this.addWindowListeners(this.win))}addWindowListeners(e){e.addEventListener(`resize`,this.onResize),this.printQuery?this.printQuery.addEventListener?this.printQuery.addEventListener(`change`,this.onPrint):this.printQuery.addListener(this.onPrint):e.addEventListener(`beforeprint`,this.onPrint),e.addEventListener(`scroll`,this.onScroll),e.document.addEventListener(`selectionchange`,this.onSelectionChange)}removeWindowListeners(e){e.removeEventListener(`scroll`,this.onScroll),e.removeEventListener(`resize`,this.onResize),this.printQuery?this.printQuery.removeEventListener?this.printQuery.removeEventListener(`change`,this.onPrint):this.printQuery.removeListener(this.onPrint):e.removeEventListener(`beforeprint`,this.onPrint),e.document.removeEventListener(`selectionchange`,this.onSelectionChange)}update(e){this.editContext&&(this.editContext.update(e),e.startState.facet(Si)!=e.state.facet(Si)&&(e.view.contentDOM.editContext=e.state.facet(Si)?this.editContext.editContext:null))}destroy(){var e,t,n;this.stop(),(e=this.intersection)==null||e.disconnect(),(t=this.gapIntersection)==null||t.disconnect(),(n=this.resizeScroll)==null||n.disconnect();for(let e of this.scrollTargets)e.removeEventListener(`scroll`,this.onScroll);this.removeWindowListeners(this.win),clearTimeout(this.parentCheck),clearTimeout(this.resizeTimeout),this.win.cancelAnimationFrame(this.delayedFlush),this.win.cancelAnimationFrame(this.flushingAndroidKey),this.editContext&&(this.view.contentDOM.editContext=null,this.editContext.destroy())}};function ks(e,t,n){for(;t;){let r=z.get(t);if(r&&r.parent==e)return r;let i=t.parentNode;t=i==e.dom?n>0?t.nextSibling:t.previousSibling:i}return null}function As(e,t){let n=t.startContainer,r=t.startOffset,i=t.endContainer,a=t.endOffset,o=e.docView.domAtPos(e.state.selection.main.anchor,1);return hr(o.node,o.offset,i,a)&&([n,r,i,a]=[i,a,n,r]),{anchorNode:n,anchorOffset:r,focusNode:i,focusOffset:a}}function js(e,t){if(t.getComposedRanges){let n=t.getComposedRanges(e.root)[0];if(n)return As(e,n)}let n=null;function r(e){e.preventDefault(),e.stopImmediatePropagation(),n=e.getTargetRanges()[0]}return e.contentDOM.addEventListener(`beforeinput`,r,!0),e.dom.ownerDocument.execCommand(`indent`),e.contentDOM.removeEventListener(`beforeinput`,r,!0),n?As(e,n):null}var Ms=class{constructor(e){this.from=0,this.to=0,this.pendingContextChange=null,this.handlers=Object.create(null),this.composing=null,this.resetRange(e.state);let t=this.editContext=new window.EditContext({text:e.state.doc.sliceString(this.from,this.to),selectionStart:this.toContextPos(Math.max(this.from,Math.min(this.to,e.state.selection.main.anchor))),selectionEnd:this.toContextPos(e.state.selection.main.head)});this.handlers.textupdate=n=>{let r=e.state.selection.main,{anchor:i,head:a}=r,o=this.toEditorPos(n.updateRangeStart),s=this.toEditorPos(n.updateRangeEnd);e.inputState.composing>=0&&!this.composing&&(this.composing={contextBase:n.updateRangeStart,editorBase:o,drifted:!1});let c=s-o>n.text.length;o==this.from&&i<this.from?o=i:s==this.to&&i>this.to&&(s=i);let l=Ya(e.state.sliceDoc(o,s),n.text,(c?r.from:r.to)-o,c?`end`:null);if(!l){let t=k.single(this.toEditorPos(n.selectionStart),this.toEditorPos(n.selectionEnd));Qa(t,r)||e.dispatch({selection:t,userEvent:`select`});return}let u={from:l.from+o,to:l.toA+o,insert:D.of(n.text.slice(l.from,l.toB).split(`
`))};if((P.mac||P.android)&&u.from==a-1&&/^\. ?$/.test(n.text)&&e.contentDOM.getAttribute(`autocorrect`)==`off`&&(u={from:o,to:s,insert:D.of([n.text.replace(`.`,` `)])}),this.pendingContextChange=u,!e.state.readOnly){let t=this.to-this.from+(u.to-u.from+u.insert.length);qa(e,u,k.single(this.toEditorPos(n.selectionStart,t),this.toEditorPos(n.selectionEnd,t)))}this.pendingContextChange&&(this.revertPending(e.state),this.setSelection(e.state)),u.from<u.to&&!u.insert.length&&e.inputState.composing>=0&&!/[\\p{Alphabetic}\\p{Number}_]/.test(t.text.slice(Math.max(0,n.updateRangeStart-1),Math.min(t.text.length,n.updateRangeStart+1)))&&this.handlers.compositionend(n)},this.handlers.characterboundsupdate=n=>{let r=[],i=null;for(let t=this.toEditorPos(n.rangeStart),a=this.toEditorPos(n.rangeEnd);t<a;t++){let n=e.coordsForChar(t);i=n&&new DOMRect(n.left,n.top,n.right-n.left,n.bottom-n.top)||i||new DOMRect,r.push(i)}t.updateCharacterBounds(n.rangeStart,r)},this.handlers.textformatupdate=t=>{let n=[];for(let e of t.getTextFormats()){let t=e.underlineStyle,r=e.underlineThickness;if(!/none/i.test(t)&&!/none/i.test(r)){let i=this.toEditorPos(e.rangeStart),a=this.toEditorPos(e.rangeEnd);if(i<a){let e=`text-decoration: underline ${/^[a-z]/.test(t)?t+` `:t==`Dashed`?`dashed `:t==`Squiggle`?`wavy `:``}${/thin/i.test(r)?1:2}px`;n.push(I.mark({attributes:{style:e}}).range(i,a))}}}e.dispatch({effects:bi.of(I.set(n))})},this.handlers.compositionstart=()=>{e.inputState.composing<0&&(e.inputState.composing=0,e.inputState.compositionFirstChange=!0)},this.handlers.compositionend=()=>{if(e.inputState.composing=-1,e.inputState.compositionFirstChange=null,this.composing){let{drifted:t}=this.composing;this.composing=null,t&&this.reset(e.state)}};for(let e in this.handlers)t.addEventListener(e,this.handlers[e]);this.measureReq={read:e=>{let t=dr(e.root);t&&t.rangeCount&&this.editContext.updateSelectionBounds(t.getRangeAt(0).getBoundingClientRect())}}}applyEdits(e){let t=0,n=!1,r=this.pendingContextChange;return e.changes.iterChanges((i,a,o,s,c)=>{if(n)return;let l=c.length-(a-i);if(r&&a>=r.to){if(r.from==i&&r.to==a&&r.insert.eq(c)){r=this.pendingContextChange=null,t+=l,this.to+=l;return}r=null,this.revertPending(e.state)}if(i+=t,a+=t,a<=this.from)this.from+=l,this.to+=l;else if(i<this.to){if(i<this.from||a>this.to||this.to-this.from+c.length>3e4){n=!0;return}this.editContext.updateText(this.toContextPos(i),this.toContextPos(a),c.toString()),this.to+=l}t+=l}),r&&!n&&this.revertPending(e.state),!n}update(e){let t=this.pendingContextChange,n=e.startState.selection.main;this.composing&&(this.composing.drifted||!e.changes.touchesRange(n.from,n.to)&&e.transactions.some(e=>!e.isUserEvent(`input.type`)&&e.changes.touchesRange(this.from,this.to)))?(this.composing.drifted=!0,this.composing.editorBase=e.changes.mapPos(this.composing.editorBase)):!this.applyEdits(e)||!this.rangeIsValid(e.state)?(this.pendingContextChange=null,this.reset(e.state)):(e.docChanged||e.selectionSet||t)&&this.setSelection(e.state),(e.geometryChanged||e.docChanged||e.selectionSet)&&e.view.requestMeasure(this.measureReq)}resetRange(e){let{head:t}=e.selection.main;this.from=Math.max(0,t-1e4),this.to=Math.min(e.doc.length,t+1e4)}reset(e){this.resetRange(e),this.editContext.updateText(0,this.editContext.text.length,e.doc.sliceString(this.from,this.to)),this.setSelection(e)}revertPending(e){let t=this.pendingContextChange;this.pendingContextChange=null,this.editContext.updateText(this.toContextPos(t.from),this.toContextPos(t.from+t.insert.length),e.doc.sliceString(t.from,t.to))}setSelection(e){let{main:t}=e.selection,n=this.toContextPos(Math.max(this.from,Math.min(this.to,t.anchor))),r=this.toContextPos(t.head);(this.editContext.selectionStart!=n||this.editContext.selectionEnd!=r)&&this.editContext.updateSelection(n,r)}rangeIsValid(e){let{head:t}=e.selection.main;return!(this.from>0&&t-this.from<500||this.to<e.doc.length&&this.to-t<500||this.to-this.from>3e4)}toEditorPos(e,t=this.to-this.from){e=Math.min(e,t);let n=this.composing;return n&&n.drifted?n.editorBase+(e-n.contextBase):e+this.from}toContextPos(e){let t=this.composing;return t&&t.drifted?t.contextBase+(e-t.editorBase):e-this.from}destroy(){for(let e in this.handlers)this.editContext.removeEventListener(e,this.handlers[e])}},V=class e{get state(){return this.viewState.state}get viewport(){return this.viewState.viewport}get visibleRanges(){return this.viewState.visibleRanges}get inView(){return this.viewState.inView}get composing(){return!!this.inputState&&this.inputState.composing>0}get compositionStarted(){return!!this.inputState&&this.inputState.composing>=0}get root(){return this._root}get win(){return this.dom.ownerDocument.defaultView||window}constructor(e={}){this.plugins=[],this.pluginMap=new Map,this.editorAttrs={},this.contentAttrs={},this.bidiCache=[],this.destroyed=!1,this.updateState=2,this.measureScheduled=-1,this.measureRequests=[],this.clearAnnouncement=-1,this.contentDOM=document.createElement(`div`),this.scrollDOM=document.createElement(`div`),this.scrollDOM.tabIndex=-1,this.scrollDOM.className=`cm-scroller`,this.scrollDOM.appendChild(this.contentDOM),this.announceDOM=document.createElement(`div`),this.announceDOM.className=`cm-announced`,this.announceDOM.setAttribute(`aria-live`,`polite`),this.dom=document.createElement(`div`),this.dom.appendChild(this.announceDOM),this.dom.appendChild(this.scrollDOM),e.parent&&e.parent.appendChild(this.dom);let{dispatch:t}=e;this.dispatchTransactions=e.dispatchTransactions||t&&(e=>e.forEach(e=>t(e,this)))||(e=>this.update(e)),this.dispatch=this.dispatch.bind(this),this._root=e.root||Nr(e.parent)||document,this.viewState=new cs(this,e.state||M.create(e)),e.scrollTo&&e.scrollTo.is(yi)&&(this.viewState.scrollTarget=e.scrollTo.value.clip(this.viewState.state)),this.plugins=this.state.facet(wi).map(e=>new Ei(e));for(let e of this.plugins)e.update(this);this.observer=new Os(this),this.inputState=new $a(this),this.inputState.ensureHandlers(this.plugins),this.docView=new pa(this),this.mountStyles(),this.updateAttrs(),this.updateState=0,this.requestMeasure(),document.fonts?.ready&&document.fonts.ready.then(()=>{this.viewState.mustMeasureContent=`refresh`,this.requestMeasure()})}dispatch(...e){let t=e.length==1&&e[0]instanceof Ht?e:e.length==1&&Array.isArray(e[0])?e[0]:[this.state.update(...e)];this.dispatchTransactions(t,this)}update(t){if(this.updateState!=0)throw Error(`Calls to EditorView.update are not allowed while an update is in progress`);let n=!1,r=!1,i,a=this.state;for(let e of t){if(e.startState!=a)throw RangeError(`Trying to update state with a transaction that doesn't start from the previous state.`);a=e.state}if(this.destroyed){this.viewState.state=a;return}let o=this.hasFocus,s=0,c=null;t.some(e=>e.annotation(No))?(this.inputState.notifiedFocused=o,s=1):o!=this.inputState.notifiedFocused&&(this.inputState.notifiedFocused=o,c=Po(a,o),c||(s=1));let l=this.observer.delayedAndroidKey,u=null;if(l?(this.observer.clearDelayedAndroidKey(),u=this.observer.readChange(),(u&&!this.state.doc.eq(a.doc)||!this.state.selection.eq(a.selection))&&(u=null)):this.observer.clear(),a.facet(M.phrases)!=this.state.facet(M.phrases))return this.setState(a);i=zi.create(this,a,t),i.flags|=s;let d=this.viewState.scrollTarget;try{this.updateState=2;for(let n of t){if(d&&=d.map(n.changes),n.scrollIntoView){let{main:t}=n.state.selection,{x:r,y:i}=this.state.facet(e.cursorScrollMargin);d=new vi(t.empty?t:k.cursor(t.head,t.head>t.anchor?-1:1),`nearest`,`nearest`,i,r)}for(let e of n.effects)e.is(yi)&&(d=e.value.clip(this.state))}this.viewState.update(i,d),this.bidiCache=Fs.update(this.bidiCache,i.changes),i.empty||(this.updatePlugins(i),this.inputState.update(i)),n=this.docView.update(i),this.state.facet(Li)!=this.styleModules&&this.mountStyles(),r=this.updateAttrs(),this.showAnnouncements(t),this.docView.updateSelection(n,t.some(e=>e.isUserEvent(`select.pointer`)))}finally{this.updateState=0}if(i.startState.facet(vs)!=i.state.facet(vs)&&(this.viewState.mustMeasureContent=!0),(n||r||d||this.viewState.mustEnforceCursorAssoc||this.viewState.mustMeasureContent)&&this.requestMeasure(),n&&this.docViewUpdate(),!i.empty)for(let e of this.state.facet(ui))try{e(i)}catch(e){xi(this.state,e,`update listener`)}(c||u)&&Promise.resolve().then(()=>{c&&this.state==c.startState&&this.dispatch(c),u&&!Ka(this,u)&&l.force&&Mr(this.contentDOM,l.key,l.keyCode)})}setState(e){if(this.updateState!=0)throw Error(`Calls to EditorView.setState are not allowed while an update is in progress`);if(this.destroyed){this.viewState.state=e;return}this.updateState=2;let t=this.hasFocus;try{for(let e of this.plugins)e.destroy(this);this.viewState=new cs(this,e),this.plugins=e.facet(wi).map(e=>new Ei(e)),this.pluginMap.clear();for(let e of this.plugins)e.update(this);this.docView.destroy(),this.docView=new pa(this),this.inputState.ensureHandlers(this.plugins),this.mountStyles(),this.updateAttrs(),this.bidiCache=[]}finally{this.updateState=0}t&&this.focus(),this.requestMeasure()}updatePlugins(e){let t=e.startState.facet(wi),n=e.state.facet(wi);if(t!=n){let r=[];for(let i of n){let n=t.indexOf(i);if(n<0)r.push(new Ei(i));else{let t=this.plugins[n];t.mustUpdate=e,r.push(t)}}for(let t of this.plugins)t.mustUpdate!=e&&t.destroy(this);this.plugins=r,this.pluginMap.clear()}else for(let t of this.plugins)t.mustUpdate=e;for(let e=0;e<this.plugins.length;e++)this.plugins[e].update(this);t!=n&&this.inputState.ensureHandlers(this.plugins)}docViewUpdate(){for(let e of this.plugins){let t=e.value;if(t&&t.docViewUpdate)try{t.docViewUpdate(this)}catch(e){xi(this.state,e,`doc view update listener`)}}}measure(e=!0){if(this.destroyed)return;if(this.measureScheduled>-1&&this.win.cancelAnimationFrame(this.measureScheduled),this.observer.delayedAndroidKey){this.measureScheduled=-1,this.requestMeasure();return}this.measureScheduled=0,e&&this.observer.forceFlush();let t=null,n=this.viewState.scrollParent,r=this.viewState.getScrollOffset(),{scrollAnchorPos:i,scrollAnchorHeight:a,scaleY:o}=this.viewState;Math.abs(r-this.viewState.scrollOffset)>1&&(a=-1),this.viewState.scrollAnchorHeight=-1;try{for(let e=0;;e++){if(a<0){if(Fr(n||this.win))i=-1,a=this.viewState.heightMap.height/this.viewState.scaleY;else{let e=this.viewState.scrollAnchorAt(r);i=e.from,a=e.top}o=this.viewState.scaleY}this.updateState=1;let s=this.viewState.measure();if(!s&&!this.measureRequests.length&&this.viewState.scrollTarget==null)break;if(e>5){console.warn(this.measureRequests.length?`Measure loop restarted more than 5 times`:`Viewport failed to stabilize`);break}let c=[];s&4||([this.measureRequests,c]=[c,this.measureRequests]);let l=c.map(e=>{try{return e.read(this)}catch(e){return xi(this.state,e),Ps}}),u=zi.create(this,this.state,[]),d=!1;u.flags|=s,t?t.flags|=s:t=u,this.updateState=2,u.empty||(this.updatePlugins(u),this.inputState.update(u),this.updateAttrs(),d=this.docView.update(u),d&&this.docViewUpdate());for(let e=0;e<c.length;e++)if(l[e]!=Ps)try{let t=c[e];t.write&&t.write(l[e],this)}catch(e){xi(this.state,e)}if(d&&this.docView.updateSelection(!0),!u.viewportChanged&&this.measureRequests.length==0){if(this.viewState.editorHeight){if(this.viewState.scrollTarget){this.docView.scrollIntoView(this.viewState.scrollTarget),this.viewState.scrollTarget=null,a=-1;continue}{let e=(i<0?this.viewState.heightMap.height:this.viewState.lineBlockAt(i).top)/this.viewState.scaleY-a/o;if((e>1||e<-1)&&!(P.ios&&this.inputState.lastIOSMomentumScroll>Date.now()-100)&&(n==this.scrollDOM||this.hasFocus||Math.max(this.inputState.lastWheelEvent,this.inputState.lastTouchTime)>Date.now()-100)){r+=e,n?i<0?n.scrollTop=n.scrollHeight:n.scrollTop+=e:this.win.scrollBy(0,e),a=-1;continue}}}break}}}finally{this.updateState=0,this.measureScheduled=-1}if(t&&!t.empty)for(let e of this.state.facet(ui))e(t)}get themeClasses(){return bs+` `+(this.state.facet(ys)?Ss:xs)+` `+this.state.facet(vs)}updateAttrs(){let e=Is(this,Di,{class:`cm-editor`+(this.hasFocus?` cm-focused `:` `)+this.themeClasses}),t={spellcheck:`false`,autocorrect:`off`,autocapitalize:`off`,writingsuggestions:`false`,translate:`no`,contenteditable:this.state.facet(Si)?`true`:`false`,class:`cm-content`,style:`${P.tabSize}: ${this.state.tabSize}`,role:`textbox`,"aria-multiline":`true`};this.state.readOnly&&(t[`aria-readonly`]=`true`),Is(this,Oi,t);let n=this.observer.ignore(()=>{let n=tr(this.contentDOM,this.contentAttrs,t),r=tr(this.dom,this.editorAttrs,e);return n||r});return this.editorAttrs=e,this.contentAttrs=t,n}showAnnouncements(t){let n=!0;for(let r of t)for(let t of r.effects)if(t.is(e.announce)){n&&=(this.announceDOM.textContent=``,this.win.clearTimeout(this.clearAnnouncement),this.clearAnnouncement=this.win.setTimeout(()=>{this.announceDOM.textContent=`\xA0`},200),!1);let e=this.announceDOM.appendChild(document.createElement(`div`));e.textContent=t.value}}mountStyles(){this.styleModules=this.state.facet(Li);let t=this.state.facet(e.cspNonce);On.mount(this.root,this.styleModules.concat(Ts).reverse(),t?{nonce:t}:void 0)}readMeasured(){if(this.updateState==2)throw Error(`Reading the editor layout isn't allowed during an update`);this.updateState==0&&this.measureScheduled>-1&&this.measure(!1)}requestMeasure(e){if(this.measureScheduled<0&&(this.measureScheduled=this.win.requestAnimationFrame(()=>this.measure())),e){if(this.measureRequests.indexOf(e)>-1)return;if(e.key!=null){for(let t=0;t<this.measureRequests.length;t++)if(this.measureRequests[t].key===e.key){this.measureRequests[t]=e;return}}this.measureRequests.push(e)}}plugin(e){let t=this.pluginMap.get(e);return(t===void 0||t&&t.plugin!=e)&&this.pluginMap.set(e,t=this.plugins.find(t=>t.plugin==e)||null),t&&t.update(this).value}get documentTop(){return this.contentDOM.getBoundingClientRect().top+this.viewState.paddingTop}get documentPadding(){return{top:this.viewState.paddingTop,bottom:this.viewState.paddingBottom}}get scaleX(){return this.viewState.scaleX}get scaleY(){return this.viewState.scaleY}elementAtHeight(e){return this.readMeasured(),this.viewState.elementAtHeight(e)}lineBlockAtHeight(e){return this.readMeasured(),this.viewState.lineBlockAtHeight(e)}get viewportLineBlocks(){return this.viewState.viewportLines}lineBlockAt(e){return this.viewState.lineBlockAt(e)}get contentHeight(){return this.viewState.contentHeight}moveByChar(e,t,n){return Fa(this,e,Aa(this,e,t,n))}moveByGroup(e,t){return Fa(this,e,Aa(this,e,t,t=>ja(this,e.head,t)))}visualLineSide(e,t){return t?k.cursor(e.to,1):k.cursor(e.from,-1)}moveToLineBoundary(e,t,n=!0){return ka(this,e,t,n)}moveVertically(e,t,n){return Fa(this,e,Ma(this,e,t,n))}domAtPos(e,t=1){return this.docView.domAtPos(e,t)}posAtDOM(e,t=0){return this.docView.posFromDOM(e,t)}posAtCoords(e,t=!0){this.readMeasured();let n=La(this,e,t);return n&&n.pos}posAndSideAtCoords(e,t=!0){return this.readMeasured(),La(this,e,t)}coordsAtPos(e,t=1){this.readMeasured();let n=this.state.doc.lineAt(e),r=this.bidiSpans(n),i=r[Jr.find(r,e-n.from,-1,t)];return n.length&&(e==n.from&&t<0||e==n.to&&t>0)&&i.dir!=this.textDirectionAt(n.from)&&(e==n.to?(e=n.from+i.from,t=1):(e=n.from+i.to,t=-1)),this.docView.coordsAt(e,t,i.dir==L.RTL)}coordsForChar(e){return this.readMeasured(),this.docView.coordsForChar(e)}get defaultCharacterWidth(){return this.viewState.heightOracle.charWidth}get defaultLineHeight(){return this.viewState.heightOracle.lineHeight}get textDirection(){return this.viewState.defaultTextDirection}textDirectionAt(e){return!this.state.facet(hi)||e<this.viewport.from||e>this.viewport.to?this.textDirection:(this.readMeasured(),this.docView.textDirectionAt(e))}get lineWrapping(){return this.viewState.heightOracle.lineWrapping}bidiSpans(e){if(e.length>Ns)return ni(e.length);let t=this.textDirectionAt(e.from),n;for(let r of this.bidiCache)if(r.from==e.from&&r.dir==t&&(r.fresh||Yr(r.isolates,n=Pi(this,e))))return r.order;n||=Pi(this,e);let r=ti(e.text,t,n);return this.bidiCache.push(new Fs(e.from,e.to,t,n,!0,r)),r}get hasFocus(){return(this.dom.ownerDocument.hasFocus()||P.safari&&this.inputState?.lastContextMenu>Date.now()-3e4)&&this.root.activeElement==this.contentDOM}focus(){this.observer.ignore(()=>{kr(this.contentDOM),this.docView.updateSelection()})}setRoot(e){this._root!=e&&(this._root=e,this.observer.setWindow((e.nodeType==9?e:e.ownerDocument).defaultView||window),this.mountStyles())}destroy(){this.root.activeElement==this.contentDOM&&this.contentDOM.blur();for(let e of this.plugins)e.destroy(this);this.plugins=[],this.inputState.destroy(),this.docView.destroy(),this.dom.remove(),this.observer.destroy(),this.win.clearTimeout(this.clearAnnouncement),this.measureScheduled>-1&&this.win.cancelAnimationFrame(this.measureScheduled),this.destroyed=!0}static scrollIntoView(e,t={}){return yi.of(new vi(typeof e==`number`?k.cursor(e):e,t.y??`nearest`,t.x??`nearest`,t.yMargin??5,t.xMargin??5))}scrollSnapshot(){let{scrollTop:e,scrollLeft:t}=this.scrollDOM,n=this.viewState.scrollAnchorAt(e);return yi.of(new vi(k.cursor(n.from),`start`,`start`,n.top-e,t,!0))}setTabFocusMode(e){e==null?this.inputState.tabFocusMode=this.inputState.tabFocusMode<0?0:-1:typeof e==`boolean`?this.inputState.tabFocusMode=e?0:-1:this.inputState.tabFocusMode!=0&&(this.inputState.tabFocusMode=Date.now()+e)}static domEventHandlers(e){return Ti.define(()=>({}),{eventHandlers:e})}static domEventObservers(e){return Ti.define(()=>({}),{eventObservers:e})}static theme(e,t){let n=On.newName(),r=[vs.of(n),Li.of(ws(`.${n}`,e))];return t&&t.dark&&r.push(ys.of(!0)),r}static baseTheme(e){return wt.lowest(Li.of(ws(`.`+bs,e,Cs)))}static findFromDOM(e){let t=e.querySelector(`.cm-content`);return(t&&z.get(t)||z.get(e))?.root?.view||null}};V.styleModule=Li,V.inputHandler=di,V.clipboardInputFilter=pi,V.clipboardOutputFilter=mi,V.scrollHandler=_i,V.focusChangeEffect=fi,V.perLineTextDirection=hi,V.exceptionSink=li,V.updateListener=ui,V.editable=Si,V.mouseSelectionStyle=ci,V.dragMovesSelection=si,V.clickAddsSelectionRange=oi,V.decorations=ki,V.blockWrappers=Ai,V.outerDecorations=ji,V.atomicRanges=Mi,V.bidiIsolatedRanges=Ni,V.cursorScrollMargin=A.define({combine:e=>{let t=5,n=5;for(let r of e)typeof r==`number`?t=n=r:{x:t,y:n}=r;return{x:t,y:n}}}),V.scrollMargins=Fi,V.darkTheme=ys,V.cspNonce=A.define({combine:e=>e.length?e[0]:``}),V.contentAttributes=Oi,V.editorAttributes=Di,V.lineWrapping=V.contentAttributes.of({class:`cm-lineWrapping`}),V.announce=j.define();var Ns=4096,Ps={},Fs=class e{constructor(e,t,n,r,i,a){this.from=e,this.to=t,this.dir=n,this.isolates=r,this.fresh=i,this.order=a}static update(t,n){if(n.empty&&!t.some(e=>e.fresh))return t;let r=[],i=t.length?t[t.length-1].dir:L.LTR;for(let a=Math.max(0,t.length-10);a<t.length;a++){let o=t[a];o.dir==i&&!n.touchesRange(o.from,o.to)&&r.push(new e(n.mapPos(o.from,1),n.mapPos(o.to,-1),o.dir,o.isolates,!1,o.order))}return r}};function Is(e,t,n){for(let r=e.state.facet(t),i=r.length-1;i>=0;i--){let t=r[i],a=typeof t==`function`?t(e):t;a&&Zn(a,n)}return n}var Ls=P.mac?`mac`:P.windows?`win`:P.linux?`linux`:`key`;function Rs(e,t){let n=e.split(/-(?!$)/),r=n[n.length-1];r==`Space`&&(r=` `);let i,a,o,s;for(let e=0;e<n.length-1;++e){let r=n[e];if(/^(cmd|meta|m)$/i.test(r))s=!0;else if(/^a(lt)?$/i.test(r))i=!0;else if(/^(c|ctrl|control)$/i.test(r))a=!0;else if(/^s(hift)?$/i.test(r))o=!0;else if(/^mod$/i.test(r))t==`mac`?s=!0:a=!0;else throw Error(`Unrecognized modifier name: `+r)}return i&&(r=`Alt-`+r),a&&(r=`Ctrl-`+r),s&&(r=`Meta-`+r),o&&(r=`Shift-`+r),r}function zs(e,t,n){return t.altKey&&(e=`Alt-`+e),t.ctrlKey&&(e=`Ctrl-`+e),t.metaKey&&(e=`Meta-`+e),n!==!1&&t.shiftKey&&(e=`Shift-`+e),e}var Bs=wt.default(V.domEventHandlers({keydown(e,t){return Js(Us(t.state),e,t,`editor`)}})),Vs=A.define({enables:Bs}),Hs=new WeakMap;function Us(e){let t=e.facet(Vs),n=Hs.get(t);return n||Hs.set(t,n=Ks(t.reduce((e,t)=>e.concat(t),[]))),n}var Ws=null,Gs=4e3;function Ks(e,t=Ls){let n=Object.create(null),r=Object.create(null),i=(e,t)=>{let n=r[e];if(n==null)r[e]=t;else if(n!=t)throw Error(`Key binding `+e+` is used both as a regular binding and as a multi-stroke prefix`)},a=(e,r,a,o,s)=>{let c=n[e]||(n[e]=Object.create(null)),l=r.split(/ (?!$)/).map(e=>Rs(e,t));for(let t=1;t<l.length;t++){let n=l.slice(0,t).join(` `);i(n,!0),c[n]||(c[n]={preventDefault:!0,stopPropagation:!1,run:[t=>{let r=Ws={view:t,prefix:n,scope:e};return setTimeout(()=>{Ws==r&&(Ws=null)},Gs),!0}]})}let u=l.join(` `);i(u,!1);let d=c[u]||(c[u]={preventDefault:!1,stopPropagation:!1,run:(c._any?.run)?.slice()||[]});a&&d.run.push(a),o&&(d.preventDefault=!0),s&&(d.stopPropagation=!0)};for(let r of e){let e=r.scope?r.scope.split(` `):[`editor`];if(r.any)for(let t of e){let e=n[t]||(n[t]=Object.create(null));e._any||={preventDefault:!1,stopPropagation:!1,run:[]};let{any:i}=r;for(let t in e)e[t].run.push(e=>i(e,qs))}let i=r[t]||r.key;if(i)for(let t of e)a(t,i,r.run,r.preventDefault,r.stopPropagation),r.shift&&a(t,`Shift-`+i,r.shift,r.preventDefault,r.stopPropagation)}return n}var qs=null;function Js(e,t,n,r){qs=t;let i=Ln(t),a=tt(et(i,0))==i.length&&i!=` `,o=``,s=!1,c=!1,l=!1;Ws&&Ws.view==n&&Ws.scope==r&&(o=Ws.prefix+` `,ao.indexOf(t.keyCode)<0&&(c=!0,Ws=null));let u=new Set,d=e=>{if(e){for(let t of e.run)if(!u.has(t)&&(u.add(t),t(n)))return e.stopPropagation&&(l=!0),!0;e.preventDefault&&(e.stopPropagation&&(l=!0),c=!0)}return!1},f=e[r],p,m;return f&&(d(f[o+zs(i,t,!a)])?s=!0:a&&(t.altKey||t.metaKey||t.ctrlKey)&&!(P.windows&&t.ctrlKey&&t.altKey)&&!(P.mac&&t.altKey&&!(t.ctrlKey||t.metaKey))&&(p=jn[t.keyCode])&&p!=i?(d(f[o+zs(p,t,!0)])||t.shiftKey&&(m=Mn[t.keyCode])!=i&&m!=p&&d(f[o+zs(m,t,!1)]))&&(s=!0):a&&t.shiftKey&&d(f[o+zs(i,t,!0)])&&(s=!0),!s&&d(f._any)&&(s=!0)),c&&(s=!0),s&&l&&t.stopPropagation(),qs=null,s}var Ys=class e{constructor(e,t,n,r,i){this.className=e,this.left=t,this.top=n,this.width=r,this.height=i}draw(){let e=document.createElement(`div`);return e.className=this.className,this.adjust(e),e}update(e,t){return t.className==this.className&&(this.adjust(e),!0)}adjust(e){e.style.left=this.left+`px`,e.style.top=this.top+`px`,this.width!=null&&(e.style.width=this.width+`px`),e.style.height=this.height+`px`}eq(e){return this.left==e.left&&this.top==e.top&&this.width==e.width&&this.height==e.height&&this.className==e.className}static forRange(t,n,r){if(r.empty){let i=t.coordsAtPos(r.head,r.assoc||1);if(!i)return[];let a=Xs(t);return[new e(n,i.left-a.left,i.top-a.top,null,i.bottom-i.top)]}return Qs(t,n,r)}};function Xs(e){let t=e.scrollDOM.getBoundingClientRect();return{left:(e.textDirection==L.LTR?t.left:t.right-e.scrollDOM.clientWidth*e.scaleX)-e.scrollDOM.scrollLeft*e.scaleX,top:t.top-e.scrollDOM.scrollTop*e.scaleY}}function Zs(e,t,n,r){let i=e.coordsAtPos(t,n*2);if(!i)return r;let a=e.dom.getBoundingClientRect(),o=(i.top+i.bottom)/2,s=e.posAtCoords({x:a.left+1,y:o}),c=e.posAtCoords({x:a.right-1,y:o});return s==null||c==null?r:{from:Math.max(r.from,Math.min(s,c)),to:Math.min(r.to,Math.max(s,c))}}function Qs(e,t,n){if(n.to<=e.viewport.from||n.from>=e.viewport.to)return[];let r=Math.max(n.from,e.viewport.from),i=Math.min(n.to,e.viewport.to),a=e.textDirection==L.LTR,o=e.contentDOM,s=o.getBoundingClientRect(),c=Xs(e),l=o.querySelector(`.cm-line`),u=l&&window.getComputedStyle(l),d=s.left+(u?parseInt(u.paddingLeft)+Math.min(0,parseInt(u.textIndent)):0),f=s.right-(u?parseInt(u.paddingRight):0),p=Oa(e,r,1),m=Oa(e,i,-1),h=p.type==F.Text?p:null,g=m.type==F.Text?m:null;if(h&&(e.lineWrapping||p.widgetLineBreaks)&&(h=Zs(e,r,1,h)),g&&(e.lineWrapping||m.widgetLineBreaks)&&(g=Zs(e,i,-1,g)),h&&g&&h.from==g.from&&h.to==g.to)return v(y(n.from,n.to,h));{let t=h?y(n.from,null,h):b(p,!1),r=g?y(null,n.to,g):b(m,!0),i=[];return(h||p).to<(g||m).from-(h&&g?1:0)||p.widgetLineBreaks>1&&t.bottom+e.defaultLineHeight/2<r.top?i.push(_(d,t.bottom,f,r.top)):t.bottom<r.top&&e.elementAtHeight((t.bottom+r.top)/2).type==F.Text&&(t.bottom=r.top=(t.bottom+r.top)/2),v(t).concat(i).concat(v(r))}function _(e,n,r,i){return new Ys(t,e-c.left,n-c.top,Math.max(0,r-e),i-n)}function v({top:e,bottom:t,horizontal:n}){let r=[];for(let i=0;i<n.length;i+=2)r.push(_(n[i],e,n[i+1],t));return r}function y(t,n,r){let i=1e9,o=-1e9,s=[];function c(t,n,c,l,u){let p=e.coordsAtPos(t,t==r.to?-2:2),m=e.coordsAtPos(c,c==r.from?2:-2);p&&m&&(i=Math.min(p.top,m.top,i),o=Math.max(p.bottom,m.bottom,o),u==L.LTR?s.push(a&&n?d:p.left,a&&l?f:m.right):s.push(!a&&l?d:m.left,!a&&n?f:p.right))}let l=t??r.from,u=n??r.to;for(let r of e.visibleRanges)if(r.to>l&&r.from<u)for(let i=Math.max(r.from,l),a=Math.min(r.to,u);;){let r=e.state.doc.lineAt(i);for(let o of e.bidiSpans(r)){let e=o.from+r.from,s=o.to+r.from;if(e>=a)break;s>i&&c(Math.max(e,i),t==null&&e<=l,Math.min(s,a),n==null&&s>=u,o.dir)}if(i=r.to+1,i>=a)break}return s.length==0&&c(l,t==null,u,n==null,e.textDirection),{top:i,bottom:o,horizontal:s}}function b(e,t){let n=s.top+(t?e.top:e.bottom);return{top:n,bottom:n,horizontal:[]}}}function $s(e,t){return e.constructor==t.constructor&&e.eq(t)}var ec=class{constructor(e,t){this.view=e,this.layer=t,this.drawn=[],this.scaleX=1,this.scaleY=1,this.measureReq={read:this.measure.bind(this),write:this.draw.bind(this)},this.dom=e.scrollDOM.appendChild(document.createElement(`div`)),this.dom.classList.add(`cm-layer`),t.above&&this.dom.classList.add(`cm-layer-above`),t.class&&this.dom.classList.add(t.class),this.scale(),this.dom.setAttribute(`aria-hidden`,`true`),this.setOrder(e.state),e.requestMeasure(this.measureReq),t.mount&&t.mount(this.dom,e)}update(e){e.startState.facet(tc)!=e.state.facet(tc)&&this.setOrder(e.state),(this.layer.update(e,this.dom)||e.geometryChanged)&&(this.scale(),e.view.requestMeasure(this.measureReq))}docViewUpdate(e){this.layer.updateOnDocViewUpdate!==!1&&e.requestMeasure(this.measureReq)}setOrder(e){let t=0,n=e.facet(tc);for(;t<n.length&&n[t]!=this.layer;)t++;this.dom.style.zIndex=String((this.layer.above?150:-1)-t)}measure(){return this.layer.markers(this.view)}scale(){let{scaleX:e,scaleY:t}=this.view;(e!=this.scaleX||t!=this.scaleY)&&(this.scaleX=e,this.scaleY=t,this.dom.style.transform=`scale(${1/e}, ${1/t})`)}draw(e){if(e.length!=this.drawn.length||e.some((e,t)=>!$s(e,this.drawn[t]))){let t=this.dom.firstChild,n=0;for(let r of e)r.update&&t&&r.constructor&&this.drawn[n].constructor&&r.update(t,this.drawn[n])?(t=t.nextSibling,n++):this.dom.insertBefore(r.draw(),t);for(;t;){let e=t.nextSibling;t.remove(),t=e}this.drawn=e,P.webkit&&(this.dom.style.display=this.dom.firstChild?``:`none`)}}destroy(){this.layer.destroy&&this.layer.destroy(this.dom,this.view),this.dom.remove()}},tc=A.define();function nc(e){return[Ti.define(t=>new ec(t,e)),tc.of(e)]}var rc=A.define({combine(e){return nn(e,{cursorBlinkRate:1200,drawRangeCursor:!0,iosSelectionHandles:!0},{cursorBlinkRate:(e,t)=>Math.min(e,t),drawRangeCursor:(e,t)=>e||t})}});function ic(e={}){return[rc.of(e),oc,cc,uc,gi.of(!0)]}function ac(e){return e.startState.facet(rc)!=e.state.facet(rc)}var oc=nc({above:!0,markers(e){let{state:t}=e,n=t.facet(rc),r=[];for(let i of t.selection.ranges){let a=i==t.selection.main;if(i.empty||n.drawRangeCursor&&!(a&&P.ios&&n.iosSelectionHandles)){let t=a?`cm-cursor cm-cursor-primary`:`cm-cursor cm-cursor-secondary`,n=i.empty?i:k.cursor(i.head,i.assoc);for(let i of Ys.forRange(e,t,n))r.push(i)}}return r},update(e,t){e.transactions.some(e=>e.selection)&&(t.style.animationName=t.style.animationName==`cm-blink`?`cm-blink2`:`cm-blink`);let n=ac(e);return n&&sc(e.state,t),e.docChanged||e.selectionSet||n},mount(e,t){sc(t.state,e)},class:`cm-cursorLayer`});function sc(e,t){t.style.animationDuration=e.facet(rc).cursorBlinkRate+`ms`}var cc=nc({above:!1,markers(e){let t=[],{main:n,ranges:r}=e.state.selection;for(let n of r)if(!n.empty)for(let r of Ys.forRange(e,`cm-selectionBackground`,n))t.push(r);if(P.ios&&!n.empty&&e.state.facet(rc).iosSelectionHandles){for(let r of Ys.forRange(e,`cm-selectionHandle cm-selectionHandle-start`,k.cursor(n.from,1)))t.push(r);for(let r of Ys.forRange(e,`cm-selectionHandle cm-selectionHandle-end`,k.cursor(n.to,1)))t.push(r)}return t},update(e,t){return e.docChanged||e.selectionSet||e.viewportChanged||ac(e)},class:`cm-selectionLayer`}),lc=P.gecko&&P.gecko_version==153?`#ffffff01`:`transparent`,uc=wt.highest(V.theme({".cm-line":{"& ::selection, &::selection":{backgroundColor:`${lc} !important`},caretColor:`transparent !important`},".cm-content":{caretColor:`transparent !important`,"& :focus":{caretColor:`initial !important`,"&::selection, & ::selection":{backgroundColor:`Highlight !important`}}}}));function dc(e,t,n,r,i){t.lastIndex=0;for(let a=e.iterRange(n,r),o=n,s;!a.next().done;o+=a.value.length)if(!a.lineBreak)for(;s=t.exec(a.value);)i(o+s.index,s)}function fc(e,t){let n=e.visibleRanges;if(n.length==1&&n[0].from==e.viewport.from&&n[0].to==e.viewport.to)return n;let r=[];for(let{from:i,to:a}of n)i=Math.max(e.state.doc.lineAt(i).from,i-t),a=Math.min(e.state.doc.lineAt(a).to,a+t),r.length&&r[r.length-1].to>=i?r[r.length-1].to=a:r.push({from:i,to:a});return r}var pc=class{constructor(e){let{regexp:t,decoration:n,decorate:r,boundary:i,maxLength:a=1e3}=e;if(!t.global)throw RangeError(`The regular expression given to MatchDecorator should have its 'g' flag set`);if(this.regexp=t,r)this.addMatch=(e,t,n,i)=>r(i,n,n+e[0].length,e,t);else if(typeof n==`function`)this.addMatch=(e,t,r,i)=>{let a=n(e,t,r);a&&i(r,r+e[0].length,a)};else if(n)this.addMatch=(e,t,r,i)=>i(r,r+e[0].length,n);else throw RangeError(`Either 'decorate' or 'decoration' should be provided to MatchDecorator`);this.boundary=i,this.maxLength=a}createDeco(e){let t=new dn,n=t.add.bind(t);for(let{from:t,to:r}of fc(e,this.maxLength))dc(e.state.doc,this.regexp,t,r,(t,r)=>this.addMatch(r,e,t,n));return t.finish()}updateDeco(e,t){let n=1e9,r=-1;return e.docChanged&&e.changes.iterChanges((t,i,a,o)=>{o>=e.view.viewport.from&&a<=e.view.viewport.to&&(n=Math.min(a,n),r=Math.max(o,r))}),e.viewportMoved||r-n>1e3?this.createDeco(e.view):r>-1?this.updateRange(e.view,t.map(e.changes),n,r):t}updateRange(e,t,n,r){for(let i of e.visibleRanges){let a=Math.max(i.from,n),o=Math.min(i.to,r);if(o>=a){let n=e.state.doc.lineAt(a),r=n.to<o?e.state.doc.lineAt(o):n,s=Math.max(i.from,n.from),c=Math.min(i.to,r.to);if(this.boundary){for(;a>n.from;a--)if(this.boundary.test(n.text[a-1-n.from])){s=a;break}for(;o<r.to;o++)if(this.boundary.test(r.text[o-r.from])){c=o;break}}let l=[],u,d=(e,t,n)=>l.push(n.range(e,t));if(n==r)for(this.regexp.lastIndex=s-n.from;(u=this.regexp.exec(n.text))&&u.index<c-n.from;)this.addMatch(u,e,u.index+n.from,d);else dc(e.state.doc,this.regexp,s,c,(t,n)=>this.addMatch(n,e,t,d));t=t.update({filterFrom:s,filterTo:c,filter:(e,t)=>e<s||t>c,add:l})}}return t}},mc=/x/.unicode==null?`g`:`gu`,hc=RegExp(`[\0-\b
--­؜​‎‏\u2028\u2029‭‮⁦⁧⁩﻿￹-￼]`,mc),gc={0:`null`,7:`bell`,8:`backspace`,10:`newline`,11:`vertical tab`,13:`carriage return`,27:`escape`,8203:`zero width space`,8204:`zero width non-joiner`,8205:`zero width joiner`,8206:`left-to-right mark`,8207:`right-to-left mark`,8232:`line separator`,8237:`left-to-right override`,8238:`right-to-left override`,8294:`left-to-right isolate`,8295:`right-to-left isolate`,8297:`pop directional isolate`,8233:`paragraph separator`,65279:`zero width no-break space`,65532:`object replacement`},_c=null;function vc(){if(_c==null&&typeof document<`u`&&document.body){let e=document.body.style;_c=(e.tabSize??e.MozTabSize)!=null}return _c||!1}var yc=A.define({combine(e){let t=nn(e,{render:null,specialChars:hc,addSpecialChars:null});return(t.replaceTabs=!vc())&&(t.specialChars=RegExp(`	|`+t.specialChars.source,mc)),t.addSpecialChars&&(t.specialChars=RegExp(t.specialChars.source+`|`+t.addSpecialChars.source,mc)),t}});function bc(e={}){return[yc.of(e),Sc()]}var xc=null;function Sc(){return xc||=Ti.fromClass(class{constructor(e){this.view=e,this.decorations=I.none,this.decorationCache=Object.create(null),this.decorator=this.makeDecorator(e.state.facet(yc)),this.decorations=this.decorator.createDeco(e)}makeDecorator(e){return new pc({regexp:e.specialChars,decoration:(t,n,r)=>{let{doc:i}=n.state,a=et(t[0],0);if(a==9){let e=i.lineAt(r),t=n.state.tabSize,a=Sn(e.text,t,r-e.from);return I.replace({widget:new Ec((t-a%t)*this.view.defaultCharacterWidth/this.view.scaleX)})}return this.decorationCache[a]||(this.decorationCache[a]=I.replace({widget:new Tc(e,a)}))},boundary:e.replaceTabs?void 0:/[^]/})}update(e){let t=e.state.facet(yc);e.startState.facet(yc)==t?this.decorations=this.decorator.updateDeco(e,this.decorations):(this.decorator=this.makeDecorator(t),this.decorations=this.decorator.createDeco(e.view))}},{decorations:e=>e.decorations})}var Cc=`•`;function wc(e){return e>=32?Cc:e==10?`␤`:String.fromCharCode(9216+e)}var Tc=class extends rr{constructor(e,t){super(),this.options=e,this.code=t}eq(e){return e.code==this.code}toDOM(e){let t=wc(this.code),n=e.state.phrase(`Control character`)+` `+(gc[this.code]||`0x`+this.code.toString(16)),r=this.options.render&&this.options.render(this.code,n,t);if(r)return r;let i=document.createElement(`span`);return i.textContent=t,i.title=n,i.setAttribute(`aria-label`,n),i.className=`cm-specialChar`,i}ignoreEvent(){return!1}},Ec=class extends rr{constructor(e){super(),this.width=e}eq(e){return e.width==this.width}toDOM(){let e=document.createElement(`span`);return e.textContent=`	`,e.className=`cm-tab`,e.style.width=this.width+`px`,e}ignoreEvent(){return!1}};function Dc(){return kc}var Oc=I.line({class:`cm-activeLine`}),kc=Ti.fromClass(class{constructor(e){this.decorations=this.getDeco(e)}update(e){(e.docChanged||e.selectionSet)&&(this.decorations=this.getDeco(e.view))}getDeco(e){let t=-1,n=[];for(let r of e.state.selection.ranges){let i=e.lineBlockAt(r.head);i.from>t&&(n.push(Oc.range(i.from)),t=i.from)}return I.set(n)}},{decorations:e=>e.decorations}),Ac=`-10000px`,jc=class{constructor(e,t,n,r){this.facet=t,this.createTooltipView=n,this.removeTooltipView=r,this.input=e.state.facet(t),this.tooltips=this.input.filter(e=>e);let i=null;this.tooltipViews=this.tooltips.map(e=>i=n(e,i))}update(e,t){var n;let r=e.state.facet(this.facet),i=r.filter(e=>e);if(r===this.input){for(let t of this.tooltipViews)t.update&&t.update(e);return!1}let a=[],o=t?[]:null;for(let n=0;n<i.length;n++){let r=i[n],s=-1;if(r){for(let e=0;e<this.tooltips.length;e++){let t=this.tooltips[e];t&&t.create==r.create&&(s=e)}if(s<0)a[n]=this.createTooltipView(r,n?a[n-1]:null),o&&(o[n]=!!r.above);else{let r=a[n]=this.tooltipViews[s];o&&(o[n]=t[s]),r.update&&r.update(e)}}}for(let e of this.tooltipViews)a.indexOf(e)<0&&(this.removeTooltipView(e),(n=e.destroy)==null||n.call(e));return t&&(o.forEach((e,n)=>t[n]=e),t.length=o.length),this.input=r,this.tooltips=i,this.tooltipViews=a,!0}};function Mc(e){let t=e.dom.ownerDocument.documentElement;return{top:0,left:0,bottom:t.clientHeight,right:t.clientWidth}}var Nc=A.define({combine:e=>({position:P.ios?`absolute`:e.find(e=>e.position)?.position||`fixed`,parent:e.find(e=>e.parent)?.parent||null,tooltipSpace:e.find(e=>e.tooltipSpace)?.tooltipSpace||Mc})}),Pc=new WeakMap,Fc=Ti.fromClass(class{constructor(e){this.view=e,this.above=[],this.inView=!0,this.madeAbsolute=!1,this.lastTransaction=0,this.measureTimeout=-1;let t=e.state.facet(Nc);this.position=t.position,this.parent=t.parent,this.classes=e.themeClasses,this.createContainer(),this.measureReq={read:this.readMeasure.bind(this),write:this.writeMeasure.bind(this),key:this},this.resizeObserver=typeof ResizeObserver==`function`?new ResizeObserver(()=>this.measureSoon()):null,this.manager=new jc(e,zc,(e,t)=>this.createTooltip(e,t),e=>{this.resizeObserver&&this.resizeObserver.unobserve(e.dom),e.dom.remove()}),this.above=this.manager.tooltips.map(e=>!!e.above),this.intersectionObserver=typeof IntersectionObserver==`function`?new IntersectionObserver(e=>{Date.now()>this.lastTransaction-50&&e.length>0&&e[e.length-1].intersectionRatio<1&&this.measureSoon()},{threshold:[1]}):null,this.observeIntersection(),e.win.addEventListener(`resize`,this.measureSoon=this.measureSoon.bind(this)),this.maybeMeasure()}createContainer(){this.parent?(this.container=document.createElement(`div`),this.container.style.position=`relative`,this.container.className=this.view.themeClasses,this.parent.appendChild(this.container)):this.container=this.view.dom}observeIntersection(){if(this.intersectionObserver){this.intersectionObserver.disconnect();for(let e of this.manager.tooltipViews)this.intersectionObserver.observe(e.dom)}}measureSoon(){this.measureTimeout<0&&(this.measureTimeout=setTimeout(()=>{this.measureTimeout=-1,this.maybeMeasure()},50))}update(e){e.transactions.length&&(this.lastTransaction=Date.now());let t=this.manager.update(e,this.above);t&&this.observeIntersection();let n=t||e.geometryChanged,r=e.state.facet(Nc);if(r.position!=this.position&&!this.madeAbsolute){this.position=r.position;for(let e of this.manager.tooltipViews)e.dom.style.position=this.position;n=!0}if(r.parent!=this.parent){this.parent&&this.container.remove(),this.parent=r.parent,this.createContainer();for(let e of this.manager.tooltipViews)this.container.appendChild(e.dom);n=!0}else this.parent&&this.view.themeClasses!=this.classes&&(this.classes=this.container.className=this.view.themeClasses);n&&this.maybeMeasure()}createTooltip(e,t){let n=e.create(this.view),r=t?t.dom:null;if(n.dom.classList.add(`cm-tooltip`),e.arrow&&!n.dom.querySelector(`.cm-tooltip > .cm-tooltip-arrow`)){let e=document.createElement(`div`);e.className=`cm-tooltip-arrow`,n.dom.appendChild(e)}return n.dom.style.position=this.position,n.dom.style.top=Ac,n.dom.style.left=`0px`,this.container.insertBefore(n.dom,r),n.mount&&n.mount(this.view),this.resizeObserver&&this.resizeObserver.observe(n.dom),n}destroy(){var e,t,n;this.view.win.removeEventListener(`resize`,this.measureSoon);for(let t of this.manager.tooltipViews)t.dom.remove(),(e=t.destroy)==null||e.call(t);this.parent&&this.container.remove(),(t=this.resizeObserver)==null||t.disconnect(),(n=this.intersectionObserver)==null||n.disconnect(),clearTimeout(this.measureTimeout)}readMeasure(){let e=1,t=1,n=!1;if(this.position==`fixed`&&this.manager.tooltipViews.length){let{dom:e}=this.manager.tooltipViews[0];if(P.safari){let t=e.getBoundingClientRect();n=Math.abs(t.top+1e4)>1||Math.abs(t.left)>1}else n=!!e.offsetParent&&e.offsetParent!=this.container.ownerDocument.body}if(n||this.position==`absolute`){if(this.parent){let n=this.parent.getBoundingClientRect();n.width&&n.height&&(e=n.width/this.parent.offsetWidth,t=n.height/this.parent.offsetHeight)}else({scaleX:e,scaleY:t}=this.view.viewState)}let r=this.view.scrollDOM.getBoundingClientRect(),i=Ii(this.view);return{visible:{left:r.left+i.left,top:r.top+i.top,right:r.right-i.right,bottom:r.bottom-i.bottom},parent:this.parent?this.container.getBoundingClientRect():this.view.dom.getBoundingClientRect(),pos:this.manager.tooltips.map((e,t)=>{let n=this.manager.tooltipViews[t];return n.getCoords?n.getCoords(e.pos):this.view.coordsAtPos(e.pos)}),size:this.manager.tooltipViews.map(({dom:e})=>e.getBoundingClientRect()),space:this.view.state.facet(Nc).tooltipSpace(this.view),scaleX:e,scaleY:t,makeAbsolute:n}}writeMeasure(e){if(e.makeAbsolute){this.madeAbsolute=!0,this.position=`absolute`;for(let e of this.manager.tooltipViews)e.dom.style.position=`absolute`}let{visible:t,space:n,scaleX:r,scaleY:i}=e,a=[];for(let o=0;o<this.manager.tooltips.length;o++){let s=this.manager.tooltips[o],c=this.manager.tooltipViews[o],{dom:l}=c,u=e.pos[o],d=e.size[o];if(!u||s.clip!==!1&&(u.bottom<=Math.max(t.top,n.top)||u.top>=Math.min(t.bottom,n.bottom)||u.right<Math.max(t.left,n.left)-.1||u.left>Math.min(t.right,n.right)+.1)){l.style.top=Ac;continue}let f=s.arrow?c.dom.querySelector(`.cm-tooltip-arrow`):null,p=f?7:0,m=d.right-d.left,h=Pc.get(c)??d.bottom-d.top,g=c.offset||Rc,_=this.view.textDirection==L.LTR,v=d.width>n.right-n.left?_?n.left:n.right-d.width:_?Math.max(n.left,Math.min(u.left-(f?14:0)+g.x,n.right-m)):Math.min(Math.max(n.left,u.left-m+(f?14:0)-g.x),n.right-m),y=this.above[o];!s.strictSide&&(y?u.top-h-p-g.y<n.top:u.bottom+h+p+g.y>n.bottom)&&y==n.bottom-u.bottom>u.top-n.top&&(y=this.above[o]=!y);let b=(y?u.top-n.top:n.bottom-u.bottom)-p;if(b<h&&c.resize!==!1){if(b<this.view.defaultLineHeight){l.style.top=Ac;continue}Pc.set(c,h),l.style.height=(h=b)/i+`px`}else l.style.height&&(l.style.height=``);let x=y?u.top-h-p-g.y:u.bottom+p+g.y,S=v+m;if(c.overlap!==!0)for(let e of a)e.left<S&&e.right>v&&e.top<x+h&&e.bottom>x&&(x=y?e.top-h-2-p:e.bottom+p+2);if(this.position==`absolute`?(l.style.top=(x-e.parent.top)/i+`px`,Ic(l,(v-e.parent.left)/r)):(l.style.top=x/i+`px`,Ic(l,v/r)),f){let e=u.left+(_?g.x:-g.x)-(v+14-7);f.style.left=e/r+`px`}c.overlap!==!0&&a.push({left:v,top:x,right:S,bottom:x+h}),l.classList.toggle(`cm-tooltip-above`,y),l.classList.toggle(`cm-tooltip-below`,!y),c.positioned&&c.positioned(e.space)}}maybeMeasure(){if(this.manager.tooltips.length&&(this.view.inView&&this.view.requestMeasure(this.measureReq),this.inView!=this.view.inView&&(this.inView=this.view.inView,!this.inView)))for(let e of this.manager.tooltipViews)e.dom.style.top=Ac}},{eventObservers:{scroll(){this.maybeMeasure()}}});function Ic(e,t){let n=parseInt(e.style.left,10);(isNaN(n)||Math.abs(t-n)>1)&&(e.style.left=t+`px`)}var Lc=V.baseTheme({".cm-tooltip":{zIndex:500,boxSizing:`border-box`},"&light .cm-tooltip":{border:`1px solid #bbb`,backgroundColor:`#f5f5f5`},"&light .cm-tooltip-section:not(:first-child)":{borderTop:`1px solid #bbb`},"&dark .cm-tooltip":{backgroundColor:`#333338`,color:`white`},".cm-tooltip-arrow":{height:`7px`,width:`14px`,position:`absolute`,zIndex:-1,overflow:`hidden`,"&:before, &:after":{content:`''`,position:`absolute`,width:0,height:0,borderLeft:`7px solid transparent`,borderRight:`7px solid transparent`},".cm-tooltip-above &":{bottom:`-7px`,"&:before":{borderTop:`7px solid #bbb`},"&:after":{borderTop:`7px solid #f5f5f5`,bottom:`1px`}},".cm-tooltip-below &":{top:`-7px`,"&:before":{borderBottom:`7px solid #bbb`},"&:after":{borderBottom:`7px solid #f5f5f5`,top:`1px`}}},"&dark .cm-tooltip .cm-tooltip-arrow":{"&:before":{borderTopColor:`#333338`,borderBottomColor:`#333338`},"&:after":{borderTopColor:`transparent`,borderBottomColor:`transparent`}}}),Rc={x:0,y:0},zc=A.define({enables:[Fc,Lc]}),Bc=A.define({combine:e=>e.reduce((e,t)=>e.concat(t),[])}),Vc=class e{static create(t){return new e(t)}constructor(e){this.view=e,this.mounted=!1,this.dom=document.createElement(`div`),this.dom.classList.add(`cm-tooltip-hover`),this.manager=new jc(e,Bc,(e,t)=>this.createHostedView(e,t),e=>e.dom.remove())}createHostedView(e,t){let n=e.create(this.view);return n.dom.classList.add(`cm-tooltip-section`),this.dom.insertBefore(n.dom,t?t.dom.nextSibling:this.dom.firstChild),this.mounted&&n.mount&&n.mount(this.view),n}mount(e){for(let t of this.manager.tooltipViews)t.mount&&t.mount(e);this.mounted=!0}positioned(e){for(let t of this.manager.tooltipViews)t.positioned&&t.positioned(e)}update(e){this.manager.update(e)}destroy(){var e;for(let t of this.manager.tooltipViews)(e=t.destroy)==null||e.call(t)}passProp(e){let t;for(let n of this.manager.tooltipViews){let r=n[e];if(r!==void 0){if(t===void 0)t=r;else if(t!==r)return}}return t}get offset(){return this.passProp(`offset`)}get getCoords(){return this.passProp(`getCoords`)}get overlap(){return this.passProp(`overlap`)}get resize(){return this.passProp(`resize`)}},Hc=zc.compute([Bc],e=>{let t=e.facet(Bc);return t.length===0?null:{pos:Math.min(...t.map(e=>e.pos)),end:Math.max(...t.map(e=>e.end??e.pos)),create:Vc.create,above:t[0].above,arrow:t.some(e=>e.arrow)}}),Uc=A.define(),Wc=class{constructor(e,t,n,r,i,a){this.view=e,this.source=t,this.field=n,this.locked=r,this.setHover=i,this.hoverTime=a,this.hoverTimeout=-1,this.restartTimeout=-1,this.pending=null,this.lastMove={x:0,y:0,target:e.dom,time:0},this.checkHover=this.checkHover.bind(this),e.dom.addEventListener(`mouseleave`,this.mouseleave=this.mouseleave.bind(this)),e.dom.addEventListener(`mousemove`,this.mousemove=this.mousemove.bind(this))}update(e){this.pending&&(this.pending=null,clearTimeout(this.restartTimeout),this.restartTimeout=setTimeout(()=>this.startHover(),20))}get active(){return this.view.state.field(this.field)}checkHover(){if(this.hoverTimeout=-1,this.active.length)return;let e=Date.now()-this.lastMove.time;e<this.hoverTime?this.hoverTimeout=setTimeout(this.checkHover,this.hoverTime-e):this.startHover()}startHover(){clearTimeout(this.restartTimeout);let{view:e,lastMove:t}=this,n=e.docView.tile.nearest(t.target);if(!n)return;let r,i=1;if(n.isWidget())r=n.posAtStart;else{if(r=e.posAtCoords(t),r==null)return;let n=e.coordsAtPos(r);if(!n||t.y<n.top||t.y>n.bottom||t.x<n.left-e.defaultCharacterWidth||t.x>n.right+e.defaultCharacterWidth)return;let a=e.bidiSpans(e.state.doc.lineAt(r)).find(e=>e.from<=r&&e.to>=r),o=a&&a.dir==L.RTL?-1:1;i=t.x<n.left?-o:o}this.activateHover(e,r,i)}activateHover(e,t,n,r){let i=this.source(e,t,n),a=t=>{if(t&&(!Array.isArray(t)||t.length)){let n=Array.isArray(t)?t:[t];r&&this.locked.set(n,r),e.dispatch({effects:this.setHover.of(n)})}};if(i&&`then`in i){let n=this.pending={pos:t};i.then(e=>{this.pending==n&&(this.pending=null,a(e))},t=>xi(e.state,t,`hover tooltip`))}else a(i)}get tooltip(){let e=this.view.plugin(Fc),t=e?e.manager.tooltips.findIndex(e=>e.create==Vc.create):-1;return t>-1?e.manager.tooltipViews[t]:null}mousemove(e){this.lastMove={x:e.clientX,y:e.clientY,target:e.target,time:Date.now()},this.hoverTimeout<0&&(this.hoverTimeout=setTimeout(this.checkHover,this.hoverTime));let{active:t,tooltip:n}=this;if(t.length&&!this.locked.has(t)&&n&&!Kc(n.dom,e)||this.pending){let{pos:n}=t[0]||this.pending,r=t[0]?.end??n;(n==r?this.view.posAtCoords(this.lastMove)!=n:!qc(this.view,n,r,e.clientX,e.clientY))&&(this.view.dispatch({effects:this.setHover.of([])}),this.pending=null)}}mouseleave(e){clearTimeout(this.hoverTimeout),this.hoverTimeout=-1;let{active:t}=this;if(t.length&&!this.locked.has(t)){let{tooltip:t}=this;t&&t.dom.contains(e.relatedTarget)?this.watchTooltipLeave(t.dom):this.view.dispatch({effects:this.setHover.of([])})}}watchTooltipLeave(e){let t=n=>{e.removeEventListener(`mouseleave`,t);let{active:r}=this;r.length&&!this.locked.has(r)&&!this.view.dom.contains(n.relatedTarget)&&this.view.dispatch({effects:this.setHover.of([])})};e.addEventListener(`mouseleave`,t)}destroy(){clearTimeout(this.hoverTimeout),clearTimeout(this.restartTimeout),this.view.dom.removeEventListener(`mouseleave`,this.mouseleave),this.view.dom.removeEventListener(`mousemove`,this.mousemove)}},Gc=4;function Kc(e,t){let{left:n,right:r,top:i,bottom:a}=e.getBoundingClientRect(),o;if(o=e.querySelector(`.cm-tooltip-arrow`)){let e=o.getBoundingClientRect();i=Math.min(e.top,i),a=Math.max(e.bottom,a)}return t.clientX>=n-Gc&&t.clientX<=r+Gc&&t.clientY>=i-Gc&&t.clientY<=a+Gc}function qc(e,t,n,r,i,a){let o=e.scrollDOM.getBoundingClientRect(),s=e.documentTop+e.documentPadding.top+e.contentHeight;if(o.left>r||o.right<r||o.top>i||Math.min(o.bottom,s)<i)return!1;let c=e.posAtCoords({x:r,y:i},!1);return c>=t&&c<=n}function Jc(e,t={}){let n=j.define(),r=new WeakMap,i=xt.define({create(){return[]},update(e,a){let o=r.get(e);if(e.length&&(t.hideOnChange&&(a.docChanged||a.selection)||o&&o(a)?e=[]:t.hideOn&&(e=e.filter(e=>!t.hideOn(a,e)))),a.docChanged&&e.length){let t=[];for(let n of e){let e=a.changes.mapPos(n.pos,-1,rt.TrackDel);if(e!=null){let r=Object.assign(Object.create(null),n);r.pos=e,r.end!=null&&(r.end=a.changes.mapPos(r.end)),t.push(r)}}e=t}for(let t of a.effects)t.is(n)&&(e=t.value,o=void 0),(t.is(Yc)&&!t.value||t.value==i)&&(e=[]);return e.length&&o&&r.set(e,o),e},provide:e=>Bc.from(e)}),a=Ti.define(a=>new Wc(a,e,i,r,n,t.hoverTime||300));return{active:i,extension:[i,a,Uc.of(a),Hc]}}var Yc=j.define(),Xc=A.define({combine(e){let t,n;for(let r of e)t||=r.topContainer,n||=r.bottomContainer;return{topContainer:t,bottomContainer:n}}}),Zc=Ti.fromClass(class{constructor(e){this.input=e.state.facet(el),this.specs=this.input.filter(e=>e),this.panels=this.specs.map(t=>t(e));let t=e.state.facet(Xc);this.top=new Qc(e,!0,t.topContainer),this.bottom=new Qc(e,!1,t.bottomContainer),this.top.sync(this.panels.filter(e=>e.top)),this.bottom.sync(this.panels.filter(e=>!e.top));for(let e of this.panels)e.dom.classList.add(`cm-panel`),e.mount&&e.mount()}update(e){let t=e.state.facet(Xc);this.top.container!=t.topContainer&&(this.top.sync([]),this.top=new Qc(e.view,!0,t.topContainer)),this.bottom.container!=t.bottomContainer&&(this.bottom.sync([]),this.bottom=new Qc(e.view,!1,t.bottomContainer)),this.top.syncClasses(),this.bottom.syncClasses();let n=e.state.facet(el);if(n!=this.input){let t=n.filter(e=>e),r=[],i=[],a=[],o=[];for(let n of t){let t=this.specs.indexOf(n),s;t<0?(s=n(e.view),o.push(s)):(s=this.panels[t],s.update&&s.update(e)),r.push(s),(s.top?i:a).push(s)}this.specs=t,this.panels=r,this.top.sync(i),this.bottom.sync(a);for(let e of o)e.dom.classList.add(`cm-panel`),e.mount&&e.mount()}else for(let t of this.panels)t.update&&t.update(e)}destroy(){this.top.sync([]),this.bottom.sync([])}},{provide:e=>V.scrollMargins.of(t=>{let n=t.plugin(e);return n&&{top:n.top.scrollMargin(),bottom:n.bottom.scrollMargin()}})}),Qc=class{constructor(e,t,n){this.view=e,this.top=t,this.container=n,this.dom=void 0,this.classes=``,this.panels=[],this.syncClasses()}sync(e){for(let t of this.panels)t.destroy&&e.indexOf(t)<0&&t.destroy();this.panels=e,this.syncDOM()}syncDOM(){if(this.panels.length==0){this.dom&&=(this.dom.remove(),void 0);return}if(!this.dom){this.dom=document.createElement(`div`),this.dom.className=this.top?`cm-panels cm-panels-top`:`cm-panels cm-panels-bottom`;let e=this.container||this.view.dom;e.insertBefore(this.dom,this.top?e.firstChild:null)}let e=this.dom.firstChild;for(let t of this.panels)if(t.dom.parentNode==this.dom){for(;e!=t.dom;)e=$c(e);e=e.nextSibling}else this.dom.insertBefore(t.dom,e);for(;e;)e=$c(e)}scrollMargin(){return!this.dom||this.container?0:Math.max(0,this.top?this.dom.getBoundingClientRect().bottom-Math.max(0,this.view.scrollDOM.getBoundingClientRect().top):Math.min(innerHeight,this.view.scrollDOM.getBoundingClientRect().bottom)-this.dom.getBoundingClientRect().top)}syncClasses(){if(this.container&&this.classes!=this.view.themeClasses){for(let e of this.classes.split(` `))e&&this.container.classList.remove(e);for(let e of(this.classes=this.view.themeClasses).split(` `))e&&this.container.classList.add(e)}}};function $c(e){let t=e.nextSibling;return e.remove(),t}var el=A.define({enables:Zc}),tl=class extends rn{compare(e){return this==e||this.constructor==e.constructor&&this.eq(e)}eq(e){return!1}destroy(e){}};tl.prototype.elementClass=``,tl.prototype.toDOM=void 0,tl.prototype.mapMode=rt.TrackBefore,tl.prototype.startSide=tl.prototype.endSide=-1,tl.prototype.point=!0;var nl=A.define(),rl=A.define(),il={class:``,renderEmptyElements:!1,elementStyle:``,markers:()=>N.empty,lineMarker:()=>null,widgetMarker:()=>null,lineMarkerChange:null,initialSpacer:null,updateSpacer:null,domEventHandlers:{},side:`before`},al=A.define();function ol(e){return[cl(),al.of({...il,...e})]}var sl=A.define({combine:e=>e.some(e=>e)});function cl(e){let t=[ll];return e&&e.fixed===!1&&t.push(sl.of(!0)),t}var ll=Ti.fromClass(class{constructor(e){this.view=e,this.domAfter=null,this.prevViewport=e.viewport,this.dom=document.createElement(`div`),this.dom.className=`cm-gutters cm-gutters-before`,this.dom.setAttribute(`aria-hidden`,`true`),this.dom.style.minHeight=this.view.contentHeight/this.view.scaleY+`px`,this.gutters=e.state.facet(al).map(t=>new pl(e,t)),this.fixed=!e.state.facet(sl);for(let e of this.gutters)e.config.side==`after`?this.getDOMAfter().appendChild(e.dom):this.dom.appendChild(e.dom);this.fixed&&(this.dom.style.position=`sticky`),this.syncGutters(!1),e.scrollDOM.insertBefore(this.dom,e.contentDOM)}getDOMAfter(){return this.domAfter||(this.domAfter=document.createElement(`div`),this.domAfter.className=`cm-gutters cm-gutters-after`,this.domAfter.setAttribute(`aria-hidden`,`true`),this.domAfter.style.minHeight=this.view.contentHeight/this.view.scaleY+`px`,this.domAfter.style.position=this.fixed?`sticky`:``,this.view.scrollDOM.appendChild(this.domAfter)),this.domAfter}update(e){if(this.updateGutters(e)){let t=this.prevViewport,n=e.view.viewport,r=Math.min(t.to,n.to)-Math.max(t.from,n.from);this.syncGutters(r<(n.to-n.from)*.8)}if(e.geometryChanged){let e=this.view.contentHeight/this.view.scaleY+`px`;this.dom.style.minHeight=e,this.domAfter&&(this.domAfter.style.minHeight=e)}this.view.state.facet(sl)!=!this.fixed&&(this.fixed=!this.fixed,this.dom.style.position=this.fixed?`sticky`:``,this.domAfter&&(this.domAfter.style.position=this.fixed?`sticky`:``)),this.prevViewport=e.view.viewport}syncGutters(e){let t=this.dom.nextSibling;e&&(this.dom.remove(),this.domAfter&&this.domAfter.remove());let n=N.iter(this.view.state.facet(nl),this.view.viewport.from),r=[],i=this.gutters.map(e=>new fl(e,this.view.viewport,-this.view.documentPadding.top));for(let e of this.view.viewportLineBlocks)if(r.length&&(r=[]),Array.isArray(e.type)){let t=!0;for(let a of e.type)if(a.type==F.Text&&t){dl(n,r,a.from);for(let e of i)e.line(this.view,a,r);t=!1}else if(a.widget)for(let e of i)e.widget(this.view,a)}else if(e.type==F.Text){dl(n,r,e.from);for(let t of i)t.line(this.view,e,r)}else if(e.widget)for(let t of i)t.widget(this.view,e);for(let e of i)e.finish();e&&(this.view.scrollDOM.insertBefore(this.dom,t),this.domAfter&&this.view.scrollDOM.appendChild(this.domAfter))}updateGutters(e){let t=e.startState.facet(al),n=e.state.facet(al),r=e.docChanged||e.heightChanged||e.viewportChanged||!N.eq(e.startState.facet(nl),e.state.facet(nl),e.view.viewport.from,e.view.viewport.to);if(t==n)for(let t of this.gutters)t.update(e)&&(r=!0);else{r=!0;let i=[];for(let r of n){let n=t.indexOf(r);n<0?i.push(new pl(this.view,r)):(this.gutters[n].update(e),i.push(this.gutters[n]))}for(let e of this.gutters)e.dom.remove(),i.indexOf(e)<0&&e.destroy();for(let e of i)e.config.side==`after`?this.getDOMAfter().appendChild(e.dom):this.dom.appendChild(e.dom);this.gutters=i}return r}destroy(){for(let e of this.gutters)e.destroy();this.dom.remove(),this.domAfter&&this.domAfter.remove()}},{provide:e=>V.scrollMargins.of(t=>{let n=t.plugin(e);if(!n||n.gutters.length==0||!n.fixed)return null;let r=n.dom.offsetWidth*t.scaleX,i=n.domAfter?n.domAfter.offsetWidth*t.scaleX:0;return t.textDirection==L.LTR?{left:r,right:i}:{right:r,left:i}})});function ul(e){return Array.isArray(e)?e:[e]}function dl(e,t,n){for(;e.value&&e.from<=n;)e.from==n&&t.push(e.value),e.next()}var fl=class{constructor(e,t,n){this.gutter=e,this.height=n,this.i=0,this.cursor=N.iter(e.markers,t.from)}addElement(e,t,n){let{gutter:r}=this,i=(t.top-this.height)/e.scaleY,a=t.height/e.scaleY;if(this.i==r.elements.length){let t=new ml(e,a,i,n);r.elements.push(t),r.dom.appendChild(t.dom)}else r.elements[this.i].update(e,a,i,n);this.height=t.bottom,this.i++}line(e,t,n){let r=[];dl(this.cursor,r,t.from),n.length&&(r=r.concat(n));let i=this.gutter.config.lineMarker(e,t,r);i&&r.unshift(i);let a=this.gutter;(r.length!=0||a.config.renderEmptyElements)&&this.addElement(e,t,r)}widget(e,t){let n=this.gutter.config.widgetMarker(e,t.widget,t),r=n?[n]:null;for(let n of e.state.facet(rl)){let i=n(e,t.widget,t);i&&(r||=[]).push(i)}r&&this.addElement(e,t,r)}finish(){let e=this.gutter;for(;e.elements.length>this.i;){let t=e.elements.pop();e.dom.removeChild(t.dom),t.destroy()}}},pl=class{constructor(e,t){this.view=e,this.config=t,this.elements=[],this.spacer=null,this.dom=document.createElement(`div`),this.dom.className=`cm-gutter`+(this.config.class?` `+this.config.class:``);for(let n in t.domEventHandlers)this.dom.addEventListener(n,r=>{let i=r.target,a;if(i!=this.dom&&this.dom.contains(i)){for(;i.parentNode!=this.dom;)i=i.parentNode;let e=i.getBoundingClientRect();a=(e.top+e.bottom)/2}else a=r.clientY;let o=e.lineBlockAtHeight(a-e.documentTop);t.domEventHandlers[n](e,o,r)&&r.preventDefault()});this.markers=ul(t.markers(e)),t.initialSpacer&&(this.spacer=new ml(e,0,0,[t.initialSpacer(e)]),this.dom.appendChild(this.spacer.dom),this.spacer.dom.style.cssText+=`visibility: hidden; pointer-events: none`)}update(e){let t=this.markers;if(this.markers=ul(this.config.markers(e.view)),this.spacer&&this.config.updateSpacer){let t=this.config.updateSpacer(this.spacer.markers[0],e);t!=this.spacer.markers[0]&&this.spacer.update(e.view,0,0,[t])}let n=e.view.viewport;return!N.eq(this.markers,t,n.from,n.to)||(this.config.lineMarkerChange?this.config.lineMarkerChange(e):!1)}destroy(){for(let e of this.elements)e.destroy()}},ml=class{constructor(e,t,n,r){this.height=-1,this.above=0,this.markers=[],this.dom=document.createElement(`div`),this.dom.className=`cm-gutterElement`,this.update(e,t,n,r)}update(e,t,n,r){this.height!=t&&(this.height=t,this.dom.style.height=t+`px`),this.above!=n&&(this.dom.style.marginTop=(this.above=n)?n+`px`:``),hl(this.markers,r)||this.setMarkers(e,r)}setMarkers(e,t){let n=`cm-gutterElement`,r=this.dom.firstChild;for(let i=0,a=0;;){let o=a,s=i<t.length?t[i++]:null,c=!1;if(s){let e=s.elementClass;e&&(n+=` `+e);for(let e=a;e<this.markers.length;e++)if(this.markers[e].compare(s)){o=e,c=!0;break}}else o=this.markers.length;for(;a<o;){let e=this.markers[a++];if(e.toDOM){e.destroy(r);let t=r.nextSibling;r.remove(),r=t}}if(!s)break;s.toDOM&&(c?r=r.nextSibling:this.dom.insertBefore(s.toDOM(e),r)),c&&a++}this.dom.className=n,this.markers=t}destroy(){this.setMarkers(null,[])}};function hl(e,t){if(e.length!=t.length)return!1;for(let n=0;n<e.length;n++)if(!e[n].compare(t[n]))return!1;return!0}var gl=A.define(),_l=A.define(),vl=A.define({combine(e){return nn(e,{formatNumber:String,domEventHandlers:{}},{domEventHandlers(e,t){let n=Object.assign({},e);for(let e in t){let r=n[e],i=t[e];n[e]=r?(e,t,n)=>r(e,t,n)||i(e,t,n):i}return n}})}}),yl=class extends tl{constructor(e){super(),this.number=e}eq(e){return this.number==e.number}toDOM(){return document.createTextNode(this.number)}};function bl(e,t){return e.state.facet(vl).formatNumber(t,e.state)}var xl=al.compute([vl],e=>({class:`cm-lineNumbers`,renderEmptyElements:!1,markers(e){return e.state.facet(gl)},lineMarker(e,t,n){return n.some(e=>e.toDOM)?null:new yl(bl(e,e.state.doc.lineAt(t.from).number))},widgetMarker:(e,t,n)=>{for(let r of e.state.facet(_l)){let i=r(e,t,n);if(i)return i}return null},lineMarkerChange:e=>e.startState.facet(vl)!=e.state.facet(vl),initialSpacer(e){return new yl(bl(e,Cl(e.state.doc.lines)))},updateSpacer(e,t){let n=bl(t.view,Cl(t.view.state.doc.lines));return n==e.number?e:new yl(n)},domEventHandlers:e.facet(vl).domEventHandlers,side:`before`}));function Sl(e={}){return[vl.of(e),cl(),xl]}function Cl(e){let t=9;for(;t<e;)t=t*10+9;return t}var wl=1024,Tl=0,El=class{constructor(e,t){this.from=e,this.to=t}},H=class{constructor(e={}){this.id=Tl++,this.perNode=!!e.perNode,this.deserialize=e.deserialize||(()=>{throw Error(`This node type doesn't define a deserialize function`)}),this.combine=e.combine||null}add(e){if(this.perNode)throw RangeError(`Can't add per-node props to node types`);return typeof e!=`function`&&(e=kl.match(e)),t=>{let n=e(t);return n===void 0?null:[this,n]}}};H.closedBy=new H({deserialize:e=>e.split(` `)}),H.openedBy=new H({deserialize:e=>e.split(` `)}),H.group=new H({deserialize:e=>e.split(` `)}),H.isolate=new H({deserialize:e=>{if(e&&e!=`rtl`&&e!=`ltr`&&e!=`auto`)throw RangeError(`Invalid value for isolate: `+e);return e||`auto`}}),H.contextHash=new H({perNode:!0}),H.lookAhead=new H({perNode:!0}),H.mounted=new H({perNode:!0});var Dl=class{constructor(e,t,n,r=!1){this.tree=e,this.overlay=t,this.parser=n,this.bracketed=r}static get(e){return e&&e.props&&e.props[H.mounted.id]}},Ol=Object.create(null),kl=class e{constructor(e,t,n,r=0){this.name=e,this.props=t,this.id=n,this.flags=r}static define(t){let n=t.props&&t.props.length?Object.create(null):Ol,r=+!!t.top|(t.skipped?2:0)|(t.error?4:0)|(t.name==null?8:0),i=new e(t.name||``,n,t.id,r);if(t.props){for(let e of t.props)if(Array.isArray(e)||(e=e(i)),e){if(e[0].perNode)throw RangeError(`Can't store a per-node prop on a node type`);n[e[0].id]=e[1]}}return i}prop(e){return this.props[e.id]}get isTop(){return(this.flags&1)>0}get isSkipped(){return(this.flags&2)>0}get isError(){return(this.flags&4)>0}get isAnonymous(){return(this.flags&8)>0}is(e){if(typeof e==`string`){if(this.name==e)return!0;let t=this.prop(H.group);return t?t.indexOf(e)>-1:!1}return this.id==e}static match(e){let t=Object.create(null);for(let n in e)for(let r of n.split(` `))t[r]=e[n];return e=>{for(let n=e.prop(H.group),r=-1;r<(n?n.length:0);r++){let i=t[r<0?e.name:n[r]];if(i)return i}}}};kl.none=new kl(``,Object.create(null),0,8);var Al=class e{constructor(e){this.types=e;for(let t=0;t<e.length;t++)if(e[t].id!=t)throw RangeError(`Node type ids should correspond to array positions when creating a node set`)}extend(...t){let n=[];for(let e of this.types){let r=null;for(let n of t){let t=n(e);if(t){r||=Object.assign({},e.props);let n=t[1],i=t[0];i.combine&&i.id in r&&(n=i.combine(r[i.id],n)),r[i.id]=n}}n.push(r?new kl(e.name,r,e.id,e.flags):e)}return new e(n)}},jl=new WeakMap,Ml=new WeakMap,U;(function(e){e[e.ExcludeBuffers=1]=`ExcludeBuffers`,e[e.IncludeAnonymous=2]=`IncludeAnonymous`,e[e.IgnoreMounts=4]=`IgnoreMounts`,e[e.IgnoreOverlays=8]=`IgnoreOverlays`,e[e.EnterBracketed=16]=`EnterBracketed`})(U||={});var W=class e{constructor(e,t,n,r,i){if(this.type=e,this.children=t,this.positions=n,this.length=r,this.props=null,i&&i.length){this.props=Object.create(null);for(let[e,t]of i)this.props[typeof e==`number`?e:e.id]=t}}toString(){let e=Dl.get(this);if(e&&!e.overlay)return e.tree.toString();let t=``;for(let e of this.children){let n=e.toString();n&&(t&&(t+=`,`),t+=n)}return this.type.name?(/\W/.test(this.type.name)&&!this.type.isError?JSON.stringify(this.type.name):this.type.name)+(t.length?`(`+t+`)`:``):t}cursor(e=0){return new Kl(this.topNode,e)}cursorAt(e,t=0,n=0){let r=new Kl(jl.get(this)||this.topNode);return r.moveTo(e,t),jl.set(this,r._tree),r}get topNode(){return new Rl(this,0,0,null)}resolve(e,t=0){let n=Il(jl.get(this)||this.topNode,e,t,!1);return jl.set(this,n),n}resolveInner(e,t=0){let n=Il(Ml.get(this)||this.topNode,e,t,!0);return Ml.set(this,n),n}resolveStack(e,t=0){return Gl(this,e,t)}iterate(e){let{enter:t,leave:n,from:r=0,to:i=this.length}=e,a=e.mode||0,o=(a&U.IncludeAnonymous)>0;for(let e=this.cursor(a|U.IncludeAnonymous);;){let a=!1;if(e.from<=i&&e.to>=r&&(!o&&e.type.isAnonymous||t(e)!==!1)){if(e.firstChild())continue;a=!0}for(;a&&n&&(o||!e.type.isAnonymous)&&n(e),!e.nextSibling();){if(!e.parent())return;a=!0}}}prop(e){return e.perNode?this.props?this.props[e.id]:void 0:this.type.prop(e)}get propValues(){let e=[];if(this.props)for(let t in this.props)e.push([+t,this.props[t]]);return e}balance(t={}){return this.children.length<=8?this:Zl(kl.none,this.children,this.positions,0,this.children.length,0,this.length,(t,n,r)=>new e(this.type,t,n,r,this.propValues),t.makeTree||((t,n,r)=>new e(kl.none,t,n,r)))}static build(e){return Jl(e)}};W.empty=new W(kl.none,[],[],0);var Nl=class e{constructor(e,t){this.buffer=e,this.index=t}get id(){return this.buffer[this.index-4]}get start(){return this.buffer[this.index-3]}get end(){return this.buffer[this.index-2]}get size(){return this.buffer[this.index-1]}get pos(){return this.index}next(){this.index-=4}fork(){return new e(this.buffer,this.index)}},Pl=class e{constructor(e,t,n){this.buffer=e,this.length=t,this.set=n}get type(){return kl.none}toString(){let e=[];for(let t=0;t<this.buffer.length;)e.push(this.childString(t)),t=this.buffer[t+3];return e.join(`,`)}childString(e){let t=this.buffer[e],n=this.buffer[e+3],r=this.set.types[t],i=r.name;if(/\W/.test(i)&&!r.isError&&(i=JSON.stringify(i)),e+=4,n==e)return i;let a=[];for(;e<n;)a.push(this.childString(e)),e=this.buffer[e+3];return i+`(`+a.join(`,`)+`)`}findChild(e,t,n,r,i){let{buffer:a}=this,o=-1;for(let s=e;s!=t&&!(Fl(i,r,a[s+1],a[s+2])&&(o=s,n>0));s=a[s+3]);return o}slice(t,n,r){let i=this.buffer,a=new Uint16Array(n-t),o=0;for(let e=t,s=0;e<n;){a[s++]=i[e++],a[s++]=i[e++]-r;let n=a[s++]=i[e++]-r;a[s++]=i[e++]-t,o=Math.max(o,n)}return new e(a,o,this.set)}};function Fl(e,t,n,r){switch(e){case-2:return n<t;case-1:return r>=t&&n<t;case 0:return n<t&&r>t;case 1:return n<=t&&r>t;case 2:return r>t;case 4:return!0}}function Il(e,t,n,r){for(;e.from==e.to||(n<1?e.from>=t:e.from>t)||(n>-1?e.to<=t:e.to<t);){let t=!r&&e instanceof Rl&&e.index<0?null:e.parent;if(!t)return e;e=t}let i=r?0:U.IgnoreOverlays;if(r)for(let r=e,a=r.parent;a;r=a,a=r.parent)r instanceof Rl&&r.index<0&&a.enter(t,n,i)?.from!=r.from&&(e=a);for(;;){let r=e.enter(t,n,i);if(!r)return e;e=r}}var Ll=class{cursor(e=0){return new Kl(this,e)}getChild(e,t=null,n=null){let r=zl(this,e,t,n);return r.length?r[0]:null}getChildren(e,t=null,n=null){return zl(this,e,t,n)}resolve(e,t=0){return Il(this,e,t,!1)}resolveInner(e,t=0){return Il(this,e,t,!0)}matchContext(e){return Bl(this.parent,e)}enterUnfinishedNodesBefore(e){let t=this.childBefore(e),n=this;for(;t;){let e=t.lastChild;if(!e||e.to!=t.to)break;e.type.isError&&e.from==e.to?(n=t,t=e.prevSibling):t=e}return n}get node(){return this}get next(){return this.parent}},Rl=class e extends Ll{constructor(e,t,n,r){super(),this._tree=e,this.from=t,this.index=n,this._parent=r}get type(){return this._tree.type}get name(){return this._tree.type.name}get to(){return this.from+this._tree.length}nextChild(t,n,r,i,a=0){for(let o=this;;){for(let{children:s,positions:c}=o._tree,l=n>0?s.length:-1;t!=l;t+=n){let l=s[t],u=c[t]+o.from,d;if(a&U.EnterBracketed&&l instanceof W&&(d=Dl.get(l))&&!d.overlay&&d.bracketed&&r>=u&&r<=u+l.length||Fl(i,r,u,u+l.length)){if(l instanceof Pl){if(a&U.ExcludeBuffers)continue;let e=l.findChild(0,l.buffer.length,n,r-u,i);if(e>-1)return new Hl(new Vl(o,l,t,u),null,e)}else if(a&U.IncludeAnonymous||!l.type.isAnonymous||ql(l)){let s;if(!(a&U.IgnoreMounts)&&(s=Dl.get(l))&&!s.overlay)return new e(s.tree,u,t,o);let c=new e(l,u,t,o);return a&U.IncludeAnonymous||!c.type.isAnonymous?c:c.nextChild(n<0?l.children.length-1:0,n,r,i,a)}}}if(a&U.IncludeAnonymous||!o.type.isAnonymous||(t=o.index>=0?o.index+n:n<0?-1:o._parent._tree.children.length,o=o._parent,!o))return null}}get firstChild(){return this.nextChild(0,1,0,4)}get lastChild(){return this.nextChild(this._tree.children.length-1,-1,0,4)}childAfter(e){return this.nextChild(0,1,e,2)}childBefore(e){return this.nextChild(this._tree.children.length-1,-1,e,-2)}prop(e){return this._tree.prop(e)}enter(t,n,r=0){let i;if(!(r&U.IgnoreOverlays)&&(i=Dl.get(this._tree))&&i.overlay){let a=t-this.from,o=r&U.EnterBracketed&&i.bracketed;for(let{from:t,to:r}of i.overlay)if((n>0||o?t<=a:t<a)&&(n<0||o?r>=a:r>a))return new e(i.tree,i.overlay[0].from+this.from,-1,this)}return this.nextChild(0,1,t,n,r)}nextSignificantParent(){let e=this;for(;e.type.isAnonymous&&e._parent;)e=e._parent;return e}get parent(){return this._parent?this._parent.nextSignificantParent():null}get nextSibling(){return this._parent&&this.index>=0?this._parent.nextChild(this.index+1,1,0,4):null}get prevSibling(){return this._parent&&this.index>=0?this._parent.nextChild(this.index-1,-1,0,4):null}get tree(){return this._tree}toTree(){return this._tree}toString(){return this._tree.toString()}};function zl(e,t,n,r){let i=e.cursor(),a=[];if(!i.firstChild())return a;if(n!=null){for(let e=!1;!e;)if(e=i.type.is(n),!i.nextSibling())return a}for(;;){if(r!=null&&i.type.is(r))return a;if(i.type.is(t)&&a.push(i.node),!i.nextSibling())return r==null?a:[]}}function Bl(e,t,n=t.length-1){for(let r=e;n>=0;r=r.parent){if(!r)return!1;if(!r.type.isAnonymous){if(t[n]&&t[n]!=r.name)return!1;n--}}return!0}var Vl=class{constructor(e,t,n,r){this.parent=e,this.buffer=t,this.index=n,this.start=r}},Hl=class e extends Ll{get name(){return this.type.name}get from(){return this.context.start+this.context.buffer.buffer[this.index+1]}get to(){return this.context.start+this.context.buffer.buffer[this.index+2]}constructor(e,t,n){super(),this.context=e,this._parent=t,this.index=n,this.type=e.buffer.set.types[e.buffer.buffer[n]]}child(t,n,r){let{buffer:i}=this.context,a=i.findChild(this.index+4,i.buffer[this.index+3],t,n-this.context.start,r);return a<0?null:new e(this.context,this,a)}get firstChild(){return this.child(1,0,4)}get lastChild(){return this.child(-1,0,4)}childAfter(e){return this.child(1,e,2)}childBefore(e){return this.child(-1,e,-2)}prop(e){return this.type.prop(e)}enter(t,n,r=0){if(r&U.ExcludeBuffers)return null;let{buffer:i}=this.context,a=i.findChild(this.index+4,i.buffer[this.index+3],n>0?1:-1,t-this.context.start,n);return a<0?null:new e(this.context,this,a)}get parent(){return this._parent||this.context.parent.nextSignificantParent()}externalSibling(e){return this._parent?null:this.context.parent.nextChild(this.context.index+e,e,0,4)}get nextSibling(){let{buffer:t}=this.context,n=t.buffer[this.index+3];return n<(this._parent?t.buffer[this._parent.index+3]:t.buffer.length)?new e(this.context,this._parent,n):this.externalSibling(1)}get prevSibling(){let{buffer:t}=this.context,n=this._parent?this._parent.index+4:0;return this.index==n?this.externalSibling(-1):new e(this.context,this._parent,t.findChild(n,this.index,-1,0,4))}get tree(){return null}toTree(){let e=[],t=[],{buffer:n}=this.context,r=this.index+4,i=n.buffer[this.index+3];if(i>r){let a=n.buffer[this.index+1];e.push(n.slice(r,i,a)),t.push(0)}return new W(this.type,e,t,this.to-this.from)}toString(){return this.context.buffer.childString(this.index)}};function Ul(e){if(!e.length)return null;let t=0,n=e[0];for(let r=1;r<e.length;r++){let i=e[r];(i.from>n.from||i.to<n.to)&&(n=i,t=r)}let r=n instanceof Rl&&n.index<0?null:n.parent,i=e.slice();return r?i[t]=r:i.splice(t,1),new Wl(i,n)}var Wl=class{constructor(e,t){this.heads=e,this.node=t}get next(){return Ul(this.heads)}};function Gl(e,t,n){let r=e.resolveInner(t,n),i=null;for(let e=r instanceof Rl?r:r.context.parent;e;e=e.parent)if(e.index<0){let a=e.parent;(i||=[r]).push(a.resolve(t,n)),e=a}else{let a=Dl.get(e.tree);if(a&&a.overlay&&a.overlay[0].from<=t&&a.overlay[a.overlay.length-1].to>=t){let o=new Rl(a.tree,a.overlay[0].from+e.from,-1,e);(i||=[r]).push(Il(o,t,n,!1))}}return i?Ul(i):r}var Kl=class{get name(){return this.type.name}constructor(e,t=0){if(this.buffer=null,this.stack=[],this.index=0,this.bufferNode=null,this.mode=t&~U.EnterBracketed,e instanceof Rl)this.yieldNode(e);else{this._tree=e.context.parent,this.buffer=e.context;for(let t=e._parent;t;t=t._parent)this.stack.unshift(t.index);this.bufferNode=e,this.yieldBuf(e.index)}}yieldNode(e){return e?(this._tree=e,this.type=e.type,this.from=e.from,this.to=e.to,!0):!1}yieldBuf(e,t){this.index=e;let{start:n,buffer:r}=this.buffer;return this.type=t||r.set.types[r.buffer[e]],this.from=n+r.buffer[e+1],this.to=n+r.buffer[e+2],!0}yield(e){return e?e instanceof Rl?(this.buffer=null,this.yieldNode(e)):(this.buffer=e.context,this.yieldBuf(e.index,e.type)):!1}toString(){return this.buffer?this.buffer.buffer.childString(this.index):this._tree.toString()}enterChild(e,t,n){if(!this.buffer)return this.yield(this._tree.nextChild(e<0?this._tree._tree.children.length-1:0,e,t,n,this.mode));let{buffer:r}=this.buffer,i=r.findChild(this.index+4,r.buffer[this.index+3],e,t-this.buffer.start,n);return i<0?!1:(this.stack.push(this.index),this.yieldBuf(i))}firstChild(){return this.enterChild(1,0,4)}lastChild(){return this.enterChild(-1,0,4)}childAfter(e){return this.enterChild(1,e,2)}childBefore(e){return this.enterChild(-1,e,-2)}enter(e,t,n=this.mode){return this.buffer?n&U.ExcludeBuffers?!1:this.enterChild(1,e,t):this.yield(this._tree.enter(e,t,n))}parent(){if(!this.buffer)return this.yieldNode(this.mode&U.IncludeAnonymous?this._tree._parent:this._tree.parent);if(this.stack.length)return this.yieldBuf(this.stack.pop());let e=this.mode&U.IncludeAnonymous?this.buffer.parent:this.buffer.parent.nextSignificantParent();return this.buffer=null,this.yieldNode(e)}sibling(e){if(!this.buffer)return this._tree._parent?this.yield(this._tree.index<0?null:this._tree._parent.nextChild(this._tree.index+e,e,0,4,this.mode)):!1;let{buffer:t}=this.buffer,n=this.stack.length-1;if(e<0){let e=n<0?0:this.stack[n]+4;if(this.index!=e)return this.yieldBuf(t.findChild(e,this.index,-1,0,4))}else{let e=t.buffer[this.index+3];if(e<(n<0?t.buffer.length:t.buffer[this.stack[n]+3]))return this.yieldBuf(e)}return n<0&&this.yield(this.buffer.parent.nextChild(this.buffer.index+e,e,0,4,this.mode))}nextSibling(){return this.sibling(1)}prevSibling(){return this.sibling(-1)}atLastNode(e){let t,n,{buffer:r}=this;if(r){if(e>0){if(this.index<r.buffer.buffer.length)return!1}else for(let e=0;e<this.index;e++)if(r.buffer.buffer[e+3]<this.index)return!1;({index:t,parent:n}=r)}else({index:t,_parent:n}=this._tree);for(;n;{index:t,_parent:n}=n)if(t>-1)for(let r=t+e,i=e<0?-1:n._tree.children.length;r!=i;r+=e){let e=n._tree.children[r];if(this.mode&U.IncludeAnonymous||e instanceof Pl||!e.type.isAnonymous||ql(e))return!1}return!0}move(e,t){if(t&&this.enterChild(e,0,4))return!0;for(;;){if(this.sibling(e))return!0;if(this.atLastNode(e)||!this.parent())return!1}}next(e=!0){return this.move(1,e)}prev(e=!0){return this.move(-1,e)}moveTo(e,t=0){for(;(this.from==this.to||(t<1?this.from>=e:this.from>e)||(t>-1?this.to<=e:this.to<e))&&this.parent(););for(;this.enterChild(1,e,t););return this}get node(){if(!this.buffer)return this._tree;let e=this.bufferNode,t=null,n=0;if(e&&e.context==this.buffer)scan:for(let r=this.index,i=this.stack.length;i>=0;){for(let a=e;a;a=a._parent)if(a.index==r){if(r==this.index)return a;t=a,n=i+1;break scan}r=this.stack[--i]}for(let e=n;e<this.stack.length;e++)t=new Hl(this.buffer,t,this.stack[e]);return this.bufferNode=new Hl(this.buffer,t,this.index)}get tree(){return this.buffer?null:this._tree._tree}iterate(e,t){for(let n=0;;){let r=!1;if(this.type.isAnonymous||e(this)!==!1){if(this.firstChild()){n++;continue}this.type.isAnonymous||(r=!0)}for(;;){if(r&&t&&t(this),r=this.type.isAnonymous,!n)return;if(this.nextSibling())break;this.parent(),n--,r=!0}}}matchContext(e){if(!this.buffer)return Bl(this.node.parent,e);let{buffer:t}=this.buffer,{types:n}=t.set;for(let r=e.length-1,i=this.stack.length-1;r>=0;i--){if(i<0)return Bl(this._tree,e,r);let a=n[t.buffer[this.stack[i]]];if(!a.isAnonymous){if(e[r]&&e[r]!=a.name)return!1;r--}}return!0}};function ql(e){return e.children.some(e=>e instanceof Pl||!e.type.isAnonymous||ql(e))}function Jl(e){let{buffer:t,nodeSet:n,maxBufferLength:r=wl,reused:i=[],minRepeatType:a=n.types.length}=e,o=Array.isArray(t)?new Nl(t,t.length):t,s=n.types,c=0,l=0;function u(e,t,_,v,y,b){let{id:x,start:S,end:ee,size:te}=o,C=l,ne=c;if(te<0){if(o.next(),te==-1){let t=i[x];_.push(t),v.push(S-e);return}if(te==-3){c=x;return}if(te==-4){l=x;return}throw RangeError(`Unrecognized record size: ${te}`)}let re=s[x],ie,ae,oe=S-e;if(ee-S<=r&&(ae=h(o.pos-t,y))){let t=new Uint16Array(ae.size-ae.skip),r=o.pos-ae.size,i=t.length;for(;o.pos>r;)i=g(ae.start,t,i);ie=new Pl(t,ee-ae.start,n),oe=ae.start-e}else{let e=o.pos-te;o.next();let t=[],n=[],i=x>=a?x:-1,s=0,c=ee;for(;o.pos>e;)i>=0&&o.id==i&&o.size>=0?(o.end<=c-r&&(p(t,n,S,s,o.end,c,i,C,ne),s=t.length,c=o.end),o.next()):b>2500?d(S,e,t,n):u(S,e,t,n,i,b+1);if(i>=0&&s>0&&s<t.length&&p(t,n,S,s,S,c,i,C,ne),t.reverse(),n.reverse(),i>-1&&s>0){let e=f(re,ne);ie=Zl(re,t,n,0,t.length,0,ee-S,e,e)}else ie=m(re,t,n,ee-S,C-ee,ne)}_.push(ie),v.push(oe)}function d(e,t,i,a){let s=[],c=0,l=-1;for(;o.pos>t;){let{id:e,start:t,end:n,size:i}=o;if(i>4)o.next();else if(l>-1&&t<l)break;else l<0&&(l=n-r),s.push(e,t,n),c++,o.next()}if(c){let t=new Uint16Array(c*4),r=s[s.length-2];for(let e=s.length-3,n=0;e>=0;e-=3)t[n++]=s[e],t[n++]=s[e+1]-r,t[n++]=s[e+2]-r,t[n++]=n;i.push(new Pl(t,s[2]-r,n)),a.push(r-e)}}function f(e,t){return(n,r,i)=>{let a=0,o=n.length-1,s,c;if(o>=0&&(s=n[o])instanceof W){if(!o&&s.type==e&&s.length==i)return s;(c=s.prop(H.lookAhead))&&(a=r[o]+s.length+c)}return m(e,n,r,i,a,t)}}function p(e,t,r,i,a,o,s,c,l){let u=[],d=[];for(;e.length>i;)u.push(e.pop()),d.push(t.pop()+r-a);e.push(m(n.types[s],u,d,o-a,c-o,l)),t.push(a-r)}function m(e,t,n,r,i,a,o){if(a){let e=[H.contextHash,a];o=o?[e].concat(o):[e]}if(i>25){let e=[H.lookAhead,i];o=o?[e].concat(o):[e]}return new W(e,t,n,r,o)}function h(e,t){let n=o.fork(),i=0,s=0,c=0,l=n.end-r,u={size:0,start:0,skip:0};scan:for(let r=n.pos-e;n.pos>r;){let e=n.size;if(n.id==t&&e>=0){u.size=i,u.start=s,u.skip=c,c+=4,i+=4,n.next();continue}let o=n.pos-e;if(e<0||o<r||n.start<l)break;let d=n.id>=a?4:0,f=n.start;for(n.next();n.pos>o;){if(n.size<0){if(n.size==-3||n.size==-4)d+=4;else break scan}else n.id>=a&&(d+=4);n.next()}s=f,i+=e,c+=d}return(t<0||i==e)&&(u.size=i,u.start=s,u.skip=c),u.size>4?u:void 0}function g(e,t,n){let{id:r,start:i,end:s,size:u}=o;if(o.next(),u>=0&&r<a){let a=n;if(u>4){let r=o.pos-(u-4);for(;o.pos>r;)n=g(e,t,n)}t[--n]=a,t[--n]=s-e,t[--n]=i-e,t[--n]=r}else u==-3?c=r:u==-4&&(l=r);return n}let _=[],v=[];for(;o.pos>0;)u(e.start||0,e.bufferStart||0,_,v,-1,0);let y=e.length??(_.length?v[0]+_[0].length:0);return new W(s[e.topID],_.reverse(),v.reverse(),y)}var Yl=new WeakMap;function Xl(e,t){if(!e.isAnonymous||t instanceof Pl||t.type!=e)return 1;let n=Yl.get(t);if(n==null){n=1;for(let r of t.children){if(r.type!=e||!(r instanceof W)){n=1;break}n+=Xl(e,r)}Yl.set(t,n)}return n}function Zl(e,t,n,r,i,a,o,s,c){let l=0;for(let n=r;n<i;n++)l+=Xl(e,t[n]);let u=Math.ceil(l*1.5/8),d=[],f=[];function p(t,n,r,i,o){for(let s=r;s<i;){let r=s,l=n[s],m=Xl(e,t[s]);for(s++;s<i;s++){let n=Xl(e,t[s]);if(m+n>=u)break;m+=n}if(s==r+1){if(m>u){let e=t[r];p(e.children,e.positions,0,e.children.length,n[r]+o);continue}d.push(t[r])}else{let i=n[s-1]+t[s-1].length-l;d.push(Zl(e,t,n,r,s,l,i,null,c))}f.push(l+o-a)}}return p(t,n,r,i,0),(s||c)(d,f,o)}var Ql=class e{constructor(e,t,n,r,i=!1,a=!1){this.from=e,this.to=t,this.tree=n,this.offset=r,this.open=!!i|(a?2:0)}get openStart(){return(this.open&1)>0}get openEnd(){return(this.open&2)>0}static addTree(t,n=[],r=!1){let i=[new e(0,t.length,t,0,!1,r)];for(let e of n)e.to>t.length&&i.push(e);return i}static applyChanges(t,n,r=128){if(!n.length)return t;let i=[],a=1,o=t.length?t[0]:null;for(let s=0,c=0,l=0;;s++){let u=s<n.length?n[s]:null,d=u?u.fromA:1e9;if(d-c>=r)for(;o&&o.from<d;){let n=o;if(c>=n.from||d<=n.to||l){let t=Math.max(n.from,c)-l,r=Math.min(n.to,d)-l;n=t>=r?null:new e(t,r,n.tree,n.offset+l,s>0,!!u)}if(n&&i.push(n),o.to>d)break;o=a<t.length?t[a++]:null}if(!u)break;c=u.toA,l=u.toA-u.toB}return i}},$l=class{startParse(e,t,n){return typeof e==`string`&&(e=new eu(e)),n=n?n.length?n.map(e=>new El(e.from,e.to)):[new El(0,0)]:[new El(0,e.length)],this.createParse(e,t||[],n)}parse(e,t,n){let r=this.startParse(e,t,n);for(;;){let e=r.advance();if(e)return e}}},eu=class{constructor(e){this.string=e}get length(){return this.string.length}chunk(e){return this.string.slice(e)}get lineChunks(){return!1}read(e,t){return this.string.slice(e,t)}};new H({perNode:!0});var tu=0,nu=class e{constructor(e,t,n,r){this.name=e,this.set=t,this.base=n,this.modified=r,this.id=tu++}toString(){let{name:e}=this;for(let t of this.modified)t.name&&(e=`${t.name}(${e})`);return e}static define(t,n){let r=typeof t==`string`?t:`?`;if(t instanceof e&&(n=t),n?.base)throw Error(`Can not derive from a modified tag`);let i=new e(r,[],null,[]);if(i.set.push(i),n)for(let e of n.set)i.set.push(e);return i}static defineModifier(e){let t=new iu(e);return e=>e.modified.indexOf(t)>-1?e:iu.get(e.base||e,e.modified.concat(t).sort((e,t)=>e.id-t.id))}},ru=0,iu=class e{constructor(e){this.name=e,this.instances=[],this.id=ru++}static get(t,n){if(!n.length)return t;let r=n[0].instances.find(e=>e.base==t&&au(n,e.modified));if(r)return r;let i=[],a=new nu(t.name,i,t,n);for(let e of n)e.instances.push(a);let o=ou(n);for(let n of t.set)if(!n.modified.length)for(let t of o)i.push(e.get(n,t));return a}};function au(e,t){return e.length==t.length&&e.every((e,n)=>e==t[n])}function ou(e){let t=[[]];for(let n=0;n<e.length;n++)for(let r=0,i=t.length;r<i;r++)t.push(t[r].concat(e[n]));return t.sort((e,t)=>t.length-e.length)}function su(e){let t=Object.create(null);for(let n in e){let r=e[n];Array.isArray(r)||(r=[r]);for(let e of n.split(` `))if(e){let n=[],i=2,a=e;for(let t=0;;){if(a==`...`&&t>0&&t+3==e.length){i=1;break}let r=/^"(?:[^"\\]|\\.)*?"|[^\/!]+/.exec(a);if(!r)throw RangeError(`Invalid path: `+e);if(n.push(r[0]==`*`?``:r[0][0]==`"`?JSON.parse(r[0]):r[0]),t+=r[0].length,t==e.length)break;let o=e[t++];if(t==e.length&&o==`!`){i=0;break}if(o!=`/`)throw RangeError(`Invalid path: `+e);a=e.slice(t)}let o=n.length-1,s=n[o];if(!s)throw RangeError(`Invalid path: `+e);t[s]=new lu(r,i,o>0?n.slice(0,o):null).sort(t[s])}}return cu.add(t)}var cu=new H({combine(e,t){let n,r,i;for(;e||t;){if(!e||t&&e.depth<t.depth?(i=t,t=t.next):(i=e,e=e.next),n&&n.mode==i.mode&&!i.context&&!n.context)continue;let a=new lu(i.tags,i.mode,i.context);n?n.next=a:r=a,n=a}return r}}),lu=class{constructor(e,t,n,r){this.tags=e,this.mode=t,this.context=n,this.next=r}get opaque(){return this.mode==0}get inherit(){return this.mode==1}sort(e){return!e||e.depth<this.depth?(this.next=e,this):(e.next=this.sort(e.next),e)}get depth(){return this.context?this.context.length:0}};lu.empty=new lu([],2,null);function uu(e,t){let n=Object.create(null);for(let t of e)if(!Array.isArray(t.tag))n[t.tag.id]=t.class;else for(let e of t.tag)n[e.id]=t.class;let{scope:r,all:i=null}=t||{};return{style:e=>{let t=i;for(let r of e)for(let e of r.set){let r=n[e.id];if(r){t=t?t+` `+r:r;break}}return t},scope:r}}function du(e,t){let n=null;for(let r of e){let e=r.style(t);e&&(n=n?n+` `+e:e)}return n}function fu(e,t,n,r=0,i=e.length){let a=new pu(r,Array.isArray(t)?t:[t],n);a.highlightRange(e.cursor(),r,i,``,a.highlighters),a.flush(i)}var pu=class{constructor(e,t,n){this.at=e,this.highlighters=t,this.span=n,this.class=``}startSpan(e,t){t!=this.class&&(this.flush(e),e>this.at&&(this.at=e),this.class=t)}flush(e){e>this.at&&this.class&&this.span(this.at,e,this.class)}highlightRange(e,t,n,r,i){let{type:a,from:o,to:s}=e;if(o>=n||s<=t)return;a.isTop&&(i=this.highlighters.filter(e=>!e.scope||e.scope(a)));let c=r,l=mu(e)||lu.empty,u=du(i,l.tags);if(u&&(c&&(c+=` `),c+=u,l.mode==1&&(r+=(r?` `:``)+u)),this.startSpan(Math.max(t,o),c),l.opaque)return;let d=e.tree&&e.tree.prop(H.mounted);if(d&&d.overlay){let a=e.node.enter(d.overlay[0].from+o,1),l=this.highlighters.filter(e=>!e.scope||e.scope(d.tree.type)),u=e.firstChild();for(let f=0,p=o;;f++){let m=f<d.overlay.length?d.overlay[f]:null,h=m?m.from+o:s,g=Math.max(t,p),_=Math.min(n,h);if(g<_&&u)for(;e.from<_&&(this.highlightRange(e,g,_,r,i),this.startSpan(Math.min(_,e.to),c),!(e.to>=h||!e.nextSibling())););if(!m||h>n)break;p=m.to+o,p>t&&(this.highlightRange(a.cursor(),Math.max(t,m.from+o),Math.min(n,p),``,l),this.startSpan(Math.min(n,p),c))}u&&e.parent()}else if(e.firstChild()){d&&(r=``);do if(!(e.to<=t)){if(e.from>=n)break;this.highlightRange(e,t,n,r,i),this.startSpan(Math.min(n,e.to),c)}while(e.nextSibling());e.parent()}}};function mu(e){let t=e.type.prop(cu);for(;t&&t.context&&!e.matchContext(t.context);)t=t.next;return t||null}var G=nu.define,hu=G(),gu=G(),_u=G(gu),vu=G(gu),yu=G(),bu=G(yu),xu=G(yu),Su=G(),Cu=G(Su),wu=G(),Tu=G(),Eu=G(),Du=G(Eu),Ou=G(),K={comment:hu,lineComment:G(hu),blockComment:G(hu),docComment:G(hu),name:gu,variableName:G(gu),typeName:_u,tagName:G(_u),propertyName:vu,attributeName:G(vu),className:G(gu),labelName:G(gu),namespace:G(gu),macroName:G(gu),literal:yu,string:bu,docString:G(bu),character:G(bu),attributeValue:G(bu),number:xu,integer:G(xu),float:G(xu),bool:G(yu),regexp:G(yu),escape:G(yu),color:G(yu),url:G(yu),keyword:wu,self:G(wu),null:G(wu),atom:G(wu),unit:G(wu),modifier:G(wu),operatorKeyword:G(wu),controlKeyword:G(wu),definitionKeyword:G(wu),moduleKeyword:G(wu),operator:Tu,derefOperator:G(Tu),arithmeticOperator:G(Tu),logicOperator:G(Tu),bitwiseOperator:G(Tu),compareOperator:G(Tu),updateOperator:G(Tu),definitionOperator:G(Tu),typeOperator:G(Tu),controlOperator:G(Tu),punctuation:Eu,separator:G(Eu),bracket:Du,angleBracket:G(Du),squareBracket:G(Du),paren:G(Du),brace:G(Du),content:Su,heading:Cu,heading1:G(Cu),heading2:G(Cu),heading3:G(Cu),heading4:G(Cu),heading5:G(Cu),heading6:G(Cu),contentSeparator:G(Su),list:G(Su),quote:G(Su),emphasis:G(Su),strong:G(Su),link:G(Su),monospace:G(Su),strikethrough:G(Su),inserted:G(),deleted:G(),changed:G(),invalid:G(),meta:Ou,documentMeta:G(Ou),annotation:G(Ou),processingInstruction:G(Ou),definition:nu.defineModifier(`definition`),constant:nu.defineModifier(`constant`),function:nu.defineModifier(`function`),standard:nu.defineModifier(`standard`),local:nu.defineModifier(`local`),special:nu.defineModifier(`special`)};for(let e in K){let t=K[e];t instanceof nu&&(t.name=e)}uu([{tag:K.link,class:`tok-link`},{tag:K.heading,class:`tok-heading`},{tag:K.emphasis,class:`tok-emphasis`},{tag:K.strong,class:`tok-strong`},{tag:K.keyword,class:`tok-keyword`},{tag:K.atom,class:`tok-atom`},{tag:K.bool,class:`tok-bool`},{tag:K.url,class:`tok-url`},{tag:K.labelName,class:`tok-labelName`},{tag:K.inserted,class:`tok-inserted`},{tag:K.deleted,class:`tok-deleted`},{tag:K.literal,class:`tok-literal`},{tag:K.string,class:`tok-string`},{tag:K.number,class:`tok-number`},{tag:[K.regexp,K.escape,K.special(K.string)],class:`tok-string2`},{tag:K.variableName,class:`tok-variableName`},{tag:K.local(K.variableName),class:`tok-variableName tok-local`},{tag:K.definition(K.variableName),class:`tok-variableName tok-definition`},{tag:K.special(K.variableName),class:`tok-variableName2`},{tag:K.definition(K.propertyName),class:`tok-propertyName tok-definition`},{tag:K.typeName,class:`tok-typeName`},{tag:K.namespace,class:`tok-namespace`},{tag:K.className,class:`tok-className`},{tag:K.macroName,class:`tok-macroName`},{tag:K.propertyName,class:`tok-propertyName`},{tag:K.operator,class:`tok-operator`},{tag:K.comment,class:`tok-comment`},{tag:K.meta,class:`tok-meta`},{tag:K.invalid,class:`tok-invalid`},{tag:K.punctuation,class:`tok-punctuation`}]);var ku=new H;function Au(e){return A.define({combine:e?t=>t.concat(e):void 0})}var ju=new H,Mu=class{constructor(e,t,n=[],r=``){this.data=e,this.name=r,M.prototype.hasOwnProperty(`tree`)||Object.defineProperty(M.prototype,"tree",{get(){return Pu(this)}}),this.parser=t,this.extension=[Uu.of(this),M.languageData.of((e,t,n)=>{let r=Nu(e,t,n),i=r.type.prop(ku);if(!i)return[];let a=e.facet(i),o=r.type.prop(ju);if(o){let i=r.resolve(t-r.from,n);for(let t of o)if(t.test(i,e)){let n=e.facet(t.facet);return t.type==`replace`?n:n.concat(a)}}return a})].concat(n)}isActiveAt(e,t,n=-1){return Nu(e,t,n).type.prop(ku)==this.data}findRegions(e){let t=e.facet(Uu);if(t?.data==this.data)return[{from:0,to:e.doc.length}];if(!t||!t.allowsNesting)return[];let n=[],r=(e,t)=>{if(e.prop(ku)==this.data){n.push({from:t,to:t+e.length});return}let i=e.prop(H.mounted);if(i){if(i.tree.prop(ku)==this.data){if(i.overlay)for(let e of i.overlay)n.push({from:e.from+t,to:e.to+t});else n.push({from:t,to:t+e.length});return}if(i.overlay){let e=n.length;if(r(i.tree,i.overlay[0].from+t),n.length>e)return}}for(let n=0;n<e.children.length;n++){let i=e.children[n];i instanceof W&&r(i,e.positions[n]+t)}};return r(Pu(e),0),n}get allowsNesting(){return!0}};Mu.setState=j.define();function Nu(e,t,n){let r=e.facet(Uu),i=Pu(e).topNode;if(!r||r.allowsNesting)for(let e=i;e;e=e.enter(t,n,U.ExcludeBuffers|U.EnterBracketed))e.type.isTop&&(i=e);return i}function Pu(e){let t=e.field(Mu.state,!1);return t?t.tree:W.empty}var Fu=class{constructor(e){this.doc=e,this.cursorPos=0,this.string=``,this.cursor=e.iter()}get length(){return this.doc.length}syncTo(e){return this.string=this.cursor.next(e-this.cursorPos).value,this.cursorPos=e+this.string.length,this.cursorPos-this.string.length}chunk(e){return this.syncTo(e),this.string}get lineChunks(){return!0}read(e,t){let n=this.cursorPos-this.string.length;return e<n||t>=this.cursorPos?this.doc.sliceString(e,t):this.string.slice(e-n,t-n)}},Iu=null,Lu=class e{constructor(e,t,n=[],r,i,a,o,s){this.parser=e,this.state=t,this.fragments=n,this.tree=r,this.treeLen=i,this.viewport=a,this.skipped=o,this.scheduleOn=s,this.parse=null,this.tempSkipped=[]}static create(t,n,r){return new e(t,n,[],W.empty,0,r,[],null)}startParse(){return this.parser.startParse(new Fu(this.state.doc),this.fragments)}work(e,t){return t!=null&&t>=this.state.doc.length&&(t=void 0),this.tree!=W.empty&&this.isDone(t??this.state.doc.length)?(this.takeTree(),!0):this.withContext(()=>{if(typeof e==`number`){let t=Date.now()+e;e=()=>Date.now()>t}for(this.parse||=this.startParse(),t!=null&&(this.parse.stoppedAt==null||this.parse.stoppedAt>t)&&t<this.state.doc.length&&this.parse.stopAt(t);;){let n=this.parse.advance();if(n){if(this.fragments=this.withoutTempSkipped(Ql.addTree(n,this.fragments,this.parse.stoppedAt!=null)),this.treeLen=this.parse.stoppedAt??this.state.doc.length,this.tree=n,this.parse=null,this.treeLen<(t??this.state.doc.length))this.parse=this.startParse();else return!0}if(e())return!1}})}takeTree(){let e,t;this.parse&&(e=this.parse.parsedPos)>=this.treeLen&&((this.parse.stoppedAt==null||this.parse.stoppedAt>e)&&this.parse.stopAt(e),this.withContext(()=>{for(;!(t=this.parse.advance()););}),this.treeLen=e,this.tree=t,this.fragments=this.withoutTempSkipped(Ql.addTree(this.tree,this.fragments,!0)),this.parse=null)}withContext(e){let t=Iu;Iu=this;try{return e()}finally{Iu=t}}withoutTempSkipped(e){for(let t;t=this.tempSkipped.pop();)e=Ru(e,t.from,t.to);return e}changes(t,n){let{fragments:r,tree:i,treeLen:a,viewport:o,skipped:s}=this;if(this.takeTree(),!t.empty){let e=[];if(t.iterChangedRanges((t,n,r,i)=>e.push({fromA:t,toA:n,fromB:r,toB:i})),r=Ql.applyChanges(r,e),i=W.empty,a=0,o={from:t.mapPos(o.from,-1),to:t.mapPos(o.to,1)},this.skipped.length){s=[];for(let e of this.skipped){let n=t.mapPos(e.from,1),r=t.mapPos(e.to,-1);n<r&&s.push({from:n,to:r})}}}return new e(this.parser,n,r,i,a,o,s,this.scheduleOn)}updateViewport(e){if(this.viewport.from==e.from&&this.viewport.to==e.to)return!1;this.viewport=e;let t=this.skipped.length;for(let t=0;t<this.skipped.length;t++){let{from:n,to:r}=this.skipped[t];n<e.to&&r>e.from&&(this.fragments=Ru(this.fragments,n,r),this.skipped.splice(t--,1))}return this.skipped.length>=t?!1:(this.reset(),!0)}reset(){this.parse&&=(this.takeTree(),null)}skipUntilInView(e,t){this.skipped.push({from:e,to:t})}static getSkippingParser(e){return new class extends $l{createParse(t,n,r){let i=r[0].from,a=r[r.length-1].to;return{parsedPos:i,advance(){let t=Iu;if(t){for(let e of r)t.tempSkipped.push(e);e&&(t.scheduleOn=t.scheduleOn?Promise.all([t.scheduleOn,e]):e)}return this.parsedPos=a,new W(kl.none,[],[],a-i)},stoppedAt:null,stopAt(){}}}}}isDone(e){e=Math.min(e,this.state.doc.length);let t=this.fragments;return this.treeLen>=e&&t.length&&t[0].from==0&&t[0].to>=e}static get(){return Iu}};function Ru(e,t,n){return Ql.applyChanges(e,[{fromA:t,toA:n,fromB:t,toB:n}])}var zu=class e{constructor(e){this.context=e,this.tree=e.tree}apply(t){if(!t.docChanged&&this.tree==this.context.tree)return this;let n=this.context.changes(t.changes,t.state),r=this.context.treeLen==t.startState.doc.length?void 0:Math.max(t.changes.mapPos(this.context.treeLen),n.viewport.to);return n.work(20,r)||n.takeTree(),new e(n)}static init(t){let n=Math.min(3e3,t.doc.length),r=Lu.create(t.facet(Uu).parser,t,{from:0,to:n});return r.work(20,n)||r.takeTree(),new e(r)}};Mu.state=xt.define({create:zu.init,update(e,t){for(let e of t.effects)if(e.is(Mu.setState))return e.value;return t.startState.facet(Uu)==t.state.facet(Uu)?e.apply(t):zu.init(t.state)}});var Bu=e=>{let t=setTimeout(()=>e(),500);return()=>clearTimeout(t)};typeof requestIdleCallback<`u`&&(Bu=e=>{let t=-1,n=setTimeout(()=>{t=requestIdleCallback(e,{timeout:400})},100);return()=>t<0?clearTimeout(n):cancelIdleCallback(t)});var Vu=typeof navigator<`u`&&navigator.scheduling?.isInputPending?()=>navigator.scheduling.isInputPending():null,Hu=Ti.fromClass(class{constructor(e){this.view=e,this.working=null,this.workScheduled=0,this.chunkEnd=-1,this.chunkBudget=-1,this.work=this.work.bind(this),this.scheduleWork()}update(e){let t=this.view.state.field(Mu.state).context;(t.updateViewport(e.view.viewport)||this.view.viewport.to>t.treeLen)&&this.scheduleWork(),(e.docChanged||e.selectionSet)&&(this.view.hasFocus&&(this.chunkBudget+=50),this.scheduleWork()),this.checkAsyncSchedule(t)}scheduleWork(){if(this.working)return;let{state:e}=this.view,t=e.field(Mu.state);(t.tree!=t.context.tree||!t.context.isDone(e.doc.length))&&(this.working=Bu(this.work))}work(e){this.working=null;let t=Date.now();if(this.chunkEnd<t&&(this.chunkEnd<0||this.view.hasFocus)&&(this.chunkEnd=t+3e4,this.chunkBudget=3e3),this.chunkBudget<=0)return;let{state:n,viewport:{to:r}}=this.view,i=n.field(Mu.state);if(i.tree==i.context.tree&&i.context.isDone(r+1e5))return;let a=Date.now()+Math.min(this.chunkBudget,100,e&&!Vu?Math.max(25,e.timeRemaining()-5):1e9),o=i.context.treeLen<r&&n.doc.length>r+1e3,s=i.context.work(()=>Vu&&Vu()||Date.now()>a,r+(o?0:1e5));this.chunkBudget-=Date.now()-t,(s||this.chunkBudget<=0)&&(i.context.takeTree(),this.view.dispatch({effects:Mu.setState.of(new zu(i.context))})),this.chunkBudget>0&&(!s||o)&&this.scheduleWork(),this.checkAsyncSchedule(i.context)}checkAsyncSchedule(e){e.scheduleOn&&=(this.workScheduled++,e.scheduleOn.then(()=>this.scheduleWork()).catch(e=>xi(this.view.state,e)).then(()=>this.workScheduled--),null)}destroy(){this.working&&this.working()}isWorking(){return!!(this.working||this.workScheduled>0)}},{eventHandlers:{focus(){this.scheduleWork()}}}),Uu=A.define({combine(e){return e.length?e[0]:null},enables:e=>[Mu.state,Hu,V.contentAttributes.compute([e],t=>{let n=t.facet(e);return n&&n.name?{"data-language":n.name}:{}})]}),Wu=A.define(),Gu=A.define({combine:e=>{if(!e.length)return`  `;let t=e[0];if(!t||/\S/.test(t)||Array.from(t).some(e=>e!=t[0]))throw Error(`Invalid indent unit: `+JSON.stringify(e[0]));return t}});function Ku(e){let t=e.facet(Gu);return t.charCodeAt(0)==9?e.tabSize*t.length:t.length}function qu(e,t){let n=``,r=e.tabSize,i=e.facet(Gu)[0];if(i==`	`){for(;t>=r;)n+=`	`,t-=r;i=` `}for(let e=0;e<t;e++)n+=i;return n}function Ju(e,t){e instanceof M&&(e=new Yu(e));for(let n of e.state.facet(Wu)){let r=n(e,t);if(r!==void 0)return r}let n=Pu(e.state);return n.length>=t?Zu(e,n,t):null}var Yu=class{constructor(e,t={}){this.state=e,this.options=t,this.unit=Ku(e)}lineAt(e,t=1){let n=this.state.doc.lineAt(e),{simulateBreak:r,simulateDoubleBreak:i}=this.options;return r!=null&&r>=n.from&&r<=n.to?i&&r==e?{text:``,from:e}:(t<0?r<e:r<=e)?{text:n.text.slice(r-n.from),from:r}:{text:n.text.slice(0,r-n.from),from:n.from}:n}textAfterPos(e,t=1){if(this.options.simulateDoubleBreak&&e==this.options.simulateBreak)return``;let{text:n,from:r}=this.lineAt(e,t);return n.slice(e-r,Math.min(n.length,e+100-r))}column(e,t=1){let{text:n,from:r}=this.lineAt(e,t),i=this.countColumn(n,e-r),a=this.options.overrideIndentation?this.options.overrideIndentation(r):-1;return a>-1&&(i+=a-this.countColumn(n,n.search(/\S|$/))),i}countColumn(e,t=e.length){return Sn(e,this.state.tabSize,t)}lineIndent(e,t=1){let{text:n,from:r}=this.lineAt(e,t),i=this.options.overrideIndentation;if(i){let e=i(r);if(e>-1)return e}return this.countColumn(n,n.search(/\S|$/))}get simulatedBreak(){return this.options.simulateBreak||null}},Xu=new H;function Zu(e,t,n){let r=t.resolveStack(n),i=t.resolveInner(n,-1).resolve(n,0).enterUnfinishedNodesBefore(n);if(i!=r.node){let e=[];for(let t=i;t&&!(t.from<r.node.from||t.to>r.node.to||t.from==r.node.from&&t.type==r.node.type);t=t.parent)e.push(t);for(let t=e.length-1;t>=0;t--)r={node:e[t],next:r}}return Qu(r,e,n)}function Qu(e,t,n){for(let r=e;r;r=r.next){let e=ed(r.node);if(e)return e(nd.create(t,n,r))}return 0}function $u(e){return e.pos==e.options.simulateBreak&&e.options.simulateDoubleBreak}function ed(e){let t=e.type.prop(Xu);if(t)return t;let n=e.firstChild,r;if(n&&(r=n.type.prop(H.closedBy))){let t=e.lastChild,n=t&&r.indexOf(t.name)>-1;return e=>ad(e,!0,1,void 0,n&&!$u(e)?t.from:void 0)}return e.parent==null?td:null}function td(){return 0}var nd=class e extends Yu{constructor(e,t,n){super(e.state,e.options),this.base=e,this.pos=t,this.context=n}get node(){return this.context.node}static create(t,n,r){return new e(t,n,r)}get textAfter(){return this.textAfterPos(this.pos)}get baseIndent(){return this.baseIndentFor(this.node)}baseIndentFor(e){let t=this.state.doc.lineAt(e.from);for(;;){let n=e.resolve(t.from);for(;n.parent&&n.parent.from==n.from;)n=n.parent;if(rd(n,e))break;t=this.state.doc.lineAt(n.from)}return this.lineIndent(t.from)}continue(){return Qu(this.context.next,this.base,this.pos)}};function rd(e,t){for(let n=t;n;n=n.parent)if(e==n)return!0;return!1}function id(e){let t=e.node,n=t.childAfter(t.from),r=t.lastChild;if(!n)return null;let i=e.options.simulateBreak,a=e.state.doc.lineAt(n.from),o=i==null||i<=a.from?a.to:Math.min(a.to,i);for(let e=n.to;;){let i=t.childAfter(e);if(!i||i==r)return null;if(!i.type.isSkipped){if(i.from>=o)return null;let e=/^ */.exec(a.text.slice(n.to-a.from))[0].length;return{from:n.from,to:n.to+e}}e=i.to}}function ad(e,t,n,r,i){let a=e.textAfter,o=a.match(/^\s*/)[0].length,s=r&&a.slice(o,o+r.length)==r||i==e.pos+o,c=t?id(e):null;return c?s?e.column(c.from):e.column(c.to):e.baseIndent+(s?0:e.unit*n)}var od=class e{constructor(e,t){this.specs=e;let n;function r(e){let t=On.newName();return(n||=Object.create(null))[`.`+t]=e,t}let i=typeof t.all==`string`?t.all:t.all?r(t.all):void 0,a=t.scope;this.scope=a instanceof Mu?e=>e.prop(ku)==a.data:a?e=>e==a:void 0,this.style=uu(e.map(e=>({tag:e.tag,class:e.class||r(Object.assign({},e,{tag:null}))})),{all:i}).style,this.module=n?new On(n):null,this.themeType=t.themeType}static define(t,n){return new e(t,n||{})}},sd=A.define(),cd=A.define({combine(e){return e.length?[e[0]]:null}});function ld(e){let t=e.facet(sd);return t.length?t:e.facet(cd)}function ud(e,t){let n=[fd],r;return e instanceof od&&(e.module&&n.push(V.styleModule.of(e.module)),r=e.themeType),t?.fallback?n.push(cd.of(e)):r?n.push(sd.computeN([V.darkTheme],t=>t.facet(V.darkTheme)==(r==`dark`)?[e]:[])):n.push(sd.of(e)),n}var dd=class{constructor(e){this.markCache=Object.create(null),this.tree=Pu(e.state),this.decorations=this.buildDeco(e,ld(e.state)),this.decoratedTo=e.viewport.to}update(e){let t=Pu(e.state),n=ld(e.state),r=n!=ld(e.startState),{viewport:i}=e.view,a=e.changes.mapPos(this.decoratedTo,1);t.length<i.to&&!r&&t.type==this.tree.type&&a>=i.to?(this.decorations=this.decorations.map(e.changes),this.decoratedTo=a):(t!=this.tree||e.viewportChanged||r)&&(this.tree=t,this.decorations=this.buildDeco(e.view,n),this.decoratedTo=i.to)}buildDeco(e,t){if(!t||!this.tree.length)return I.none;let n=new dn;for(let{from:r,to:i}of e.visibleRanges)fu(this.tree,t,(e,t,r)=>{n.add(e,t,this.markCache[r]||(this.markCache[r]=I.mark({class:r})))},r,i);return n.finish()}},fd=wt.high(Ti.fromClass(dd,{decorations:e=>e.decorations}));K.meta,K.link,K.heading,K.emphasis,K.strong,K.strikethrough,K.keyword,K.atom,K.bool,K.url,K.contentSeparator,K.labelName,K.literal,K.inserted,K.string,K.deleted,K.regexp,K.escape,K.string,K.variableName,K.variableName,K.typeName,K.namespace,K.className,K.variableName,K.macroName,K.propertyName,K.comment,K.invalid;var pd=V.baseTheme({"&.cm-focused .cm-matchingBracket":{backgroundColor:`#328c8252`},"&.cm-focused .cm-nonmatchingBracket":{backgroundColor:`#bb555544`}}),md=1e4,hd=`()[]{}`,gd=A.define({combine(e){return nn(e,{afterCursor:!0,brackets:hd,maxScanDistance:md,renderMatch:yd})}}),_d=I.mark({class:`cm-matchingBracket`}),vd=I.mark({class:`cm-nonmatchingBracket`});function yd(e){let t=[],n=e.matched?_d:vd;return t.push(n.range(e.start.from,e.start.to)),e.end&&t.push(n.range(e.end.from,e.end.to)),t}function bd(e){let t=[],n=e.facet(gd);for(let r of e.selection.ranges){if(!r.empty)continue;let i=Ed(e,r.head,-1,n)||r.head>0&&Ed(e,r.head-1,1,n)||n.afterCursor&&(Ed(e,r.head,1,n)||r.head<e.doc.length&&Ed(e,r.head+1,-1,n));i&&(t=t.concat(n.renderMatch(i,e)))}return I.set(t,!0)}var xd=[Ti.fromClass(class{constructor(e){this.paused=!1,this.decorations=bd(e.state)}update(e){(e.docChanged||e.selectionSet||this.paused)&&(e.view.composing?(this.decorations=this.decorations.map(e.changes),this.paused=!0):(this.decorations=bd(e.state),this.paused=!1))}},{decorations:e=>e.decorations}),pd];function Sd(e={}){return[gd.of(e),xd]}var Cd=new H;function wd(e,t,n){let r=e.prop(t<0?H.openedBy:H.closedBy);if(r)return r;if(e.name.length==1){let r=n.indexOf(e.name);if(r>-1&&r%2==+(t<0))return[n[r+t]]}return null}function Td(e){let t=e.type.prop(Cd);return t?t(e.node):e}function Ed(e,t,n,r={}){let i=r.maxScanDistance||md,a=r.brackets||hd,o=Pu(e),s=o.resolveInner(t,n);for(let r=s;r;r=r.parent){let i=wd(r.type,n,a);if(i&&r.from<r.to){let o=Td(r);if(o&&(n>0?t>=o.from&&t<o.to:t>o.from&&t<=o.to))return Dd(e,t,n,r,o,i,a)}}return Od(e,t,n,o,s.type,i,a)}function Dd(e,t,n,r,i,a,o){let s=r.parent,c={from:i.from,to:i.to},l=0,u=s?.cursor();if(u&&(n<0?u.childBefore(r.from):u.childAfter(r.to)))do if(n<0?u.to<=r.from:u.from>=r.to){if(l==0&&a.indexOf(u.type.name)>-1&&u.from<u.to){let e=Td(u);return{start:c,end:e?{from:e.from,to:e.to}:void 0,matched:!0}}if(wd(u.type,n,o))l++;else if(wd(u.type,-n,o)){if(l==0){let e=Td(u);return{start:c,end:e&&e.from<e.to?{from:e.from,to:e.to}:void 0,matched:!1}}l--}}while(n<0?u.prevSibling():u.nextSibling());return{start:c,matched:!1}}function Od(e,t,n,r,i,a,o){if(n<0?!t:t==e.doc.length)return null;let s=n<0?e.sliceDoc(t-1,t):e.sliceDoc(t,t+1),c=o.indexOf(s);if(c<0||c%2==0!=n>0)return null;let l={from:n<0?t-1:t,to:n>0?t+1:t},u=e.doc.iterRange(t,n>0?e.doc.length:0),d=0;for(let e=0;!u.next().done&&e<=a;){let a=u.value;n<0&&(e+=a.length);let s=t+e*n;for(let e=n>0?0:a.length-1,t=n>0?a.length:-1;e!=t;e+=n){let t=o.indexOf(a[e]);if(!(t<0||r.resolveInner(s+e,1).type!=i)){if(t%2==0==n>0)d++;else if(d==1)return{start:l,end:{from:s+e,to:s+e+1},matched:t>>1==c>>1};else d--}}n>0&&(e+=a.length)}return u.done?{start:l,matched:!1}:null}function kd(e,t,n,r=0,i=0){t??(t=e.search(/[^\s\u00a0]/),t==-1&&(t=e.length));let a=i;for(let i=r;i<t;i++)e.charCodeAt(i)==9?a+=n-a%n:a++;return a}var Ad=class{constructor(e,t,n,r){this.string=e,this.tabSize=t,this.indentUnit=n,this.overrideIndent=r,this.pos=0,this.start=0,this.lastColumnPos=0,this.lastColumnValue=0}eol(){return this.pos>=this.string.length}sol(){return this.pos==0}peek(){return this.string.charAt(this.pos)||void 0}next(){if(this.pos<this.string.length)return this.string.charAt(this.pos++)}eat(e){let t=this.string.charAt(this.pos),n;if(n=typeof e==`string`?t==e:t&&(e instanceof RegExp?e.test(t):e(t)),n)return++this.pos,t}eatWhile(e){let t=this.pos;for(;this.eat(e););return this.pos>t}eatSpace(){let e=this.pos;for(;/[\s\u00a0]/.test(this.string.charAt(this.pos));)++this.pos;return this.pos>e}skipToEnd(){this.pos=this.string.length}skipTo(e){let t=this.string.indexOf(e,this.pos);if(t>-1)return this.pos=t,!0}backUp(e){this.pos-=e}column(){return this.lastColumnPos<this.start&&(this.lastColumnValue=kd(this.string,this.start,this.tabSize,this.lastColumnPos,this.lastColumnValue),this.lastColumnPos=this.start),this.lastColumnValue}indentation(){return this.overrideIndent??kd(this.string,null,this.tabSize)}match(e,t,n){if(typeof e==`string`){let r=e=>n?e.toLowerCase():e;return r(this.string.substr(this.pos,e.length))==r(e)?(t!==!1&&(this.pos+=e.length),!0):null}{let n=this.string.slice(this.pos).match(e);return n&&n.index>0?null:(n&&t!==!1&&(this.pos+=n[0].length),n)}}current(){return this.string.slice(this.start,this.pos)}};function jd(e){return{name:e.name||``,token:e.token,blankLine:e.blankLine||(()=>{}),startState:e.startState||(()=>!0),copyState:e.copyState||Md,indent:e.indent||(()=>null),languageData:e.languageData||{},tokenTable:e.tokenTable||Bd,mergeTokens:e.mergeTokens!==!1}}function Md(e){if(typeof e!=`object`)return e;let t={};for(let n in e){let r=e[n];t[n]=r instanceof Array?r.slice():r}return t}var Nd=new WeakMap,Pd=class e extends Mu{constructor(e){let t=Au(e.languageData),n=jd(e),r,i=new class extends $l{createParse(e,t,n){return new Rd(r,e,t,n)}};super(t,i,[],e.name),this.topNode=Xd(t,this),r=this,this.streamParser=n,this.stateAfter=new H({perNode:!0}),this.tokenTable=e.tokenTable?new Kd(n.tokenTable):qd}static define(t){return new e(t)}getIndent(e){let t,{overrideIndentation:n}=e.options;n&&(t=Nd.get(e.state),t!=null&&t<e.pos-1e4&&(t=void 0));let r=Fd(this,e.node.tree,e.node.from,e.node.from,t??e.pos),i,a;if(r?(a=r.state,i=r.pos+1):(a=this.streamParser.startState(e.unit),i=e.node.from),e.pos-i>1e4)return null;for(;i<e.pos;){let t=e.state.doc.lineAt(i),r=Math.min(e.pos,t.to);if(t.length){let i=n?n(t.from):-1,o=new Ad(t.text,e.state.tabSize,e.unit,i<0?void 0:i);for(;o.pos<r-t.from;)zd(this.streamParser.token,o,a)}else this.streamParser.blankLine(a,e.unit);if(r==e.pos)break;i=t.to+1}let o=e.lineAt(e.pos);return n&&t==null&&Nd.set(e.state,o.from),this.streamParser.indent(a,/^\s*(.*)/.exec(o.text)[1],e)}get allowsNesting(){return!1}};function Fd(e,t,n,r,i){let a=n>=r&&n+t.length<=i&&t.prop(e.stateAfter);if(a)return{state:e.streamParser.copyState(a),pos:n+t.length};for(let a=t.children.length-1;a>=0;a--){let o=t.children[a],s=n+t.positions[a],c=o instanceof W&&s<i&&Fd(e,o,s,r,i);if(c)return c}return null}function Id(e,t,n,r,i){if(i&&n<=0&&r>=t.length)return t;!i&&n==0&&t.type==e.topNode&&(i=!0);for(let a=t.children.length-1;a>=0;a--){let o=t.positions[a],s=t.children[a],c;if(o<r&&s instanceof W){if(!(c=Id(e,s,n-o,r-o,i)))break;return i?new W(t.type,t.children.slice(0,a).concat(c),t.positions.slice(0,a+1),o+c.length):c}}return null}function Ld(e,t,n,r,i){for(let i of t){let t=i.from+(i.openStart?25:0),a=i.to-(i.openEnd?25:0),o=t<=n&&a>n&&Fd(e,i.tree,0-i.offset,n,a),s;if(o&&o.pos<=r&&(s=Id(e,i.tree,n+i.offset,o.pos+i.offset,!1)))return{state:o.state,tree:s}}return{state:e.streamParser.startState(i?Ku(i):4),tree:W.empty}}var Rd=class{constructor(e,t,n,r){this.lang=e,this.input=t,this.fragments=n,this.ranges=r,this.stoppedAt=null,this.chunks=[],this.chunkPos=[],this.chunk=[],this.chunkReused=void 0,this.rangeIndex=0,this.to=r[r.length-1].to;let i=Lu.get(),a=r[0].from,{state:o,tree:s}=Ld(e,n,a,this.to,i?.state);this.state=o,this.parsedPos=this.chunkStart=a+s.length;for(let e=0;e<s.children.length;e++)this.chunks.push(s.children[e]),this.chunkPos.push(s.positions[e]);i&&this.parsedPos<i.viewport.from-1e5&&r.some(e=>e.from<=i.viewport.from&&e.to>=i.viewport.from)&&(this.state=this.lang.streamParser.startState(Ku(i.state)),i.skipUntilInView(this.parsedPos,i.viewport.from),this.parsedPos=i.viewport.from),this.moveRangeIndex()}advance(){let e=Lu.get(),t=this.stoppedAt==null?this.to:Math.min(this.to,this.stoppedAt),n=Math.min(t,this.chunkStart+512);for(e&&(n=Math.min(n,e.viewport.to));this.parsedPos<n;)this.parseLine(e);return this.chunkStart<this.parsedPos&&this.finishChunk(),this.parsedPos>=t?this.finish():e&&this.parsedPos>=e.viewport.to?(e.skipUntilInView(this.parsedPos,t),this.finish()):null}stopAt(e){this.stoppedAt=e}lineAfter(e){let t=this.input.chunk(e);if(this.input.lineChunks)t==`
`&&(t=``);else{let e=t.indexOf(`
`);e>-1&&(t=t.slice(0,e))}return e+t.length<=this.to?t:t.slice(0,this.to-e)}nextLine(){let e=this.parsedPos,t=this.lineAfter(e),n=e+t.length;for(let e=this.rangeIndex;;){let r=this.ranges[e].to;if(r>=n||(t=t.slice(0,r-(n-t.length)),e++,e==this.ranges.length))break;let i=this.ranges[e].from,a=this.lineAfter(i);t+=a,n=i+a.length}return{line:t,end:n}}skipGapsTo(e,t,n){for(;;){let r=this.ranges[this.rangeIndex].to,i=e+t;if(n>0?r>i:r>=i)break;let a=this.ranges[++this.rangeIndex].from;t+=a-r}return t}moveRangeIndex(){for(;this.ranges[this.rangeIndex].to<this.parsedPos;)this.rangeIndex++}emitToken(e,t,n,r){let i=4;if(this.ranges.length>1){r=this.skipGapsTo(t,r,1),t+=r;let e=this.chunk.length;r=this.skipGapsTo(n,r,-1),n+=r,i+=this.chunk.length-e}let a=this.chunk.length-4;return this.lang.streamParser.mergeTokens&&i==4&&a>=0&&this.chunk[a]==e&&this.chunk[a+2]==t?this.chunk[a+2]=n:this.chunk.push(e,t,n,i),r}parseLine(e){let{line:t,end:n}=this.nextLine(),r=0,{streamParser:i}=this.lang,a=new Ad(t,e?e.state.tabSize:4,e?Ku(e.state):2);if(a.eol())i.blankLine(this.state,a.indentUnit);else for(;!a.eol();){let e=zd(i.token,a,this.state);if(e&&(r=this.emitToken(this.lang.tokenTable.resolve(e),this.parsedPos+a.start,this.parsedPos+a.pos,r)),a.start>1e4)break}this.parsedPos=n,this.moveRangeIndex(),this.parsedPos<this.to&&this.parsedPos++}finishChunk(){let e=W.build({buffer:this.chunk,start:this.chunkStart,length:this.parsedPos-this.chunkStart,nodeSet:Hd,topID:0,maxBufferLength:512,reused:this.chunkReused});e=new W(e.type,e.children,e.positions,e.length,[[this.lang.stateAfter,this.lang.streamParser.copyState(this.state)]]),this.chunks.push(e),this.chunkPos.push(this.chunkStart-this.ranges[0].from),this.chunk=[],this.chunkReused=void 0,this.chunkStart=this.parsedPos}finish(){return new W(this.lang.topNode,this.chunks,this.chunkPos,this.parsedPos-this.ranges[0].from).balance()}};function zd(e,t,n){t.start=t.pos;for(let r=0;r<10;r++){let r=e(t,n);if(t.pos>t.start)return r}throw Error(`Stream parser failed to advance stream.`)}var Bd=Object.create(null),Vd=[kl.none],Hd=new Al(Vd),Ud=[],Wd=Object.create(null),Gd=Object.create(null);for(let[e,t]of[[`variable`,`variableName`],[`variable-2`,`variableName.special`],[`string-2`,`string.special`],[`def`,`variableName.definition`],[`tag`,`tagName`],[`attribute`,`attributeName`],[`type`,`typeName`],[`builtin`,`variableName.standard`],[`qualifier`,`modifier`],[`error`,`invalid`],[`header`,`heading`],[`property`,`propertyName`]])Gd[e]=Yd(Bd,t);var Kd=class{constructor(e){this.extra=e,this.table=Object.assign(Object.create(null),Gd)}resolve(e){return e?this.table[e]||(this.table[e]=Yd(this.extra,e)):0}},qd=new Kd(Bd);function Jd(e,t){Ud.indexOf(e)>-1||(Ud.push(e),console.warn(t))}function Yd(e,t){let n=[];for(let r of t.split(` `)){let t=[];for(let n of r.split(`.`)){let r=e[n]||K[n];r?typeof r==`function`?t.length?t=t.map(r):Jd(n,`Modifier ${n} used at start of tag`):t.length?Jd(n,`Tag ${n} used as modifier`):t=Array.isArray(r)?r:[r]:Jd(n,`Unknown highlighting tag ${n}`)}for(let e of t)n.push(e)}if(!n.length)return 0;let r=t.replace(/ /g,`_`),i=r+` `+n.map(e=>e.id),a=Wd[i];if(a)return a.id;let o=Wd[i]=kl.define({id:Vd.length,name:r,props:[su({[r]:n})]});return Vd.push(o),o.id}function Xd(e,t){let n=kl.define({id:Vd.length,name:`Document`,props:[ku.add(()=>e),Xu.add(()=>e=>t.getIndent(e))],top:!0});return Vd.push(n),n}L.RTL,L.LTR;var Zd=e=>{let{state:t}=e,n=t.doc.lineAt(t.selection.main.from),r=nf(e.state,n.from);return r.line?$d(e):r.block?tf(e):!1};function Qd(e,t){return({state:n,dispatch:r})=>{if(n.readOnly)return!1;let i=e(t,n);return i?(r(n.update(i)),!0):!1}}var $d=Qd(cf,0),ef=Qd(sf,0),tf=Qd((e,t)=>sf(e,t,of(t)),0);function nf(e,t){let n=e.languageDataAt(`commentTokens`,t,1);return n.length?n[0]:{}}var rf=50;function af(e,{open:t,close:n},r,i){let a=e.sliceDoc(r-rf,r),o=e.sliceDoc(i,i+rf),s=/\s*$/.exec(a)[0].length,c=/^\s*/.exec(o)[0].length,l=a.length-s;if(a.slice(l-t.length,l)==t&&o.slice(c,c+n.length)==n)return{open:{pos:r-s,margin:s&&1},close:{pos:i+c,margin:c&&1}};let u,d;i-r<=100?u=d=e.sliceDoc(r,i):(u=e.sliceDoc(r,r+rf),d=e.sliceDoc(i-rf,i));let f=/^\s*/.exec(u)[0].length,p=/\s*$/.exec(d)[0].length,m=d.length-p-n.length;return u.slice(f,f+t.length)==t&&d.slice(m,m+n.length)==n?{open:{pos:r+f+t.length,margin:+!!/\s/.test(u.charAt(f+t.length))},close:{pos:i-p-n.length,margin:+!!/\s/.test(d.charAt(m-1))}}:null}function of(e){let t=[];for(let n of e.selection.ranges){let r=e.doc.lineAt(n.from),i=n.to<=r.to?r:e.doc.lineAt(n.to);i.from>r.from&&i.from==n.to&&(i=n.to==r.to+1?r:e.doc.lineAt(n.to-1));let a=t.length-1;a>=0&&t[a].to>r.from?t[a].to=i.to:t.push({from:r.from+/^\s*/.exec(r.text)[0].length,to:i.to})}return t}function sf(e,t,n=t.selection.ranges){let r=n.map(e=>nf(t,e.from).block);if(!r.every(e=>e))return null;let i=n.map((e,n)=>af(t,r[n],e.from,e.to));if(e!=2&&!i.every(e=>e))return{changes:t.changes(n.map((e,t)=>i[t]?[]:[{from:e.from,insert:r[t].open+` `},{from:e.to,insert:` `+r[t].close}]))};if(e!=1&&i.some(e=>e)){let e=[];for(let t=0,n;t<i.length;t++)if(n=i[t]){let i=r[t],{open:a,close:o}=n;e.push({from:a.pos-i.open.length,to:a.pos+a.margin},{from:o.pos-o.margin,to:o.pos+i.close.length})}return{changes:e}}return null}function cf(e,t,n=t.selection.ranges){let r=[],i=-1;ranges:for(let{from:e,to:a}of n){let n=r.length,o=1e9,s;for(let n=e;n<=a;){let c=t.doc.lineAt(n);if(s==null&&(s=nf(t,c.from).line,!s))continue ranges;if(c.from>i&&(e==a||a>c.from)){i=c.from;let e=/^\s*/.exec(c.text)[0].length,t=e==c.length,n=c.text.slice(e,e+s.length)==s?e:-1;e<c.text.length&&e<o&&(o=e),r.push({line:c,comment:n,token:s,indent:e,empty:t,single:!1})}n=c.to+1}if(o<1e9)for(let e=n;e<r.length;e++)r[e].indent<r[e].line.text.length&&(r[e].indent=o);r.length==n+1&&(r[n].single=!0)}if(e!=2&&r.some(e=>e.comment<0&&(!e.empty||e.single))){let e=[];for(let{line:t,token:n,indent:i,empty:a,single:o}of r)(o||!a)&&e.push({from:t.from+i,insert:n+` `});let n=t.changes(e);return{changes:n,selection:t.selection.map(n,1)}}if(e!=1&&r.some(e=>e.comment>=0)){let e=[];for(let{line:t,comment:n,token:i}of r)if(n>=0){let r=t.from+n,a=r+i.length;t.text[a-t.from]==` `&&a++,e.push({from:r,to:a})}return{changes:e}}return null}var lf=zt.define(),uf=zt.define(),df=A.define(),ff=A.define({combine(e){return nn(e,{minDepth:100,newGroupDelay:500,joinToEvent:(e,t)=>t},{minDepth:Math.max,newGroupDelay:Math.min,joinToEvent:(e,t)=>(n,r)=>e(n,r)||t(n,r)})}}),pf=xt.define({create(){return Mf.empty},update(e,t){let n=t.state.facet(ff),r=t.annotation(lf);if(r){let i=bf.fromTransaction(t,r.selection),a=r.side,o=a==0?e.undone:e.done;return o=i?xf(o,o.length,n.minDepth,i):Df(o,t.startState.selection),new Mf(a==0?r.rest:o,a==0?o:r.rest)}let i=t.annotation(uf);if((i==`full`||i==`before`)&&(e=e.isolate()),t.annotation(Ht.addToHistory)===!1)return t.changes.empty?e:e.addMapping(t.changes.desc);let a=bf.fromTransaction(t),o=t.annotation(Ht.time),s=t.annotation(Ht.userEvent);return a?e=e.addChanges(a,o,s,n,t):t.selection&&(e=e.addSelection(t.startState.selection,o,s,n.newGroupDelay)),(i==`full`||i==`after`)&&(e=e.isolate()),e},toJSON(e){return{done:e.done.map(e=>e.toJSON()),undone:e.undone.map(e=>e.toJSON())}},fromJSON(e){return new Mf(e.done.map(bf.fromJSON),e.undone.map(bf.fromJSON))}});function mf(e={}){return[pf,ff.of(e),V.domEventHandlers({beforeinput(e,t){let n=e.inputType==`historyUndo`?gf:e.inputType==`historyRedo`?_f:null;return n?(e.preventDefault(),n(t)):!1}})]}function hf(e,t){return function({state:n,dispatch:r}){if(!t&&n.readOnly)return!1;let i=n.field(pf,!1);if(!i)return!1;let a=i.pop(e,n,t);return a?(r(a),!0):!1}}var gf=hf(0,!1),_f=hf(1,!1),vf=hf(0,!0),yf=hf(1,!0),bf=class e{constructor(e,t,n,r,i){this.changes=e,this.effects=t,this.mapped=n,this.startSelection=r,this.selectionsAfter=i}setSelAfter(t){return new e(this.changes,this.effects,this.mapped,this.startSelection,t)}toJSON(){return{changes:this.changes?.toJSON(),mapped:this.mapped?.toJSON(),startSelection:this.startSelection?.toJSON(),selectionsAfter:this.selectionsAfter.map(e=>e.toJSON())}}static fromJSON(t){return new e(t.changes&&at.fromJSON(t.changes),[],t.mapped&&it.fromJSON(t.mapped),t.startSelection&&k.fromJSON(t.startSelection),t.selectionsAfter.map(k.fromJSON))}static fromTransaction(t,n){let r=Tf;for(let e of t.startState.facet(df)){let n=e(t);n.length&&(r=r.concat(n))}return!r.length&&t.changes.empty?null:new e(t.changes.invert(t.startState.doc),r,void 0,n||t.startState.selection,Tf)}static selection(t){return new e(void 0,Tf,void 0,void 0,t)}};function xf(e,t,n,r){let i=t+1>n+20?t-n-1:0,a=e.slice(i,t);return a.push(r),a}function Sf(e,t){let n=[],r=!1;return e.iterChangedRanges((e,t)=>n.push(e,t)),t.iterChangedRanges((e,t,i,a)=>{for(let e=0;e<n.length;){let t=n[e++],o=n[e++];a>=t&&i<=o&&(r=!0)}}),r}function Cf(e,t){return e.ranges.length==t.ranges.length&&e.ranges.filter((e,n)=>e.empty!=t.ranges[n].empty).length===0}function wf(e,t){return e.length?t.length?e.concat(t):e:t}var Tf=[],Ef=200;function Df(e,t){if(e.length){let n=e[e.length-1],r=n.selectionsAfter.slice(Math.max(0,n.selectionsAfter.length-Ef));return r.length&&r[r.length-1].eq(t)?e:(r.push(t),xf(e,e.length-1,1e9,n.setSelAfter(r)))}return[bf.selection([t])]}function Of(e){let t=e[e.length-1],n=e.slice();return n[e.length-1]=t.setSelAfter(t.selectionsAfter.slice(0,t.selectionsAfter.length-1)),n}function kf(e,t){if(!e.length)return e;let n=e.length,r=Tf;for(;n;){let i=Af(e[n-1],t,r);if(i.changes&&!i.changes.empty||i.effects.length){let t=e.slice(0,n);return t[n-1]=i,t}t=i.mapped,n--,r=i.selectionsAfter}return r.length?[bf.selection(r)]:Tf}function Af(e,t,n){let r=wf(e.selectionsAfter.length?e.selectionsAfter.map(e=>e.map(t)):Tf,n);if(!e.changes)return bf.selection(r);let i=e.changes.map(t),a=t.mapDesc(e.changes,!0),o=e.mapped?e.mapped.composeDesc(a):a;return new bf(i,j.mapEffects(e.effects,t),o,e.startSelection.map(a),r)}var jf=/^(input\.type|delete)($|\.)/,Mf=class e{constructor(e,t,n=0,r=void 0){this.done=e,this.undone=t,this.prevTime=n,this.prevUserEvent=r}isolate(){return this.prevTime?new e(this.done,this.undone):this}addChanges(t,n,r,i,a){let o=this.done,s=o[o.length-1];return o=s&&s.changes&&!s.changes.empty&&t.changes&&(!r||jf.test(r))&&(!s.selectionsAfter.length&&n-this.prevTime<i.newGroupDelay&&i.joinToEvent(a,Sf(s.changes,t.changes))||r==`input.type.compose`)?xf(o,o.length-1,i.minDepth,new bf(t.changes.compose(s.changes),wf(j.mapEffects(t.effects,s.changes),s.effects),s.mapped,s.startSelection,Tf)):xf(o,o.length,i.minDepth,t),new e(o,Tf,n,r)}addSelection(t,n,r,i){let a=this.done.length?this.done[this.done.length-1].selectionsAfter:Tf;return a.length>0&&n-this.prevTime<i&&r==this.prevUserEvent&&r&&/^select($|\.)/.test(r)&&Cf(a[a.length-1],t)?this:new e(Df(this.done,t),this.undone,n,r)}addMapping(t){return new e(kf(this.done,t),kf(this.undone,t),this.prevTime,this.prevUserEvent)}pop(e,t,n){let r=e==0?this.done:this.undone;if(r.length==0)return null;let i=r[r.length-1],a=i.selectionsAfter[0]||(i.startSelection?i.startSelection.map(i.changes.invertedDesc,1):t.selection);if(n&&i.selectionsAfter.length)return t.update({selection:i.selectionsAfter[i.selectionsAfter.length-1],annotations:lf.of({side:e,rest:Of(r),selection:a}),userEvent:e==0?`select.undo`:`select.redo`,scrollIntoView:!0});if(i.changes){let n=r.length==1?Tf:r.slice(0,r.length-1);return i.mapped&&(n=kf(n,i.mapped)),t.update({changes:i.changes,selection:i.startSelection,effects:i.effects,annotations:lf.of({side:e,rest:n,selection:a}),filter:!1,userEvent:e==0?`undo`:`redo`,scrollIntoView:!0})}return null}};Mf.empty=new Mf(Tf,Tf);var Nf=[{key:`Mod-z`,run:gf,preventDefault:!0},{key:`Mod-y`,mac:`Mod-Shift-z`,run:_f,preventDefault:!0},{linux:`Ctrl-Shift-z`,run:_f,preventDefault:!0},{key:`Mod-u`,run:vf,preventDefault:!0},{key:`Alt-u`,mac:`Mod-Shift-u`,run:yf,preventDefault:!0}];function Pf(e,t){return k.create(e.ranges.map(t),e.mainIndex)}function Ff(e,t){return e.update({selection:t,scrollIntoView:!0,userEvent:`select`})}function If({state:e,dispatch:t},n){let r=Pf(e.selection,n);return!r.eq(e.selection,!0)&&(t(Ff(e,r)),!0)}function Lf(e,t){return k.cursor(t?e.to:e.from)}function Rf(e,t){return If(e,n=>n.empty?e.moveByChar(n,t):Lf(n,t))}function q(e){return e.textDirectionAt(e.state.selection.main.head)==L.LTR}var zf=e=>Rf(e,!q(e)),Bf=e=>Rf(e,q(e));function Vf(e,t){return If(e,n=>n.empty?e.moveByGroup(n,t):Lf(n,t))}var Hf=e=>Vf(e,!q(e)),Uf=e=>Vf(e,q(e));typeof Intl<`u`&&Intl.Segmenter;function Wf(e,t,n){if(t.type.prop(n))return!0;let r=t.to-t.from;return r&&(r>2||/[^\s,.;:]/.test(e.sliceDoc(t.from,t.to)))||t.firstChild}function Gf(e,t,n){let r=Pu(e).resolveInner(t.head),i=n?H.closedBy:H.openedBy;for(let a=t.head;;){let t=n?r.childAfter(a):r.childBefore(a);if(!t)break;Wf(e,t,i)?r=t:a=n?t.to:t.from}let a=r.type.prop(i),o,s;return s=a&&(o=n?Ed(e,r.from,1):Ed(e,r.to,-1))&&o.matched?n?o.end.to:o.end.from:n?r.to:r.from,k.cursor(s,n?-1:1)}var Kf=e=>If(e,t=>Gf(e.state,t,!q(e))),qf=e=>If(e,t=>Gf(e.state,t,q(e)));function Jf(e,t){return If(e,n=>{if(!n.empty)return Lf(n,t);let r=e.moveVertically(n,t);return r.head==n.head?e.moveToLineBoundary(n,t):r})}var Yf=e=>Jf(e,!1),Xf=e=>Jf(e,!0);function Zf(e){let t=e.scrollDOM.clientHeight<e.scrollDOM.scrollHeight-2,n=0,r=0,i;if(t){for(let t of e.state.facet(V.scrollMargins)){let i=t(e);i?.top&&(n=Math.max(i?.top,n)),i?.bottom&&(r=Math.max(i?.bottom,r))}i=e.scrollDOM.clientHeight-n-r}else i=(e.dom.ownerDocument.defaultView||window).innerHeight;return{marginTop:n,marginBottom:r,selfScroll:t,height:Math.max(e.defaultLineHeight,i-5)}}function Qf(e,t){let n=Zf(e),{state:r}=e,i=Pf(r.selection,r=>r.empty?e.moveVertically(r,t,n.height):Lf(r,t));if(i.eq(r.selection))return!1;let a;if(n.selfScroll){let t=e.coordsAtPos(r.selection.main.head),o=e.scrollDOM.getBoundingClientRect(),s=o.top+n.marginTop,c=o.bottom-n.marginBottom;t&&t.top>s&&t.bottom<c&&(a=V.scrollIntoView(i.main.head,{y:`start`,yMargin:t.top-s}))}return e.dispatch(Ff(r,i),{effects:a}),!0}var $f=e=>Qf(e,!1),ep=e=>Qf(e,!0);function tp(e,t,n){let r=e.lineBlockAt(t.head),i=e.moveToLineBoundary(t,n);if(i.head==t.head&&i.head!=(n?r.to:r.from)&&(i=e.moveToLineBoundary(t,n,!1)),!n&&i.head==r.from&&r.length){let n=/^\s*/.exec(e.state.sliceDoc(r.from,Math.min(r.from+100,r.to)))[0].length;n&&t.head!=r.from+n&&(i=k.cursor(r.from+n))}return i}var np=e=>If(e,t=>tp(e,t,!0)),rp=e=>If(e,t=>tp(e,t,!1)),ip=e=>If(e,t=>tp(e,t,!q(e))),ap=e=>If(e,t=>tp(e,t,q(e))),op=e=>If(e,t=>e.moveToLineBoundary(t,!1,!1)),sp=e=>If(e,t=>e.moveToLineBoundary(t,!0,!1));function cp(e,t,n){let r=!1,i=Pf(e.selection,t=>{let i=Ed(e,t.head,-1)||Ed(e,t.head,1)||t.head>0&&Ed(e,t.head-1,1)||t.head<e.doc.length&&Ed(e,t.head+1,-1);if(!i||!i.end)return t;r=!0;let a=i.start.from==t.head?i.end.to:i.end.from;return n?k.range(t.anchor,a):k.cursor(a)});return r?(t(Ff(e,i)),!0):!1}var lp=({state:e,dispatch:t})=>cp(e,t,!1);function up(e,t,n){let r=Pf(e.state.selection,e=>{e.undirectional&&e.head>=e.anchor!=t&&(e=k.range(e.head,e.anchor));let r=n(e);return k.range(e.anchor,r.head,r.goalColumn,r.bidiLevel||void 0,r.assoc)});return!r.eq(e.state.selection)&&(e.dispatch(Ff(e.state,r)),!0)}function dp(e,t){return up(e,t,n=>e.moveByChar(n,t))}var fp=e=>dp(e,!q(e)),pp=e=>dp(e,q(e));function mp(e,t){return up(e,t,n=>e.moveByGroup(n,t))}var hp=e=>mp(e,!q(e)),gp=e=>mp(e,q(e)),_p=e=>{let t=!q(e);return up(e,t,n=>Gf(e.state,n,t))},vp=e=>{let t=q(e);return up(e,t,n=>Gf(e.state,n,t))};function yp(e,t){return up(e,t,n=>e.moveVertically(n,t))}var bp=e=>yp(e,!1),xp=e=>yp(e,!0);function Sp(e,t){return up(e,t,n=>e.moveVertically(n,t,Zf(e).height))}var Cp=e=>Sp(e,!1),wp=e=>Sp(e,!0),Tp=e=>up(e,!0,t=>tp(e,t,!0)),Ep=e=>up(e,!1,t=>tp(e,t,!1)),Dp=e=>{let t=!q(e);return up(e,t,n=>tp(e,n,t))},Op=e=>{let t=q(e);return up(e,t,n=>tp(e,n,t))},kp=e=>up(e,!1,t=>k.cursor(e.lineBlockAt(t.head).from)),Ap=e=>up(e,!0,t=>k.cursor(e.lineBlockAt(t.head).to)),jp=({state:e,dispatch:t})=>(t(Ff(e,{anchor:0})),!0),Mp=({state:e,dispatch:t})=>(t(Ff(e,{anchor:e.doc.length})),!0),Np=({state:e,dispatch:t})=>(t(Ff(e,{anchor:e.selection.main.anchor,head:0})),!0),Pp=({state:e,dispatch:t})=>(t(Ff(e,{anchor:e.selection.main.anchor,head:e.doc.length})),!0),Fp=({state:e,dispatch:t})=>(t(e.update({selection:{anchor:0,head:e.doc.length},userEvent:`select`})),!0),Ip=({state:e,dispatch:t})=>{let n=tm(e).map(({from:t,to:n})=>k.undirectionalRange(t,Math.min(n+1,e.doc.length)));return t(e.update({selection:k.create(n),userEvent:`select`})),!0},Lp=({state:e,dispatch:t})=>{let n=Pf(e.selection,t=>{let n=Pu(e),r=n.resolveStack(t.from,1);if(t.empty){let e=n.resolveStack(t.from,-1);e.node.from>=r.node.from&&e.node.to<=r.node.to&&(r=e)}for(let e=r;e;e=e.next){let{node:n}=e;if((n.from<t.from&&n.to>=t.to||n.to>t.to&&n.from<=t.from)&&e.next)return k.undirectionalRange(n.from,n.to)}return t});return!n.eq(e.selection)&&(t(Ff(e,n)),!0)};function Rp(e,t){let{state:n}=e,r=n.selection,i=n.selection.ranges.slice();for(let r of n.selection.ranges){let a=n.doc.lineAt(r.head);if(t?a.to<e.state.doc.length:a.from>0)for(let n=r;;){let r=e.moveVertically(n,t);if(r.head<a.from||r.head>a.to){i.some(e=>e.head==r.head)||i.push(r);break}if(r.head==n.head)break;n=r}}return i.length!=r.ranges.length&&(e.dispatch(Ff(n,k.create(i,i.length-1))),!0)}var zp=e=>Rp(e,!1),Bp=e=>Rp(e,!0),Vp=({state:e,dispatch:t})=>{let n=e.selection,r=null;return n.ranges.length>1?r=k.create([n.main]):n.main.empty||(r=k.create([k.cursor(n.main.head)])),r?(t(Ff(e,r)),!0):!1};function Hp(e,t){if(e.state.readOnly)return!1;let n=`delete.selection`,{state:r}=e,i=r.changeByRange(r=>{let{from:i,to:a}=r;if(i==a){let o=t(r);o<i?(n=`delete.backward`,o=Up(e,o,!1)):o>i&&(n=`delete.forward`,o=Up(e,o,!0)),i=Math.min(i,o),a=Math.max(a,o)}else i=Up(e,i,!1),a=Up(e,a,!0);return i==a?{range:r}:{changes:{from:i,to:a},range:k.cursor(i,i<r.head?-1:1)}});return!i.changes.empty&&(e.dispatch(r.update(i,{scrollIntoView:!0,userEvent:n,effects:n==`delete.selection`?V.announce.of(r.phrase(`Selection deleted`)):void 0})),!0)}function Up(e,t,n){if(e instanceof V)for(let r of e.state.facet(V.atomicRanges).map(t=>t(e)))r.between(t,t,(e,r)=>{e<t&&r>t&&(t=n?r:e)});return t}var Wp=(e,t,n)=>Hp(e,r=>{let i=r.from,{state:a}=e,o=a.doc.lineAt(i),s,c;if(n&&!t&&i>o.from&&i<o.from+200&&!/[^ \t]/.test(s=o.text.slice(0,i-o.from))){if(s[s.length-1]==`	`)return i-1;let e=Sn(s,a.tabSize)%Ku(a)||Ku(a);for(let t=0;t<e&&s[s.length-1-t]==` `;t++)i--;c=i}else c=O(o.text,i-o.from,t,t)+o.from,c==i&&o.number!=(t?a.doc.lines:1)?c+=t?1:-1:!t&&/[\ufe00-\ufe0f]/.test(o.text.slice(c-o.from,i-o.from))&&(c=O(o.text,c-o.from,!1,!1)+o.from);return c}),Gp=e=>Wp(e,!1,!0),Kp=e=>Wp(e,!0,!1),qp=(e,t)=>Hp(e,n=>{let r=n.head,{state:i}=e,a=i.doc.lineAt(r),o=i.charCategorizer(r);for(let e=null;;){if(r==(t?a.to:a.from)){r==n.head&&a.number!=(t?i.doc.lines:1)&&(r+=t?1:-1);break}let s=O(a.text,r-a.from,t)+a.from,c=a.text.slice(Math.min(r,s)-a.from,Math.max(r,s)-a.from),l=o(c);if(e!=null&&l!=e)break;(c!=` `||r!=n.head)&&(e=l),r=s}return r}),Jp=e=>qp(e,!1),Yp=e=>qp(e,!0),Xp=e=>Hp(e,t=>{let n=e.lineBlockAt(t.head).to;return t.head<n?n:Math.min(e.state.doc.length,t.head+1)}),Zp=e=>Hp(e,t=>{let n=e.moveToLineBoundary(t,!1).head;return t.head>n?n:Math.max(0,t.head-1)}),Qp=e=>Hp(e,t=>{let n=e.moveToLineBoundary(t,!0).head;return t.head<n?n:Math.min(e.state.doc.length,t.head+1)}),$p=({state:e,dispatch:t})=>{if(e.readOnly)return!1;let n=e.changeByRange(e=>({changes:{from:e.from,to:e.to,insert:D.of([``,``])},range:k.cursor(e.from)}));return t(e.update(n,{scrollIntoView:!0,userEvent:`input`})),!0},em=({state:e,dispatch:t})=>{if(e.readOnly)return!1;let n=e.changeByRange(t=>{if(!t.empty||t.from==0||t.from==e.doc.length)return{range:t};let n=t.from,r=e.doc.lineAt(n),i=n==r.from?n-1:O(r.text,n-r.from,!1)+r.from,a=n==r.to?n+1:O(r.text,n-r.from,!0)+r.from;return{changes:{from:i,to:a,insert:e.doc.slice(n,a).append(e.doc.slice(i,n))},range:k.cursor(a)}});return!n.changes.empty&&(t(e.update(n,{scrollIntoView:!0,userEvent:`move.character`})),!0)};function tm(e){let t=[],n=-1;for(let r of e.selection.ranges){let i=e.doc.lineAt(r.from),a=e.doc.lineAt(r.to);if(!r.empty&&r.to==a.from&&(a=e.doc.lineAt(r.to-1)),n>=i.number){let e=t[t.length-1];e.to=a.to,e.ranges.push(r)}else t.push({from:i.from,to:a.to,ranges:[r]});n=a.number+1}return t}function nm(e,t,n){if(e.readOnly)return!1;let r=[],i=[];for(let t of tm(e)){if(n?t.to==e.doc.length:t.from==0)continue;let a=e.doc.lineAt(n?t.to+1:t.from-1),o=a.length+1;if(n){r.push({from:t.to,to:a.to},{from:t.from,insert:a.text+e.lineBreak});for(let n of t.ranges)i.push(k.range(Math.min(e.doc.length,n.anchor+o),Math.min(e.doc.length,n.head+o)))}else{r.push({from:a.from,to:t.from},{from:t.to,insert:e.lineBreak+a.text});for(let e of t.ranges)i.push(k.range(e.anchor-o,e.head-o))}}return r.length?(t(e.update({changes:r,scrollIntoView:!0,selection:k.create(i,e.selection.mainIndex),userEvent:`move.line`})),!0):!1}var rm=({state:e,dispatch:t})=>nm(e,t,!1),im=({state:e,dispatch:t})=>nm(e,t,!0);function am(e,t,n){if(e.readOnly)return!1;let r=[];for(let t of tm(e))n?r.push({from:t.from,insert:e.doc.slice(t.from,t.to)+e.lineBreak}):r.push({from:t.to,insert:e.lineBreak+e.doc.slice(t.from,t.to)});let i=e.changes(r);return t(e.update({changes:i,selection:e.selection.map(i,n?1:-1),scrollIntoView:!0,userEvent:`input.copyline`})),!0}var om=({state:e,dispatch:t})=>am(e,t,!1),sm=({state:e,dispatch:t})=>am(e,t,!0),cm=e=>{if(e.state.readOnly)return!1;let{state:t}=e,n=t.changes(tm(t).map(({from:e,to:n})=>(e>0?e--:n<t.doc.length&&n++,{from:e,to:n}))),r=Pf(t.selection,t=>{let n;if(e.lineWrapping){let r=e.lineBlockAt(t.head),i=e.coordsAtPos(t.head,t.assoc||1);i&&(n=r.bottom+e.documentTop-i.bottom+e.defaultLineHeight/2)}return e.moveVertically(t,!0,n)}).map(n);return e.dispatch({changes:n,selection:r,scrollIntoView:!0,userEvent:`delete.line`}),!0};function lm(e,t){if(/\(\)|\[\]|\{\}/.test(e.sliceDoc(t-1,t+1)))return{from:t,to:t};let n=Pu(e).resolveInner(t),r=n.childBefore(t),i=n.childAfter(t),a;return r&&i&&r.to<=t&&i.from>=t&&(a=r.type.prop(H.closedBy))&&a.indexOf(i.name)>-1&&e.doc.lineAt(r.to).from==e.doc.lineAt(i.from).from&&!/\S/.test(e.sliceDoc(r.to,i.from))?{from:r.to,to:i.from}:null}var um=fm(!1),dm=fm(!0);function fm(e){return({state:t,dispatch:n})=>{if(t.readOnly)return!1;let r=t.changeByRange(n=>{let{from:r,to:i}=n,a=t.doc.lineAt(r),o=!e&&r==i&&lm(t,r);e&&(r=i=(i<=a.to?a:t.doc.lineAt(i)).to);let s=new Yu(t,{simulateBreak:r,simulateDoubleBreak:!!o}),c=Ju(s,r);for(c??=Sn(/^\s*/.exec(t.doc.lineAt(r).text)[0],t.tabSize);i<a.to&&/\s/.test(a.text[i-a.from]);)i++;o?{from:r,to:i}=o:r>a.from&&r<a.from+100&&!/\S/.test(a.text.slice(0,r))&&(r=a.from);let l=[``,qu(t,c)];return o&&l.push(qu(t,s.lineIndent(a.from,-1))),{changes:{from:r,to:i,insert:D.of(l)},range:k.cursor(r+1+l[1].length)}});return n(t.update(r,{scrollIntoView:!0,userEvent:`input`})),!0}}function pm(e,t){let n=-1;return e.changeByRange(r=>{let i=[];for(let a=r.from;a<=r.to;){let o=e.doc.lineAt(a);o.number>n&&(r.empty||r.to>o.from)&&(t(o,i,r),n=o.number),a=o.to+1}let a=e.changes(i);return{changes:i,range:k.range(a.mapPos(r.anchor,1),a.mapPos(r.head,1))}})}var mm=({state:e,dispatch:t})=>{if(e.readOnly)return!1;let n=Object.create(null),r=new Yu(e,{overrideIndentation:e=>n[e]??-1}),i=pm(e,(t,i,a)=>{let o=Ju(r,t.from);if(o==null)return;/\S/.test(t.text)||(o=0);let s=/^\s*/.exec(t.text)[0],c=qu(e,o);(s!=c||a.from<t.from+s.length)&&(n[t.from]=o,i.push({from:t.from,to:t.from+s.length,insert:c}))});return i.changes.empty||t(e.update(i,{userEvent:`indent`})),!0},hm=({state:e,dispatch:t})=>!e.readOnly&&(t(e.update(pm(e,(t,n)=>{n.push({from:t.from,insert:e.facet(Gu)})}),{userEvent:`input.indent`})),!0),gm=({state:e,dispatch:t})=>!e.readOnly&&(t(e.update(pm(e,(t,n)=>{let r=/^\s*/.exec(t.text)[0];if(!r)return;let i=Sn(r,e.tabSize),a=0,o=qu(e,Math.max(0,i-Ku(e)));for(;a<r.length&&a<o.length&&r.charCodeAt(a)==o.charCodeAt(a);)a++;n.push({from:t.from+a,to:t.from+r.length,insert:o.slice(a)})}),{userEvent:`delete.dedent`})),!0),_m=e=>(e.setTabFocusMode(),!0),vm=[{key:`Ctrl-b`,run:zf,shift:fp,preventDefault:!0},{key:`Ctrl-f`,run:Bf,shift:pp},{key:`Ctrl-p`,run:Yf,shift:bp},{key:`Ctrl-n`,run:Xf,shift:xp},{key:`Ctrl-a`,run:op,shift:kp},{key:`Ctrl-e`,run:sp,shift:Ap},{key:`Ctrl-d`,run:Kp},{key:`Ctrl-h`,run:Gp},{key:`Ctrl-k`,run:Xp},{key:`Ctrl-Alt-h`,run:Jp},{key:`Ctrl-o`,run:$p},{key:`Ctrl-t`,run:em},{key:`Ctrl-v`,run:ep}],ym=[{key:`ArrowLeft`,run:zf,shift:fp,preventDefault:!0},{key:`Mod-ArrowLeft`,mac:`Alt-ArrowLeft`,run:Hf,shift:hp,preventDefault:!0},{mac:`Cmd-ArrowLeft`,run:ip,shift:Dp,preventDefault:!0},{key:`ArrowRight`,run:Bf,shift:pp,preventDefault:!0},{key:`Mod-ArrowRight`,mac:`Alt-ArrowRight`,run:Uf,shift:gp,preventDefault:!0},{mac:`Cmd-ArrowRight`,run:ap,shift:Op,preventDefault:!0},{key:`ArrowUp`,run:Yf,shift:bp,preventDefault:!0},{mac:`Cmd-ArrowUp`,run:jp,shift:Np},{mac:`Ctrl-ArrowUp`,run:$f,shift:Cp},{key:`ArrowDown`,run:Xf,shift:xp,preventDefault:!0},{mac:`Cmd-ArrowDown`,run:Mp,shift:Pp},{mac:`Ctrl-ArrowDown`,run:ep,shift:wp},{key:`PageUp`,run:$f,shift:Cp},{key:`PageDown`,run:ep,shift:wp},{key:`Home`,run:rp,shift:Ep,preventDefault:!0},{key:`Mod-Home`,run:jp,shift:Np},{key:`End`,run:np,shift:Tp,preventDefault:!0},{key:`Mod-End`,run:Mp,shift:Pp},{key:`Enter`,run:um,shift:um},{key:`Mod-a`,run:Fp},{key:`Backspace`,run:Gp,shift:Gp,preventDefault:!0},{key:`Delete`,run:Kp,preventDefault:!0},{key:`Mod-Backspace`,mac:`Alt-Backspace`,run:Jp,preventDefault:!0},{key:`Mod-Delete`,mac:`Alt-Delete`,run:Yp,preventDefault:!0},{mac:`Mod-Backspace`,run:Zp,preventDefault:!0},{mac:`Mod-Delete`,run:Qp,preventDefault:!0}].concat(vm.map(e=>({mac:e.key,run:e.run,shift:e.shift}))),bm=[{key:`Alt-ArrowLeft`,mac:`Ctrl-ArrowLeft`,run:Kf,shift:_p},{key:`Alt-ArrowRight`,mac:`Ctrl-ArrowRight`,run:qf,shift:vp},{key:`Alt-ArrowUp`,run:rm},{key:`Shift-Alt-ArrowUp`,run:om},{key:`Alt-ArrowDown`,run:im},{key:`Shift-Alt-ArrowDown`,run:sm},{key:`Mod-Alt-ArrowUp`,run:zp},{key:`Mod-Alt-ArrowDown`,run:Bp},{key:`Escape`,run:Vp},{key:`Mod-Enter`,run:dm},{key:`Alt-l`,mac:`Ctrl-l`,run:Ip},{key:`Mod-i`,run:Lp,preventDefault:!0},{key:`Mod-[`,run:gm},{key:`Mod-]`,run:hm},{key:`Mod-Alt-\\`,run:mm},{key:`Shift-Mod-k`,run:cm},{key:`Shift-Mod-\\`,run:lp},{key:`Mod-/`,run:Zd},{key:`Alt-A`,mac:`Ctrl-A`,run:ef},{key:`Ctrl-m`,mac:`Shift-Alt-m`,run:_m}].concat(ym),xm={key:`Tab`,run:hm,shift:gm},Sm=class{constructor(e,t,n){this.from=e,this.to=t,this.diagnostic=n}},Cm=class e{constructor(e,t,n){this.diagnostics=e,this.panel=t,this.selected=n}static init(t,n,r){let i=r.facet(Rm).markerFilter;i&&(t=i(t,r));let a=t.slice().sort((e,t)=>e.from-t.from||e.to-t.to),o=new dn,s=[],c=0,l=r.doc.iter(),u=0,d=r.doc.length;for(let e=0;;){let t=e==a.length?null:a[e];if(!t&&!s.length)break;let n,r;if(s.length)n=c,r=s.reduce((e,t)=>Math.min(e,t.to),t&&t.from>n?t.from:1e8);else{if(n=t.from,n>d)break;r=t.to,s.push(t),e++}for(;e<a.length;){let t=a[e];if(t.from==n&&(t.to>t.from||t.to==n))s.push(t),e++,r=Math.min(t.to,r);else{r=Math.min(t.from,r);break}}r=Math.min(r,d);let i=!1;if(s.some(e=>e.from==n&&(e.to==r||r==d))&&(i=n==r,!i&&r-n<10)){let e=n-(u+l.value.length);e>0&&(l.next(e),u=n);for(let e=n;;){if(e>=r){i=!0;break}if(!l.lineBreak&&u+l.value.length>e)break;e=u+l.value.length,u+=l.value.length,l.next()}}let f=Zm(s);if(i)o.add(n,n,I.widget({widget:new Wm(f),diagnostics:s.slice()}));else{let e=s.reduce((e,t)=>t.markClass?e+` `+t.markClass:e,``);o.add(n,r,I.mark({class:`cm-lintRange cm-lintRange-`+f+e,diagnostics:s.slice(),inclusiveEnd:s.some(e=>e.to>r)}))}if(c=r,c==d)break;for(let e=0;e<s.length;e++)s[e].to<=c&&s.splice(e--,1)}let f=o.finish();return new e(f,n,wm(f))}};function wm(e,t=null,n=0){let r=null;return e.between(n,1e9,(e,n,{spec:i})=>{if(!(t&&i.diagnostics.indexOf(t)<0)){if(!r)r=new Sm(e,n,t||i.diagnostics[0]);else if(i.diagnostics.indexOf(r.diagnostic)<0)return!1;else r=new Sm(r.from,n,r.diagnostic)}}),r}function Tm(e,t){let n=t.pos,r=t.end||n,i=e.state.facet(Rm).hideOn(e,n,r);if(i!=null)return i;let a=e.startState.doc.lineAt(t.pos);return!!(e.effects.some(e=>e.is(Om))||e.changes.touchesRange(a.from,Math.max(a.to,r)))}function Em(e,t){return e.field(jm,!1)?t:t.concat(j.appendConfig.of(ch))}function Dm(e,t){return{effects:Em(e,[Om.of(t)])}}var Om=j.define(),km=j.define(),Am=j.define(),jm=xt.define({create(){return new Cm(I.none,null,null)},update(e,t){if(t.docChanged&&e.diagnostics.size){let n=e.diagnostics.map(t.changes),r=null,i=e.panel;if(e.selected){let i=t.changes.mapPos(e.selected.from,1);r=wm(n,e.selected.diagnostic,i)||wm(n,null,i)}!n.size&&i&&t.state.facet(Rm).autoPanel&&(i=null),e=new Cm(n,i,r)}for(let n of t.effects)if(n.is(Om)){let r=t.state.facet(Rm).autoPanel?n.value.length?Km.open:null:e.panel;e=Cm.init(n.value,r,t.state)}else n.is(km)?e=new Cm(e.diagnostics,n.value?Km.open:null,e.selected):n.is(Am)&&(e=new Cm(e.diagnostics,e.panel,n.value));return e},provide:e=>[el.from(e,e=>e.panel),V.decorations.from(e,e=>e.diagnostics)]}),Mm=I.mark({class:`cm-lintRange cm-lintRange-active`});function Nm(e,t,n){let{diagnostics:r}=e.state.field(jm),i,a=-1,o=-1;r.between(t-+(n<0),t+ +(n>0),(e,r,{spec:s})=>{if(t>=e&&t<=r&&(e==r||(t>e||n>0)&&(t<r||n<0)))return i=s.diagnostics,a=e,o=r,!1});let s=e.state.facet(Rm).tooltipFilter;return i&&s&&(i=s(i,e.state)),i?{pos:a,end:o,above:!0,create(){return{dom:Pm(e,i)}}}:null}function Pm(e,t){return Rn(`ul`,{class:`cm-tooltip-lint`},t.map(t=>Um(e,t,!1)))}var Fm=e=>{let t=e.state.field(jm,!1);return!t||!t.panel?!1:(e.dispatch({effects:km.of(!1)}),!0)},Im=Ti.fromClass(class{constructor(e){this.view=e,this.timeout=-1,this.set=!0;let{delay:t}=e.state.facet(Rm);this.lintTime=Date.now()+t,this.run=this.run.bind(this),this.timeout=setTimeout(this.run,t)}run(){clearTimeout(this.timeout);let e=Date.now();if(e<this.lintTime-10)this.timeout=setTimeout(this.run,this.lintTime-e);else{this.set=!1;let{state:e}=this.view,{sources:t}=e.facet(Rm);t.length&&Lm(t.map(e=>Promise.resolve(e(this.view))),t=>{this.view.state.doc==e.doc&&this.view.dispatch(Dm(this.view.state,t.reduce((e,t)=>e.concat(t))))},e=>{xi(this.view.state,e)})}}update(e){let t=e.state.facet(Rm);(e.docChanged||t!=e.startState.facet(Rm)||t.needsRefresh&&t.needsRefresh(e))&&(this.lintTime=Date.now()+t.delay,this.set||(this.set=!0,this.timeout=setTimeout(this.run,t.delay)))}force(){this.set&&(this.lintTime=Date.now(),this.run())}destroy(){clearTimeout(this.timeout)}});function Lm(e,t,n){let r=[],i=-1;for(let a of e)a.then(n=>{r.push(n),clearTimeout(i),r.length==e.length?t(r):i=setTimeout(()=>t(r),200)},n)}var Rm=A.define({combine(e){return{sources:e.map(e=>e.source).filter(e=>e!=null),...nn(e.map(e=>e.config),{delay:750,markerFilter:null,tooltipFilter:null,needsRefresh:null,hideOn:()=>null},{delay:Math.max,markerFilter:zm,tooltipFilter:zm,needsRefresh:(e,t)=>e?t?n=>e(n)||t(n):e:t,hideOn:(e,t)=>e?t?(n,r,i)=>e(n,r,i)||t(n,r,i):e:t,autoPanel:(e,t)=>e||t})}}});function zm(e,t){return e?t?(n,r)=>t(e(n,r),r):e:t}function Bm(e,t={}){return[Rm.of({source:e,config:t}),Im,ch]}function Vm(e){let t=e.plugin(Im);t&&t.force()}function Hm(e){let t=[];if(e)actions:for(let{name:n}of e){for(let e=0;e<n.length;e++){let r=n[e];if(/[a-zA-Z]/.test(r)&&!t.some(e=>e.toLowerCase()==r.toLowerCase())){t.push(r);continue actions}}t.push(``)}return t}function Um(e,t,n){let r=n?Hm(t.actions):[];return Rn(`li`,{class:`cm-diagnostic cm-diagnostic-`+t.severity},Rn(`span`,{class:`cm-diagnosticText`},t.renderMessage?t.renderMessage(e):t.message),t.actions?.map((n,i)=>{let a=!1,o=r=>{if(r.preventDefault(),a)return;a=!0;let i=wm(e.state.field(jm).diagnostics,t);i&&n.apply(e,i.from,i.to)},{name:s}=n,c=r[i]?s.indexOf(r[i]):-1,l=c<0?s:[s.slice(0,c),Rn(`u`,s.slice(c,c+1)),s.slice(c+1)];return Rn(`button`,{type:`button`,class:`cm-diagnosticAction`+(n.markClass?` `+n.markClass:``),onclick:o,onmousedown:o,"aria-label":` Action: ${s}${c<0?``:` (access key "${r[i]})"`}.`},l)}),t.source&&Rn(`div`,{class:`cm-diagnosticSource`},t.source))}var Wm=class extends rr{constructor(e){super(),this.sev=e}eq(e){return e.sev==this.sev}toDOM(){return Rn(`span`,{class:`cm-lintPoint cm-lintPoint-`+this.sev})}},Gm=class{constructor(e,t){this.diagnostic=t,this.id=`item_`+Math.floor(Math.random()*4294967295).toString(16),this.dom=Um(e,t,!0),this.dom.id=this.id,this.dom.setAttribute(`role`,`option`)}},Km=class e{constructor(e){this.view=e,this.items=[];let t=t=>{if(!(t.ctrlKey||t.altKey||t.metaKey)){if(t.keyCode==27)Fm(this.view),this.view.focus();else if(t.keyCode==38||t.keyCode==33)this.moveSelection((this.selectedIndex-1+this.items.length)%this.items.length);else if(t.keyCode==40||t.keyCode==34)this.moveSelection((this.selectedIndex+1)%this.items.length);else if(t.keyCode==36)this.moveSelection(0);else if(t.keyCode==35)this.moveSelection(this.items.length-1);else if(t.keyCode==13)this.view.focus();else if(t.keyCode>=65&&t.keyCode<=90&&this.selectedIndex>=0){let{diagnostic:n}=this.items[this.selectedIndex],r=Hm(n.actions);for(let i=0;i<r.length;i++)if(r[i].toUpperCase().charCodeAt(0)==t.keyCode){let t=wm(this.view.state.field(jm).diagnostics,n);t&&n.actions[i].apply(e,t.from,t.to)}}else return;t.preventDefault()}},n=e=>{for(let t=0;t<this.items.length;t++)this.items[t].dom.contains(e.target)&&this.moveSelection(t)};this.list=Rn(`ul`,{tabIndex:0,role:`listbox`,"aria-label":this.view.state.phrase(`Diagnostics`),onkeydown:t,onclick:n}),this.dom=Rn(`div`,{class:`cm-panel-lint`},this.list,Rn(`button`,{type:`button`,name:`close`,"aria-label":this.view.state.phrase(`close`),onclick:()=>Fm(this.view)},`×`)),this.update()}get selectedIndex(){let e=this.view.state.field(jm).selected;if(!e)return-1;for(let t=0;t<this.items.length;t++)if(this.items[t].diagnostic==e.diagnostic)return t;return-1}update(){let{diagnostics:e,selected:t}=this.view.state.field(jm),n=0,r=!1,i=null,a=new Set;for(e.between(0,this.view.state.doc.length,(e,o,{spec:s})=>{for(let e of s.diagnostics){if(a.has(e))continue;a.add(e);let o=-1,s;for(let t=n;t<this.items.length;t++)if(this.items[t].diagnostic==e){o=t;break}o<0?(s=new Gm(this.view,e),this.items.splice(n,0,s),r=!0):(s=this.items[o],o>n&&(this.items.splice(n,o-n),r=!0)),t&&s.diagnostic==t.diagnostic?s.dom.hasAttribute(`aria-selected`)||(s.dom.setAttribute(`aria-selected`,`true`),i=s):s.dom.hasAttribute(`aria-selected`)&&s.dom.removeAttribute(`aria-selected`),n++}});n<this.items.length&&!(this.items.length==1&&this.items[0].diagnostic.from<0);)r=!0,this.items.pop();this.items.length==0&&(this.items.push(new Gm(this.view,{from:-1,to:-1,severity:`info`,message:this.view.state.phrase(`No diagnostics`)})),r=!0),i?(this.list.setAttribute(`aria-activedescendant`,i.id),this.view.requestMeasure({key:this,read:()=>({sel:i.dom.getBoundingClientRect(),panel:this.list.getBoundingClientRect()}),write:({sel:e,panel:t})=>{let n=t.height/this.list.offsetHeight;e.top<t.top?this.list.scrollTop-=(t.top-e.top)/n:e.bottom>t.bottom&&(this.list.scrollTop+=(e.bottom-t.bottom)/n)}})):this.selectedIndex<0&&this.list.removeAttribute(`aria-activedescendant`),r&&this.sync()}sync(){let e=this.list.firstChild;function t(){let t=e;e=t.nextSibling,t.remove()}for(let n of this.items)if(n.dom.parentNode==this.list){for(;e!=n.dom;)t();e=n.dom.nextSibling}else this.list.insertBefore(n.dom,e);for(;e;)t()}moveSelection(e){if(this.selectedIndex<0)return;let t=wm(this.view.state.field(jm).diagnostics,this.items[e].diagnostic);t&&this.view.dispatch({selection:{anchor:t.from,head:t.to},scrollIntoView:!0,effects:Am.of(t)})}static open(t){return new e(t)}};function qm(e,t=`viewBox="0 0 40 40"`){return`url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" ${t}>${encodeURIComponent(e)}</svg>')`}function Jm(e){return qm(`<path d="m0 2.5 l2 -1.5 l1 0 l2 1.5 l1 0" stroke="${e}" fill="none" stroke-width=".7"/>`,`width="6" height="3"`)}var Ym=V.baseTheme({".cm-diagnostic":{padding:`3px 6px 3px 8px`,marginLeft:`-1px`,display:`block`,whiteSpace:`pre-wrap`},".cm-diagnostic-error":{borderLeft:`5px solid #d11`},".cm-diagnostic-warning":{borderLeft:`5px solid orange`},".cm-diagnostic-info":{borderLeft:`5px solid #999`},".cm-diagnostic-hint":{borderLeft:`5px solid #66d`},".cm-diagnosticAction":{font:`inherit`,border:`none`,padding:`2px 4px`,backgroundColor:`#444`,color:`white`,borderRadius:`3px`,marginLeft:`8px`,cursor:`pointer`},".cm-diagnosticSource":{fontSize:`70%`,opacity:.7},".cm-lintRange":{backgroundPosition:`left bottom`,backgroundRepeat:`repeat-x`,paddingBottom:`0.7px`},".cm-lintRange-error":{backgroundImage:Jm(`#f11`)},".cm-lintRange-warning":{backgroundImage:Jm(`orange`)},".cm-lintRange-info":{backgroundImage:Jm(`#999`)},".cm-lintRange-hint":{backgroundImage:Jm(`#66d`)},".cm-lintRange-active":{backgroundColor:`#ffdd9980`},".cm-tooltip-lint":{padding:0,margin:0},".cm-lintPoint":{position:`relative`,"&:after":{content:`""`,position:`absolute`,bottom:0,left:`-2px`,borderLeft:`3px solid transparent`,borderRight:`3px solid transparent`,borderBottom:`4px solid #d11`}},".cm-lintPoint-warning":{"&:after":{borderBottomColor:`orange`}},".cm-lintPoint-info":{"&:after":{borderBottomColor:`#999`}},".cm-lintPoint-hint":{"&:after":{borderBottomColor:`#66d`}},".cm-panel.cm-panel-lint":{position:`relative`,"& ul":{maxHeight:`100px`,overflowY:`auto`,"& [aria-selected]":{backgroundColor:`#ddd`,"& u":{textDecoration:`underline`}},"&:focus [aria-selected]":{background_fallback:`#bdf`,backgroundColor:`Highlight`,color_fallback:`white`,color:`HighlightText`},"& u":{textDecoration:`none`},padding:0,margin:0},"& [name=close]":{position:`absolute`,top:`0`,right:`2px`,background:`inherit`,border:`none`,font:`inherit`,padding:0,margin:0}},"&dark .cm-lintRange-active":{backgroundColor:`#86714a80`},"&dark .cm-panel.cm-panel-lint ul":{"& [aria-selected]":{backgroundColor:`#2e343e`}}});function Xm(e){return e==`error`?4:e==`warning`?3:e==`info`?2:1}function Zm(e){let t=`hint`,n=1;for(let r of e){let e=Xm(r.severity);e>n&&(n=e,t=r.severity)}return t}var Qm=class extends tl{constructor(e){super(),this.diagnostics=e,this.severity=Zm(e)}toDOM(e){let t=document.createElement(`div`);t.className=`cm-lint-marker cm-lint-marker-`+this.severity;let n=this.diagnostics,r=e.state.facet(lh).tooltipFilter;return r&&(n=r(n,e.state)),n.length&&(t.onmouseover=()=>eh(e,t,n)),t}};function $m(e,t){let n=r=>{let i=t.getBoundingClientRect();if(!(r.clientX>i.left-10&&r.clientX<i.right+10&&r.clientY>i.top-10&&r.clientY<i.bottom+10)){for(let e=r.target;e;e=e.parentNode)if(e.nodeType==1&&e.classList.contains(`cm-tooltip-lint`))return;window.removeEventListener(`mousemove`,n),e.state.field(ah)&&e.dispatch({effects:ih.of(null)})}};window.addEventListener(`mousemove`,n)}function eh(e,t,n){function r(){let r=e.elementAtHeight(t.getBoundingClientRect().top+5-e.documentTop);e.coordsAtPos(r.from)&&e.dispatch({effects:ih.of({pos:r.from,above:!1,clip:!1,create(){return{dom:Pm(e,n),getCoords:()=>t.getBoundingClientRect()}}})}),t.onmouseout=t.onmousemove=null,$m(e,t)}let{hoverTime:i}=e.state.facet(lh),a=setTimeout(r,i);t.onmouseout=()=>{clearTimeout(a),t.onmouseout=t.onmousemove=null},t.onmousemove=()=>{clearTimeout(a),a=setTimeout(r,i)}}function th(e,t){let n=Object.create(null);for(let r of t){let t=e.lineAt(r.from);(n[t.from]||(n[t.from]=[])).push(r)}let r=[];for(let e in n)r.push(new Qm(n[e]).range(+e));return N.of(r,!0)}var nh=ol({class:`cm-gutter-lint`,markers:e=>e.state.field(rh),widgetMarker:(e,t,n)=>{let r=[];return e.state.field(rh).between(n.from,n.to,(e,t,i)=>{e>n.from&&e<n.to&&r.push(...i.diagnostics)}),r.length?new Qm(r):null}}),rh=xt.define({create(){return N.empty},update(e,t){e=e.map(t.changes);let n=t.state.facet(lh).markerFilter;for(let r of t.effects)if(r.is(Om)){let i=r.value;n&&(i=n(i||[],t.state)),e=th(t.state.doc,i.slice(0))}return e}}),ih=j.define(),ah=xt.define({create(){return null},update(e,t){return e&&t.docChanged&&(e=Tm(t,e)?null:{...e,pos:t.changes.mapPos(e.pos)}),t.effects.reduce((e,t)=>t.is(ih)?t.value:e,e)},provide:e=>zc.from(e)}),oh=V.baseTheme({".cm-gutter-lint":{width:`1.4em`,"& .cm-gutterElement":{padding:`.2em`}},".cm-lint-marker":{width:`1em`,height:`1em`},".cm-lint-marker-info":{content:qm(`<path fill="#aaf" stroke="#77e" stroke-width="6" stroke-linejoin="round" d="M5 5L35 5L35 35L5 35Z"/>`)},".cm-lint-marker-warning":{content:qm(`<path fill="#fe8" stroke="#fd7" stroke-width="6" stroke-linejoin="round" d="M20 6L37 35L3 35Z"/>`)},".cm-lint-marker-error":{content:qm(`<circle cx="20" cy="20" r="15" fill="#f87" stroke="#f43" stroke-width="6"/>`)}}),sh=Jc(Nm,{hideOn:Tm}),ch=[jm,V.decorations.compute([jm],e=>{let{selected:t,panel:n}=e.field(jm);return!t||!n||t.from==t.to?I.none:I.set([Mm.range(t.from,t.to)])}),sh,Ym],lh=A.define({combine(e){return nn(e,{hoverTime:300,markerFilter:null,tooltipFilter:null})}});function uh(e={}){return[lh.of(e),rh,nh,oh,ah]}var dh=/^(nop|halt|brk|ret|reti|ei|di|wait|pushf|popf|mov|li|add|adc|sub|sbc|and|or|xor|shl|shr|sar|mul|divu|modu|divs|mods|cmp|tst|not|neg|mulhu|mulhs|ld|ldb|ldbs|st|stb|lea|push|pop|jmp|call|j(eq|z|ne|nz|lt|ge|le|gt|ltu|c|geu|nc|leu|gtu|mi|pl|vs|vc|al)|s(eq|z|ne|nz|lt|ge|le|gt|ltu|c|geu|nc|leu|gtu|mi|pl|vs|vc|al))\b/i,fh=Pd.define({startState:()=>({start:!0}),token(e){return e.sol(),e.eatSpace()?null:e.match(`;`)||e.match(`//`)?(e.skipToEnd(),`comment`):e.match(/^"(\\.|[^"\\])*"?/)||e.match(/^'(\\.|[^'\\])+'/)?`string`:e.match(/^\.[a-z]+/i)?`keyword`:e.match(/^(r1[0-5]|r[0-9]|sp|fp)\b/i)?`variableName.special`:e.match(/^(0x[0-9a-f_]+|\$[0-9a-f]+|0b[01_]+|[0-9][0-9_]*)/i)?`number`:e.match(/^[A-Za-z_.][\w.]*:/)?`labelName`:e.match(dh)?`operatorKeyword`:e.match(/^[A-Z][A-Z0-9_]+\b/)?`atom`:e.match(/^[A-Za-z_.][\w.]*/)?`variableName`:(e.next(),`punctuation`)},languageData:{commentTokens:{line:`;`}}}),ph=Pd.define({startState:()=>({inComment:!1}),token(e,t){return t.inComment?(e.skipTo(`*/`)?(e.match(`*/`),t.inComment=!1):e.skipToEnd(),`comment`):e.eatSpace()?null:e.match(`//`)?(e.skipToEnd(),`comment`):e.match(`/*`)?(t.inComment=!0,`comment`):e.match(/^"(\\.|[^"\\])*"?/)||e.match(/^'(\\.|[^'\\])+'/)?`string`:e.match(/^(int|byte|void|const)\b/)?`typeName`:e.match(/^(if|else|while|for|return|break|continue|asm)\b/)?`keyword`:e.match(/^(0x[0-9a-f]+|[0-9]+)/i)?`number`:e.match(/^[A-Za-z_]\w*(?=\s*\()/)?`variableName.function`:e.match(/^[A-Z][A-Z0-9_]+\b/)?`atom`:e.match(/^[A-Za-z_]\w*/)?`variableName`:(e.next(),`punctuation`)},languageData:{commentTokens:{line:`//`}}}),mh=od.define([{tag:K.comment,color:`#5f7a92`,fontStyle:`italic`},{tag:K.string,color:`#9fe6a0`},{tag:K.number,color:`#ffb86b`},{tag:K.keyword,color:`#c792ea`},{tag:K.operatorKeyword,color:`#7fdbff`,fontWeight:`600`},{tag:K.typeName,color:`#7fdbff`},{tag:K.labelName,color:`#ffe38a`,fontWeight:`600`},{tag:K.special(K.variableName),color:`#ff8fa3`},{tag:K.constant(K.variableName),color:`#f5a3ff`},{tag:K.atom,color:`#f5a3ff`},{tag:K.function(K.variableName),color:`#ffe38a`},{tag:K.variableName,color:`#dbe7f3`},{tag:K.punctuation,color:`#8aa3b8`}]),hh=V.theme({"&":{height:`100%`,backgroundColor:`var(--panel)`,color:`#dbe7f3`,fontSize:`13px`},".cm-content":{fontFamily:`var(--mono)`,caretColor:`#ffe38a`},".cm-gutters":{backgroundColor:`var(--panel-2)`,color:`#4f6a82`,border:`none`},".cm-activeLine":{backgroundColor:`rgba(127,219,255,0.05)`},".cm-activeLineGutter":{backgroundColor:`rgba(127,219,255,0.08)`},"&.cm-focused .cm-selectionBackground, .cm-selectionBackground, ::selection":{backgroundColor:`rgba(127,219,255,0.22) !important`},".cm-cursor":{borderLeftColor:`#ffe38a`},".cm-bp-gutter":{width:`14px`,cursor:`pointer`},".cm-bp-gutter .cm-gutterElement":{cursor:`pointer`},".cm-exec-line":{backgroundColor:`rgba(255,227,138,0.16)`,boxShadow:`inset 3px 0 0 #ffe38a`},".cm-scroller":{overflow:`auto`}},{dark:!0}),gh=j.define(),_h=j.define(),vh=new class extends tl{toDOM(){let e=document.createElement(`div`);return e.className=`bp-dot`,e.title=`Breakpoint`,e}},yh=xt.define({create:()=>N.empty,update(e,t){e=e.map(t.changes);for(let n of t.effects)n.is(gh)?e=n.value.on?e.update({add:[vh.range(n.value.pos)]}):e.update({filter:e=>e!==n.value.pos}):n.is(_h)&&(e=N.empty);return e}}),bh=j.define(),xh=xt.define({create:()=>I.none,update(e,t){e=e.map(t.changes);for(let n of t.effects)if(n.is(bh)){if(n.value<=0||n.value>t.state.doc.lines)e=I.none;else{let r=t.state.doc.line(n.value);e=I.set([I.line({class:`cm-exec-line`}).range(r.from)])}}return e},provide:e=>V.decorations.from(e)});function Sh(e,t){let n=[],r=[],i=[],a=new Et,o=ol({class:`cm-bp-gutter`,markers:e=>e.state.field(yh),initialSpacer:()=>vh,domEventHandlers:{mousedown(e,t){let n=s(e,t.from);return e.dispatch({effects:gh.of({pos:t.from,on:!n})}),i.forEach(e=>e()),!0}}});function s(e,t){let n=!1;return e.state.field(yh).between(t,t,()=>{n=!0}),n}let c=Object.entries(t).map(([e,t])=>({key:e,run:t,preventDefault:!0})),l=new V({parent:e,state:M.create({doc:``,extensions:[Vs.of([...c,...bm,...Nf,xm]),mf(),ic(),bc(),Dc(),Sd(),yh,o,Sl(),uh(),xh,a.of(fh),ud(mh),hh,Bm(()=>n,{delay:0}),V.updateListener.of(e=>{e.docChanged&&r.forEach(e=>e())}),M.tabSize.of(8)]})});return{view:l,getText:()=>l.state.doc.toString(),setDoc(e,t){l.dispatch({changes:{from:0,to:l.state.doc.length,insert:e},effects:[_h.of(null),bh.of(0),a.reconfigure(t===`glint`?ph:fh)]}),n=[],Vm(l)},setDiagnostics(e){let t=l.state.doc;n=e.filter(e=>e.line>=1&&e.line<=t.lines).map(e=>{let n=t.line(e.line),r=Math.min(n.to,n.from+Math.max(0,(e.col??1)-1));return{from:r,to:Math.max(r,n.to),severity:`error`,message:e.message}}),Vm(l)},breakpointLines(){let e=[];return l.state.field(yh).between(0,l.state.doc.length,t=>{e.push(l.state.doc.lineAt(t).number)}),e},setBreakpointLines(e){let t=l.state.doc,n=[_h.of(null)];for(let r of e)r>=1&&r<=t.lines&&n.push(gh.of({pos:t.line(r).from,on:!0}));l.dispatch({effects:n})},setExecLine(e,t=!0){let n=[bh.of(e)];t&&e>0&&e<=l.state.doc.lines&&n.push(V.scrollIntoView(l.state.doc.line(e).from,{y:`nearest`,yMargin:60})),l.dispatch({effects:n})},gotoLine(e){if(e<1||e>l.state.doc.lines)return;let t=l.state.doc.line(e).from;l.dispatch({selection:{anchor:t},effects:V.scrollIntoView(t,{y:`center`})}),l.focus()},onChange(e){r.push(e)},onBreakpointsChange(e){i.push(e)}}}var Ch=`
class LF16 extends AudioWorkletProcessor {
  constructor() {
    super();
    this.voices = [0,1,2,3].map(() => ({ freq: 0, vol: 0, wave: 0, phase: 0, lfsr: 0x7fff, nacc: 0, cur: 0, noiseOut: 0 }));
    this.master = 0.5;
    this.port.onmessage = (e) => {
      const d = e.data;
      if (d.voices) d.voices.forEach((v, i) => { const t = this.voices[i]; t.freq = v.freq; t.vol = v.vol; t.wave = v.wave; });
      if (typeof d.master === 'number') this.master = d.master;
    };
  }
  process(_in, outputs) {
    const out = outputs[0][0];
    if (!out) return true;
    const sr = sampleRate;
    for (let i = 0; i < out.length; i++) {
      let mix = 0;
      for (const v of this.voices) {
        const target = v.freq > 0 && v.freq < 20000 ? v.vol / 15 : 0;
        v.cur += (target - v.cur) * 0.004; // de-click smoothing
        if (v.cur < 0.0005 && target === 0) continue;
        const inc = v.freq / sr;
        v.phase += inc;
        if (v.phase >= 1) v.phase -= Math.floor(v.phase);
        let s = 0;
        switch (v.wave) {
          case 0: s = v.phase < 0.5 ? 1 : -1; break;
          case 1: s = v.phase < 0.25 ? 1 : -1; break;
          case 2: s = 4 * Math.abs(v.phase - 0.5) - 1; break;
          case 3: s = 2 * v.phase - 1; break;
          default: {
            v.nacc += (v.freq * 8) / sr;
            while (v.nacc >= 1) {
              v.nacc -= 1;
              const bit = (v.lfsr ^ (v.lfsr >> 1)) & 1;
              v.lfsr = (v.lfsr >> 1) | (bit << 14);
              v.noiseOut = v.lfsr & 1 ? 1 : -1;
            }
            s = v.noiseOut;
          }
        }
        mix += s * v.cur;
      }
      out[i] = (mix / 4) * this.master * 0.6;
    }
    for (let c = 1; c < outputs[0].length; c++) outputs[0][c].set(out);
    return true;
  }
}
registerProcessor('lf16', LF16);
`,wh=class{ctx;node;starting;muted=!1;volume=.7;async start(){if(this.node){await this.ctx.resume();return}return this.starting||=(async()=>{let e=new AudioContext({latencyHint:`interactive`}),t=URL.createObjectURL(new Blob([Ch],{type:`application/javascript`}));await e.audioWorklet.addModule(t),URL.revokeObjectURL(t);let n=new AudioWorkletNode(e,`lf16`,{outputChannelCount:[2]});n.connect(e.destination),this.ctx=e,this.node=n,this.setMaster()})(),this.starting}get running(){return!!this.node&&this.ctx?.state===`running`}update(e){this.node?.port.postMessage({voices:e.map(e=>({freq:e.freq,vol:e.vol,wave:e.wave}))})}silence(){this.node?.port.postMessage({voices:[0,1,2,3].map(()=>({freq:0,vol:0,wave:0}))})}setMuted(e){this.muted=e,this.setMaster()}setVolume(e){this.volume=e,this.setMaster()}setMaster(){this.node?.port.postMessage({master:this.muted?0:this.volume})}},Th=2e6,Eh=e=>e.status===`running`||e.status===`waiting`,Dh=class{left;constructor(e){this.left=e}take(){return--this.left>=0}};function Oh(e,t,n,r,i){for(e.step();Eh(e);){if(e.pc===t&&e.r[15]>=n)return`done`;if(r.has(e.pc))return`breakpoint`;if(!i.take())return`budget`;e.step()}return`stopped`}function kh(e){let t=he(t=>e.peek8(t),e.pc);return t.text.startsWith(`call`)?t.size:0}function Ah(e,t,n){let r=ke(e,t.pc);return r!==n&&r!==0&&e.lineToAddr.get(r)===t.pc}function jh(e,t,n=Th){if(e.status===`break`&&(e.status=`running`),!Eh(e))return`stopped`;if(t.lang!==`glint`)return e.step(),Eh(e)?`done`:`stopped`;let r=new Dh(n),i=ke(t,e.pc);for(;Eh(e);){if(!r.take())return`budget`;if(e.step(),Ah(t,e,i))return`done`}return`stopped`}function Mh(e,t,n,r=Th){if(e.status===`break`&&(e.status=`running`),!Eh(e))return`stopped`;let i=new Dh(r);if(t.lang!==`glint`){let t=kh(e);return t?Oh(e,e.pc+t,e.r[15],n,i):(e.step(),Eh(e)?`done`:`stopped`)}let a=ke(t,e.pc);if(a===0)return jh(e,t,r);for(;Eh(e);){if(!i.take())return`budget`;let r=kh(e);if(r){let t=Oh(e,e.pc+r,e.r[15],n,i);if(t!==`done`)return t}else e.step();if(Ah(t,e,a))return`done`;if(n.has(e.pc))return`breakpoint`}return`stopped`}var J={},Nh=Object.assign({"../../programs/abyss-tracker.glint":e,"../../programs/hello.lfa":t,"../../programs/lumen-drift.lfa":n,"../../programs/prism-courier.glint":r,"../../programs/tidepool.lfa":i,"../../rom/monitor/monitor.glint":a});for(let[e,t]of Object.entries(Nh)){let n=e.replace(/^.*\/(programs|rom)\//,(e,t)=>t===`rom`?`rom/`:``);J[n]=t}var Ph=[`lumen-drift.lfa`,`tidepool.lfa`,`prism-courier.glint`,`abyss-tracker.glint`,`rom/monitor/monitor.glint`,`hello.lfa`],Y={get(e){try{return localStorage.getItem(`lf.`+e)}catch{return null}},set(e,t){try{localStorage.setItem(`lf.`+e,t)}catch{}},del(e){try{localStorage.removeItem(`lf.`+e)}catch{}}};function Fh(){try{return JSON.parse(Y.get(`userFiles`)??`[]`)}catch{return[]}}function Ih(e){Y.set(`userFiles`,JSON.stringify(e))}function Lh(e){return Y.get(`file:`+e)??J[e]??``}function Rh(){let e={};for(let t of Object.keys(J))e[t]=Lh(t);for(let t of Fh())e[t]=Lh(t);return e}var X=e=>document.getElementById(e),zh=X(`file-select`),Bh=X(`screen`),Vh=Bh.getContext(`2d`),Hh=Vh.createImageData(160,120),Uh=X(`problems`),Z=new h;Z.status=`halted`;var Wh=new wh,Q=``,$=null,Gh=!1,Kh=1,qh=new Set,Jh=0,Yh=null,Xh=new Uint8Array(65536),Zh=49152,Qh=0,$h=Sh(X(`editor`),{"Ctrl-Enter":()=>(og(),!0),"Mod-Enter":()=>(og(),!0),"Mod-s":()=>(rg(),!0),F8:()=>(ug(),!0),F10:()=>(pg(),!0),F11:()=>(fg(),!0)});function eg(){let e=Fh(),t=[...Ph.filter(e=>e in J),...Object.keys(J).filter(e=>!Ph.includes(e)).sort()];zh.innerHTML=``;let n=document.createElement(`optgroup`);n.label=`Shipped programs`;for(let e of t)n.append(new Option(e+(Y.get(`file:`+e)===null?``:` •`),e));if(zh.append(n),e.length){let t=document.createElement(`optgroup`);t.label=`My programs`;for(let n of e)t.append(new Option(n,n));zh.append(t)}if(Yh){let e=document.createElement(`optgroup`);e.label=`Cartridge`,e.append(new Option(Yh.name,`__cart`)),zh.append(e)}zh.value=Yh&&Q===`__cart`?`__cart`:Q}function tg(e,t=!0){rg(),Yh=null,Q=e,Y.set(`current`,e),$h.setDoc(Lh(e),De(e));try{$h.setBreakpointLines(JSON.parse(Y.get(`bp:`+e)??`[]`))}catch{}X(`file-name`).textContent=e,X(`btn-revert`).toggleAttribute(`disabled`,!(e in J)),X(`btn-view-asm`).hidden=De(e)!==`glint`,eg(),t?og():ag()}var ng=0;function rg(){if(!Q||Q===`__cart`)return;let e=$h.getText();Q in J&&e===J[Q]?Y.del(`file:`+Q):Y.set(`file:`+Q,e),Y.set(`bp:`+Q,JSON.stringify($h.breakpointLines()))}$h.onChange(()=>{clearTimeout(ng),ng=window.setTimeout(()=>{rg(),eg()},400),X(`build-state`).textContent=`edited`,X(`build-state`).className=`build-state dirty`}),$h.onBreakpointsChange(()=>{cg(),rg()}),zh.addEventListener(`change`,()=>{zh.value!==`__cart`&&tg(zh.value)}),X(`btn-new`).addEventListener(`click`,()=>{let e=confirm(`Create a Glint (.glint) file?
OK = Glint, Cancel = assembly (.lfa)`)?`glint`:`lfa`,t=Fh(),n=1;for(;t.includes(`untitled-${n}.${e}`)||`untitled-${n}.${e}`in J;)n++;let r=`untitled-${n}.${e}`;Ih([...t,r]),Y.set(`file:`+r,e===`glint`?`// A new Glint program
int main() {
  clear(1);
  color(10);
  text(8, 8, "hello from glint");
  while (1) { wait(); }
}
`:`; A new LF-16 program
        .name "untitled"
start:  li r1, BLT_COLOR
        li r0, 2
        st [r1], r0
        li r1, BLT_CMD
        li r0, BLT_CLEAR
        st [r1], r0
.idle:  wait
        jmp .idle
`),tg(r)}),X(`btn-revert`).addEventListener(`click`,()=>{Q in J&&confirm(`Discard your edits to ${Q}?`)&&(Y.del(`file:`+Q),$h.setDoc(J[Q],De(Q)),og(),eg())}),X(`btn-import`).addEventListener(`click`,()=>X(`file-input`).click()),X(`file-input`).addEventListener(`change`,async e=>{let t=e.target,n=t.files?.[0];if(t.value=``,!n)return;let r=await n.text();if(n.name.endsWith(`.json`)){let e=be(r);if(!e.ok){ig([{line:0,message:`${n.name}: ${e.error}`,file:n.name}]);return}rg(),Yh={name:e.cart.name||n.name},Q=`__cart`,$={ok:!0,lang:`lfa`,diagnostics:[],lineToAddr:new Map,addrLines:[],symbolsByAddr:new Map(Object.entries(e.cart.symbols).map(([e,t])=>[t,e]))},$h.setDoc(`; ${e.cart.name} — loaded from cartridge ${n.name}\n; (no source: use the Disassembly tab to debug)\n`,`lfa`),X(`file-name`).textContent=n.name,eg(),Z.reset(e.cart.image,e.cart.origin,e.cart.entry),sg();return}let i=n.name.endsWith(`.glint`)?`glint`:`lfa`,a=n.name.replace(/\.(txt|lfa|glint)$/i,``)+`.`+i,o=Fh();a in J&&(a=`my-`+a),o.includes(a)||Ih([...o,a]),Y.set(`file:`+a,r),tg(a)}),X(`btn-export`).addEventListener(`click`,()=>{if(!$?.ok||!$.asm){Xg(`Build the program first`);return}let e=ve($.asm,Q.replace(/\.\w+$/,``)),t=new Blob([JSON.stringify(e)],{type:`application/json`}),n=document.createElement(`a`);n.href=URL.createObjectURL(t),n.download=Q.replace(/^.*\//,``).replace(/\.\w+$/,``)+`.lfc.json`,n.click(),setTimeout(()=>URL.revokeObjectURL(n.href),1e3)}),X(`btn-view-asm`).addEventListener(`click`,()=>{X(`asm-text`).textContent=$?.asmText??`(build first)`,X(`asm-dialog`).showModal()});function ig(e){Uh.innerHTML=``,Uh.classList.toggle(`has`,e.length>0);for(let t of e.slice(0,50)){let e=document.createElement(`button`);e.className=`problem`,e.textContent=`${t.file}:${t.line}${t.col?`:`+t.col:``}  ${t.message}`,e.addEventListener(`click`,()=>$h.gotoLine(t.line)),Uh.append(e)}}function ag(){if(Q===`__cart`)return!0;let e=performance.now(),t=Oe(Q.replace(/^rom\/monitor\//,``),$h.getText(),Rh());$=t,$h.setDiagnostics(t.diagnostics),ig(t.diagnostics);let n=X(`build-state`);return t.ok?(n.textContent=`✓ ${t.asm.image.length} bytes · ${(performance.now()-e).toFixed(0)} ms`,n.className=`build-state ok`):(n.textContent=`✗ ${t.diagnostics.length} error${t.diagnostics.length===1?``:`s`}`,n.className=`build-state err`),cg(),t.ok}function og(){if(rg(),Q===`__cart`){Z.status=`running`,lg(!0);return}if(!ag()){lg(!1);return}let e=$.asm;Z.reset(e.image,e.origin,e.entry),sg()}function sg(){Xh=Z.mem.slice(),X(`serial-out`).textContent=``,Qh=0,Sg(),Jh=0,$h.setExecLine(0),Wh.start().catch(()=>{}),lg(!0),Bh.focus({preventScroll:!0})}function cg(){if(qh=new Set,!$?.ok)return;let e=Math.max(0,...$.lineToAddr.keys());for(let t of $h.breakpointLines())for(let n=t;n<=e;n++){let e=$.lineToAddr.get(n);if(e!==void 0){qh.add(e);break}}}function lg(e){let t=Z.status===`running`||Z.status===`waiting`||Z.status===`break`;Gh=e&&t,X(`btn-run`).textContent=Gh?`⏸ Pause`:`▶ Continue`,Gh?($h.setExecLine(0,!1),Jh=0):(Wh.silence(),dg(),Lg(!0)),Wg()}function ug(){if(!Gh&&Z.status===`halted`){og();return}!Gh&&Z.status===`break`&&(Z.status=`running`),lg(!Gh)}function dg(){$&&(Jh=ke($,Z.pc),$h.setExecLine(Jh))}function fg(){$&&gg()&&(lg(!1),mg(jh(Z,$)))}function pg(){$&&gg()&&(lg(!1),mg(Mh(Z,$,qh)))}function mg(e){e===`budget`?Xg(`step limit reached: paused mid-call`):e===`breakpoint`&&Xg(`breakpoint`),hg()}function hg(){dg(),Lg(!0),Gg(Z.videoBase),Wg()}var gg=()=>Z.status===`running`||Z.status===`waiting`||Z.status===`break`;X(`btn-build`).addEventListener(`click`,og),X(`btn-run`).addEventListener(`click`,ug),X(`btn-step`).addEventListener(`click`,fg),X(`btn-over`).addEventListener(`click`,pg),X(`btn-reset`).addEventListener(`click`,()=>og()),X(`speed`).addEventListener(`change`,e=>{Kh=Number(e.target.value)}),X(`btn-mute`).addEventListener(`click`,async()=>{await Wh.start().catch(()=>void 0),Wh.setMuted(!Wh.muted),Y.set(`muted`,Wh.muted?`1`:`0`),_g()});function _g(){X(`btn-mute`).textContent=Wh.muted?`🔇 Muted`:`🔈 Sound`,X(`btn-mute`).setAttribute(`aria-pressed`,String(Wh.muted))}Wh.muted=Y.get(`muted`)===`1`,_g(),document.addEventListener(`pointerdown`,()=>{Wh.start().then(()=>Wh.setMuted(Wh.muted)).catch(()=>void 0)},{once:!0}),window.addEventListener(`keydown`,e=>{e.key===`F8`?(e.preventDefault(),ug()):e.key===`F10`?(e.preventDefault(),pg()):e.key===`F11`?(e.preventDefault(),fg()):e.key===`R`&&e.ctrlKey&&e.shiftKey&&(e.preventDefault(),og())});var vg={ArrowUp:1,KeyW:1,ArrowDown:2,KeyS:2,ArrowLeft:4,KeyA:4,ArrowRight:8,KeyD:8,KeyZ:16,KeyJ:16,KeyX:32,KeyK:32,Enter:64,ShiftLeft:128,ShiftRight:128},yg={ArrowUp:128,ArrowDown:129,ArrowLeft:130,ArrowRight:131,Backspace:8,Enter:10,Escape:27,Tab:9};Bh.addEventListener(`keydown`,e=>{if(e.ctrlKey||e.metaKey||e.altKey||/^F\d+$/.test(e.key)||(e.preventDefault(),vg[e.code]&&(Z.pad|=vg[e.code]),e.repeat&&vg[e.code]))return;let t=yg[e.key]??(e.key.length===1?e.key.charCodeAt(0):0);t&&t<256&&Z.pressKey(t)}),Bh.addEventListener(`keyup`,e=>{vg[e.code]&&(Z.pad&=~vg[e.code])}),Bh.addEventListener(`blur`,()=>{Z.pad=0}),Bh.addEventListener(`focus`,()=>X(`screen-hint`).classList.add(`dim`)),Bh.addEventListener(`pointerdown`,()=>Bh.focus()),Z.onSerial=e=>bg.push(e);var bg=[];function xg(){if(!bg.length)return;let e=X(`serial-out`);e.textContent=(e.textContent+String.fromCharCode(...bg.splice(0))).slice(-2e4),e.scrollTop=e.scrollHeight,Cg!==`serial`&&(Qh++,Sg())}function Sg(){let e=X(`serial-badge`);e.hidden=Qh===0,e.textContent=Qh>99?`99+`:String(Qh)}X(`serial-form`).addEventListener(`submit`,e=>{e.preventDefault();let t=X(`serial-in`);Z.sendSerial(t.value+`
`),X(`serial-out`).textContent+=t.value+`
`,t.value=``}),X(`serial-clear`).addEventListener(`click`,()=>{X(`serial-out`).textContent=``});var Cg=`regs`;document.querySelectorAll(`.tabs [role=tab]`).forEach(e=>e.addEventListener(`click`,()=>wg(e.dataset.tab)));function wg(e){Cg=e,Y.set(`tab`,e),document.querySelectorAll(`.tabs [role=tab]`).forEach(t=>t.setAttribute(`aria-selected`,String(t.dataset.tab===e))),document.querySelectorAll(`.tabpanel`).forEach(t=>{t.hidden=t.dataset.panel!==e}),e===`serial`&&(Qh=0,Sg()),Lg(!0)}document.querySelectorAll(`[data-mem]`).forEach(e=>e.addEventListener(`click`,()=>{let t=e.dataset.mem;Zh=t===`pc`?Z.pc&-16:t===`sp`?Z.r[15]&-16:parseInt(t,16),X(`mem-addr`).value=Zh.toString(16).toUpperCase().padStart(4,`0`),Lg(!0)})),X(`mem-addr`).addEventListener(`change`,e=>{let t=e.target,n=$?.asm?.symbols[t.value]??parseInt(t.value.replace(/^(0x|\$)/i,``),16);Number.isNaN(n)||(Zh=n&65520),Lg(!0)});var Tg=e=>e.toString(16).toUpperCase().padStart(4,`0`),Eg=e=>e.toString(16).toUpperCase().padStart(2,`0`),Dg=new Map(Object.entries(g).filter(([,e])=>e>=65280).map(([e,t])=>[t,e])),Og=e=>$?.symbolsByAddr.get(e)??Dg.get(e),kg=e=>e.replace(/[&<>]/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`})[e]),Ag=new Uint16Array(16);function jg(){let e=Z,t=`<div class="regs">`;for(let n=0;n<16;n++){let r=e.r[n],i=n===15?`sp`:n===14?`fp`:`r`+n,a=r&32768?r-65536:r;t+=`<div class="reg${r===Ag[n]?``:` changed`}"><span class="rn">${i}</span><span class="rv">${Tg(r)}</span><span class="rd">${a}</span></div>`}t+=`</div><div class="flags">`;for(let[n,r]of[[`Z`,e.fZ],[`N`,e.fN],[`C`,e.fC],[`V`,e.fV],[`I`,e.fI]])t+=`<span class="flag${r?` on`:``}">${n}</span>`;t+=`</div><div class="kv"><span>PC</span><b>${Tg(e.pc)}</b><span>${kg(Og(e.pc)??``)}</span>
    <span>cycles</span><b>${e.cycles.toLocaleString()}</b><span></span>
    <span>IE / IF</span><b>${Eg(e.ie)} / ${Eg(e.ifl)}</b><span>IVEC ${Tg(e.ivec)}</span>
    <span>video</span><b>${Tg(e.videoBase)}</b><span>blit dst ${Tg(e.blt.dst)}</span>
    <span>pad</span><b>${e.pad.toString(2).padStart(8,`0`)}</b><span>keys queued ${e.keyQueue.length}</span></div>`,X(`regs`).innerHTML=t,Ag=e.r.slice()}function Mg(){let e=Z,t=$,n=e.pc;if(t&&t.addrLines.length){let r=t.addrLines.findIndex(([t])=>t>e.pc),i=Math.max(0,(r<0?t.addrLines.length:r)-11);n=t.addrLines[i][0],n>e.pc&&(n=e.pc)}let r=``,i=n;for(let n=0;n<32;n++){let n=he(t=>e.peek8(t),i,Og),a=t?.symbolsByAddr.get(i);a&&(r+=`<div class="dl label">${kg(a)}:</div>`);let o=i===e.pc?` pc`:``,s=qh.has(i)?`●`:` `;r+=`<div class="dl${o}"><span class="bp">${s}</span><span class="ad">${Tg(i)}</span><span class="ins">${kg(n.text)}</span></div>`,i=i+n.size&65535}X(`disasm`).innerHTML=r}function Ng(){let e=Z,t=`<div class="mrow head"><span class="ma"></span>`+Array.from({length:16},(e,t)=>`<span>${t.toString(16).toUpperCase()}</span>`).join(``)+`<span class="asc"></span></div>`;for(let n=0;n<16;n++){let r=Zh+n*16&65535;t+=`<div class="mrow"><span class="ma">${Tg(r)}</span>`;let i=``;for(let n=0;n<16;n++){let a=r+n&65535,o=e.peek8(a),s=[a===e.pc||a===e.pc+1?`pc`:``,a===e.r[15]||a===e.r[15]+1?`sp`:``,o===Xh[a]?``:`changed`].filter(Boolean).join(` `);t+=`<span class="${s}">${Eg(o)}</span>`,i+=o>=32&&o<127?String.fromCharCode(o):`·`}t+=`<span class="asc">${kg(i)}</span></div>`}X(`memory`).innerHTML=t,Xh=e.mem.slice()}var Pg=[`square`,`pulse`,`triangle`,`saw`,`noise`];function Fg(){let e=`<div class="voices">`;Z.voices.forEach((t,n)=>{let r=t.freq>0&&t.vol>0;e+=`<div class="voice${r?` on`:``}"><b>voice ${n}</b><span>${Pg[t.wave]??`?`}</span><span>${t.freq} Hz</span>
      <div class="vbar"><div style="width:${t.vol/15*100}%"></div></div><span>vol ${t.vol}${t.decay?` · decay ${t.decay}`:``}</span></div>`}),e+=`</div><p class="note">`+(Wh.running?Wh.muted?`Audio muted.`:`Audio live.`:`Audio starts after your first click (browser rule).`)+`</p>`,X(`sound`).innerHTML=e}var Ig=0;function Lg(e=!1){let t=performance.now();!e&&t-Ig<100||(Ig=t,Cg===`regs`?jg():Cg===`disasm`?Mg():Cg===`memory`?Ng():Cg===`sound`&&Fg())}var Rg=0,zg=0,Bg=performance.now(),Vg=0,Hg=0,Ug=0;function Wg(){let e=Gh?Z.status===`waiting`?`running`:Z.status:gg()?`paused`:Z.status,t=X(`st-status`);t.textContent=e,t.className=`pill `+e,X(`st-pc`).textContent=Tg(Z.pc),X(`st-frame`).textContent=String(Z.frame),X(`st-fps`).textContent=String(Rg),X(`st-mhz`).textContent=Vg.toFixed(2),X(`st-load`).textContent=`${Math.round(Ug*100)}%`;let n=X(`halt-banner`),r=Z.status===`illegal`||Z.status===`fault`;n.hidden=!(r||Z.status===`halted`)||Gh,n.hidden||(n.textContent=r?`CPU ${Z.status} at ${Tg(Z.pc)}`:`halted`,n.className=`halt-banner`+(r?` bad`:``))}function Gg(e){Z.renderRGBA(Hh.data,e),Vh.putImageData(Hh,0,0)}var Kg=0,qg=performance.now();function Jg(e){let t=Math.min(100,e-qg);if(qg=e,Gh){Kg+=t*Kh;let n=1e3/60,r=0,i=performance.now(),a=0;for(;Kg>=n&&r<16;){Kg-=n,r++;let e=Z.cycles,t=Z.runFrame(qh.size?qh:void 0);if(a+=Z.cycles-e,zg++,t===`breakpoint`||t===`stopped`){Kg=0,lg(!1),t===`breakpoint`&&Xg(`breakpoint`);break}if(performance.now()-i>30){Kg=0;break}}r&&(Gg(Z.displayBase),Wh.running&&Wh.update(Z.voices),xg(),Lg(),Ug=Ug*.9+(performance.now()-i)/(t||16)*.1),e-Bg>500&&(Rg=Math.round(zg*1e3/(e-Bg)),Vg=(Z.cycles-Hg)/((e-Bg)*1e3),zg=0,Bg=e,Hg=Z.cycles,Wg())}else xg(),e-Bg>500&&(Rg=0,Vg=0,Bg=e,Hg=Z.cycles,Wg());requestAnimationFrame(Jg)}var Yg=0;function Xg(e){let t=X(`build-state`),n=t.textContent;t.textContent=e,clearTimeout(Yg),Yg=window.setTimeout(()=>{t.textContent===e&&(t.textContent=n)},1500)}var Zg=Y.get(`tab`);Zg&&wg(Zg);var Qg=new URLSearchParams(location.search).get(`file`)??Y.get(`current`)??Ph.find(e=>e in J)??Object.keys(J)[0];tg(Qg&&(Qg in J||Fh().includes(Qg))?Qg:Object.keys(J)[0]),requestAnimationFrame(Jg),window.addEventListener(`beforeunload`,rg),window.lf={machine:Z,open:tg,buildAndRun:og,get build(){return $},IO:f};