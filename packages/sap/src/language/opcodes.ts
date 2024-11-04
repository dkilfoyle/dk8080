export const opcodes = {
  "0x3c": { instr: "INR", code: 0x3c, arg1: "A", arg2: "", bytes: 1, flags: "SZP-", stages: 4, help: "A = A + 1" },
  "0x04": { instr: "INR", code: 0x04, arg1: "B", arg2: "", bytes: 1, flags: "SZP-", stages: 6, help: "B = B + 1" },
  "0x0c": { instr: "INR", code: 0x0c, arg1: "C", arg2: "", bytes: 1, flags: "SZP-", stages: 6, help: "C = C + 1" },
  "0x14": { instr: "INR", code: 0x14, arg1: "D", arg2: "", bytes: 1, flags: "SZP-", stages: 6, help: "D = D + 1" },
  "0x1c": { instr: "INR", code: 0x1c, arg1: "E", arg2: "", bytes: 1, flags: "SZP-", stages: 6, help: "E = E + 1" },
  "0x24": { instr: "INR", code: 0x24, arg1: "H", arg2: "", bytes: 1, flags: "SZP-", stages: 6, help: "H = H + 1" },
  "0x2c": { instr: "INR", code: 0x2c, arg1: "L", arg2: "", bytes: 1, flags: "SZP-", stages: 6, help: "L = L + 1" },
  "0x34": { instr: "INR", code: 0x34, arg1: "M", arg2: "", bytes: 1, flags: "SZP-", stages: 7, help: "[HL] = [HL] + 1" },
  "0x3d": { instr: "DCR", code: 0x3d, arg1: "A", arg2: "", bytes: 1, flags: "SZP-", stages: 4, help: "A = A - 1" },
  "0x05": { instr: "DCR", code: 0x05, arg1: "B", arg2: "", bytes: 1, flags: "SZP-", stages: 6, help: "B = B - 1" },
  "0x0d": { instr: "DCR", code: 0x0d, arg1: "C", arg2: "", bytes: 1, flags: "SZP-", stages: 6, help: "C = C - 1" },
  "0x15": { instr: "DCR", code: 0x15, arg1: "D", arg2: "", bytes: 1, flags: "SZP-", stages: 6, help: "D = D - 1" },
  "0x1d": { instr: "DCR", code: 0x1d, arg1: "E", arg2: "", bytes: 1, flags: "SZP-", stages: 6, help: "E = E - 1" },
  "0x25": { instr: "DCR", code: 0x25, arg1: "H", arg2: "", bytes: 1, flags: "SZP-", stages: 6, help: "H = H - 1" },
  "0x2d": { instr: "DCR", code: 0x2d, arg1: "L", arg2: "", bytes: 1, flags: "SZP-", stages: 6, help: "L = L - 1" },
  "0x35": { instr: "DCR", code: 0x35, arg1: "M", arg2: "", bytes: 1, flags: "SZP-", stages: 7, help: "[HL] = [HL] - 1" },
  "0x03": { instr: "INX", code: 0x03, arg1: "B", arg2: "", bytes: 1, flags: "----", stages: 4, help: "BC = BC + 1" },
  "0x13": { instr: "INX", code: 0x13, arg1: "D", arg2: "", bytes: 1, flags: "----", stages: 4, help: "DE = DE + 1" },
  "0x23": { instr: "INX", code: 0x23, arg1: "H", arg2: "", bytes: 1, flags: "----", stages: 4, help: "HL = HL + 1" },
  "0x33": { instr: "INX", code: 0x33, arg1: "SP", arg2: "", bytes: 1, flags: "----", stages: 4, help: "SP = SP + 1" },
  "0x0b": { instr: "DCX", code: 0x0b, arg1: "B", arg2: "", bytes: 1, flags: "----", stages: 4, help: "BC = BC - 1" },
  "0x1b": { instr: "DCX", code: 0x1b, arg1: "D", arg2: "", bytes: 1, flags: "----", stages: 4, help: "DE = DE - 1" },
  "0x2b": { instr: "DCX", code: 0x2b, arg1: "H", arg2: "", bytes: 1, flags: "----", stages: 4, help: "HL = HL - 1" },
  "0x3b": { instr: "DCX", code: 0x3b, arg1: "SP", arg2: "", bytes: 1, flags: "----", stages: 4, help: "SP = SP - 1" },
  "0x09": { instr: "DAD", code: 0x09, arg1: "B", arg2: "", bytes: 1, flags: "---C", stages: 12, help: "HL = HL + BC" },
  "0x19": { instr: "DAD", code: 0x19, arg1: "D", arg2: "", bytes: 1, flags: "---C", stages: 12, help: "HL = HL + DE" },
  "0x29": { instr: "DAD", code: 0x29, arg1: "H", arg2: "", bytes: 1, flags: "---C", stages: 12, help: "HL = HL + HL" },
  "0x39": { instr: "DAD", code: 0x39, arg1: "SP", arg2: "", bytes: 1, flags: "---C", stages: 12, help: "HL = HL + SP" },
  "0x87": { instr: "ADD", code: 0x87, arg1: "A", arg2: "", bytes: 1, flags: "SZPC", stages: 4, help: "A = A + A" },
  "0x80": { instr: "ADD", code: 0x80, arg1: "B", arg2: "", bytes: 1, flags: "SZPC", stages: 5, help: "A = A + B" },
  "0x81": { instr: "ADD", code: 0x81, arg1: "C", arg2: "", bytes: 1, flags: "SZPC", stages: 5, help: "A = A + C" },
  "0x82": { instr: "ADD", code: 0x82, arg1: "D", arg2: "", bytes: 1, flags: "SZPC", stages: 5, help: "A = A + D" },
  "0x83": { instr: "ADD", code: 0x83, arg1: "E", arg2: "", bytes: 1, flags: "SZPC", stages: 5, help: "A = A + E" },
  "0x84": { instr: "ADD", code: 0x84, arg1: "H", arg2: "", bytes: 1, flags: "SZPC", stages: 5, help: "A = A + H" },
  "0x85": { instr: "ADD", code: 0x85, arg1: "L", arg2: "", bytes: 1, flags: "SZPC", stages: 5, help: "A = A + L" },
  "0x86": { instr: "ADD", code: 0x86, arg1: "M", arg2: "", bytes: 1, flags: "SZPC", stages: 6, help: "A = A + [HL]" },
  "0xc6": { instr: "ADI", code: 0xc6, arg1: "imm8", arg2: "", bytes: 2, flags: "SZPC", stages: 6, help: "A = A + byte" },
  "0x8f": { instr: "ADC", code: 0x8f, arg1: "A", arg2: "", bytes: 1, flags: "SZPC", stages: 4, help: "A = A + A + FlagC" },
  "0x88": { instr: "ADC", code: 0x88, arg1: "B", arg2: "", bytes: 1, flags: "SZPC", stages: 5, help: "A = A + B + FlagC" },
  "0x89": { instr: "ADC", code: 0x89, arg1: "C", arg2: "", bytes: 1, flags: "SZPC", stages: 5, help: "A = A + C + FlagC" },
  "0x8a": { instr: "ADC", code: 0x8a, arg1: "D", arg2: "", bytes: 1, flags: "SZPC", stages: 5, help: "A = A + D + FlagC" },
  "0x8b": { instr: "ADC", code: 0x8b, arg1: "E", arg2: "", bytes: 1, flags: "SZPC", stages: 5, help: "A = A + E + FlagC" },
  "0x8c": { instr: "ADC", code: 0x8c, arg1: "H", arg2: "", bytes: 1, flags: "SZPC", stages: 5, help: "A = A + H + FlagC" },
  "0x8d": { instr: "ADC", code: 0x8d, arg1: "L", arg2: "", bytes: 1, flags: "SZPC", stages: 5, help: "A = A + L + FlagC" },
  "0x8e": { instr: "ADC", code: 0x8e, arg1: "M", arg2: "", bytes: 1, flags: "SZPC", stages: 6, help: "A = A + [HL] + FlagC" },
  "0xce": { instr: "ACI", code: 0xce, arg1: "imm8", arg2: "", bytes: 2, flags: "SZPC", stages: 6, help: "A = A + byte + FlagC" },
  "0x97": { instr: "SUB", code: 0x97, arg1: "A", arg2: "", bytes: 1, flags: "SZPC", stages: 4, help: "A = A - A" },
  "0x90": { instr: "SUB", code: 0x90, arg1: "B", arg2: "", bytes: 1, flags: "SZPC", stages: 5, help: "A = A - B" },
  "0x91": { instr: "SUB", code: 0x91, arg1: "C", arg2: "", bytes: 1, flags: "SZPC", stages: 5, help: "A = A - C" },
  "0x92": { instr: "SUB", code: 0x92, arg1: "D", arg2: "", bytes: 1, flags: "SZPC", stages: 5, help: "A = A - D" },
  "0x93": { instr: "SUB", code: 0x93, arg1: "E", arg2: "", bytes: 1, flags: "SZPC", stages: 5, help: "A = A - E" },
  "0x94": { instr: "SUB", code: 0x94, arg1: "H", arg2: "", bytes: 1, flags: "SZPC", stages: 5, help: "A = A - H" },
  "0x95": { instr: "SUB", code: 0x95, arg1: "L", arg2: "", bytes: 1, flags: "SZPC", stages: 5, help: "A = A - L" },
  "0x96": { instr: "SUB", code: 0x96, arg1: "M", arg2: "", bytes: 1, flags: "SZPC", stages: 6, help: "A = A - [HL]" },
  "0xd6": { instr: "SUI", code: 0xd6, arg1: "imm8", arg2: "", bytes: 2, flags: "SZPC", stages: 6, help: "A = A - byte" },
  "0x9f": { instr: "SBB", code: 0x9f, arg1: "A", arg2: "", bytes: 1, flags: "SZPC", stages: 4, help: "A = A - byte - FlagC" },
  "0x98": { instr: "SBB", code: 0x98, arg1: "B", arg2: "", bytes: 1, flags: "SZPC", stages: 5, help: "A = B - byte - FlagC" },
  "0x99": { instr: "SBB", code: 0x99, arg1: "C", arg2: "", bytes: 1, flags: "SZPC", stages: 5, help: "A = C - byte - FlagC" },
  "0x9a": { instr: "SBB", code: 0x9a, arg1: "D", arg2: "", bytes: 1, flags: "SZPC", stages: 5, help: "A = D - byte - FlagC" },
  "0x9b": { instr: "SBB", code: 0x9b, arg1: "E", arg2: "", bytes: 1, flags: "SZPC", stages: 5, help: "A = E - byte - FlagC" },
  "0x9c": { instr: "SBB", code: 0x9c, arg1: "H", arg2: "", bytes: 1, flags: "SZPC", stages: 5, help: "A = H - byte - FlagC" },
  "0x9d": { instr: "SBB", code: 0x9d, arg1: "L", arg2: "", bytes: 1, flags: "SZPC", stages: 5, help: "A = L - byte - FlagC" },
  "0x9e": { instr: "SBB", code: 0x9e, arg1: "M", arg2: "", bytes: 1, flags: "SZPC", stages: 6, help: "A = [HL] - byte - FlagC" },
  "0xde": { instr: "SBI", code: 0xde, arg1: "imm8", arg2: "", bytes: 2, flags: "SZPC", stages: 6, help: "A = A - byte - FlagC" },
  "0xa7": { instr: "ANA", code: 0xa7, arg1: "A", arg2: "", bytes: 1, flags: "SZPC", stages: 4, help: "A = A and A" },
  "0xa0": { instr: "ANA", code: 0xa0, arg1: "B", arg2: "", bytes: 1, flags: "SZPC", stages: 5, help: "A = A and B" },
  "0xa1": { instr: "ANA", code: 0xa1, arg1: "C", arg2: "", bytes: 1, flags: "SZPC", stages: 5, help: "A = A and C" },
  "0xa2": { instr: "ANA", code: 0xa2, arg1: "D", arg2: "", bytes: 1, flags: "SZPC", stages: 5, help: "A = A and D" },
  "0xa3": { instr: "ANA", code: 0xa3, arg1: "E", arg2: "", bytes: 1, flags: "SZPC", stages: 5, help: "A = A and E" },
  "0xa4": { instr: "ANA", code: 0xa4, arg1: "H", arg2: "", bytes: 1, flags: "SZPC", stages: 5, help: "A = A and H" },
  "0xa5": { instr: "ANA", code: 0xa5, arg1: "L", arg2: "", bytes: 1, flags: "SZPC", stages: 5, help: "A = A and L" },
  "0xa6": { instr: "ANA", code: 0xa6, arg1: "M", arg2: "", bytes: 1, flags: "SZPC", stages: 6, help: "A = A and [HL]" },
  "0xe6": { instr: "ANI", code: 0xe6, arg1: "imm8", arg2: "", bytes: 2, flags: "SZPC", stages: 6, help: "A = A and byte" },
  "0xb7": { instr: "ORA", code: 0xb7, arg1: "A", arg2: "", bytes: 1, flags: "SZPC", stages: 4, help: "A = A or A" },
  "0xb0": { instr: "ORA", code: 0xb0, arg1: "B", arg2: "", bytes: 1, flags: "SZPC", stages: 5, help: "A = A or B" },
  "0xb1": { instr: "ORA", code: 0xb1, arg1: "C", arg2: "", bytes: 1, flags: "SZPC", stages: 5, help: "A = A or C" },
  "0xb2": { instr: "ORA", code: 0xb2, arg1: "D", arg2: "", bytes: 1, flags: "SZPC", stages: 5, help: "A = A or D" },
  "0xb3": { instr: "ORA", code: 0xb3, arg1: "E", arg2: "", bytes: 1, flags: "SZPC", stages: 5, help: "A = A or E" },
  "0xb4": { instr: "ORA", code: 0xb4, arg1: "H", arg2: "", bytes: 1, flags: "SZPC", stages: 5, help: "A = A or H" },
  "0xb5": { instr: "ORA", code: 0xb5, arg1: "L", arg2: "", bytes: 1, flags: "SZPC", stages: 5, help: "A = A or L" },
  "0xb6": { instr: "ORA", code: 0xb6, arg1: "M", arg2: "", bytes: 1, flags: "SZPC", stages: 6, help: "A = A or [HL]" },
  "0xf6": { instr: "ORI", code: 0xf6, arg1: "imm8", arg2: "", bytes: 2, flags: "SZPC", stages: 6, help: "A = A or byte" },
  "0xaf": { instr: "XRA", code: 0xaf, arg1: "A", arg2: "", bytes: 1, flags: "SZPC", stages: 4, help: "A = A xor A" },
  "0xa8": { instr: "XRA", code: 0xa8, arg1: "B", arg2: "", bytes: 1, flags: "SZPC", stages: 5, help: "A = A xor B" },
  "0xa9": { instr: "XRA", code: 0xa9, arg1: "C", arg2: "", bytes: 1, flags: "SZPC", stages: 5, help: "A = A xor C" },
  "0xaa": { instr: "XRA", code: 0xaa, arg1: "D", arg2: "", bytes: 1, flags: "SZPC", stages: 5, help: "A = A xor D" },
  "0xab": { instr: "XRA", code: 0xab, arg1: "E", arg2: "", bytes: 1, flags: "SZPC", stages: 5, help: "A = A xor E" },
  "0xac": { instr: "XRA", code: 0xac, arg1: "H", arg2: "", bytes: 1, flags: "SZPC", stages: 5, help: "A = A xor H" },
  "0xad": { instr: "XRA", code: 0xad, arg1: "L", arg2: "", bytes: 1, flags: "SZPC", stages: 5, help: "A = A xor L" },
  "0xae": { instr: "XRA", code: 0xae, arg1: "M", arg2: "", bytes: 1, flags: "SZPC", stages: 6, help: "A = A xor [HL]" },
  "0xee": { instr: "XRI", code: 0xee, arg1: "imm8", arg2: "", bytes: 2, flags: "SZPC", stages: 6, help: "A = A xor byte" },
  "0x07": { instr: "RLC", code: 0x07, arg1: "", arg2: "", bytes: 1, flags: "---C", stages: 4, help: "Shift A left and FlagC = A[7]" },
  "0x17": { instr: "RAL", code: 0x17, arg1: "", arg2: "", bytes: 1, flags: "---C", stages: 4, help: "Shift A left and shift FlagC into A[0]" },
  "0x1f": { instr: "RAR", code: 0x1f, arg1: "", arg2: "", bytes: 1, flags: "---C", stages: 4, help: "Shift A right and shift FlagC into A[7]" },
  "0x0f": { instr: "RRC", code: 0x0f, arg1: "", arg2: "", bytes: 1, flags: "---C", stages: 4, help: "Shift A right and FlagC = A[0]" },
  "0x2f": { instr: "CMA", code: 0x2f, arg1: "", arg2: "", bytes: 1, flags: "----", stages: 4, help: "A = ~A" },
  "0x37": { instr: "STC", code: 0x37, arg1: "", arg2: "", bytes: 1, flags: "---C", stages: 4, help: "FlagC = 1" },
  "0x3f": { instr: "CMC", code: 0x3f, arg1: "", arg2: "", bytes: 1, flags: "---C", stages: 4, help: "FlagC = ~FlagC" },
  "0xbf": { instr: "CMP", code: 0xbf, arg1: "A", arg2: "", bytes: 1, flags: "SZPC", stages: 4, help: "FlagZ = 1 if A == A" },
  "0xb8": { instr: "CMP", code: 0xb8, arg1: "B", arg2: "", bytes: 1, flags: "SZPC", stages: 5, help: "FlagZ = 1 if A == B" },
  "0xb9": { instr: "CMP", code: 0xb9, arg1: "C", arg2: "", bytes: 1, flags: "SZPC", stages: 5, help: "FlagZ = 1 if A == C" },
  "0xba": { instr: "CMP", code: 0xba, arg1: "D", arg2: "", bytes: 1, flags: "SZPC", stages: 5, help: "FlagZ = 1 if A == D" },
  "0xbb": { instr: "CMP", code: 0xbb, arg1: "E", arg2: "", bytes: 1, flags: "SZPC", stages: 5, help: "FlagZ = 1 if A == E" },
  "0xbc": { instr: "CMP", code: 0xbc, arg1: "H", arg2: "", bytes: 1, flags: "SZPC", stages: 5, help: "FlagZ = 1 if A == H" },
  "0xbd": { instr: "CMP", code: 0xbd, arg1: "L", arg2: "", bytes: 1, flags: "SZPC", stages: 5, help: "FlagZ = 1 if A == L" },
  "0xbe": { instr: "CMP", code: 0xbe, arg1: "M", arg2: "", bytes: 1, flags: "SZPC", stages: 6, help: "FlagZ = 1 if A == [HL]" },
  "0xfe": { instr: "CPI", code: 0xfe, arg1: "imm8", arg2: "", bytes: 2, flags: "----", stages: 6, help: "FlagZ = 1 if A == byte" },
  "0x3a": { instr: "LDA", code: 0x3a, arg1: "addr", arg2: "", bytes: 3, flags: "----", stages: 11, help: "Load A with [addr]" },
  "0x0a": { instr: "LDAX", code: 0x0a, arg1: "B", arg2: "", bytes: 1, flags: "----", stages: 8, help: "Load A with [BC]" },
  "0x1a": { instr: "LDAX", code: 0x1a, arg1: "D", arg2: "", bytes: 1, flags: "----", stages: 8, help: "Load A with [DE]" },
  "0x01": { instr: "LXI", code: 0x01, arg1: "B", arg2: "imm16", bytes: 3, flags: "----", stages: 10, help: "Load BC with dble" },
  "0x11": { instr: "LXI", code: 0x11, arg1: "D", arg2: "imm16", bytes: 3, flags: "----", stages: 10, help: "Load DE with dble" },
  "0x21": { instr: "LXI", code: 0x21, arg1: "H", arg2: "imm16", bytes: 3, flags: "----", stages: 10, help: "Load HL with dble" },
  "0x31": { instr: "LXI", code: 0x31, arg1: "SP", arg2: "imm16", bytes: 3, flags: "----", stages: 10, help: "Load SP with dble" },
  "0x32": { instr: "STA", code: 0x32, arg1: "imm16", arg2: "", bytes: 3, flags: "----", stages: 11, help: "Store A at [addr]" },
  "0x02": { instr: "STAX", code: 0x02, arg1: "B", arg2: "", bytes: 1, flags: "----", stages: 8, help: "Store A at [BC]" },
  "0x12": { instr: "STAX", code: 0x12, arg1: "D", arg2: "", bytes: 1, flags: "----", stages: 8, help: "Store A at [DE]" },
  "0x2a": { instr: "LHLD", code: 0x2a, arg1: "addr", arg2: "", bytes: 3, flags: "----", stages: 14, help: "Load HL with [addr]" },
  "0x22": { instr: "SHLD", code: 0x22, arg1: "addr", arg2: "", bytes: 3, flags: "----", stages: 14, help: "Store HL at [addr]" },
  "0x7f": { instr: "MOV", code: 0x7f, arg1: "A", arg2: "A", bytes: 1, flags: "----", stages: 4, help: "A = A" },
  "0x78": { instr: "MOV", code: 0x78, arg1: "A", arg2: "B", bytes: 1, flags: "----", stages: 4, help: "A = B" },
  "0x79": { instr: "MOV", code: 0x79, arg1: "A", arg2: "C", bytes: 1, flags: "----", stages: 4, help: "A = C" },
  "0x7a": { instr: "MOV", code: 0x7a, arg1: "A", arg2: "D", bytes: 1, flags: "----", stages: 4, help: "A = D" },
  "0x7b": { instr: "MOV", code: 0x7b, arg1: "A", arg2: "E", bytes: 1, flags: "----", stages: 4, help: "A = E" },
  "0x7c": { instr: "MOV", code: 0x7c, arg1: "A", arg2: "H", bytes: 1, flags: "----", stages: 4, help: "A = H" },
  "0x7d": { instr: "MOV", code: 0x7d, arg1: "A", arg2: "L", bytes: 1, flags: "----", stages: 4, help: "A = L" },
  "0x7e": { instr: "MOV", code: 0x7e, arg1: "A", arg2: "M", bytes: 1, flags: "----", stages: 5, help: "A = [HL]" },
  "0x47": { instr: "MOV", code: 0x47, arg1: "B", arg2: "A", bytes: 1, flags: "----", stages: 4, help: "B = A" },
  "0x40": { instr: "MOV", code: 0x40, arg1: "B", arg2: "B", bytes: 1, flags: "----", stages: 4, help: "B = B" },
  "0x41": { instr: "MOV", code: 0x41, arg1: "B", arg2: "C", bytes: 1, flags: "----", stages: 4, help: "B = C" },
  "0x42": { instr: "MOV", code: 0x42, arg1: "B", arg2: "D", bytes: 1, flags: "----", stages: 4, help: "B = D" },
  "0x43": { instr: "MOV", code: 0x43, arg1: "B", arg2: "E", bytes: 1, flags: "----", stages: 4, help: "B = E" },
  "0x44": { instr: "MOV", code: 0x44, arg1: "B", arg2: "H", bytes: 1, flags: "----", stages: 4, help: "B = H" },
  "0x45": { instr: "MOV", code: 0x45, arg1: "B", arg2: "L", bytes: 1, flags: "----", stages: 4, help: "B = L" },
  "0x46": { instr: "MOV", code: 0x46, arg1: "B", arg2: "M", bytes: 1, flags: "----", stages: 5, help: "B = [HL]" },
  "0x4f": { instr: "MOV", code: 0x4f, arg1: "C", arg2: "A", bytes: 1, flags: "----", stages: 4, help: "C = A" },
  "0x48": { instr: "MOV", code: 0x48, arg1: "C", arg2: "B", bytes: 1, flags: "----", stages: 4, help: "C = B" },
  "0x49": { instr: "MOV", code: 0x49, arg1: "C", arg2: "C", bytes: 1, flags: "----", stages: 4, help: "C = C" },
  "0x4a": { instr: "MOV", code: 0x4a, arg1: "C", arg2: "D", bytes: 1, flags: "----", stages: 4, help: "C = D" },
  "0x4b": { instr: "MOV", code: 0x4b, arg1: "C", arg2: "E", bytes: 1, flags: "----", stages: 4, help: "C = E" },
  "0x4c": { instr: "MOV", code: 0x4c, arg1: "C", arg2: "H", bytes: 1, flags: "----", stages: 4, help: "C = H" },
  "0x4d": { instr: "MOV", code: 0x4d, arg1: "C", arg2: "L", bytes: 1, flags: "----", stages: 4, help: "C = L" },
  "0x4e": { instr: "MOV", code: 0x4e, arg1: "C", arg2: "M", bytes: 1, flags: "----", stages: 5, help: "C = [HL]" },
  "0x57": { instr: "MOV", code: 0x57, arg1: "D", arg2: "A", bytes: 1, flags: "----", stages: 4, help: "D = A" },
  "0x50": { instr: "MOV", code: 0x50, arg1: "D", arg2: "B", bytes: 1, flags: "----", stages: 4, help: "D = B" },
  "0x51": { instr: "MOV", code: 0x51, arg1: "D", arg2: "C", bytes: 1, flags: "----", stages: 4, help: "D = C" },
  "0x52": { instr: "MOV", code: 0x52, arg1: "D", arg2: "D", bytes: 1, flags: "----", stages: 4, help: "D = D" },
  "0x53": { instr: "MOV", code: 0x53, arg1: "D", arg2: "E", bytes: 1, flags: "----", stages: 4, help: "D = E" },
  "0x54": { instr: "MOV", code: 0x54, arg1: "D", arg2: "H", bytes: 1, flags: "----", stages: 4, help: "D = H" },
  "0x55": { instr: "MOV", code: 0x55, arg1: "D", arg2: "L", bytes: 1, flags: "----", stages: 4, help: "D = L" },
  "0x56": { instr: "MOV", code: 0x56, arg1: "D", arg2: "M", bytes: 1, flags: "----", stages: 5, help: "D = [HL]" },
  "0x5f": { instr: "MOV", code: 0x5f, arg1: "E", arg2: "A", bytes: 1, flags: "----", stages: 4, help: "E = A" },
  "0x58": { instr: "MOV", code: 0x58, arg1: "E", arg2: "B", bytes: 1, flags: "----", stages: 4, help: "E = B" },
  "0x59": { instr: "MOV", code: 0x59, arg1: "E", arg2: "C", bytes: 1, flags: "----", stages: 4, help: "E = C" },
  "0x5a": { instr: "MOV", code: 0x5a, arg1: "E", arg2: "D", bytes: 1, flags: "----", stages: 4, help: "E = D" },
  "0x5b": { instr: "MOV", code: 0x5b, arg1: "E", arg2: "E", bytes: 1, flags: "----", stages: 4, help: "E = E" },
  "0x5c": { instr: "MOV", code: 0x5c, arg1: "E", arg2: "H", bytes: 1, flags: "----", stages: 4, help: "E = H" },
  "0x5d": { instr: "MOV", code: 0x5d, arg1: "E", arg2: "L", bytes: 1, flags: "----", stages: 4, help: "E = L" },
  "0x5e": { instr: "MOV", code: 0x5e, arg1: "E", arg2: "M", bytes: 1, flags: "----", stages: 5, help: "E = [HL]" },
  "0x67": { instr: "MOV", code: 0x67, arg1: "H", arg2: "A", bytes: 1, flags: "----", stages: 4, help: "H = A" },
  "0x60": { instr: "MOV", code: 0x60, arg1: "H", arg2: "B", bytes: 1, flags: "----", stages: 4, help: "H = B" },
  "0x61": { instr: "MOV", code: 0x61, arg1: "H", arg2: "C", bytes: 1, flags: "----", stages: 4, help: "H = C" },
  "0x62": { instr: "MOV", code: 0x62, arg1: "H", arg2: "D", bytes: 1, flags: "----", stages: 4, help: "H = D" },
  "0x63": { instr: "MOV", code: 0x63, arg1: "H", arg2: "E", bytes: 1, flags: "----", stages: 4, help: "H = E" },
  "0x64": { instr: "MOV", code: 0x64, arg1: "H", arg2: "H", bytes: 1, flags: "----", stages: 4, help: "H = H" },
  "0x65": { instr: "MOV", code: 0x65, arg1: "H", arg2: "L", bytes: 1, flags: "----", stages: 4, help: "H = L" },
  "0x66": { instr: "MOV", code: 0x66, arg1: "H", arg2: "M", bytes: 1, flags: "----", stages: 5, help: "H = [HL]" },
  "0x6f": { instr: "MOV", code: 0x6f, arg1: "L", arg2: "A", bytes: 1, flags: "----", stages: 4, help: "L = A" },
  "0x68": { instr: "MOV", code: 0x68, arg1: "L", arg2: "B", bytes: 1, flags: "----", stages: 4, help: "L = B" },
  "0x69": { instr: "MOV", code: 0x69, arg1: "L", arg2: "C", bytes: 1, flags: "----", stages: 4, help: "L = C" },
  "0x6a": { instr: "MOV", code: 0x6a, arg1: "L", arg2: "D", bytes: 1, flags: "----", stages: 4, help: "L = D" },
  "0x6b": { instr: "MOV", code: 0x6b, arg1: "L", arg2: "E", bytes: 1, flags: "----", stages: 4, help: "L = E" },
  "0x6c": { instr: "MOV", code: 0x6c, arg1: "L", arg2: "H", bytes: 1, flags: "----", stages: 4, help: "L = H" },
  "0x6d": { instr: "MOV", code: 0x6d, arg1: "L", arg2: "L", bytes: 1, flags: "----", stages: 4, help: "L = L" },
  "0x6e": { instr: "MOV", code: 0x6e, arg1: "L", arg2: "M", bytes: 1, flags: "----", stages: 5, help: "L = [HL]" },
  "0x77": { instr: "MOV", code: 0x77, arg1: "M", arg2: "A", bytes: 1, flags: "----", stages: 5, help: "[HL] = A" },
  "0x70": { instr: "MOV", code: 0x70, arg1: "M", arg2: "B", bytes: 1, flags: "----", stages: 5, help: "[HL] = B" },
  "0x71": { instr: "MOV", code: 0x71, arg1: "M", arg2: "C", bytes: 1, flags: "----", stages: 5, help: "[HL] = C" },
  "0x72": { instr: "MOV", code: 0x72, arg1: "M", arg2: "D", bytes: 1, flags: "----", stages: 5, help: "[HL] = D" },
  "0x73": { instr: "MOV", code: 0x73, arg1: "M", arg2: "E", bytes: 1, flags: "----", stages: 5, help: "[HL] = E" },
  "0x74": { instr: "MOV", code: 0x74, arg1: "M", arg2: "H", bytes: 1, flags: "----", stages: 5, help: "[HL] = H" },
  "0x75": { instr: "MOV", code: 0x75, arg1: "M", arg2: "L", bytes: 1, flags: "----", stages: 5, help: "[HL] = L" },
  "0x3e": { instr: "MVI", code: 0x3e, arg1: "A", arg2: "imm8", bytes: 2, flags: "----", stages: 6, help: "A = byte" },
  "0x06": { instr: "MVI", code: 0x06, arg1: "B", arg2: "imm8", bytes: 2, flags: "----", stages: 6, help: "B = byte" },
  "0x0e": { instr: "MVI", code: 0x0e, arg1: "C", arg2: "imm8", bytes: 2, flags: "----", stages: 6, help: "C = byte" },
  "0x16": { instr: "MVI", code: 0x16, arg1: "D", arg2: "imm8", bytes: 2, flags: "----", stages: 6, help: "D = byte" },
  "0x1e": { instr: "MVI", code: 0x1e, arg1: "E", arg2: "imm8", bytes: 2, flags: "----", stages: 6, help: "E = byte" },
  "0x26": { instr: "MVI", code: 0x26, arg1: "H", arg2: "imm8", bytes: 2, flags: "----", stages: 6, help: "H = byte" },
  "0x2e": { instr: "MVI", code: 0x2e, arg1: "L", arg2: "imm8", bytes: 2, flags: "----", stages: 6, help: "L = byte" },
  "0x36": { instr: "MVI", code: 0x36, arg1: "M", arg2: "imm8", bytes: 2, flags: "----", stages: 8, help: "[HL] = byte" },
  "0xc5": { instr: "PUSH", code: 0xc5, arg1: "B", arg2: "", bytes: 1, flags: "SZPC", stages: 9, help: "Push value in BC onto the stack" },
  "0xd5": { instr: "PUSH", code: 0xd5, arg1: "D", arg2: "", bytes: 1, flags: "SZPC", stages: 9, help: "Push value in DE onto the stack" },
  "0xe5": { instr: "PUSH", code: 0xe5, arg1: "H", arg2: "", bytes: 1, flags: "SZPC", stages: 9, help: "Push value in HL onto the stack" },
  "0xf5": { instr: "PUSH", code: 0xf5, arg1: "PSW", arg2: "", bytes: 1, flags: "SZPC", stages: 9, help: "Push value in AF onto the stack" },
  "0xc1": { instr: "POP", code: 0xc1, arg1: "B", arg2: "", bytes: 1, flags: "SZPC", stages: 9, help: "Pop value on stack into BC" },
  "0xd1": { instr: "POP", code: 0xd1, arg1: "D", arg2: "", bytes: 1, flags: "SZPC", stages: 9, help: "Pop value on stack into DE" },
  "0xe1": { instr: "POP", code: 0xe1, arg1: "H", arg2: "", bytes: 1, flags: "SZPC", stages: 9, help: "Pop value on stack into HL" },
  "0xf1": { instr: "POP", code: 0xf1, arg1: "PSW", arg2: "", bytes: 1, flags: "SZPC", stages: 9, help: "Pop value on stack into AF" },
  "0xcd": { instr: "CALL", code: 0xcd, arg1: "addr", arg2: "", bytes: 3, flags: "----", stages: 16, help: "Call function at addr" },
  "0xf4": { instr: "CP", code: 0xf4, arg1: "addr", arg2: "", bytes: 3, flags: "----", stages: 16, help: "Call function at addr if FlagS == 0" },
  "0xfc": { instr: "CM", code: 0xfc, arg1: "addr", arg2: "", bytes: 3, flags: "----", stages: 16, help: "Call function at addr if FlagS == 1" },
  "0xc4": {
    instr: "CNZ",
    code: 0xc4,
    arg1: "addr",
    arg2: "",
    bytes: 3,
    flags: "----",
    stages: 16,
    help: "Call function at addr if FlagZ == 0",
  },
  "0xcc": { instr: "CZ", code: 0xcc, arg1: "addr", arg2: "", bytes: 3, flags: "----", stages: 16, help: "Call function at addr if FlagZ == 1" },
  "0xe4": {
    instr: "CPO",
    code: 0xe4,
    arg1: "addr",
    arg2: "",
    bytes: 3,
    flags: "----",
    stages: 16,
    help: "Call function at addr if FlagP == 0",
  },
  "0xec": {
    instr: "CPE",
    code: 0xec,
    arg1: "addr",
    arg2: "",
    bytes: 3,
    flags: "----",
    stages: 16,
    help: "Call function at addr if FlagP == 1",
  },
  "0xd4": {
    instr: "CNC",
    code: 0xd4,
    arg1: "addr",
    arg2: "",
    bytes: 3,
    flags: "----",
    stages: 16,
    help: "Call function at addr if FlagC == 0",
  },
  "0xdc": { instr: "CC", code: 0xdc, arg1: "addr", arg2: "", bytes: 3, flags: "----", stages: 16, help: "Call function at addr if FlagC == 1" },
  "0xc9": { instr: "RET", code: 0xc9, arg1: "", arg2: "", bytes: 1, flags: "----", stages: 4, help: "Return from function" },
  "0xf0": { instr: "RP", code: 0xf0, arg1: "", arg2: "", bytes: 1, flags: "----", stages: 10, help: "Return from function if FlagS == 0" },
  "0xf8": { instr: "RM", code: 0xf8, arg1: "", arg2: "", bytes: 1, flags: "----", stages: 10, help: "Return from function if FlagS == 1" },
  "0xc0": { instr: "RNZ", code: 0xc0, arg1: "", arg2: "", bytes: 1, flags: "----", stages: 10, help: "Return from function if FlagZ == 0" },
  "0xc8": { instr: "RZ", code: 0xc8, arg1: "", arg2: "", bytes: 1, flags: "----", stages: 10, help: "Return from function if FlagZ == 1" },
  "0xe0": { instr: "RPO", code: 0xe0, arg1: "", arg2: "", bytes: 1, flags: "----", stages: 10, help: "Return from function if FlagP == 0" },
  "0xe8": { instr: "RPE", code: 0xe8, arg1: "", arg2: "", bytes: 1, flags: "----", stages: 10, help: "Return from function if FlagP == 1" },
  "0xd0": { instr: "RNC", code: 0xd0, arg1: "", arg2: "", bytes: 1, flags: "----", stages: 10, help: "Return from function if FlagC == 0" },
  "0xd8": { instr: "RC", code: 0xd8, arg1: "", arg2: "", bytes: 1, flags: "----", stages: 10, help: "Return from function if FlagC == 1" },
  "0xc3": { instr: "JMP", code: 0xc3, arg1: "addr", arg2: "", bytes: 3, flags: "----", stages: 4, help: "Jump to addr" },
  "0xf2": { instr: "JP", code: 0xf2, arg1: "addr", arg2: "", bytes: 3, flags: "----", stages: 9, help: "Jump to addr if FlagS == 0" },
  "0xfa": { instr: "JM", code: 0xfa, arg1: "addr", arg2: "", bytes: 3, flags: "----", stages: 9, help: "Jump to addr if FlagS == 1" },
  "0xc2": { instr: "JNZ", code: 0xc2, arg1: "addr", arg2: "", bytes: 3, flags: "----", stages: 9, help: "Jump to addr if FlagZ == 0" },
  "0xca": { instr: "JZ", code: 0xca, arg1: "addr", arg2: "", bytes: 3, flags: "----", stages: 9, help: "Jump to addr if FlagZ == 1" },
  "0xe2": { instr: "JPO", code: 0xe2, arg1: "addr", arg2: "", bytes: 3, flags: "----", stages: 9, help: "Jump to addr if FlagP == 0" },
  "0xea": { instr: "JPE", code: 0xea, arg1: "addr", arg2: "", bytes: 3, flags: "----", stages: 9, help: "Jump to addr if FlagP == 1" },
  "0xd2": { instr: "JNC", code: 0xd2, arg1: "addr", arg2: "", bytes: 3, flags: "----", stages: 9, help: "Jump to addr if FlagC == 0" },
  "0xda": { instr: "JC", code: 0xda, arg1: "addr", arg2: "", bytes: 3, flags: "----", stages: 9, help: "Jump to addr if FlagC == 1" },
  "0x00": { instr: "NOP", code: 0x00, arg1: "", arg2: "", bytes: 1, flags: "----", stages: 4, help: "Do nothing" },
  "0x76": { instr: "HLT", code: 0x76, arg1: "", arg2: "", bytes: 1, flags: "----", stages: 4, help: "Halt execution" },
  "0xd3": { instr: "OUT", code: 0xd3, arg1: "", arg2: "", bytes: 1, flags: "----", stages: 4, help: "Out" },
};

