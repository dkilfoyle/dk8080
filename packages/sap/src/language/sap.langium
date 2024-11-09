grammar Sap

entry Program:
    lines+=Line*;

Line:
    Label | Instruction;

Instruction:
    op=Operation arg1=Argument? ("," arg2=Argument)?;

Operation: name=Op;

Op returns string:
"INR"|"inr"|
"DCR"|"dcr"|
"INX"|"inx"|
"DCX"|"dcx"|
"DAD"|"dad"|
"ADD"|"add"|
"ADI"|"adi"|
"ADC"|"adc"|
"ACI"|"aci"|
"SUB"|"sub"|
"SUI"|"sui"|
"SBB"|"sbb"|
"SBI"|"sbi"|
"ANA"|"ana"|
"ANI"|"ani"|
"ORA"|"ora"|
"ORI"|"ori"|
"XRA"|"xra"|
"XRI"|"xri"|
"RLC"|"rlc"|
"RAL"|"ral"|
"RAR"|"rar"|
"RRC"|"rrc"|
"CMA"|"cma"|
"STC"|"stc"|
"CMC"|"cmc"|
"CMP"|"cmp"|
"CPI"|"cpi"|
"LDA"|"lda"|
"LDAX"|"ldax"|
"LXI"|"lxi"|
"STA"|"sta"|
"STAX"|"stax"|
"LHLD"|"lhld"|
"SHLD"|"shld"|
"MOV"|"mov"|
"MVI"|"mvi"|
"PUSH"|"push"|
"POP"|"pop"|
"CALL"|"call"|
"CP"|"cp"|
"CM"|"cm"|
"CNZ"|"cnz"|
"CZ"|"cz"|
"CPO"|"cpo"|
"CPE"|"cpe"|
"CNC"|"cnc"|
"CC"|"cc"|
"RET"|"ret"|
"RP"|"rp"|
"RM"|"rm"|
"RNZ"|"rnz"|
"RZ"|"rz"|
"RPO"|"rpo"|
"RPE"|"rpe"|
"RNC"|"rnc"|
"RC"|"rc"|
"JMP"|"jmp"|
"JP"|"jp"|
"JNZ"|"jnz"|
"JZ"|"jz"|
"JPO"|"jpo"|
"JPE"|"jpe"|
"JNC"|"jnc"|
"NOP"|"nop"|
"HLT"|"hlt"|
"OUT"|"out";

Argument:
    name=ID | number=INT;

Label:
    name=LABELID;

hidden terminal WS: /\s+/;
terminal LABELID: ID ":";
terminal ID: /[_a-zA-Z][\w_]*/;
terminal INT returns number: /[0-9][0-9a-fA-F]*[h]?/;
terminal STRING: /"(\\.|[^"\\])*"|'(\\.|[^'\\])*'/;

hidden terminal SL_COMMENT: /;[^\n\r]*/;
