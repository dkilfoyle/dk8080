import { isStatement, type Program } from '../language/generated/ast.js';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { extractDestinationAndName } from './cli-util.js';
import { opcodes } from '../language/opcodes.js';

const classifyStatement = (instr:string, arg1: string|number, arg2: string) => {
return {
    instr: instr.toUpperCase(),
    arg1: 
}
}

export const generateMachineCode(program:Program) {
    program.lines.forEach(line => {
        if (isStatement(line)) {
            const lookup = Object.values(opcodes).find(o => {
                if (o.instr != line.instr.toUpperCase()) return false;
                if (o.arg1 != "") {
                    if (["imm16", "imm8", "addr"].includes(o.arg1) && line.arg1 == undefined) return false;
                    else if (o.arg1 != line.arg1?.name?.toUpperCase()) return false;
                }
                if (o.arg2 != "") {
                    if (["imm16", "imm8", "addr"].includes(o.arg2) && line.arg2 == undefined) return false;
                    else if (o.arg2 != line.arg2?.name?.toUpperCase()) return false;
                }
            })
            console.log(line, lookup)
        }
    })

}

export function generateCOM(program: Program, filePath: string, destination: string | undefined): string {
    const data = extractDestinationAndName(filePath, destination);
    const generatedFilePath = `${path.join(data.destination, data.name)}.js`;

    const mc = generateMachineCode(program);

    if (!fs.existsSync(data.destination)) {
        fs.mkdirSync(data.destination, { recursive: true });
    }
    fs.writeFileSync(generatedFilePath, mc);
    return generatedFilePath;
}
