 drag-guide
 a drag-guide component 一个基于vue开发的可拖拽宫格插件，兼容多端.
#### 拖拽改变方式按照安卓原生模块改变的 进行开发.



####  h5 demo版本可直接使用live-serve进行预览
1.安装 npm install -g live-server
2.使用  在命令行中输入 live-server
3.如果同时启动多个项目，为防止冲突，可以分配不同的端口号
4. live-server --port=8282
5. live-server --port=8585



 后续会提供图片可进行查看.

#### 默认提供vue版本 以及 uni-app版本 经尝试可以适应于各端，Android不兼容4.4以下版本.如有问题请联系qq.



#### 使用说明：


#### 引入后只需要在插件页修改 具体要使用的宫格数row，默认为九宫格
##### row的数值 实现不同的 宫格


##### 图片资源可自行在static/all            默认的模块图片
#####               static/all/extra       额外的模块图片


##### imgHeight 以及 imgWidth 定义宫格内每一个图片的大小,请记得计算row宫格数，避免图片大小超出造成样式崩坏