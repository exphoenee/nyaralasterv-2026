(function(){
  var STORE_KEY='nyaralasterv.activeTab';
  var tabs=[].slice.call(document.querySelectorAll('[role="tab"]'));

  function sel(tab,opts){
    opts=opts||{};
    tabs.forEach(function(t){
      var on=t===tab;
      t.setAttribute('aria-selected',on?'true':'false');
      t.setAttribute('tabindex',on?'0':'-1');
      document.getElementById(t.getAttribute('aria-controls')).hidden=!on;
    });
    try{localStorage.setItem(STORE_KEY,tab.id);}catch(e){}
    if(opts.focus!==false)tab.focus();
    if(opts.scroll!==false)window.scrollTo({top:0,behavior:'instant' in window?'instant':'auto'});
  }

  tabs.forEach(function(tab,i){
    tab.addEventListener('click',function(){sel(tab);});
    tab.addEventListener('keydown',function(e){
      var n;
      if(e.key==='ArrowRight')n=tabs[(i+1)%tabs.length];
      else if(e.key==='ArrowLeft')n=tabs[(i-1+tabs.length)%tabs.length];
      else if(e.key==='Home')n=tabs[0];
      else if(e.key==='End')n=tabs[tabs.length-1];
      if(n){e.preventDefault();sel(n);}
    });
  });

  // Áttekintés táblázat sorai → tabváltás
  function tabForPanel(panelId){
    for(var k=0;k<tabs.length;k++){if(tabs[k].getAttribute('aria-controls')===panelId)return tabs[k];}
    return null;
  }
  [].slice.call(document.querySelectorAll('tr.goto')).forEach(function(row){
    function go(){var t=tabForPanel(row.getAttribute('data-target'));if(t)sel(t);}
    row.addEventListener('click',go);
    row.addEventListener('keydown',function(e){
      if(e.key==='Enter'||e.key===' '){e.preventDefault();go();}
    });
  });

  // Első betöltés: a localStorage-ban mentett tab visszaállítása
  var saved=null;
  try{saved=localStorage.getItem(STORE_KEY);}catch(e){}
  var start=null;
  if(saved){for(var j=0;j<tabs.length;j++){if(tabs[j].id===saved){start=tabs[j];break;}}}
  if(!start)start=tabs[0];
  sel(start,{focus:false,scroll:false});
})();

/* Téma-váltó: böngésző alapértelmezés, user választás localStorage-ban mentve */
(function(){
  var KEY='nyaralasterv.theme';
  var root=document.documentElement;
  var btn=document.getElementById('themeToggle');
  var icon=document.getElementById('themeIcon');
  var label=document.getElementById('themeLabel');
  function systemDark(){return window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches;}
  function current(){var a=root.getAttribute('data-theme');if(a==='dark'||a==='light')return a;return systemDark()?'dark':'light';}
  function render(){
    var dark=current()==='dark';
    if(icon)icon.textContent=dark?'☀️':'🌙';          // a gomb a KÖVETKEZŐ témát kínálja
    if(label)label.textContent=dark?'Világos':'Sötét';
    if(btn)btn.setAttribute('aria-pressed',dark?'true':'false');
  }
  render();
  if(btn)btn.addEventListener('click',function(){
    var next=current()==='dark'?'light':'dark';
    root.setAttribute('data-theme',next);
    try{localStorage.setItem(KEY,next);}catch(e){}
    render();
  });
  if(window.matchMedia){
    var mq=window.matchMedia('(prefers-color-scheme: dark)');
    var onChange=function(){var s=null;try{s=localStorage.getItem(KEY);}catch(e){}if(s!=='dark'&&s!=='light')render();};
    if(mq.addEventListener)mq.addEventListener('change',onChange);else if(mq.addListener)mq.addListener(onChange);
  }
})();

/* Élő árfolyam: napi cache a localStorage-ban; ha aznapra már van adat, nem fetchel újra.
   Offline / szigorú CSP esetén a beépített (fallback) árfolyamot használja. */
