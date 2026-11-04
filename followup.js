// Read-only prompts. Each row can carry a customer reply as a search cue.
const followupStages = ['刚成交','交付中','交付后','长期回访'];
const followupGroups = [
 ["常用6句 · 客户这样说，你怎么接", "快速回访", [["我当时也犹豫过。", "你还记得迟迟没定的那几天，心里在掂量什么吗？", "后来做决定时，你知道了什么？还有什么是当时没把握的？"], ["感觉挺专业的。", "你还记得我们一起看的是哪条内容吗？", "看那条内容时，我们说了什么，你自己当时又是怎么想的？"], ["服务挺负责的。", "哪次沟通让你有这个感觉？你那天发过来的是什么？", "收到回复以后，你下一步做了什么？"], ["效果还不错。", "你说的效果，具体指哪件事？就说最近一次吧。", "跟以前差不多长的一段时间比，这件事以前是什么样？"], ["有点贵。", "回想付钱前，你当时拿这笔钱跟什么比？", "按当时的想法，钱花下去之后，哪件事最没把握？"], ["学到了很多。", "最近有没有一次你真的用上了？那天你在做什么？", "你当时具体做了哪个决定？最后怎么样？"]]],
 ["身份认同", "刚成交", [["我这个行业比较特殊。", "你觉得哪里最不一样？拿最近一个来咨询的客户说说？", "客户是怎么找到你的，开口先问了什么？"], ["我没什么基础。", "上次你想发一条视频，最后做到哪一步了？", "做到那儿的时候，是什么让你停下来了？"], ["我平时太忙了。", "拿昨天来说，你原本打算什么时候做内容？", "后来那段时间实际用来做什么了？"], ["我也是看了案例才来的。", "你还记得是哪一个案例吗？哪里让你想到自己？", "那个人的情况里，有哪一点跟你其实差挺多？"]]],
 ["专业诊断", "交付中", [["你们看得挺准。", "你说的“准”，是我们聊账号时的哪一句？", "后来你看到什么，让你觉得那句话说中了？"], ["感觉挺专业的。", "你还记得我们一起看的是哪条内容吗？", "看那条内容时，我们说了什么，你自己当时又是怎么想的？"], ["这些我以前也听过。", "哪一句你最熟？你上次是怎么照着做的？", "当时做到哪儿，还有什么没弄明白？"], ["我听懂了，就是不会做。", "拿你手头这条来说，你自己能先做哪一步？", "从哪一步开始，你得停下来问人？"]]],
 ["过程透明", "交付中", [["服务挺负责的。", "哪次沟通让你有这个感觉？你那天发过来的是什么？", "收到回复以后，你下一步做了什么？"], ["流程还行。", "就拿上次交稿来说，从你发过来到最后定下来，中间怎么走的？", "哪一步你当时心里没底？"], ["改了好几遍。", "你手头还有那条稿子吗？第一版和最后一版差在哪儿？", "中间哪一次修改最费工夫，为什么？"], ["有时候跟不上。", "最近一次跟不上，是做到哪儿的时候？", "那时候你最想有人跟你说清楚什么？"]]],
 ["风险消除", "刚成交", [["我之前踩过坑。", "方便说说上一次吗？哪件事让你觉得跟说好的不一样？", "所以这次付款前，你特意问清了哪件事？"], ["我当时也犹豫过。", "你还记得迟迟没定的那几天，心里在掂量什么吗？", "后来做决定时，你知道了什么？还有什么是当时没把握的？"], ["我怕自己坚持不下来。", "以前有哪次做到一半停了？那阵子发生了什么？", "这次开始之前，你想先为哪件事留出余地？"], ["先试试看吧。", "你准备先试到哪一步，再决定要不要继续？", "到时候你会看什么来做决定？"]]],
 ["结果验证", "交付后", [["效果还不错。", "你说的效果，具体指哪件事？就说最近一次吧。", "跟以前差不多长的一段时间比，这件事以前是什么样？"], ["最近咨询多了。", "最近来问的人里，挑一个你记得的，他第一句问了什么？", "后来聊到哪一步了？没再联系也算。"], ["播放量上来了。", "你指的是哪条视频？跟你平时发的比，大概差多少？", "发完那条以后，后台除了播放量，你还留意到什么？"], ["暂时没啥效果。", "你最想看到、到现在还没看到的是什么？", "你从什么时候开始留意这件事，到现在试过哪些做法？"]]],
 ["价值感知", "交付后", [["有点贵。", "回想付钱前，你当时拿这笔钱跟什么比？", "按当时的想法，钱花下去之后，哪件事最没把握？"], ["感觉挺值的。", "你心里算这笔账的时候，想到的是哪件事？", "那件事以前你怎么处理，大概要花多少时间或钱？"], ["省事多了。", "最近做哪件事的时候，你冒出过“这回省事了”这个念头？", "要是照原先的做法，那一步你会怎么做？"], ["学到了很多。", "最近有没有一次你真的用上了？那天你在做什么？", "你当时具体做了哪个决定？最后怎么样？"]]],
 ["长期体验", "长期回访", [["现在还在用。", "最近一次用是什么时候？你用它做了哪件事？", "这次你自己做到了哪儿，哪一步还要找人商量？"], ["后来就没用了。", "你还记得最后一次用是什么时候吗？", "后来遇到类似的事，你改用什么办法了？"], ["现在自己能做了。", "拿最近一条内容说说，从定题到发出去，你是怎么定下来的？", "中间哪个决定你以前会问别人？这次你看什么拿的主意？"], ["一开始有用，后来一般。", "你从哪一次开始觉得跟之前不太一样？", "把前后各一次放在一起看，当时的做法和结果各是什么样？"]]],
 ['6问精简版','快速回访',[
 '当时发生了什么，让你想找人一起看看账号？','决定合作前，你主要考虑了哪些事？','最后做决定的时候，你最看重什么？','合作里你记得最清楚的是哪件事？当时发生了什么？','回头看，你原来想解决的事，现在怎么样了？','如果下一次一起做，你希望我们保留什么、改改什么？']],
 ['开场邀请','通用',['最近在回访，想听听你的真实经历。方便聊几分钟吗？文字、语音都行，不方便也没关系。','想跟你了解一下这段时间做账号的情况。顺手的、卡住的都可以说，挑你愿意聊的就好。']],
 ['模糊回答怎么追问','通用',[
 ['挺好／一般般','你说这句话的时候，想到的是哪一次？当时发生了什么？'],['挺专业','你记得当时我们看了什么、聊了什么吗？'],['效果不错／没效果','你是看什么来判断的？方便举个最近的例子吗？'],['学到了很多','最近一次实际去做的时候，你是怎么做的？'],['服务很负责','你想到的是哪次沟通？当时你问了什么，后来怎么处理的？'],['感觉挺值／有点贵','你衡量这笔花费的时候，主要在跟什么比？']]],
 ['发布授权','通用',['想把你刚才这段话匿名放在我的朋友圈，可以吗？我先把准备发的版本给你看，你明确同意后我再发。只留作内部反馈也完全可以。','如果用到聊天截图，你愿意保留哪些内容？姓名、头像、账号和业务数据我会先遮住，再把最终图片发你确认。','这次想把这段反馈用在公开的短视频里，你愿意吗？我会先发具体片段给你确认。之前同意发朋友圈的内容，这次也单独问你。']]
];
function renderFollowup(){
 const root = $('#main');
 root.innerHTML = '<section class="testimony"><button class="subtle" id="fuBack">← 返回客户证言收集表</button><div class="eyebrow">客户声音 · 回访</div><h1>客户回访问话模板</h1><p>先找一句跟客户原话接近的，复制「你可以回」。听完再决定要不要往下问。</p><label>搜索全部话术<input type="search" id="fuSearch" placeholder="搜客户原话，例如「有点贵」「跟不上」"></label><div class="actions" id="fuStages"></div><p role="status" id="fuStatus"></p><div id="fuResults"></div></section>';
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
    if(Array.isArray(row) && row.length===3){
     const reply=(label,step)=>'<div class="fu-line"><div><small>'+label+'</small><br>'+row[step]+'</div><button class="subtle" data-group="'+group+'" data-line="'+index+'" data-step="'+step+'">复制</button></div>';
     return '<div style="margin-top:1.4em"><strong>客户可能说「'+row[0]+'」</strong>'+reply('你可以回',1)+reply('听完还不具体，再问',2)+'</div>';
    }
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
  const value=lines.map(r=>b.dataset.step?r[Number(b.dataset.step)]:Array.isArray(r)&&r.length===3?r.join('\n'):Array.isArray(r)?r[1]:r).join('\n');
  try{await navigator.clipboard.writeText(value);status.textContent='已复制';const old=b.textContent;b.textContent='已复制';setTimeout(()=>{if(b.textContent==='已复制')b.textContent=old==='已复制'?(lines.length===1?'复制':'复制整组（'+rows.length+'条）'):old},1200);}
  catch{window.prompt('请复制下面的话术',value)}
 };
 $('#fuBack').onclick=()=>go('客户证言收集表');
 refresh();
}