export const instrHelp: Record<string, string> = {
  INR: "r8 = r8 + 1",
  DCR: "r8 = r8 - 1",
  INX: "r16 = r16 + 1",
  DCX: "r16 = r16 - 1",
  DAD: "HL = HL + r16",
  ADD: "A = A + r8",
  ADI: "A = A + byte",
  ADC: "A = A + A + FlagC",
  ACI: "A = A + byte + FlagC",
  SUB: "A = A - r8",
  SUI: "A = A - byte",
  SBB: "A = r8 - byte - FlagC",
  SBI: "A = A - byte - FlagC",
  ANA: "A = A and r8",
  ANI: "A = A and byte",
  ORA: "A = A or r8",
  ORI: "A = A or byte",
  XRA: "A = A xor r8",
  XRI: "A = A xor byte",
  RLC: "Shift A left and FlagC = A[7]",
  RAL: "Shift A left and shift FlagC into A[0]",
  RAR: "Shift A right and shift FlagC into A[7]",
  RRC: "Shift A right and FlagC = A[0]",
  CMA: "A = ~A",
  STC: "FlagC = 1",
  CMC: "FlagC = ~FlagC",
  CMP: "FlagZ = 1 if A == r8",
  CPI: "FlagZ = 1 if A == byte",
  LDA: "Load A with [addr]",
  LDAX: "Load A with [r16]",
  LXI: "Load r16 with dble",
  STA: " Store A at [addr]",
  STAX: " Store A at [r16]",
  LHLD: "Load HL with [addr]",
  SHLD: "Stpre HL at [addr]",
  MOV: "r8_1 = r8_2",
  MVI: "r8 = byte",
  PUSH: "Push value in r16 onto the stack",
  POP: "Pop value on stack into r16",
  CALL: "Call function at addr",
  CP: "Call function at addr if FlagS == 0",
  CM: "Call function at addr if FlagS == 1",
  CNZ: "Call function at addr if FlagZ == 0",
  CPO: "Call function at addr if FlagP == 0",
  CZ: "Call function at addr if FlagZ == 1",
  CPE: "Call function at addr if FlagP == 1",
  CNC: "Call function at addr if FlagC == 0",
  CC: "Call function at addr if FlagC == 1",
  RET: "Return from function",
  RP: "Return from function if FlagS == 0",
  RM: "Return from function if FlagS == 1",
  RNZ: "Return from function if FlagZ == 0",
  RZ: "Return from function if FlagZ == 1",
  RPO: "Return from function if FlagP == 0",
  RPE: "Return from function if FlagP == 1",
  RNC: "Return from function if FlagC == 0",
  RC: "Return from function if FlagC == 1",
  JMP: "Jump to addr",
  JP: "Jump to addr if FlagS == 0",
  JM: "Jump to addr if FlagS == 1",
  JNZ: "Jump to addr if FlagZ == 0",
  JZ: "Jump to addr if FlagZ == 1",
  JPO: "Jump to addr if FlagP == 0",
  JPE: "Jump to addr if FlagP == 1",
  JNC: "Jump to addr if FlagC == 0",
  JC: "Jump to addr if FlagC == 1",
  NOP: "Do nothing",
  HLT: "Halt execution",
  OUT: "Out",
};

