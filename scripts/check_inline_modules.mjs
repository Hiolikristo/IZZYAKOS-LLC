import fs from "node:fs";
import { spawnSync } from "node:child_process";
import { exit } from "node:process";
const pages=["control/index.html","fundmeister/workspace/index.html"];
for(const path of pages){
  const html=fs.readFileSync(path,"utf8");
  const scripts=[...html.matchAll(/<script\b[^>]*type=["']module["'][^>]*>([\s\S]*?)<\/script>/gi)];
  if(scripts.length!==1){console.error("FAIL: expected exactly one inline module in",path);exit(1);}
  const result=spawnSync(process.execPath,["--check","--input-type=module"],{input:scripts[0][1],encoding:"utf8"});
  if(result.status!==0){console.error("FAIL inline JS syntax:",path,result.stderr);exit(1);}
  console.log("PASS inline JS:",path);
}
