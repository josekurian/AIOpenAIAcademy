import {ImageResponse} from 'next/og';
export const alt = 'HybridGenAI Academy — Your independent OpenAI learning guide';
export const size = {width: 1200, height: 630};
export const contentType = 'image/png';
export default function Image() {
  return new ImageResponse(<div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column',justifyContent:'space-between',padding:'65px 75px',background:'#f8f0e9',color:'#44362e',fontFamily:'sans-serif'}}><div style={{display:'flex',fontSize:25,color:'#914d3e'}}>HybridGenAI Academy</div><div style={{display:'flex',flexDirection:'column'}}><div style={{display:'flex',fontSize:67,fontWeight:700,letterSpacing:-3}}>Your OpenAI</div><div style={{display:'flex',fontSize:67,fontWeight:700,color:'#914d3e',letterSpacing:-3}}>learning journey starts here.</div><div style={{display:'flex',marginTop:28,fontSize:25,color:'#725d4d'}}>ChatGPT · Codex · OpenAI API · Credentials</div></div><div style={{display:'flex',borderTop:'1px solid #dfcec0',paddingTop:24,fontSize:19,color:'#725d4d'}}>Independent learning guide. Not affiliated with OpenAI.</div></div>,size);
}
