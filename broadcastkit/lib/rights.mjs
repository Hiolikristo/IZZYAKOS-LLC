export const RIGHTS=new Set(['cleared','test-only','direct-permission','statutory/PRO-covered','blocked']);
export function mayPubliclyPlay(track){if(!track||!RIGHTS.has(track.status))return false;return ['cleared','direct-permission','statutory/PRO-covered'].includes(track.status)}
export function mayPrivateSchedule(track){return !!track&&RIGHTS.has(track.status)&&track.status!=='blocked'}
