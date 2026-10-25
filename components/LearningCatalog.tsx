'use client';
import {useState} from 'react';
import {ArrowUpRight, Clock3, Search, BookOpen} from 'lucide-react';
import {academyCatalog, academySource, categories, officialCourses, type LearningCategory} from '@/lib/openai-learning';

export default function LearningCatalog({initialCategory = 'All courses', allowedCategories}: {initialCategory?: LearningCategory; allowedCategories?: LearningCategory[]}) {
  const [category, setCategory] = useState<LearningCategory>(initialCategory);
  const [query, setQuery] = useState('');
  const available = officialCourses.filter(course => !allowedCategories || allowedCategories.includes(course.category));
  const courses = available.filter(course => (category === 'All courses' || course.category === category) && `${course.title} ${course.category} ${course.outcome}`.toLowerCase().includes(query.trim().toLowerCase()));
  return <>
    <div className="catalogControls">
      <label className="catalogSearch"><Search size={18}/><span className="srOnly">Search official courses</span><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search courses or skills…"/></label>
      <div className="filterChips" role="group" aria-label="Filter courses by pathway">{categories.filter(item => !allowedCategories || item === 'All courses' || allowedCategories.includes(item)).map(item => <button key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}</div>
    </div>
    <div className="catalogSummary"><span role="status" aria-live="polite">{courses.length} of {available.length} courses</span><a href={academySource}>Course details & estimated times <ArrowUpRight size={13}/></a></div>
    <div className="officialGrid">{courses.map(course => <article className={`officialCard tone${course.category}`} key={course.title}>
      <div className="officialCardTop"><span className="courseGlyph"><BookOpen size={20}/></span><span className="courseCategory">{course.category}</span></div>
      <h3>{course.title}</h3><p>{course.outcome}</p><div className="courseMeta"><Clock3 size={14}/>{course.duration}<span>Self-paced</span></div>
      <a href={academyCatalog} aria-label={`Find ${course.title} in the OpenAI Academy catalog`}>Find in OpenAI Academy <ArrowUpRight size={16}/></a>
    </article>)}</div>
    {courses.length === 0 && <div className="emptyCourses"><h3>No matching courses</h3><p>Try a broader search or choose another pathway.</p><button className="button secondary" onClick={() => {setCategory(initialCategory); setQuery('');}}>Reset filters</button></div>}
    <p className="catalogFootnote">Published catalog snapshot. Open a course in OpenAI Academy for its current syllabus and enrollment details. Filters also control which courses appear in your printout.</p>
  </>;
}
