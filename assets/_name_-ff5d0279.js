import{d,u as _,a as k,y as f,r as x,o as a,c as r,e,t as n,f as t,F as b,x as h,v,b as y,z as N,A as C}from"./app-9785f1b5.js";import{u as V}from"./user-59cc8e10.js";const g=e("div",{"text-4xl":""},[e("div",{"i-carbon-pedestrian":"","inline-block":""})],-1),w={"text-sm":"","opacity-75":""},B={key:0,"mt-4":"","text-sm":""},L={"opacity-75":""},S=d({__name:"[name]",props:{name:null},setup(l){const c=l,m=_(),i=V(),{t:o}=k();return f(()=>{i.setNewName(c.name)}),(R,u)=>{const p=x("RouterLink");return a(),r("div",null,[g,e("p",null,n(t(o)("intro.hi",{name:c.name})),1),e("p",w,[e("em",null,n(t(o)("intro.dynamic-route")),1)]),t(i).otherNames.length?(a(),r("p",B,[e("span",L,n(t(o)("intro.aka"))+":",1),e("ul",null,[(a(!0),r(b,null,h(t(i).otherNames,s=>(a(),r("li",{key:s},[y(p,{to:`/hi/${s}`,replace:""},{default:N(()=>[C(n(s),1)]),_:2},1032,["to"])]))),128))])])):v("",!0),e("div",null,[e("button",{m:"3 t6","text-sm":"",btn:"",onClick:u[0]||(u[0]=s=>t(m).back())},n(t(o)("button.back")),1)])])}}});export{S as default};