// Read-only prompts. Each row can carry a customer reply as a search cue.
const followupStages = ['刚成交','交付中','交付后','长期回访'];
const followupGroups = [
 ['6问精简版','快速回访',[
 '当时发生了什么，让你想找人一起看看账号？','决定合作前，你主要考虑了哪些事？','最后做决定的时候，你最看重什么？','合作里你记得最清楚的是哪件事？当时发生了什么？','回头看，你原来想解决的事，现在怎么样了？','如果下一次一起做，你希望我们保留什么、改改什么？']],
 ['身份认同','刚成交',['你现在主要做什么生意，客户平时从哪儿来？','最近做内容时，哪件事最费你的工夫？','之前试过哪些办法？用下来怎么样？','你看过的案例里，有哪些地方跟你的处境像，哪些地方差得挺远？']],
 ['专业诊断','交付中',['上次看账号之前，你自己觉得问题可能在哪儿？','我们聊到的几个判断里，哪些跟你的观察对得上，哪些对不上？','有没有哪条建议，你还没弄明白为什么要这样做？','你试过哪条建议？当时怎么做的，后来发生了什么？']],
 ['过程透明','交付中',['从开始到现在，你实际做了哪几件事？','哪一步花的时间跟你原先估计的不一样？','下一步要准备什么、谁来做，你还有哪里想确认？','想起最近一次交文案，从发过来到收到回复，中间是怎么走的？']],
 ['风险消除','刚成交',['决定之前，有没有哪件事让你想再等等？','以前找人做账号的经历，有没有影响你这次的决定？','开始前，你想先把哪些约定说清楚？','如果中途进度跟不上，你希望我们怎么跟你沟通？']],
 ['结果验证','交付后',['开始时你最想看到什么结果？现在进展到哪儿了？','跟之前差不多长的一段时间比，来咨询的人数和问的事怎么样？','最近一条咨询后来怎么样了？方便讲讲经过吗？','这段时间还有哪些事可能影响结果，比如上新、投广告或淡旺季？']],
 ['价值感知','交付后',['这段时间算下来，你主要把时间和钱花在哪儿了？','哪部分你后来用上了？哪部分暂时用不上？','拿最近一条视频来说，从想题到发出去，跟你以前做有什么区别？','如果重新安排这笔预算，你会怎么分？为什么？']],
 ['长期体验','长期回访',['最近一次自己做内容是什么时候？当时怎么做的？','当时一起试过的办法，你现在还用哪些？哪些放下了？','这阵子遇到过什么新问题？你后来怎么处理的？','隔了一段时间再看，哪些变化留了下来，哪些又变了？']],
 ['开场邀请','通用',['最近在回访，想听听你的真实经历。方便聊几分钟吗？文字、语音都行，不方便也没关系。','想跟你了解一下这段时间做账号的情况。顺手的、卡住的都可以说，挑你愿意聊的就好。']],
 ['模糊回答怎么追问','通用',[
 ['挺好／一般般','你说这句话的时候，想到的是哪一次？当时发生了什么？'],['挺专业','你记得当时我们看了什么、聊了什么吗？'],['效果不错／没效果','你是看什么来判断的？方便举个最近的例子吗？'],['学到了很多','最近一次实际去做的时候，你是怎么做的？'],['服务很负责','你想到的是哪次沟通？当时你问了什么，后来怎么处理的？'],['感觉挺值／有点贵','你衡量这笔花费的时候，主要在跟什么比？']]],
 ['发布授权','通用',['想把你刚才这段话匿名放在我的朋友圈，可以吗？我先把准备发的版本给你看，你明确同意后我再发。只留作内部反馈也完全可以。','如果用到聊天截图，你愿意保留哪些内容？姓名、头像、账号和业务数据我会先遮住，再把最终图片发你确认。','这次想把这段反馈用在公开的短视频里，你愿意吗？我会先发具体片段给你确认。之前同意发朋友圈的内容，这次也单独问你。']]
];
function renderFollowup(){
 const root = $('#main');
 root.innerHTML = '<section class="testimony"><button class="subtle" id="fuBack">← 返回客户证言收集表</button><div class="eyebrow">客户声音 · 回访</div><h1>客户回访问话模板</h1><p>挑一两句适合当下的问题，直接复制给客户。</p><label>搜索全部话术<input type="search" id="fuSearch" placeholder="搜顾虑、阶段，或客户说的「挺好」"></label><div class="actions" id="fuStages"></div><p role="status" id="fuStatus"></p><div id="fuResults"></div></section>';
 const search = $('#fuSearch'), results = $('#fuResults'), status = $('#fuStatus');
 let stage = '';
 const tabs = $('#fuStages');
 for(const name of ['全部',...followupStages]){
  const button = document.createElement('button');
  button.textContent = name;
  button.onclick = ()=>{ stage = name==='全部'?'':name; search.value=''; refresh(); };
  tabs.append(button);
 }
 function refresh(){
  const term = search.value.trim();
  status.textContent='';
  for(const b of tabs.children){
   const active=b.textContent===(stage||'全部');
   b.className=active?'primary':'subtle';
   b.setAttribute('aria-pressed',active);
  }
  results.innerHTML='';
  followupGroups.forEach(([title,phase,rows],group)=>{
   if(stage && phase!==stage && phase!=='通用')return;
   const shown=rows.map((row,index)=>({row,index})).filter(({row})=>[title,phase,...[row].flat()].some(v=>v.includes(term)));
   if(!shown.length)return;
   const article=document.createElement('article');
   article.className='library-filters';
   article.innerHTML='<small>'+phase+'</small><h2>'+title+'</h2><button class="subtle" data-group="'+group+'">复制整组（'+rows.length+'条）</button>'+shown.map(({row,index})=>{
    const [cue,line]=Array.isArray(row)?row:['',row];
    return '<div class="fu-line"><div>'+(cue?'<small>客户说「'+cue+'」</small><br>':'')+line+'</div><button class="subtle" data-group="'+group+'" data-line="'+index+'">复制</button></div>';
   }).join('');
   results.append(article);
  });
  if(!results.children.length)results.textContent='没有找到相关话术，试试「咨询」「授权」或「挺好」。';
 }
 search.oninput=()=>{stage='';refresh()};
 results.onclick=async e=>{
  const b=e.target.closest('[data-group]');
  if(!b)return;
  const rows=followupGroups[Number(b.dataset.group)][2];
  const lines=b.hasAttribute('data-line')?[rows[Number(b.dataset.line)]]:rows;
  const value=lines.map(r=>Array.isArray(r)?r[1]:r).join('\n');
  try{await navigator.clipboard.writeText(value);status.textContent='已复制';const old=b.textContent;b.textContent='已复制';setTimeout(()=>{if(b.textContent==='已复制')b.textContent=old==='已复制'?(lines.length===1?'复制':'复制整组（'+rows.length+'条）'):old},1200);}
  catch{window.prompt('请复制下面的话术',value)}
 };
 $('#fuBack').onclick=()=>go('客户证言收集表');
 refresh();
}