(function(){
  var KEY='nyaralasterv.fx';
  var FALLBACK={HUF:355,GBP:0.855,ISK:150,CAD:1.48};
  function today(){var d=new Date();function p(n){return (n<10?'0':'')+n;}return d.getFullYear()+'-'+p(d.getMonth()+1)+'-'+p(d.getDate());}
  function grp(n){return Math.round(n).toLocaleString('hu-HU');}
  function fmt(cur,v){
    if(cur==='HUF')return v>=1000000?(v/1000000).toLocaleString('hu-HU',{minimumFractionDigits:1,maximumFractionDigits:1})+' M':grp(Math.round(v/1000)*1000);
    if(cur==='GBP')return '£'+grp(v);
    if(cur==='ISK')return grp(Math.round(v/1000)*1000);
    if(cur==='CAD')return grp(v);
    return grp(v);
  }
  function hufShort(v){return v>=1000000?(v/1000000).toLocaleString('hu-HU',{minimumFractionDigits:1,maximumFractionDigits:1})+' M Ft':Math.round(v/1000)+' e Ft';}
  function parseAmounts(txt){
    txt=(txt||'').replace(/ /g,' ').replace(/[€~]/g,'').replace(/\s/g,'');
    if(!txt)return [];
    return txt.split(/[–—-]/).map(function(s){return parseFloat(s.replace(/[^\d.]/g,''));}).filter(function(n){return !isNaN(n);});
  }
  function rate(rates,cur){return (rates&&rates[cur])||FALLBACK[cur];}
  function apply(rates){
    var tables=document.querySelectorAll('table');
    // 1) Részletes költségbontó táblázatok (EUR fejléccel)
    tables.forEach(function(tbl){
      var head=tbl.tHead; if(!head||!head.rows.length)return;
      var ths=head.rows[0].cells, eurIdx=-1, targets=[];
      for(var i=0;i<ths.length;i++){var t=ths[i].textContent.toUpperCase();
        if(t.indexOf('EUR')>=0)eurIdx=i;
        else if(t.indexOf('GBP')>=0||t.indexOf('£')>=0)targets.push({i:i,cur:'GBP'});
        else if(t.indexOf('HUF')>=0||t.indexOf('FT')>=0)targets.push({i:i,cur:'HUF'});
        else if(t.indexOf('ISK')>=0)targets.push({i:i,cur:'ISK'});
        else if(t.indexOf('CAD')>=0)targets.push({i:i,cur:'CAD'});
      }
      if(eurIdx<0||!targets.length||!tbl.tBodies.length)return;
      var rows=tbl.tBodies[0].rows;
      for(var r=0;r<rows.length;r++){var cells=rows[r].cells, ec=cells[eurIdx]; if(!ec)continue;
        var base=parseAmounts(ec.textContent); if(!base.length)continue; var tilde=/~/.test(ec.textContent);
        targets.forEach(function(tg){var cell=cells[tg.i]; if(!cell)return;
          cell.textContent=(tilde?'~':'')+base.map(function(b){return fmt(tg.cur,b*rate(rates,tg.cur));}).join('–');});
      }
    });
    // 2) Áttekintés tábla (költség cella <small> forint része)
    tables.forEach(function(tbl){
      var head=tbl.tHead; if(!head||!head.rows.length)return;
      var ths=head.rows[0].cells, costIdx=-1;
      for(var i=0;i<ths.length;i++){if(ths[i].textContent.toLowerCase().indexOf('költség')>=0)costIdx=i;}
      if(costIdx<0||!tbl.tBodies.length)return;
      var rows=tbl.tBodies[0].rows;
      for(var r=0;r<rows.length;r++){var cell=rows[r].cells[costIdx]; if(!cell)continue;
        var sm=cell.querySelector('small'); if(!sm)continue;
        var et=cell.childNodes[0]?cell.childNodes[0].textContent:''; var base=parseAmounts(et); if(!base.length)continue;
        var tilde=/~/.test(et);
        sm.textContent=(tilde?'~':'')+base.map(function(b){return hufShort(b*rate(rates,'HUF'));}).join('–');
      }
    });
  }
  function ft(v,dec){return v.toLocaleString('hu-HU',{minimumFractionDigits:dec||0,maximumFractionDigits:dec||0});}
  // Minden forintban kifejezett árfolyam (bővíthető új pénznemmel): kód -> "1 X = Y Ft" string
  function ratesInFt(rates){
    var huf=rate(rates,'HUF');
    return [
      '1 € = '+ft(huf)+' Ft',
      '1 £ = '+ft(huf/rate(rates,'GBP'))+' Ft',
      '1 CAD = '+ft(huf/rate(rates,'CAD'))+' Ft',
      '1 ISK = '+ft(huf/rate(rates,'ISK'),2)+' Ft'
    ];
  }
  function status(live,date,rates){
    var el=document.getElementById('fxStatus'), tx=document.getElementById('fxStatusText'); if(!el||!tx)return;
    el.hidden=false;
    var s=ratesInFt(rates).join(' · ');
    if(live){el.classList.add('live');tx.textContent='Élő árfolyam · '+s+' · frissítve: '+date;}
    else{el.classList.remove('live');tx.textContent='Becsült árfolyam (nincs élő adat) · '+s;}
  }
  function notes(rates,live,date){
    var huf=rate(rates,'HUF');
    var els=document.querySelectorAll('.fx-note');
    for(var i=0;i<els.length;i++){var p=els[i];
      var parts=['1 € = '+ft(huf)+' Ft'];
      var curs=(p.getAttribute('data-curs')||'').split(',');
      for(var j=0;j<curs.length;j++){var c=curs[j];
        if(c==='GBP')parts.push('1 £ = '+ft(huf/rate(rates,'GBP'))+' Ft');
        else if(c==='ISK')parts.push('1 ISK = '+ft(huf/rate(rates,'ISK'),2)+' Ft');
        else if(c==='CAD')parts.push('1 CAD = '+ft(huf/rate(rates,'CAD'))+' Ft');
      }
      var euro=p.getAttribute('data-euro')==='1'?'A helyi pénznem az euró. ':'';
      p.textContent=euro+'Árfolyam ('+(live?'élő · '+date:'becsült')+'): '+parts.join(' · ')+'.';
    }
  }
  function render(rates,live,date){apply(rates);status(live,date,rates);notes(rates,live,date);}
  var t=today(), cached=null;
  try{cached=JSON.parse(localStorage.getItem(KEY));}catch(e){}
  if(cached&&cached.date===t&&cached.rates&&cached.rates.HUF){render(cached.rates,true,t);return;}
  if(!window.fetch){render(FALLBACK,false,t);return;}
  fetch('https://open.er-api.com/v6/latest/EUR')
    .then(function(r){return r.json();})
    .then(function(d){
      var rates=d&&d.rates; if(!rates||!rates.HUF)throw 0;
      var keep={HUF:rates.HUF,GBP:rates.GBP,ISK:rates.ISK,CAD:rates.CAD};
      try{localStorage.setItem(KEY,JSON.stringify({date:t,rates:keep}));}catch(e){}
      render(keep,true,t);
    })
    .catch(function(){render(FALLBACK,false,t);});
})();
