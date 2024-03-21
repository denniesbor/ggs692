/**
 * @license
 * Cesium - https://github.com/CesiumGS/cesium
 * Version 1.115
 *
 * Copyright 2011-2022 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/CesiumGS/cesium/blob/main/LICENSE.md for full licensing details.
 */

import{a as ue}from"./chunk-KZVVSHMS.js";import{b as he,c as pe,d as ne}from"./chunk-3G4OCZJT.js";import{a as te}from"./chunk-TLYHKSDJ.js";import{a as p,b as ee,c as w,d as Se}from"./chunk-PYVDHCDQ.js";import{a as Y}from"./chunk-JMWWNZHX.js";import{a as le}from"./chunk-DNO4OWAM.js";import{a as K}from"./chunk-Z3SYNMQT.js";import{b}from"./chunk-4KGDZUZQ.js";import{c as We,d as Ge,e as D}from"./chunk-F3TINEFX.js";var Oe=We((st,de)=>{"use strict";de.exports=xe;de.exports.default=xe;function xe(e,n,t){t=t||2;var u=n&&n.length,r=u?n[0]*t:e.length,i=Ce(e,0,r,t,!0),s=[];if(!i||i.next===i.prev)return s;var o,f,c,l,y,v,g;if(u&&(i=ke(e,n,i,t)),e.length>80*t){o=c=e[0],f=l=e[1];for(var h=t;h<r;h+=t)y=e[h],v=e[h+1],y<o&&(o=y),v<f&&(f=v),y>c&&(c=y),v>l&&(l=v);g=Math.max(c-o,l-f),g=g!==0?32767/g:0}return re(i,s,t,o,f,g,0),s}function Ce(e,n,t,u,r){var i,s;if(r===ge(e,n,t,u)>0)for(i=n;i<t;i+=u)s=Ae(i,e[i],e[i+1],s);else for(i=t-u;i>=n;i-=u)s=Ae(i,e[i],e[i+1],s);return s&&ae(s,s.next)&&(oe(s),s=s.next),s}function N(e,n){if(!e)return e;n||(n=e);var t=e,u;do if(u=!1,!t.steiner&&(ae(t,t.next)||A(t.prev,t,t.next)===0)){if(oe(t),t=n=t.prev,t===t.next)break;u=!0}else t=t.next;while(u||t!==n);return n}function re(e,n,t,u,r,i,s){if(e){!s&&i&&qe(e,u,r,i);for(var o=e,f,c;e.prev!==e.next;){if(f=e.prev,c=e.next,i?Ie(e,u,r,i):$e(e)){n.push(f.i/t|0),n.push(e.i/t|0),n.push(c.i/t|0),oe(e),e=c.next,o=c.next;continue}if(e=c,e===o){s?s===1?(e=He(N(e),n,t),re(e,n,t,u,r,i,2)):s===2&&Ne(e,n,t,u,r,i):re(N(e),n,t,u,r,i,1);break}}}}function $e(e){var n=e.prev,t=e,u=e.next;if(A(n,t,u)>=0)return!1;for(var r=n.x,i=t.x,s=u.x,o=n.y,f=t.y,c=u.y,l=r<i?r<s?r:s:i<s?i:s,y=o<f?o<c?o:c:f<c?f:c,v=r>i?r>s?r:s:i>s?i:s,g=o>f?o>c?o:c:f>c?f:c,h=u.next;h!==n;){if(h.x>=l&&h.x<=v&&h.y>=y&&h.y<=g&&V(r,o,i,f,s,c,h.x,h.y)&&A(h.prev,h,h.next)>=0)return!1;h=h.next}return!0}function Ie(e,n,t,u){var r=e.prev,i=e,s=e.next;if(A(r,i,s)>=0)return!1;for(var o=r.x,f=i.x,c=s.x,l=r.y,y=i.y,v=s.y,g=o<f?o<c?o:c:f<c?f:c,h=l<y?l<v?l:v:y<v?y:v,T=o>f?o>c?o:c:f>c?f:c,L=l>y?l>v?l:v:y>v?y:v,z=ye(g,h,n,t,u),F=ye(T,L,n,t,u),x=e.prevZ,a=e.nextZ;x&&x.z>=z&&a&&a.z<=F;){if(x.x>=g&&x.x<=T&&x.y>=h&&x.y<=L&&x!==r&&x!==s&&V(o,l,f,y,c,v,x.x,x.y)&&A(x.prev,x,x.next)>=0||(x=x.prevZ,a.x>=g&&a.x<=T&&a.y>=h&&a.y<=L&&a!==r&&a!==s&&V(o,l,f,y,c,v,a.x,a.y)&&A(a.prev,a,a.next)>=0))return!1;a=a.nextZ}for(;x&&x.z>=z;){if(x.x>=g&&x.x<=T&&x.y>=h&&x.y<=L&&x!==r&&x!==s&&V(o,l,f,y,c,v,x.x,x.y)&&A(x.prev,x,x.next)>=0)return!1;x=x.prevZ}for(;a&&a.z<=F;){if(a.x>=g&&a.x<=T&&a.y>=h&&a.y<=L&&a!==r&&a!==s&&V(o,l,f,y,c,v,a.x,a.y)&&A(a.prev,a,a.next)>=0)return!1;a=a.nextZ}return!0}function He(e,n,t){var u=e;do{var r=u.prev,i=u.next.next;!ae(r,i)&&be(r,u,u.next,i)&&ie(r,i)&&ie(i,r)&&(n.push(r.i/t|0),n.push(u.i/t|0),n.push(i.i/t|0),oe(u),oe(u.next),u=e=i),u=u.next}while(u!==e);return N(u)}function Ne(e,n,t,u,r,i){var s=e;do{for(var o=s.next.next;o!==s.prev;){if(s.i!==o.i&&je(s,o)){var f=Ee(s,o);s=N(s,s.next),f=N(f,f.next),re(s,n,t,u,r,i,0),re(f,n,t,u,r,i,0);return}o=o.next}s=s.next}while(s!==e)}function ke(e,n,t,u){var r=[],i,s,o,f,c;for(i=0,s=n.length;i<s;i++)o=n[i]*u,f=i<s-1?n[i+1]*u:e.length,c=Ce(e,o,f,u,!1),c===c.next&&(c.steiner=!0),r.push(Qe(c));for(r.sort(Ue),i=0;i<r.length;i++)t=_e(r[i],t);return t}function Ue(e,n){return e.x-n.x}function _e(e,n){var t=Ke(e,n);if(!t)return n;var u=Ee(t,e);return N(u,u.next),N(t,t.next)}function Ke(e,n){var t=n,u=e.x,r=e.y,i=-1/0,s;do{if(r<=t.y&&r>=t.next.y&&t.next.y!==t.y){var o=t.x+(r-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(o<=u&&o>i&&(i=o,s=t.x<t.next.x?t:t.next,o===u))return s}t=t.next}while(t!==n);if(!s)return null;var f=s,c=s.x,l=s.y,y=1/0,v;t=s;do u>=t.x&&t.x>=c&&u!==t.x&&V(r<l?u:i,r,c,l,r<l?i:u,r,t.x,t.y)&&(v=Math.abs(r-t.y)/(u-t.x),ie(t,e)&&(v<y||v===y&&(t.x>s.x||t.x===s.x&&Ve(s,t)))&&(s=t,y=v)),t=t.next;while(t!==f);return s}function Ve(e,n){return A(e.prev,e,n.prev)<0&&A(n.next,e,e.next)<0}function qe(e,n,t,u){var r=e;do r.z===0&&(r.z=ye(r.x,r.y,n,t,u)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==e);r.prevZ.nextZ=null,r.prevZ=null,Je(r)}function Je(e){var n,t,u,r,i,s,o,f,c=1;do{for(t=e,e=null,i=null,s=0;t;){for(s++,u=t,o=0,n=0;n<c&&(o++,u=u.nextZ,!!u);n++);for(f=c;o>0||f>0&&u;)o!==0&&(f===0||!u||t.z<=u.z)?(r=t,t=t.nextZ,o--):(r=u,u=u.nextZ,f--),i?i.nextZ=r:e=r,r.prevZ=i,i=r;t=u}i.nextZ=null,c*=2}while(s>1);return e}function ye(e,n,t,u,r){return e=(e-t)*r|0,n=(n-u)*r|0,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,e|n<<1}function Qe(e){var n=e,t=e;do(n.x<t.x||n.x===t.x&&n.y<t.y)&&(t=n),n=n.next;while(n!==e);return t}function V(e,n,t,u,r,i,s,o){return(r-s)*(n-o)>=(e-s)*(i-o)&&(e-s)*(u-o)>=(t-s)*(n-o)&&(t-s)*(i-o)>=(r-s)*(u-o)}function je(e,n){return e.next.i!==n.i&&e.prev.i!==n.i&&!Xe(e,n)&&(ie(e,n)&&ie(n,e)&&Ye(e,n)&&(A(e.prev,e,n.prev)||A(e,n.prev,n))||ae(e,n)&&A(e.prev,e,e.next)>0&&A(n.prev,n,n.next)>0)}function A(e,n,t){return(n.y-e.y)*(t.x-n.x)-(n.x-e.x)*(t.y-n.y)}function ae(e,n){return e.x===n.x&&e.y===n.y}function be(e,n,t,u){var r=fe(A(e,n,t)),i=fe(A(e,n,u)),s=fe(A(t,u,e)),o=fe(A(t,u,n));return!!(r!==i&&s!==o||r===0&&ce(e,t,n)||i===0&&ce(e,u,n)||s===0&&ce(t,e,u)||o===0&&ce(t,n,u))}function ce(e,n,t){return n.x<=Math.max(e.x,t.x)&&n.x>=Math.min(e.x,t.x)&&n.y<=Math.max(e.y,t.y)&&n.y>=Math.min(e.y,t.y)}function fe(e){return e>0?1:e<0?-1:0}function Xe(e,n){var t=e;do{if(t.i!==e.i&&t.next.i!==e.i&&t.i!==n.i&&t.next.i!==n.i&&be(t,t.next,e,n))return!0;t=t.next}while(t!==e);return!1}function ie(e,n){return A(e.prev,e,e.next)<0?A(e,n,e.next)>=0&&A(e,e.prev,n)>=0:A(e,n,e.prev)<0||A(e,e.next,n)<0}function Ye(e,n){var t=e,u=!1,r=(e.x+n.x)/2,i=(e.y+n.y)/2;do t.y>i!=t.next.y>i&&t.next.y!==t.y&&r<(t.next.x-t.x)*(i-t.y)/(t.next.y-t.y)+t.x&&(u=!u),t=t.next;while(t!==e);return u}function Ee(e,n){var t=new me(e.i,e.x,e.y),u=new me(n.i,n.x,n.y),r=e.next,i=n.prev;return e.next=n,n.prev=e,t.next=r,r.prev=t,u.next=t,t.prev=u,i.next=u,u.prev=i,u}function Ae(e,n,t,u){var r=new me(e,n,t);return u?(r.next=u.next,r.prev=u,u.next.prev=r,u.next=r):(r.prev=r,r.next=r),r}function oe(e){e.next.prev=e.prev,e.prev.next=e.next,e.prevZ&&(e.prevZ.nextZ=e.nextZ),e.nextZ&&(e.nextZ.prevZ=e.prevZ)}function me(e,n,t){this.i=e,this.x=n,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}xe.deviation=function(e,n,t,u){var r=n&&n.length,i=r?n[0]*t:e.length,s=Math.abs(ge(e,0,i,t));if(r)for(var o=0,f=n.length;o<f;o++){var c=n[o]*t,l=o<f-1?n[o+1]*t:e.length;s-=Math.abs(ge(e,c,l,t))}var y=0;for(o=0;o<u.length;o+=3){var v=u[o]*t,g=u[o+1]*t,h=u[o+2]*t;y+=Math.abs((e[v]-e[h])*(e[g+1]-e[v+1])-(e[v]-e[g])*(e[h+1]-e[v+1]))}return s===0&&y===0?0:Math.abs((y-s)/s)};function ge(e,n,t,u){for(var r=0,i=n,s=t-u;i<t;i+=u)r+=(e[s]-e[i])*(e[i+1]+e[s+1]),s=i;return r}xe.flatten=function(e){for(var n=e[0][0].length,t={vertices:[],holes:[],dimensions:n},u=0,r=0;r<e.length;r++){for(var i=0;i<e[r].length;i++)for(var s=0;s<n;s++)t.vertices.push(e[r][i][s]);r>0&&(u+=e[r-1].length,t.holes.push(u))}return t}});var se={CLOCKWISE:le.CW,COUNTER_CLOCKWISE:le.CCW};se.validate=function(e){return e===se.CLOCKWISE||e===se.COUNTER_CLOCKWISE};var ve=Object.freeze(se);var Le=Ge(Oe(),1);var et=new p,tt=new p,B={};B.computeArea2D=function(e){b.defined("positions",e),b.typeOf.number.greaterThanOrEquals("positions.length",e.length,3);let n=e.length,t=0;for(let u=n-1,r=0;r<n;u=r++){let i=e[u],s=e[r];t+=i.x*s.y-s.x*i.y}return t*.5};B.computeWindingOrder2D=function(e){return B.computeArea2D(e)>0?ve.COUNTER_CLOCKWISE:ve.CLOCKWISE};B.triangulate=function(e,n){b.defined("positions",e);let t=w.packArray(e);return(0,Le.default)(t,n,2)};var De=new p,Fe=new p,Pe=new p,Te=new p,Me=new p,Ze=new p,R=new p,Re=new w,ze=new w,Be=new w,q=new w;B.computeSubdivision=function(e,n,t,u,r){r=K(r,Y.RADIANS_PER_DEGREE);let i=D(u);b.typeOf.object("ellipsoid",e),b.defined("positions",n),b.defined("indices",t),b.typeOf.number.greaterThanOrEquals("indices.length",t.length,3),b.typeOf.number.equals("indices.length % 3","0",t.length%3,0),b.typeOf.number.greaterThan("granularity",r,0);let s=t.slice(0),o,f=n.length,c=new Array(f*3),l=new Array(f*2),y=0,v=0;for(o=0;o<f;o++){let x=n[o];if(c[y++]=x.x,c[y++]=x.y,c[y++]=x.z,i){let a=u[o];l[v++]=a.x,l[v++]=a.y}}let g=[],h={},T=e.maximumRadius,L=Y.chordLength(r,T),z=L*L;for(;s.length>0;){let x=s.pop(),a=s.pop(),m=s.pop(),C=p.fromArray(c,m*3,De),E=p.fromArray(c,a*3,Fe),J=p.fromArray(c,x*3,Pe),Q,j,W;i&&(Q=w.fromArray(l,m*2,Re),j=w.fromArray(l,a*2,ze),W=w.fromArray(l,x*2,Be));let k=p.multiplyByScalar(p.normalize(C,Te),T,Te),U=p.multiplyByScalar(p.normalize(E,Me),T,Me),G=p.multiplyByScalar(p.normalize(J,Ze),T,Ze),$=p.magnitudeSquared(p.subtract(k,U,R)),I=p.magnitudeSquared(p.subtract(U,G,R)),X=p.magnitudeSquared(p.subtract(G,k,R)),H=Math.max($,I,X),M,S,d;H>z?$===H?(M=`${Math.min(m,a)} ${Math.max(m,a)}`,o=h[M],D(o)||(S=p.add(C,E,R),p.multiplyByScalar(S,.5,S),c.push(S.x,S.y,S.z),o=c.length/3-1,h[M]=o,i&&(d=w.add(Q,j,q),w.multiplyByScalar(d,.5,d),l.push(d.x,d.y))),s.push(m,o,x),s.push(o,a,x)):I===H?(M=`${Math.min(a,x)} ${Math.max(a,x)}`,o=h[M],D(o)||(S=p.add(E,J,R),p.multiplyByScalar(S,.5,S),c.push(S.x,S.y,S.z),o=c.length/3-1,h[M]=o,i&&(d=w.add(j,W,q),w.multiplyByScalar(d,.5,d),l.push(d.x,d.y))),s.push(a,o,m),s.push(o,x,m)):X===H&&(M=`${Math.min(x,m)} ${Math.max(x,m)}`,o=h[M],D(o)||(S=p.add(J,C,R),p.multiplyByScalar(S,.5,S),c.push(S.x,S.y,S.z),o=c.length/3-1,h[M]=o,i&&(d=w.add(W,Q,q),w.multiplyByScalar(d,.5,d),l.push(d.x,d.y))),s.push(x,o,a),s.push(o,m,a)):(g.push(m),g.push(a),g.push(x))}let F={attributes:{position:new ne({componentDatatype:te.DOUBLE,componentsPerAttribute:3,values:c})},indices:g,primitiveType:he.TRIANGLES};return i&&(F.attributes.st=new ne({componentDatatype:te.FLOAT,componentsPerAttribute:2,values:l})),new pe(F)};var nt=new ee,rt=new ee,it=new ee,we=new ee;B.computeRhumbLineSubdivision=function(e,n,t,u,r){r=K(r,Y.RADIANS_PER_DEGREE);let i=D(u);b.typeOf.object("ellipsoid",e),b.defined("positions",n),b.defined("indices",t),b.typeOf.number.greaterThanOrEquals("indices.length",t.length,3),b.typeOf.number.equals("indices.length % 3","0",t.length%3,0),b.typeOf.number.greaterThan("granularity",r,0);let s=t.slice(0),o,f=n.length,c=new Array(f*3),l=new Array(f*2),y=0,v=0;for(o=0;o<f;o++){let m=n[o];if(c[y++]=m.x,c[y++]=m.y,c[y++]=m.z,i){let C=u[o];l[v++]=C.x,l[v++]=C.y}}let g=[],h={},T=e.maximumRadius,L=Y.chordLength(r,T),z=new ue(void 0,void 0,e),F=new ue(void 0,void 0,e),x=new ue(void 0,void 0,e);for(;s.length>0;){let m=s.pop(),C=s.pop(),E=s.pop(),J=p.fromArray(c,E*3,De),Q=p.fromArray(c,C*3,Fe),j=p.fromArray(c,m*3,Pe),W,k,U;i&&(W=w.fromArray(l,E*2,Re),k=w.fromArray(l,C*2,ze),U=w.fromArray(l,m*2,Be));let G=e.cartesianToCartographic(J,nt),$=e.cartesianToCartographic(Q,rt),I=e.cartesianToCartographic(j,it);z.setEndPoints(G,$);let X=z.surfaceDistance;F.setEndPoints($,I);let H=F.surfaceDistance;x.setEndPoints(I,G);let M=x.surfaceDistance,S=Math.max(X,H,M),d,P,_,Z,O;S>L?X===S?(d=`${Math.min(E,C)} ${Math.max(E,C)}`,o=h[d],D(o)||(P=z.interpolateUsingFraction(.5,we),_=(G.height+$.height)*.5,Z=p.fromRadians(P.longitude,P.latitude,_,e,R),c.push(Z.x,Z.y,Z.z),o=c.length/3-1,h[d]=o,i&&(O=w.add(W,k,q),w.multiplyByScalar(O,.5,O),l.push(O.x,O.y))),s.push(E,o,m),s.push(o,C,m)):H===S?(d=`${Math.min(C,m)} ${Math.max(C,m)}`,o=h[d],D(o)||(P=F.interpolateUsingFraction(.5,we),_=($.height+I.height)*.5,Z=p.fromRadians(P.longitude,P.latitude,_,e,R),c.push(Z.x,Z.y,Z.z),o=c.length/3-1,h[d]=o,i&&(O=w.add(k,U,q),w.multiplyByScalar(O,.5,O),l.push(O.x,O.y))),s.push(C,o,E),s.push(o,m,E)):M===S&&(d=`${Math.min(m,E)} ${Math.max(m,E)}`,o=h[d],D(o)||(P=x.interpolateUsingFraction(.5,we),_=(I.height+G.height)*.5,Z=p.fromRadians(P.longitude,P.latitude,_,e,R),c.push(Z.x,Z.y,Z.z),o=c.length/3-1,h[d]=o,i&&(O=w.add(U,W,q),w.multiplyByScalar(O,.5,O),l.push(O.x,O.y))),s.push(m,o,C),s.push(o,E,C)):(g.push(E),g.push(C),g.push(m))}let a={attributes:{position:new ne({componentDatatype:te.DOUBLE,componentsPerAttribute:3,values:c})},indices:g,primitiveType:he.TRIANGLES};return i&&(a.attributes.st=new ne({componentDatatype:te.FLOAT,componentsPerAttribute:2,values:l})),new pe(a)};B.scaleToGeodeticHeight=function(e,n,t,u){t=K(t,Se.WGS84);let r=et,i=tt;if(n=K(n,0),u=K(u,!0),D(e)){let s=e.length;for(let o=0;o<s;o+=3)p.fromArray(e,o,i),u&&(i=t.scaleToGeodeticSurface(i,i)),n!==0&&(r=t.geodeticSurfaceNormal(i,r),p.multiplyByScalar(r,n,r),p.add(i,r,i)),e[o]=i.x,e[o+1]=i.y,e[o+2]=i.z}return e};var At=B;export{ve as a,At as b};
