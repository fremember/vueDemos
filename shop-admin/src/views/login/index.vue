<template name="not-found-view">
    <section class="bg-light-50 p-30px not-found-view">
        <ul class="flex items-center justify-center">
            <li class="lex-1">
                <h2 class="text-center name">彭向阳</h2>
                <p class="flex items-center justify-center common-info">
                    <span>求职意向：前端开发工程师</span>
                    <span>合肥</span>
                    <span>16000/月</span>
                    <span>随时到岗</span>
                </p>
                <p class="flex items-center justify-center common-info">
                    <span>32岁</span>
                    <span>男</span>
                    <span>未婚</span>
                    <span>8年经验</span>
                </p>
                <p class="flex items-center justify-center common-info">
                    <span>18769567910</span>
                    <span>18769567910@163.com</span>
                </p>
            </li>
            <!-- <li class="avatar">
                <img class="w-full h-full" src="@/assets/images/avatar.jpeg" alt="" />
            </li> -->
        </ul>
        <div class="mt-16px">
            <div class="cm-title">教育背景</div>
            <ul class="flex items-center justify-between cm-sub-title">
                <li class="w-160px pr-20px">2011-09 ~ 2015-06</li>
                <li class="min-w-260px text-center pr-20px cm-name">聊城大学（山东）</li>
                <li class="flex-1 text-right cm-other">数字媒体艺术（本科）</li>
            </ul>
            <div class="cm-more">
                <p>主修课程：c语言、java、网页设计，艺术设计，影视后期制作（PS、AE、PR、3dmax），素描等</p>
            </div>
        </div>
        <div class="mt-16px">
            <div class="cm-title">技能特长</div>
            <div class="cm-more">
                <!-- <p>熟练 vue3.x 版本全家桶，在工作中多次使用；</p>
                <p>擅长 jQuery 开发，曾实现过jQuery源码；</p>
                <p>熟练使用 es6 及以上版本语法，熟练使用 TS 项目开发；</p>
                <p>熟练使用 webpack、gulp 等前端构建工具和 git 版本管理工具；</p>
                <p>熟练使用 CSS 预处理技术，包括 Sass 、Scss、Stylus 、Less；</p>
                <p>熟悉 Node 后台语言、熟悉 MySQL、MongoDB 数据库</p> -->
				<p>熟练使用各种 web 前端技术,包括 HTML(5)/CSS(3)/JS/TS 等,能快速还原 PSD 源文件,解决各类浏览器兼容性；</p>
				<p>熟练使用 vue 框架快速的构建项目,以及第三方库(mintUI、ElementUI、bootstrap、jQuery、MUI)；</p>
				<p>熟练微信小程序开发，支付宝小程序开发；</p>
				<p>熟悉webpack自动化构建工具，熟练使用 sass、less、stylus预处理器；</p>
				<p>熟练使用Git、SVN进行项目管理；</p>
				<p>掌握基本的后端开发知识：Nodejs、数据库等</p>
            </div>
        </div>
        <div class="mt-16px">
            <div class="cm-title">工作经验</div>
            <ul class="flex items-center justify-between cm-sub-title">
                <li class="w-160px pr-20px">2023-09 ~ 至今</li>
                <li class="min-w-260px text-center pr-20px cm-name">安徽兆尹信息科技股份有限公司</li>
                <li class="flex-1 text-right cm-other">前端开发工程师</li>
            </ul>
            <div class="cm-more">
                <ul>
                    <li>工作内容：负责前端项目开发和公共组件开发与维护</li>
                    <li>使用技术栈：开发使用vue2技术栈 + uni-app</li>
                    <li>参与的项目有：</li>
                    <ol>
                        <li>天津财顾项目PC端（vue2）和小程序端（uni-app开发）开发与维护；</li>
                        <li>上海农商行项目PC端（vue2）和小程序端（uni-app开发）开发与维护；</li>
                        <li>黑龙江城市银行项目PC端（vue2）和小程序端（uni-app开发）开发与维护；</li>
						<li>宁波银行管理系统重构开发（vue3）；</li>
						<li>其他项目的支援工作。</li>
                    </ol>
                </ul>
            </div>

            <ul class="flex items-center justify-between cm-sub-title">
                <li class="w-160px pr-20px">2022-01 ~ 2023-07</li>
                <li class="min-w-260px text-center pr-20px cm-name">安徽一视科技有限公司</li>
                <li class="flex-1 text-right cm-other">前端开发工程师</li>
            </ul>
            <div class="cm-more">
                <ul>
                    <li>工作内容：负责PC和APP前端实现、公共组件实现、公共方法实现</li>
                    <li>使用技术栈：开发使用vue3.0+ts技术栈，打包使用uniapp实现，数据可是化使用ECharts</li>
                    <li>参与的项目有：</li>
                    <ol>
                        <li>教师端：主要是适配pad的安卓端应用，其中包括教学和学生信息两大模块，教学模块下有：快速测试、随堂测试、国家体测、自由练习；二级模块有：任务中心、教学评测、成绩查询、项目统计分析等，实时检测体育测试项目，学生信息主要是收集和展示学生信息的列表，项目难点是人脸识别（为使用第三方插件）</li>
                        <li>管理端：pc端项目，主要模块有：项目配置、标定管理、学生信息、系统配置、日志配置等模块，主要难点：标定管理是摄像头和喇叭的IP地址配置，以及标定位置的绘制</li>
                        <li>数据大屏：室外大屏展示，主要模块有：首页数据展示，学生人脸识别，学生统计分析，增加友盟统计（主要是事件统计）</li>
                        <li>室外大屏：800和1000米小屏、立定跳远小屏，主要做该项目的测试、统计、学生排行榜的等功能，难点：一套代码基于测试位适配不同的项目，解决：硬件设备安装完成后，由技术支持直接绑定设备（id）和测试位，由服务端坐数据存储，每次初始化首页的时候需要做设备的检测，在测试过程中需要做测试位的绑定</li>
                        <li>区级管理平台：主要是数据可是化，对外展示使用</li>
                    </ol>
                </ul>
            </div>

            <ul class="flex items-center justify-between cm-sub-title">
                <li class="w-160px pr-20px">2020-12 ~ 2022-01</li>
                <li class="min-w-260px text-center pr-20px cm-name">合肥方了个田教育科技有限公司</li>
                <li class="flex-1 text-right cm-other">前端开发工程师</li>
            </ul>
            <div class="cm-more">
                <ul>
                    <li>工作内容：负责PC端和小程序端的实现</li>
                    <li>使用技术栈：PC：开发使用vue3.0+ts技术栈，小程序：微信小程序</li>
                    <li>参与的项目有：</li>
                    <ol>
                        <li>方田教育小程序：主要模块：课程列表、订单中心、个人中心；主要作用：给学生购买课程、选课、转班、调班、做作业使用</li>
                        <li>方田教育PC端：主要模块：课程列表、选课中心、交流中心、关于我们、客户端下载等，主要作用：给PC学生购买课程、选课、转班、调班、做作业使用</li>
                        <li>PC端方田直播课堂：主要是基于声网的RTM、RTC、黑板的API做的二次开发，主要功能有：黑板、答题互动、学生列表、学生上下台发言操作等模块</li>
                        <li>校长报表：该项目主要实现数据统计，方便校区校长做老师续保率和报名学生学习情况分析使用(vue3.0 + ECharts + ant-design-vue)</li>
                    </ol>
                </ul>
            </div>

            <ul class="flex items-center justify-between cm-sub-title">
                <li class="w-160px pr-20px">2018-05 ~ 2020-12</li>
                <li class="min-w-260px text-center pr-20px cm-name">合肥达链科技有限公司</li>
                <li class="flex-1 text-right cm-other">前端开发工程师</li>
            </ul>
            <div class="cm-more">
                <ul>
                    <li>工作内容：负责PC端和APP前端实现</li>
                    <li>使用技术栈：vue2.0技术栈，jQuery</li>
                    <li>参与的项目有：</li>
                    <ol>
                        <li>官网和管理系统的开发和维护(vue)；</li>
                        <li>BCB钱包手机端H5页面开发与维护（jQuery）;</li>
                        <li>游戏管理后台前端页面的开发与维护(vue+elementUI)；</li>
                        <li>移动端棋牌类游戏、骰子类游戏开发与维护(vue)；</li>
                        <li>交易所移动端、PC端项目开发与维护(vue);</li>
                    </ol>
                </ul>
            </div>

            <ul class="flex items-center justify-between cm-sub-title">
                <li class="w-160px pr-20px">2015-07 ~ 2018-05</li>
                <li class="min-w-260px text-center pr-20px cm-name">北京学众信息技术有限公司</li>
                <li class="flex-1 text-right cm-other">前端开发工程师</li>
            </ul>
            <div class="cm-more">
                <ul>
                    <li>工作内容：负责APP混合开发，做前端技术选型（vue），解决安卓和ios的兼容适配问题，解决与原生的交互问题；</li>
                    <li>使用技术栈：vue2.0技术栈，jQuery</li>
                    <li>参与的项目有：学众教育APP和官网；</li>
                </ul>
            </div>
        </div>

        <div class="mt-16px">
            <div class="cm-title">开源、博客</div>
            <div class="cm-more">
                <p>1、基于 element-ui 组建的二次封装：https://github.com/fremember/vueDemos/tree/master/v-elemplus</p>
                <p>2、商城管理端项目： https://github.com/fremember/vueDemos/tree/master/shop-admin</p>
                <p>3、vue3+ts项目搭建教程： https://github.com/fremember/vueDemos/tree/master/vue-test</p>
                <p>4、csdn博客文章：https://mp.csdn.net/mp_blog/manage/article</p>
            </div>
        </div>

        <div class="mt-16px">
            <div class="cm-title">未来规划</div>
            <div class="cm-more">
                <p>1、继续深根前端技术，阅读框架源码</p>
                <p>2、工作之余，写一些插件以备工作需要</p>
                <p>3、工作之余，完善博客内容，继续分享更多的前端知识，记录自己的学习过程</p>
            </div>
        </div>
    </section>