export interface IArgType {
  arg1: { allowed: Set<string>; argType: string };
  arg2: { allowed: Set<string>; argType: string };
}

const collapseSet = (s: Set<string>) => Array.from(s).sort().join("");

export const argsLookup = Object.values(opcodes).reduce<Record<string, IArgType>>((accum, cur) => {
  const instr = cur.instr.toUpperCase();
  if (!accum[instr]) accum[instr] = { arg1: { allowed: new Set(), argType: "" }, arg2: { allowed: new Set(), argType: "" } };
  if (["imm8", "imm16", "addr"].includes(cur.arg1)) {
    accum[instr].arg1.allowed.add(cur.arg1);
    accum[instr].arg1.argType = cur.arg1;
  } else {
    accum[instr].arg1.allowed.add(cur.arg1);
    if (collapseSet(accum[instr].arg1.allowed) == "ABCDEHLM") accum[instr].arg1.argType = "reg8";
    if (["BD", "BDH", "BDHSP"].includes(collapseSet(accum[instr].arg1.allowed))) accum[instr].arg1.argType = "reg16";
  }
  if (["imm8", "imm16", "addr"].includes(cur.arg2)) {
    accum[instr].arg2.allowed.add(cur.arg2);
    accum[instr].arg2.argType = cur.arg2;
  } else {
    accum[instr].arg2.allowed.add(cur.arg2);
    if (collapseSet(accum[instr].arg2.allowed) == "ABCDEHLM") accum[instr].arg2.argType = "reg8";
    if (["BD", "BDH", "BDHSP"].includes(collapseSet(accum[instr].arg2.allowed))) accum[instr].arg2.argType = "reg16";
  }
  return accum;
}, {});