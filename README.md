###    drag-guide
###  a drag-guide component 一个基于vue开发的可拖拽宫格插件，兼容多端.
<p>拖拽改变方式按照安卓原生模块改变的样式 进行开发.</p>

<br>
<p> h5 demo版本可直接使用live-serve进行预览</p>
<br>
<ul>
<li>安装 npm install -g live-server</li>
<li>使用  在命令行中输入 live-server</li>
<li>如果同时启动多个项目，为防止冲突，可以分配不同的端口号</li>
<li> live-server --port=8282</li>
<li>live-server --port=8585</li>
</ul>

<br>

####  实例图片
<br>
![image](https://github.com/bloodskyfirst/drag-guide/blob/master/demo.gif)
<br>

####  插件体验网址
<br>
[体验]: https://wolfkoko.gitee.io/drag-guide

<h3>默认提供vue版本 以及 uni-app版本 经尝试可以适应于各端，Android不兼容4.4以下版本.如有问题请联系qq.</h3>

<br>

##### 默认使用说明：

<br>
<p> dragGuide 组件说明</p>
<ul>
<li> 引入后只需要在插件页修改 具体要使用的宫格数row，默认为九宫格</li> 
<li> row的数值 实现不同的 宫格</li> 
<li> imgHeight 以及 imgWidth 定义宫格内每一个图片的大小,请记得计算row宫格数，避免图片大小超出造成样式崩坏 </li> 
<li> scrollW,scrollH 定义该滚动框的长度，默认该滚动框宽高自适应.(单位：String)</li> 
<li> <strong>使用vue的情况，请看情况是否需要使用 路由 以及 vuex ,可查看注释区域说明</strong></li> 
</ul>
<br>
<p> addModule 组件说明</p>
<h6> addModule 按自身需求引入.里面可直接使用.无需任何参数 (vue使用的情况请按需要是否使用路由/ vuex等) </h6>
<br>
<p> 图片资源说明</p>
<li> static/all            默认的模块图片</li> 
<li> static/all/extra      额外的模块图片</li>
<li>请按需修改</li>

