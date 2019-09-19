!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var s=e();for(var i in s)("object"==typeof exports?exports:t)[i]=s[i]}}(window,function(){return function(t){var e={};function s(i){if(e[i])return e[i].exports;var n=e[i]={i:i,l:!1,exports:{}};return t[i].call(n.exports,n,n.exports,s),n.l=!0,n.exports}return s.m=t,s.c=e,s.d=function(t,e,i){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)s.d(i,n,function(e){return t[e]}.bind(null,n));return i},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="./",s(s.s=0)}([function(t,e,s){t.exports=s(1)},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i,n=s(3),a=(i=n)&&i.__esModule?i:{default:i};e.default=a.default},function(t,e,s){},function(t,e,s){"use strict";s.r(e);const i={en:["January","February","March","April","May","June","July","August","September","October","November","December"],zh_CN:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],ru:["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"]};var n={parse(t,e="-",s=/[.:]/){if(t instanceof Date)return t;if("string"==typeof t){let i,n;const a=t.split(" ");i=a[0].split(e).map(t=>parseInt(t,10)),n=a[1]&&a[1].split(s),i[1]=i[1]-1;let o=i;return n&&n.length&&(4==n.length&&(n[3]="0."+n[3],n[3]=1e3*parseFloat(n[3])),o=o.concat(n)),new Date(...o)}},to_string(t,e=!1){if(!(t instanceof Date))throw new TypeError("Invalid argument type");const s=this.get_date_values(t).map((t,e)=>(1===e&&(t+=1),a(t+"",6===e?3:2,"0"))),i=`${s[0]}-${s[1]}-${s[2]}`,n=`${s[3]}:${s[4]}:${s[5]}.${s[6]}`;return i+(e?" "+n:"")},format(t,e="YYYY-MM-DD HH:mm:ss.SSS",s="en"){const n=this.get_date_values(t).map(t=>a(t,2,0)),o={YYYY:n[0],MM:a(+n[1]+1,2,0),DD:n[2],HH:n[3],mm:n[4],ss:n[5],SSS:n[6],D:n[2],MMMM:i[s][+n[1]],MMM:i[s][+n[1]]};let r=e;const h=[];return Object.keys(o).sort((t,e)=>e.length-t.length).forEach(t=>{r.includes(t)&&(r=r.replace(t,`$${h.length}`),h.push(o[t]))}),h.forEach((t,e)=>{r=r.replace(`$${e}`,t)}),r},diff(t,e,s="day"){let i,n,a,o,r,h,d;return d=(h=(r=(a=(o=(n=(i=t-e)/1e3)/60)/60)/24)/30)/12,s.endsWith("s")||(s+="s"),Math.floor({milliseconds:i,seconds:n,minutes:o,hours:a,days:r,months:h,years:d}[s])},today(){const t=this.get_date_values(new Date).slice(0,3);return new Date(...t)},now:()=>new Date,add(t,e,s){e=parseInt(e,10);const i=[t.getFullYear()+("year"===s?e:0),t.getMonth()+("month"===s?e:0),t.getDate()+("day"===s?e:0),t.getHours()+("hour"===s?e:0),t.getMinutes()+("minute"===s?e:0),t.getSeconds()+("second"===s?e:0),t.getMilliseconds()+("millisecond"===s?e:0)];return new Date(...i)},start_of(t,e){const s={year:6,month:5,day:4,hour:3,minute:2,second:1,millisecond:0};function i(t){const i=s[e];return s[t]<=i}const n=[t.getFullYear(),i("year")?0:t.getMonth(),i("month")?1:t.getDate(),i("day")?0:t.getHours(),i("hour")?0:t.getMinutes(),i("minute")?0:t.getSeconds(),i("second")?0:t.getMilliseconds()];return new Date(...n)},clone(t){return new Date(...this.get_date_values(t))},get_date_values:t=>[t.getFullYear(),t.getMonth(),t.getDate(),t.getHours(),t.getMinutes(),t.getSeconds(),t.getMilliseconds()],get_days_in_month(t){const e=[31,28,31,30,31,30,31,31,30,31,30,31],s=t.getMonth();if(1!==s)return e[s];const i=t.getFullYear();return i%4==0&&i%100!=0||i%400==0?29:28}};function a(t,e,s){return t+="",e>>=0,s=String(void 0!==s?s:" "),t.length>e?String(t):((e-=t.length)>s.length&&(s+=s.repeat(e/s.length)),s.slice(0,e)+String(t))}function o(t,e){return"string"==typeof t?(e||document).querySelector(t):t||null}function r(t,e){const s=document.createElementNS("http://www.w3.org/2000/svg",t);for(let t in e)if("append_to"===t){e.append_to.appendChild(s)}else"innerHTML"===t?s.innerHTML=e.innerHTML:s.setAttribute(t,e[t]);return s}function h(t,e,s,i){const n=function(t,e,s,i,n="0.4s",a="0.1s"){const h=t.querySelector("animate");if(h)return o.attr(h,{attributeName:e,from:s,to:i,dur:n,begin:"click + "+a}),t;const d=r("animate",{attributeName:e,from:s,to:i,dur:n,begin:a,calcMode:"spline",values:s+";"+i,keyTimes:"0; 1",keySplines:(p="ease-out",{ease:".25 .1 .25 1",linear:"0 0 1 1","ease-in":".42 0 1 1","ease-out":"0 0 .58 1","ease-in-out":".42 0 .58 1"}[p])});var p;return t.appendChild(d),t}(t,e,s,i);if(n===t){const t=document.createEvent("HTMLEvents");t.initEvent("click",!0,!0),t.eventName="click",n.dispatchEvent(t)}}o.on=(t,e,s,i)=>{i?o.delegate(t,e,s,i):(i=s,o.bind(t,e,i))},o.off=(t,e,s)=>{t.removeEventListener(e,s)},o.bind=(t,e,s)=>{e.split(/\s+/).forEach(function(e){t.addEventListener(e,s)})},o.delegate=(t,e,s,i)=>{t.addEventListener(e,function(t){const e=t.target.closest(s);e&&(t.delegatedTarget=e,i.call(this,t,e))})},o.closest=(t,e)=>e?e.matches(t)?e:o.closest(t,e.parentNode):null,o.attr=(t,e,s)=>{if(!s&&"string"==typeof e)return t.getAttribute(e);if("object"!=typeof e)t.setAttribute(e,s);else for(let s in e)o.attr(t,s,e[s])};class d{constructor(t,e){this.set_defaults(t,e),this.prepare(),this.draw(),this.bind()}set_defaults(t,e){this.action_completed=!1,this.gantt=t,this.task=e}prepare(){this.prepare_values(),this.prepare_helpers()}prepare_values(){this.invalid=this.task.invalid,this.height=this.gantt.options.bar_height,this.x=this.compute_x(),this.y=this.compute_y(),this.corner_radius=this.gantt.options.bar_corner_radius,this.duration=n.diff(this.task._end,this.task._start,"hour")/this.gantt.options.step,this.width=this.gantt.options.column_width*this.duration,this.progress_width=this.gantt.options.column_width*this.duration*(this.task.progress/100)||0,this.group=r("g",{class:"bar-wrapper "+(this.task.custom_class||""),"data-id":this.task.id}),this.bar_group=r("g",{class:"bar-group",append_to:this.group}),this.handle_group=r("g",{class:"handle-group",append_to:this.group})}prepare_helpers(){SVGElement.prototype.getX=function(){return+this.getAttribute("x")},SVGElement.prototype.getY=function(){return+this.getAttribute("y")},SVGElement.prototype.getWidth=function(){return+this.getAttribute("width")},SVGElement.prototype.getHeight=function(){return+this.getAttribute("height")},SVGElement.prototype.getEndX=function(){return this.getX()+this.getWidth()}}draw(){this.draw_bar(),this.draw_progress_bar(),this.draw_label(),this.draw_resize_handles()}draw_bar(){this.$bar=r("rect",{x:this.x,y:this.y,width:this.width,height:this.height,rx:this.corner_radius,ry:this.corner_radius,class:"bar",append_to:this.bar_group}),h(this.$bar,"width",0,this.width),this.invalid&&this.$bar.classList.add("bar-invalid")}draw_progress_bar(){this.invalid||(this.$bar_progress=r("rect",{x:this.x,y:this.y,width:this.progress_width,height:this.height,rx:this.corner_radius,ry:this.corner_radius,class:"bar-progress",append_to:this.bar_group}),h(this.$bar_progress,"width",0,this.progress_width))}draw_label(){r("text",{x:this.x+this.width/2,y:this.y+this.height/2,innerHTML:this.task.name,class:"bar-label",append_to:this.bar_group}),requestAnimationFrame(()=>this.update_label_position())}draw_resize_handles(){if(this.invalid)return;const t=this.$bar;r("rect",{x:t.getX()+t.getWidth()-9,y:t.getY()+1,width:8,height:this.height-2,rx:this.corner_radius,ry:this.corner_radius,class:"handle right",append_to:this.handle_group}),r("rect",{x:t.getX()+1,y:t.getY()+1,width:8,height:this.height-2,rx:this.corner_radius,ry:this.corner_radius,class:"handle left",append_to:this.handle_group}),this.task.progress&&this.task.progress<100&&(this.$handle_progress=r("polygon",{points:this.get_progress_polygon_points().join(","),class:"handle progress",append_to:this.handle_group}))}get_progress_polygon_points(){const t=this.$bar_progress;return[t.getEndX()-5,t.getY()+t.getHeight(),t.getEndX()+5,t.getY()+t.getHeight(),t.getEndX(),t.getY()+t.getHeight()-8.66]}bind(){this.invalid||this.setup_click_event()}setup_click_event(){o.on(this.group,"focus "+this.gantt.options.popup_trigger,t=>{this.action_completed||("click"===t.type&&this.gantt.trigger_event("click",[this.task]),this.gantt.unselect_all(),this.group.classList.toggle("active"))})}show_popup(){if(this.gantt.bar_being_dragged)return;const t=n.format(this.task._start,"MMM D")+" - "+n.format(n.add(this.task._end,-1,"second"),"MMM D");this.gantt.show_popup({target_element:this.$bar,title:this.task.name,subtitle:t,task:this.task})}update_bar_position({x:t=null,width:e=null}){const s=this.$bar;if(t){if(!this.task.dependencies.map(t=>this.gantt.get_bar(t).$bar.getX()).reduce((e,s)=>t>=s,t))return void(e=null);this.update_attr(s,"x",t)}e&&e>=this.gantt.options.column_width&&this.update_attr(s,"width",e),this.update_label_position(),this.update_handle_position(),this.update_progressbar_position(),this.update_arrow_position()}date_changed(){let t=!1;const{new_start_date:e,new_end_date:s}=this.compute_start_end_date();Number(this.task._start)!==Number(e)&&(t=!0,this.task._start=e),Number(this.task._end)!==Number(s)&&(t=!0,this.task._end=s),t&&this.gantt.trigger_event("date_change",[this.task,e,n.add(s,-1,"second")])}progress_changed(){const t=this.compute_progress();this.task.progress=t,this.gantt.trigger_event("progress_change",[this.task,t])}set_action_completed(){this.action_completed=!0,setTimeout(()=>this.action_completed=!1,1e3)}compute_start_end_date(){const t=this.$bar,e=t.getX()/this.gantt.options.column_width,s=n.add(this.gantt.gantt_start,e*this.gantt.options.step,"hour"),i=t.getWidth()/this.gantt.options.column_width;return{new_start_date:s,new_end_date:n.add(s,i*this.gantt.options.step,"hour")}}compute_progress(){const t=this.$bar_progress.getWidth()/this.$bar.getWidth()*100;return parseInt(t,10)}compute_x(){const{step:t,column_width:e}=this.gantt.options,s=this.task._start,i=this.gantt.gantt_start;let a=n.diff(s,i,"hour")/t*e;if(this.gantt.view_is("Month")){a=n.diff(s,i,"day")*e/30}return a}compute_y(){return this.gantt.options.header_height+this.gantt.options.padding+this.task._index*(this.height+this.gantt.options.padding)}get_snap_position(t){let e,s,i=t;return s=this.gantt.view_is("Week")?i-(e=t%(this.gantt.options.column_width/7))+(e<this.gantt.options.column_width/14?0:this.gantt.options.column_width/7):this.gantt.view_is("Month")?i-(e=t%(this.gantt.options.column_width/30))+(e<this.gantt.options.column_width/60?0:this.gantt.options.column_width/30):i-(e=t%this.gantt.options.column_width)+(e<this.gantt.options.column_width/2?0:this.gantt.options.column_width)}update_attr(t,e,s){return s=+s,isNaN(s)||t.setAttribute(e,s),t}update_progressbar_position(){this.$bar_progress.setAttribute("x",this.$bar.getX()),this.$bar_progress.setAttribute("width",this.$bar.getWidth()*(this.task.progress/100))}update_label_position(){const t=this.$bar,e=this.group.querySelector(".bar-label");e.getBBox().width>t.getWidth()?(e.classList.add("big"),e.setAttribute("x",t.getX()+t.getWidth()+5)):(e.classList.remove("big"),e.setAttribute("x",t.getX()+t.getWidth()/2))}update_handle_position(){const t=this.$bar;this.handle_group.querySelector(".handle.left").setAttribute("x",t.getX()+1),this.handle_group.querySelector(".handle.right").setAttribute("x",t.getEndX()-9);const e=this.group.querySelector(".handle.progress");e&&e.setAttribute("points",this.get_progress_polygon_points())}update_arrow_position(){this.arrows=this.arrows||[];for(let t of this.arrows)t.update()}}class p{constructor(t,e,s){this.gantt=t,this.from_task=e,this.to_task=s,this.calculate_path(),this.draw()}calculate_path(){let t=this.from_task.$bar.getX()+this.from_task.$bar.getWidth()/2;const e=()=>this.to_task.$bar.getX()<t+this.gantt.options.padding&&t>this.from_task.$bar.getX()+this.gantt.options.padding;for(;e();)t-=10;const s=this.gantt.options.header_height+this.gantt.options.bar_height+(this.gantt.options.padding+this.gantt.options.bar_height)*this.from_task.task._index+this.gantt.options.padding,i=this.to_task.$bar.getX()-this.gantt.options.padding/2,n=this.gantt.options.header_height+this.gantt.options.bar_height/2+(this.gantt.options.padding+this.gantt.options.bar_height)*this.to_task.task._index+this.gantt.options.padding,a=this.from_task.task._index>this.to_task.task._index,o=this.gantt.options.arrow_curve,r=a?1:0,h=a?-o:o,d=a?n+this.gantt.options.arrow_curve:n-this.gantt.options.arrow_curve;if(this.path=`\n            M ${t} ${s}\n            V ${d}\n            a ${o} ${o} 0 0 ${r} ${o} ${h}\n            L ${i} ${n}\n            m -5 -5\n            l 5 5\n            l -5 5`,this.to_task.$bar.getX()<this.from_task.$bar.getX()+this.gantt.options.padding){const e=this.gantt.options.padding/2-o,a=this.to_task.$bar.getY()+this.to_task.$bar.getHeight()/2-h,d=this.to_task.$bar.getX()-this.gantt.options.padding;this.path=`\n                M ${t} ${s}\n                v ${e}\n                a ${o} ${o} 0 0 1 -${o} ${o}\n                H ${d}\n                a ${o} ${o} 0 0 ${r} -${o} ${h}\n                V ${a}\n                a ${o} ${o} 0 0 ${r} ${o} ${h}\n                L ${i} ${n}\n                m -5 -5\n                l 5 5\n                l -5 5`}}draw(){this.element=r("path",{d:this.path,"data-from":this.from_task.task.id,"data-to":this.to_task.task.id})}update(){this.calculate_path(),this.element.setAttribute("d",this.path)}}class _{constructor(t,e){this.parent=t,this.custom_html=e,this.make()}make(){this.parent.innerHTML='\n            <div class="title"></div>\n            <div class="subtitle"></div>\n            <div class="pointer"></div>\n        ',this.hide(),this.title=this.parent.querySelector(".title"),this.subtitle=this.parent.querySelector(".subtitle"),this.pointer=this.parent.querySelector(".pointer")}show(t){if(!t.target_element)throw new Error("target_element is required to show popup");t.position||(t.position="left");const e=t.target_element;if(this.custom_html){let e=this.custom_html(t.task);e+='<div class="pointer"></div>',this.parent.innerHTML=e,this.pointer=this.parent.querySelector(".pointer")}else this.title.innerHTML=t.title,this.subtitle.innerHTML=t.subtitle,this.parent.style.width=this.parent.clientWidth+"px";let s;e instanceof HTMLElement?s=e.getBoundingClientRect():e instanceof SVGElement&&(s=t.target_element.getBBox()),"left"===t.position&&(this.parent.style.left=s.x+(s.width+10)+"px",this.parent.style.top=s.y+"px",this.pointer.style.transform="rotateZ(90deg)",this.pointer.style.left="-7px",this.pointer.style.top="2px"),this.parent.style.opacity=1}hide(){this.parent.style.opacity=0}}s(2);s.d(e,"default",function(){return l});class l{constructor(t,e,s){this.setup_wrapper(t),this.setup_options(s),this.setup_tasks(e),this.change_view_mode()}setup_wrapper(t){let e,s;if("string"==typeof t&&(t=document.querySelector(t)),t instanceof HTMLElement)s=t,e=t.querySelector("svg");else{if(!(t instanceof SVGElement))throw new TypeError("Frappé Gantt only supports usage of a string CSS selector, HTML DOM element or SVG DOM element for the 'element' parameter");e=t}e?(this.$svg=e,this.$svg.classList.add("gantt")):this.$svg=r("svg",{append_to:s,class:"gantt"}),t.querySelector(".gantt-title-view")?(this.gantt_title_view=t.querySelector(".gantt-title-view"),this.gantt_title=this.gantt_title_view.querySelector(".gantt-title")):(this.gantt_title_view=document.createElement("div"),this.gantt_title_view.classList.add("gantt-title-view"),t.appendChild(this.gantt_title_view),this.gantt_title=document.createElement("div"),this.gantt_title.classList.add("gantt-title"),this.gantt_title_view.appendChild(this.gantt_title)),this.$container=document.createElement("div"),this.$container.classList.add("gantt-container"),this.$svg.parentElement.appendChild(this.$container),this.$container.appendChild(this.$svg),this.popup_wrapper=document.createElement("div"),this.popup_wrapper.classList.add("popup-wrapper"),this.$container.appendChild(this.popup_wrapper)}setup_options(t){this.options=Object.assign({},{header_height:50,column_width:30,step:24,view_modes:["Quarter Day","Half Day","Day","Week","Month","Year"],bar_height:20,bar_corner_radius:3,arrow_curve:5,padding:18,view_mode:"Day",date_format:"YYYY-MM-DD",popup_trigger:"click",custom_popup_html:null,language:"en",title_width:150},t)}setup_tasks(t){this.tasks=t.map((t,e)=>{if(t._start=n.parse(t.start),t._end=n.parse(t.end),n.diff(t._end,t._start,"year")>10&&(t.end=null),t._index=e,!t.start&&!t.end){const e=n.today();t._start=e,t._end=n.add(e,2,"day")}if(!t.start&&t.end&&(t._start=n.add(t._end,-2,"day")),t.start&&!t.end&&(t._end=n.add(t._start,2,"day")),n.get_date_values(t._end).slice(3).every(t=>0===t)&&(t._end=n.add(t._end,24,"hour")),t.start&&t.end||(t.invalid=!0),"string"==typeof t.dependencies||!t.dependencies){let e=[];t.dependencies&&(e=t.dependencies.split(",").map(t=>t.trim()).filter(t=>t)),t.dependencies=e}return t.id||(t.id=function(t){return t.name+"_"+Math.random().toString(36).slice(2,12)}(t)),t}),this.setup_dependencies()}setup_dependencies(){this.dependency_map={};for(let t of this.tasks)for(let e of t.dependencies)this.dependency_map[e]=this.dependency_map[e]||[],this.dependency_map[e].push(t.id)}refresh(t){this.setup_tasks(t),this.change_view_mode()}change_view_mode(t=this.options.view_mode){this.update_view_scale(t),this.setup_dates(),this.render(),this.trigger_event("view_change",[t])}update_view_scale(t){this.options.view_mode=t,"Day"===t?(this.options.step=24,this.options.column_width=38):"Half Day"===t?(this.options.step=12,this.options.column_width=38):"Quarter Day"===t?(this.options.step=6,this.options.column_width=38):"Week"===t?(this.options.step=168,this.options.column_width=140):"Month"===t?(this.options.step=720,this.options.column_width=120):"Year"===t&&(this.options.step=8760,this.options.column_width=120)}setup_dates(){this.setup_gantt_dates(),this.setup_date_values()}setup_gantt_dates(){this.gantt_start=this.gantt_end=null;for(let t of this.tasks)(!this.gantt_start||t._start<this.gantt_start)&&(this.gantt_start=t._start),(!this.gantt_end||t._end>this.gantt_end)&&(this.gantt_end=t._end);this.gantt_start=n.start_of(this.gantt_start,"day"),this.gantt_end=n.start_of(this.gantt_end,"day"),this.view_is(["Quarter Day","Half Day"])?(this.gantt_start=n.add(this.gantt_start,-7,"day"),this.gantt_end=n.add(this.gantt_end,7,"day")):this.view_is("Month")?(this.gantt_start=n.start_of(this.gantt_start,"year"),this.gantt_end=n.add(this.gantt_end,1,"year")):this.view_is("Year")?(this.gantt_start=n.add(this.gantt_start,-2,"year"),this.gantt_end=n.add(this.gantt_end,2,"year")):(this.gantt_start=n.add(this.gantt_start,-1,"month"),this.gantt_end=n.add(this.gantt_end,1,"month"))}setup_date_values(){this.dates=[];let t=null;for(;null===t||t<this.gantt_end;)t=t?this.view_is("Year")?n.add(t,1,"year"):this.view_is("Month")?n.add(t,1,"month"):n.add(t,this.options.step,"hour"):n.clone(this.gantt_start),this.dates.push(t)}bind_events(){this.bind_grid_click(),this.bind_bar_events()}render(){this.clear(),this.setup_layers(),this.make_title(),this.make_grid(),this.make_dates(),this.make_bars(),this.make_arrows(),this.map_arrows_on_bars(),this.set_width(),this.set_scroll_position()}setup_layers(){this.layers={};const t=["grid","date","arrow","progress","bar","details"];for(let e of t)this.layers[e]=r("g",{class:e,append_to:this.$svg})}make_grid(){this.make_grid_background(),this.make_grid_rows(),this.make_grid_header(),this.make_grid_ticks(),this.make_grid_highlights()}make_grid_background(){const t=this.dates.length*this.options.column_width,e=this.options.header_height+this.options.padding+(this.options.bar_height+this.options.padding)*this.tasks.length;r("rect",{x:0,y:0,width:t,height:e,class:"grid-background",append_to:this.layers.grid}),o.attr(this.$svg,{height:e+this.options.padding,width:"100%"}),this.gantt_title.style.height=`${e+this.options.padding}px`}make_grid_rows(){const t=r("g",{append_to:this.layers.grid}),e=r("g",{append_to:this.layers.grid}),s=this.dates.length*this.options.column_width,i=this.options.bar_height+this.options.padding;let n=this.options.header_height+this.options.padding/2;for(let a of this.tasks)r("rect",{x:0,y:n,width:s,height:i,class:"grid-row",append_to:t}),r("line",{x1:0,y1:n+i,x2:s,y2:n+i,class:"row-line",append_to:e}),n+=this.options.bar_height+this.options.padding}make_grid_header(){const t=this.dates.length*this.options.column_width,e=this.options.header_height+10;r("rect",{x:0,y:0,width:t,height:e,class:"grid-header",append_to:this.layers.grid}),this.gantt_title.style.paddingTop=e+"px"}make_grid_ticks(){let t=0,e=this.options.header_height+this.options.padding/2,s=(this.options.bar_height+this.options.padding)*this.tasks.length;for(let i of this.dates){let a="tick";this.view_is("Day")&&1===i.getDate()&&(a+=" thick"),this.view_is("Week")&&i.getDate()>=1&&i.getDate()<8&&(a+=" thick"),this.view_is("Month")&&(i.getMonth()+1)%3==0&&(a+=" thick"),r("path",{d:`M ${t} ${e} v ${s}`,class:a,append_to:this.layers.grid}),this.view_is("Month")?t+=n.get_days_in_month(i)*this.options.column_width/30:t+=this.options.column_width}}make_grid_highlights(){if(this.view_is("Day")){r("rect",{x:n.diff(n.today(),this.gantt_start,"hour")/this.options.step*this.options.column_width,y:0,width:this.options.column_width,height:(this.options.bar_height+this.options.padding)*this.tasks.length+this.options.header_height+this.options.padding/2,class:"today-highlight",append_to:this.layers.grid})}}make_dates(){for(let t of this.get_dates_to_draw())if(r("text",{x:t.lower_x,y:t.lower_y,innerHTML:t.lower_text,class:"lower-text",append_to:this.layers.date}),t.upper_text){const e=r("text",{x:t.upper_x,y:t.upper_y,innerHTML:t.upper_text,class:"upper-text",append_to:this.layers.date});e.getBBox().x2>this.layers.grid.getBBox().width&&e.remove()}}get_dates_to_draw(){let t=null;return this.dates.map((e,s)=>{const i=this.get_date_info(e,t,s);return t=e,i})}get_date_info(t,e,s){e||(e=n.add(t,1,"year"));const i={"Quarter Day_lower":n.format(t,"HH",this.options.language),"Half Day_lower":n.format(t,"HH",this.options.language),Day_lower:t.getDate()!==e.getDate()?n.format(t,"D",this.options.language):"",Week_lower:t.getMonth()!==e.getMonth()?n.format(t,"D MMM",this.options.language):n.format(t,"D",this.options.language),Month_lower:n.format(t,"MMMM",this.options.language),Year_lower:n.format(t,"YYYY",this.options.language),"Quarter Day_upper":t.getDate()!==e.getDate()?n.format(t,"D MMM",this.options.language):"","Half Day_upper":t.getDate()!==e.getDate()?t.getMonth()!==e.getMonth()?n.format(t,"D MMM",this.options.language):n.format(t,"D",this.options.language):"",Day_upper:t.getMonth()!==e.getMonth()?n.format(t,"MMMM",this.options.language):"",Week_upper:t.getMonth()!==e.getMonth()?n.format(t,"MMMM",this.options.language):"",Month_upper:t.getFullYear()!==e.getFullYear()?n.format(t,"YYYY",this.options.language):"",Year_upper:t.getFullYear()!==e.getFullYear()?n.format(t,"YYYY",this.options.language):""},a={x:s*this.options.column_width,lower_y:this.options.header_height,upper_y:this.options.header_height-25},o={"Quarter Day_lower":4*this.options.column_width/2,"Quarter Day_upper":0,"Half Day_lower":2*this.options.column_width/2,"Half Day_upper":0,Day_lower:this.options.column_width/2,Day_upper:30*this.options.column_width/2,Week_lower:0,Week_upper:4*this.options.column_width/2,Month_lower:this.options.column_width/2,Month_upper:12*this.options.column_width/2,Year_lower:this.options.column_width/2,Year_upper:30*this.options.column_width/2};return{upper_text:i[`${this.options.view_mode}_upper`],lower_text:i[`${this.options.view_mode}_lower`],upper_x:a.x+o[`${this.options.view_mode}_upper`],upper_y:a.upper_y,lower_x:a.x+o[`${this.options.view_mode}_lower`],lower_y:a.lower_y}}make_bars(){this.bars=this.tasks.map(t=>{const e=new d(this,t);return this.layers.bar.appendChild(e.group),e})}make_title(){this.gantt_title.style.width=this.options.title_width+"px",this.gantt_title.innerHTML="",this.tasks.map(t=>{const e=document.createElement("div"),s=this.options.bar_height+this.options.padding+"px";e.classList.add("title-li"),e.innerHTML=t.name,e.style.height=s,e.style.lineHeight=s,e.addEventListener("click",e=>{this.trigger_event("click",[t])}),this.gantt_title.appendChild(e)})}make_arrows(){this.arrows=[];for(let t of this.tasks){let e=[];e=t.dependencies.map(e=>{const s=this.get_task(e);if(!s)return;const i=new p(this,this.bars[s._index],this.bars[t._index]);return this.layers.arrow.appendChild(i.element),i}).filter(Boolean),this.arrows=this.arrows.concat(e)}}map_arrows_on_bars(){for(let t of this.bars)t.arrows=this.arrows.filter(e=>e.from_task.task.id===t.task.id||e.to_task.task.id===t.task.id)}set_width(){const t=this.$svg.getBoundingClientRect().width,e=this.$svg.querySelector(".grid .grid-row").getAttribute("width");t<e&&this.$svg.setAttribute("width",e)}set_scroll_position(){const t=this.$svg.parentElement;if(!t)return;const e=n.diff(this.get_oldest_starting_date(),this.gantt_start,"hour")/this.options.step*this.options.column_width-this.options.column_width;t.scrollLeft=e}bind_grid_click(){o.on(this.$svg,this.options.popup_trigger,".grid-row, .grid-header",()=>{this.unselect_all(),this.hide_popup()})}bind_bar_events(){let t=!1,e=0,s=0,i=!1,n=!1,a=null,r=[];this.bar_being_dragged=null,o.on(this.$svg,"mousedown",".bar-wrapper, .handle",(h,d)=>{const p=o.closest(".bar-wrapper",d);d.classList.contains("left")?i=!0:d.classList.contains("right")?n=!0:d.classList.contains("bar-wrapper")&&(t=!0),p.classList.add("active"),e=h.offsetX,s=h.offsetY;const _=[a=p.getAttribute("data-id"),...this.get_all_dependent_tasks(a)];r=_.map(t=>this.get_bar(t)),this.bar_being_dragged=a,r.forEach(t=>{const e=t.$bar;e.ox=e.getX(),e.oy=e.getY(),e.owidth=e.getWidth(),e.finaldx=0})}),o.on(this.$svg,"mousemove",s=>{if(!(t||i||n))return;const o=s.offsetX-e;s.offsetY;r.forEach(e=>{const s=e.$bar;s.finaldx=this.get_snap_position(o),i?a===e.task.id?e.update_bar_position({x:s.ox+s.finaldx,width:s.owidth-s.finaldx}):e.update_bar_position({x:s.ox+s.finaldx}):n?a===e.task.id&&e.update_bar_position({width:s.owidth+s.finaldx}):t&&e.update_bar_position({x:s.ox+s.finaldx})})}),document.addEventListener("mouseup",e=>{(t||i||n)&&r.forEach(t=>t.group.classList.remove("active")),t=!1,i=!1,n=!1}),o.on(this.$svg,"mouseup",t=>{this.bar_being_dragged=null,r.forEach(t=>{t.$bar.finaldx&&(t.date_changed(),t.set_action_completed())})}),this.bind_bar_progress()}bind_bar_progress(){let t=0,e=0,s=null,i=null,n=null,a=null;o.on(this.$svg,"mousedown",".handle.progress",(r,h)=>{s=!0,t=r.offsetX,e=r.offsetY;const d=o.closest(".bar-wrapper",h).getAttribute("data-id");i=this.get_bar(d),n=i.$bar_progress,a=i.$bar,n.finaldx=0,n.owidth=n.getWidth(),n.min_dx=-n.getWidth(),n.max_dx=a.getWidth()-n.getWidth()}),o.on(this.$svg,"mousemove",e=>{if(!s)return;let a=e.offsetX-t;e.offsetY;a>n.max_dx&&(a=n.max_dx),a<n.min_dx&&(a=n.min_dx);const r=i.$handle_progress;o.attr(n,"width",n.owidth+a),o.attr(r,"points",i.get_progress_polygon_points()),n.finaldx=a}),o.on(this.$svg,"mouseup",()=>{s=!1,n&&n.finaldx&&(i.progress_changed(),i.set_action_completed())})}get_all_dependent_tasks(t){let e=[],s=[t];for(;s.length;){const t=s.reduce((t,e)=>t=t.concat(this.dependency_map[e]),[]);e=e.concat(t),s=t.filter(t=>!s.includes(t))}return e.filter(Boolean)}get_snap_position(t){let e,s,i=t;return s=this.view_is("Week")?i-(e=t%(this.options.column_width/7))+(e<this.options.column_width/14?0:this.options.column_width/7):this.view_is("Month")?i-(e=t%(this.options.column_width/30))+(e<this.options.column_width/60?0:this.options.column_width/30):i-(e=t%this.options.column_width)+(e<this.options.column_width/2?0:this.options.column_width)}unselect_all(){[...this.$svg.querySelectorAll(".bar-wrapper")].forEach(t=>{t.classList.remove("active")})}view_is(t){return"string"==typeof t?this.options.view_mode===t:!!Array.isArray(t)&&t.some(t=>this.options.view_mode===t)}get_task(t){return this.tasks.find(e=>e.id===t)}get_bar(t){return this.bars.find(e=>e.task.id===t)}show_popup(t){this.popup||(this.popup=new _(this.popup_wrapper,this.options.custom_popup_html)),this.popup.show(t)}hide_popup(){this.popup&&this.popup.hide()}trigger_event(t,e){this.options["on_"+t]&&this.options["on_"+t].apply(null,e)}get_oldest_starting_date(){return this.tasks.map(t=>t._start).reduce((t,e)=>e<=t?e:t)}clear(){this.$svg.innerHTML="",this.gantt_title.innerHTML=""}}}]).default});