</template>

<script setup>
    document.addEventListener('click', function () {
        window.print()
    })
</script>

<style scoped>
    .not-found-view {
        @apply mx-auto w-820px;
    }
    .not-found-view .avatar {
        @apply w-106px h-106px;
    }
    .name {
        @apply h-36px mb-9px;
        font-size: 22px;
        color: #222;
        letter-spacing: 2px;
    }
    .common-info {
        @apply mt-9px;
    }
    .common-info span {
        @apply h-14px px-10px;
        line-height: 14px;
        font-size: 13px;
        color: #333;
    }
    .common-info span:not(:last-child) {
        border-right: 1px solid #ccc;
    }
    .cm-title {
        @apply h-36px;
        line-height: 36px;
        font-size: 16px;
        color: #284967;
        border-bottom: 1px solid #284967;
    }
    .cm-sub-title {
        @apply pt-16px;
    }
    .cm-sub-title li {
        @apply font-bold;
        font-size: 13px;
        color: #333;
    }
    .cm-more {
        @apply mt-7px;
        color: #555;
    }
    .cm-more p, li {
        line-height: 22px;
        font-size: 13px;
    }
    .cm-more ul > li {
        @apply pl-20px relative;
    }
    .cm-more ul > li:before {
        @apply absolute top-7px  left-7px text-center w-6px h-6px rounded;
        content: '';
        background: #666;
    }
    .cm-more ol > li {
        @apply pl-40px;
        list-style-type: decimal;
        list-style-position: inside;
    }
</style>