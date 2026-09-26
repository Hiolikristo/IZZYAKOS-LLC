/** IZZYAKOS BroadcastKit: proposed double-entry accounting helpers.
 * No real banking, payment processing, authorization, or ministry data.
 * Must undergo independent accounting/security review before any live usage.
 */
export function postJournal({id, org, fund, lines, sourceId},seen=new Set()) {
 if(!/^[A-Za-z0-9._-]{3,80}$/.test(id||'')||!org||!fund||!Array.isArray(lines)||lines.length<2)throw Error('Invalid journal metadata');
 if(seen.has(id)||sourceId&&seen.has('source:'+sourceId))throw Error('Duplicate journal source');
 let debit=0,credit=0;
 for(const l of lines){if(!l.account||!['D','C'].includes(l.side)||!Number.isSafeInteger(l.cents)||l.cents<=0)throw Error('Invalid journal line');if(l.side==='D')debit+=l.cents;else credit+=l.cents;}
 if(debit!==credit||!Number.isSafeInteger(debit))throw Error('Unbalanced journal');
 const posting=Object.freeze({id,org,fund,sourceId:sourceId||null,postedAt:'caller/server timestamp required',lines:lines.map(l=>Object.freeze({...l})),debitCents:debit,creditCents:credit});
 seen.add(id);if(sourceId)seen.add('source:'+sourceId);return posting;
}
export function bookOnlineGift({org='church',fund='general',grossCents,feeCents,sourceId},seen=new Set()){
 if(!Number.isSafeInteger(grossCents)||grossCents<=0||!Number.isSafeInteger(feeCents)||feeCents<0||feeCents>grossCents||!sourceId)throw Error('Invalid gift');
 const gift=postJournal({id:'GIFT-'+sourceId,org,fund,sourceId,lines:[{account:'processor-clearing',side:'D',cents:grossCents},{account:'contribution-income',side:'C',cents:grossCents}]},seen);
 const settle=postJournal({id:'SET-'+sourceId,org,fund,sourceId:'settlement:'+sourceId,lines:[{account:'bank-checking',side:'D',cents:grossCents-feeCents},{account:'merchant-fees',side:'D',cents:feeCents},{account:'processor-clearing',side:'C',cents:grossCents}].filter(l=>l.cents>0)},seen);
 return {gift,settle,netCents:grossCents-feeCents};
}
export function canApprove({requesterId,approverId,approverRole,approverOrg,requestOrg,grants=[]}){
 return requesterId!==approverId&&approverOrg===requestOrg&&['owner','treasurer'].includes(approverRole)&&grants.includes('expense.approve');
}
export function reconcile({bankId,bankNetCents,grossCents,feeCents,processorId}){
 if(!bankId||!processorId||!Number.isSafeInteger(bankNetCents)||!Number.isSafeInteger(grossCents)||!Number.isSafeInteger(feeCents))return{matched:false,reason:'incomplete-source'};
 return {matched:grossCents-feeCents===bankNetCents,bankId,processorId,varianceCents:bankNetCents-(grossCents-feeCents)};
}
