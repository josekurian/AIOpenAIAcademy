import {notFound} from 'next/navigation';
import Link from 'next/link';
import LearningCatalog from '@/components/LearningCatalog';
import {academySource, type LearningCategory} from '@/lib/openai-learning';
import {pageMetadata} from '@/lib/site';
const pathways: Record<string,{title:string;description:string;category:LearningCategory;allowed?:LearningCategory[]}> = {
  foundations:{title:'ChatGPT foundations',description:'Start with everyday AI skills and work toward repeatable workflows.',category:'Foundations'},
  api:{title:'Build with the OpenAI API',description:'Explore the published developer pathway, from a first solution idea to evaluation and performance.',category:'API'},
  codex:{title:'Learn to work with Codex',description:'Explore the official Codex course sequence and choose your next learning step.',category:'Codex'},
  'leadership-education':{title:'Leadership & education',description:'Explore learning for team leaders, educators, and students.',category:'All courses',allowed:['Leadership','Education']},
};
export function generateStaticParams(){return Object.keys(pathways).map(pathway=>({pathway}));}
export async function generateMetadata({params}:{params:Promise<{pathway:string}>}){const {pathway}=await params;const item=pathways[pathway];return item?pageMetadata(item.title,item.description,`/openai-training/${pathway}`):{};}
export default async function PathwayPage({params}:{params:Promise<{pathway:string}>}){
 const {pathway}=await params;const item=pathways[pathway];if(!Object.hasOwn(pathways,pathway) || !item)notFound();
 return <><section className="container pageHero"><div className="eyebrow">OPENAI TRAINING · CHOOSE YOUR PATH</div><h1>{item.title}</h1><p>{item.description}</p><Link href="/openai-training" className="textLink">← All training & resources</Link></section><section className="container pathwayCatalog"><LearningCatalog key={pathway} initialCategory={item.category} allowedCategories={item.allowed || [item.category]}/><p className="catalogFootnote">Published OpenAI courses, delivered on the provider’s platform. <a className="inlineSource" href={academySource}>Review requirements ↗</a></p></section></>;
}
