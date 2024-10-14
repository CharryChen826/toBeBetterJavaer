import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as t,e as o}from"./app-BJI4IlqI.js";const r={},i=o(`<h2 id="前置环境的准备" tabindex="-1"><a class="header-anchor" href="#前置环境的准备"><span>前置环境的准备</span></a></h2><ul><li>一台可以开机的电脑</li><li>JDK 8</li><li>Maven</li><li>Intellij IDEA（非必须，可用 Eclipse）</li><li>Visual Studio Code（非必须，可用 hbuilderx）</li><li>MySQL</li><li>Redis（非必须，会报错，但不影响跑）</li><li>OSS（非必须，上传图片时报错，但不影响跑）</li></ul><p>对，编程喵 🐱（Spring Boot+Vue 的前后端分离项目）要想在本地跑起来，需要这 8 个前置环境。</p><p>第一个条件，一台可以开机的电脑，显然我相信大家都是有的。不然怎么学编程是吧？瞧我这废话真多。</p><p>这篇先以 macOS 为例，Windows 的话，我另开一篇。下图是我的主力机 iMac 的配置。</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-d98d5c3c-24a9-4d69-a11d-0b323f0c6bb5.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>第二个条件，JDK 8，可以通过 <a href="https://brew.sh/index_zh-cn" target="_blank" rel="noopener noreferrer">homebrew</a>（macOS 软件包管理器）安装，非常方面，然后用 <a href="https://www.jenv.be/" target="_blank" rel="noopener noreferrer">jenv</a> 来管理 Java 版本。</p><p>执行 <code>brew -v</code> 可以查看 homebrew 版本</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-ac4ffa12-4b90-459b-a548-bd91e105f531.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>执行 <code>brew install java</code> 可以安装最新版 JDK。</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-c80146c8-24f0-40ee-ab6b-696bc4a6589d.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>执行 <code>brew install adoptopenjdk/openjdk/adoptopenjdk8 --cask</code> 可以安装最 JDK 8。</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-6a46e999-b309-4adc-9567-ade05f55f174.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>执行 <code>ls /Library/Java/JavaVirtualMachines/</code> 可以查看本机所有安装过的 JDK 包。</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-7b8ee4ad-db7d-4cc6-a9bc-323083eb319c.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>通过 <code>jenv add adoptopenjdk-8.jdk/Contents/Home/</code> 可以将安装过的 JDK 加入到 jenv 版本库中。</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-f34a88d5-6c50-4eec-8343-77518aaf9a4f.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>执行 <code>jenv global openjdk64-1.8.0.292</code> 可以指定当前的 JDK 版本。再执行 <code>jenv versions</code> 可以查看默认使用的 JDK 版本（带<code>*</code>的）</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-05d7d17f-d214-40c7-98d8-e67083ed38fb.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>执行 <code>java -version</code> 可以查看当前 JDK 版本</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-a1bb43ca-b3b8-4681-b290-6ddbdf2bc1fc.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>第三个条件，Maven，可以直接通过 <code>brew install maven</code> 来完成安装。通过 <code>mvn -v</code> 来查看版本。</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-9b4dab03-c720-4f23-8a1e-90fa55130c73.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>为了加快项目依赖包的下载速度，我们需要配置 Maven 的国内镜像源。</p><p>找到 Maven Home（<code>/Users/yourpath/save/apache-maven-3.8.3</code>），复制一份 settings.xml。</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-7743fabc-1a49-44a6-8862-1f31c94b0633.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>到 <code>/Users/you/.m2</code> 路径下。</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-31580aab-9990-4553-9557-41dbd748f361.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>在 mirrors 节点下添加阿里云镜像地址，并保存。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;mirror&gt;</span></span>
<span class="line"><span>  &lt;id&gt;alimaven&lt;/id&gt;</span></span>
<span class="line"><span>  &lt;name&gt;aliyun maven&lt;/name&gt;</span></span>
<span class="line"><span>&lt;url&gt;http://maven.aliyun.com/nexus/content/groups/public/&lt;/url&gt;</span></span>
<span class="line"><span>  &lt;mirrorOf&gt;central&lt;/mirrorOf&gt;</span></span>
<span class="line"><span>&lt;/mirror&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第四个条件，Intellij IDEA，Java 后端开发必备神器，可以安装社区版，也可以安装旗舰版。</p><blockquote><p><a href="https://www.jetbrains.com/zh-cn/idea/download/#section=mac" target="_blank" rel="noopener noreferrer">https://www.jetbrains.com/zh-cn/idea/download/#section=mac</a></p></blockquote><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-556c70fd-c3bc-46af-9d20-d52783ecc1f5.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>第五个条件，Visual Studio Code，在编写前端代码（vue、JavaScript、css 等）时，比 Intellij IDEA 更值得信赖。</p><blockquote><p><a href="https://code.visualstudio.com/" target="_blank" rel="noopener noreferrer">https://code.visualstudio.com/</a></p></blockquote><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-8b2d3562-09ec-4a93-b40d-9a06816aa46c.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>第六个条件，MySQL，可以通过 <a href="https://dev.mysql.com/doc/refman/8.0/en/macos-installation-pkg.html" target="_blank" rel="noopener noreferrer">MySQL 官网</a>下载安装包。</p><p>安装完成后，可以通过设置面板看到 MySQL 服务（记住用户名和密码）。</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-79175773-ef00-4333-86eb-b2e24dd1c38b.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>点进去可以查看 MySQL 运行状态。</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-fc93c46b-2868-4400-8c47-b51a901d38cc.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>第七个条件，Redis，可以直接通过 <code>brew install redis</code> 来完成安装。</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-e1b42515-b750-4b74-8d05-832aa0ab1601.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>执行 <code>redis-server</code> 就可以启动 Redis 服务了。</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-fc207f85-16b8-4943-986f-fb9e20fc8891.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>第八个条件，OSS，主要用来保存图片，可以通过阿里云官方去购买服务，并且创建 Bucket。</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-996b9d40-b2da-4fdc-9190-b7992b9a880e.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>然后配置 AccessKey。</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-ad8efde7-a420-4fe9-922d-fb63b650e535.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>针对<a href="https://javabetter.cn/zhishixingqiu/" target="_blank" rel="noopener noreferrer">星球用户</a>，我会开放自己的 accessKeyId 和 accessKeySecret，请勿外泄，免得被恶意攻击。</p><h2 id="下载编程喵-codingmore-源码" tabindex="-1"><a class="header-anchor" href="#下载编程喵-codingmore-源码"><span>下载编程喵（codingmore）源码</span></a></h2><p>编程喵一共有三个仓库，分别是：</p><blockquote><ul><li>coding-more：编程喵 admin 后端 + Web 前后端，地址：<a href="https://github.com/itwanger/coding-more" target="_blank" rel="noopener noreferrer">https://github.com/itwanger/coding-more</a></li><li>codingmore-admin-web：编程喵 admin 前端，地址：<a href="https://github.com/itwanger/codingmore-admin-web" target="_blank" rel="noopener noreferrer">https://github.com/itwanger/codingmore-admin-web</a></li><li>codingmore-learning：编程喵学习教程（手把手），地址：<a href="https://github.com/itwanger/codingmore-learning" target="_blank" rel="noopener noreferrer">https://github.com/itwanger/codingmore-learning</a></li></ul></blockquote><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-649fffb0-e21b-4562-8632-b8c05f8d3557.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>编程喵 🐱 是一个非常纯粹的前后端分离项目，后端用到的技术包括：</p><ul><li>Spring Boot 容器+MVC 框架</li><li>SpringSecurity 认证和授权框架</li><li>MyBatis ORM 框架</li><li>MyBatis-Plus MyBatis 增强工具</li><li>Nginx 静态资源服务器</li><li>Druid 数据库连接池</li><li>OSS 对象存储</li><li>Redis 缓存中间件</li><li>MySQL 关系型数据库</li><li>Swagger-UI 文档生成工具</li><li>Knife4j Swagger 美化增强工具</li><li>Hibernator-Validator 验证框架</li><li>Logback 日志框架</li><li>Lombok 简化对象封装工具</li><li>Hutool Java 工具类库</li></ul><p>前端用到的技术包括：</p><ul><li>Vue 前端框架</li><li>Vue-router 路由框架</li><li>Vuex 全局状态管理框架</li><li>Element 前端 UI 框架</li><li>Axios 前端 HTTP 框架</li><li>Js-cookie cookie 管理工具</li><li>nprogress 进度条控件</li></ul><p><strong>第一步，下载 coding-more 源码</strong>，戳<a href="https://github.com/itwanger/coding-more" target="_blank" rel="noopener noreferrer">链接 🔗</a>进入到该页面。</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-53a249f7-2de2-4ed2-95e5-5836fbda8d48.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>第二步，如果安装有 GitHub 桌面版的话，可以点击「open with GitHub desktop」，如果没有安装的话，可以点击「download zip」</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-f8fb39a5-74a3-4558-a827-db8a106b3f7c.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>点击「show in finder」就可以看到编程喵的源码了。</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-0d9acadb-9129-4a6a-897f-62eb5f20ce0b.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>第三步，通过 Intellij IDEA 导入就可以了。</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-b6f49fde-ca3e-46a3-a6ac-d8bc8d5ce6cc.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>第一次打开的话，需要稍等片刻，等待 Maven 去下载依赖包。Maven 下载完毕后，项目的结构图如下图所示。</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-637a7780-8516-46b6-824a-5b07a218ecda.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>第四步，下载 codingmore-admin-web 源码，戳<a href="https://github.com/itwanger/codingmore-admin-web" target="_blank" rel="noopener noreferrer">链接 🔗</a>进入到该页面。</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-5e753b8d-2542-4a6d-bb6d-bdc6313655ad.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>源码下载完毕后，建议通过 VS Code 导入项目，VS Code 对前端项目比 Intellij IDEA 更加友好。</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-78d0c9e4-9b36-4544-bc3a-896e2ab05fc0.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="部署编程喵-codingmore-源码" tabindex="-1"><a class="header-anchor" href="#部署编程喵-codingmore-源码"><span>部署编程喵（codingmore）源码</span></a></h2><h3 id="_01、mysql" tabindex="-1"><a class="header-anchor" href="#_01、mysql"><span>01、MySQL</span></a></h3><p>第一步，安装 Navicat，这是一个图形化界面的数据库管理工具。</p><p>安装完毕后，输入 MySQL 数据库的用户名和密码，建立本地连接。</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-95ba1a08-171a-4ac7-a4e9-c9b7e19f2d84.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>第二步，打开链接，新建数据库 codingmore，导入编程喵的 DB 文件。</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-a18bfb6a-ac2f-4160-8421-964235c21824.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>DB 文件放在 coding-more/doc 目录下。</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-1117b32b-ab11-4065-8529-6ceb29bfa7b9.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>导入成功后，可以看到目前 codingmore 所用到的 27 个数据库文件，其中 qrtz 开头的是定时任务的持久化表，剩余是编程喵的数据库表文件。</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-e9af58ff-d7b0-4494-ab5b-e9fde3e55f9f.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>然后，修改 <code>codingmore-admin/src/main/resources/application-dev.yml</code> 文件中的 spring.datasource.username、password、url 等，该为你本地的用户名、密码和数据库链接地址（Web 管理端）。</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-0d1e490c-97e1-45af-80f2-40b0421eed92.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>修改 <code>codingmore-web/src/main/resources/application-dev.yml</code> 文件中的 spring.datasource.username、password、url 等，该为你本地的用户名、密码和数据库链接地址（Web 前端）。</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-bfb6a10d-6899-40cf-8e28-4da74e3e5d14.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_02、redis" tabindex="-1"><a class="header-anchor" href="#_02、redis"><span>02、Redis</span></a></h3><p>执行 <code>redis-server</code> 启动 Redis 服务即可，不需要额外配置。</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-05a36a7d-449b-49a9-a8da-dc44395b1e66.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>记住 PID，如果想关闭的话，使用 <code>kill -9 PID</code> 大法就可以了。</p><p>然后，修改 <code>codingmore-admin/src/main/resources/application-dev.yml</code> 文件中的 spring.redis.host、database、port、password、timeout 等，该为你本地的 Redis 链接信息，一般默认就好（Web 管理端）。</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-f4270304-8666-4185-a271-cf803527e08e.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>修改 <code>codingmore-web/src/main/resources/application-dev.yml</code> 文件中的 spring.redis.host、database、port、password、timeout 等，该为你本地的 Redis 链接信息，一般默认就好（Web 前端）。</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-325ec5ae-a9ab-445a-a9e7-2446a79e6b23.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_03、oss" tabindex="-1"><a class="header-anchor" href="#_03、oss"><span>03、OSS</span></a></h3><p>非<a href="https://javabetter.cn/zhishixingqiu/" target="_blank" rel="noopener noreferrer">星球用户</a>需要自己购买阿里云的 OSS 服务和 CDN 服务。<a href="https://javabetter.cn/zhishixingqiu/" target="_blank" rel="noopener noreferrer">星球用户</a>可以直接私信我获取 accessKeyId 和 accessKeySecret。</p><p>然后修改 <code>codingmore-admin/src/main/resources/application-dev.yml</code> 文件中的 aliyun.cdn、oss 等。</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-fc8d8cf3-a03f-42cb-ac75-e0909337c8e7.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_04、codingmore-admin" tabindex="-1"><a class="header-anchor" href="#_04、codingmore-admin"><span>04、codingmore-admin</span></a></h3><p>在 Intellij IDEA 中运行 CodingmoreAdminBootstrap 主类，启动管理端后台服务。</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-2a95c98a-2d6e-451e-a732-3633b36245c2.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>如果启动失败，可以尝试在 Maven 面板中选择 codingmore-admin 双击运行 clean 清除缓存。</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-bec7e7f4-57ca-4ece-8b85-97c567ed4e56.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_05、codingmore-web" tabindex="-1"><a class="header-anchor" href="#_05、codingmore-web"><span>05、codingmore-web</span></a></h3><p>在 Intellij IDEA 中运行 CodingmoreAdminBootstrap 主类，启动管理端后台服务。</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-ae72896f-4968-4f66-bbcd-3aadbe610581.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>如果启动失败，可以尝试在 Maven 面板中选择 codingmore-web 双击运行 clean 清除缓存。</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-ef0a5c64-875f-41a5-8060-552aedc245a6.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>启动后，可以直接在浏览器地址栏输入 <code>http://localhost:8081</code> 访问 Web 前端。</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-6da911d2-e510-4dc2-b884-02f08f43cfba.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_06、codingmore-admin-web" tabindex="-1"><a class="header-anchor" href="#_06、codingmore-admin-web"><span>06、codingmore-admin-web</span></a></h3><p>打开终端，执行 <code>yarn install</code> 添加项目依赖（yarn 是 Facebook 为 node.js 运行时环境开发软件打包工具，是 npm 软件包管理器的替代品）。</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-5f93f909-f671-4363-b64c-72e702af3715.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>之后执行 <code>yarn run dev</code> 编译 admin 前端。</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-3a0b8906-d3cd-4771-9f0c-28fe2f8046a9.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>在浏览器地址栏输入 <code>http://localhost:8080</code> 就可以访问到了。</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-d2afa887-ebbe-4107-8106-9effcdf15e85.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>可以点击「获取体验账号」的方式获取登录用户名和密码。当然了，你也可以直接在 users 表上暴力破解密码。</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-10a4a4f6-a18b-4394-8e9d-ba107f37cb69.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p><a href="https://javabetter.cn/zhishixingqiu/" target="_blank" rel="noopener noreferrer">星球用户</a>可以直接私信我获取超级管理员的密码。登录后就可以看到文章列表啦。</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-fc38e67c-05a0-4895-a761-391465986797.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>这是文章编辑页，是不是非常清爽？</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-b00a46e0-2537-4dd4-a107-c4632886a430.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>好了，Mac 版如何下载编程喵源码，如何在本地跑起来编程喵的服务就告一段落辣，我们回头见！</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,126),n=[i];function c(b,g){return t(),a("div",null,n)}const p=e(r,[["render",c],["__file","macos-codingmore-run.html.vue"]]),m=JSON.parse('{"path":"/springboot/macos-codingmore-run.html","title":"如何在本地（macOS环境）跑起来编程喵（Spring Boot+Vue）项目源码？","lang":"zh-CN","frontmatter":{"category":["Java企业级开发"],"tag":["Spring Boot","Vue"],"title":"如何在本地（macOS环境）跑起来编程喵（Spring Boot+Vue）项目源码？","shortTitle":"macOS下如何运行编程喵源码","description":"前置环境的准备 一台可以开机的电脑 JDK 8 Maven Intellij IDEA（非必须，可用 Eclipse） Visual Studio Code（非必须，可用 hbuilderx） MySQL Redis（非必须，会报错，但不影响跑） OSS（非必须，上传图片时报错，但不影响跑） 对，编程喵 🐱（Spring Boot+Vue 的前后端分...","head":[["meta",{"property":"og:url","content":"https://javabetter.cn/springboot/macos-codingmore-run.html"}],["meta",{"property":"og:site_name","content":"二哥的Java进阶之路"}],["meta",{"property":"og:title","content":"如何在本地（macOS环境）跑起来编程喵（Spring Boot+Vue）项目源码？"}],["meta",{"property":"og:description","content":"前置环境的准备 一台可以开机的电脑 JDK 8 Maven Intellij IDEA（非必须，可用 Eclipse） Visual Studio Code（非必须，可用 hbuilderx） MySQL Redis（非必须，会报错，但不影响跑） OSS（非必须，上传图片时报错，但不影响跑） 对，编程喵 🐱（Spring Boot+Vue 的前后端分..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-d98d5c3c-24a9-4d69-a11d-0b323f0c6bb5.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-25T09:46:09.000Z"}],["meta",{"property":"article:author","content":"沉默王二"}],["meta",{"property":"article:tag","content":"Spring Boot"}],["meta",{"property":"article:tag","content":"Vue"}],["meta",{"property":"article:modified_time","content":"2024-07-25T09:46:09.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何在本地（macOS环境）跑起来编程喵（Spring Boot+Vue）项目源码？\\",\\"image\\":[\\"https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-d98d5c3c-24a9-4d69-a11d-0b323f0c6bb5.png\\",\\"https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-ac4ffa12-4b90-459b-a548-bd91e105f531.png\\",\\"https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-c80146c8-24f0-40ee-ab6b-696bc4a6589d.png\\",\\"https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-6a46e999-b309-4adc-9567-ade05f55f174.png\\",\\"https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-7b8ee4ad-db7d-4cc6-a9bc-323083eb319c.png\\",\\"https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-f34a88d5-6c50-4eec-8343-77518aaf9a4f.png\\",\\"https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-05d7d17f-d214-40c7-98d8-e67083ed38fb.png\\",\\"https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-a1bb43ca-b3b8-4681-b290-6ddbdf2bc1fc.png\\",\\"https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-9b4dab03-c720-4f23-8a1e-90fa55130c73.png\\",\\"https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-7743fabc-1a49-44a6-8862-1f31c94b0633.png\\",\\"https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-31580aab-9990-4553-9557-41dbd748f361.png\\",\\"https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-556c70fd-c3bc-46af-9d20-d52783ecc1f5.png\\",\\"https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-8b2d3562-09ec-4a93-b40d-9a06816aa46c.png\\",\\"https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-79175773-ef00-4333-86eb-b2e24dd1c38b.png\\",\\"https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-fc93c46b-2868-4400-8c47-b51a901d38cc.png\\",\\"https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-e1b42515-b750-4b74-8d05-832aa0ab1601.png\\",\\"https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-fc207f85-16b8-4943-986f-fb9e20fc8891.png\\",\\"https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-996b9d40-b2da-4fdc-9190-b7992b9a880e.png\\",\\"https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-ad8efde7-a420-4fe9-922d-fb63b650e535.png\\",\\"https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-649fffb0-e21b-4562-8632-b8c05f8d3557.png\\",\\"https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-53a249f7-2de2-4ed2-95e5-5836fbda8d48.png\\",\\"https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-f8fb39a5-74a3-4558-a827-db8a106b3f7c.png\\",\\"https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-0d9acadb-9129-4a6a-897f-62eb5f20ce0b.png\\",\\"https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-b6f49fde-ca3e-46a3-a6ac-d8bc8d5ce6cc.png\\",\\"https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-637a7780-8516-46b6-824a-5b07a218ecda.png\\",\\"https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-5e753b8d-2542-4a6d-bb6d-bdc6313655ad.png\\",\\"https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-78d0c9e4-9b36-4544-bc3a-896e2ab05fc0.png\\",\\"https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-95ba1a08-171a-4ac7-a4e9-c9b7e19f2d84.png\\",\\"https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-a18bfb6a-ac2f-4160-8421-964235c21824.png\\",\\"https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-1117b32b-ab11-4065-8529-6ceb29bfa7b9.png\\",\\"https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-e9af58ff-d7b0-4494-ab5b-e9fde3e55f9f.png\\",\\"https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-0d1e490c-97e1-45af-80f2-40b0421eed92.png\\",\\"https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-bfb6a10d-6899-40cf-8e28-4da74e3e5d14.png\\",\\"https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-05a36a7d-449b-49a9-a8da-dc44395b1e66.png\\",\\"https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-f4270304-8666-4185-a271-cf803527e08e.png\\",\\"https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-325ec5ae-a9ab-445a-a9e7-2446a79e6b23.png\\",\\"https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-fc8d8cf3-a03f-42cb-ac75-e0909337c8e7.png\\",\\"https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-2a95c98a-2d6e-451e-a732-3633b36245c2.png\\",\\"https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-bec7e7f4-57ca-4ece-8b85-97c567ed4e56.png\\",\\"https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-ae72896f-4968-4f66-bbcd-3aadbe610581.png\\",\\"https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-ef0a5c64-875f-41a5-8060-552aedc245a6.png\\",\\"https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-6da911d2-e510-4dc2-b884-02f08f43cfba.png\\",\\"https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-5f93f909-f671-4363-b64c-72e702af3715.png\\",\\"https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-3a0b8906-d3cd-4771-9f0c-28fe2f8046a9.png\\",\\"https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-d2afa887-ebbe-4107-8106-9effcdf15e85.png\\",\\"https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-10a4a4f6-a18b-4394-8e9d-ba107f37cb69.png\\",\\"https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-fc38e67c-05a0-4895-a761-391465986797.png\\",\\"https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/macos-codingmore-run-b00a46e0-2537-4dd4-a107-c4632886a430.png\\",\\"https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png\\"],\\"dateModified\\":\\"2024-07-25T09:46:09.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"沉默王二\\",\\"url\\":\\"/about-the-author/\\"}]}"]]},"headers":[{"level":2,"title":"前置环境的准备","slug":"前置环境的准备","link":"#前置环境的准备","children":[]},{"level":2,"title":"下载编程喵（codingmore）源码","slug":"下载编程喵-codingmore-源码","link":"#下载编程喵-codingmore-源码","children":[]},{"level":2,"title":"部署编程喵（codingmore）源码","slug":"部署编程喵-codingmore-源码","link":"#部署编程喵-codingmore-源码","children":[{"level":3,"title":"01、MySQL","slug":"_01、mysql","link":"#_01、mysql","children":[]},{"level":3,"title":"02、Redis","slug":"_02、redis","link":"#_02、redis","children":[]},{"level":3,"title":"03、OSS","slug":"_03、oss","link":"#_03、oss","children":[]},{"level":3,"title":"04、codingmore-admin","slug":"_04、codingmore-admin","link":"#_04、codingmore-admin","children":[]},{"level":3,"title":"05、codingmore-web","slug":"_05、codingmore-web","link":"#_05、codingmore-web","children":[]},{"level":3,"title":"06、codingmore-admin-web","slug":"_06、codingmore-admin-web","link":"#_06、codingmore-admin-web","children":[]}]}],"git":{"createdTime":1654529487000,"updatedTime":1721900769000,"contributors":[{"name":"沉默王二","email":"www.qing_gee@163.com","commits":1}]},"readingTime":{"minutes":7.69,"words":2307},"filePathRelative":"springboot/macos-codingmore-run.md","localizedDate":"2022年6月6日","excerpt":"<h2>前置环境的准备</h2>\\n<ul>\\n<li>一台可以开机的电脑</li>\\n<li>JDK 8</li>\\n<li>Maven</li>\\n<li>Intellij IDEA（非必须，可用 Eclipse）</li>\\n<li>Visual Studio Code（非必须，可用 hbuilderx）</li>\\n<li>MySQL</li>\\n<li>Redis（非必须，会报错，但不影响跑）</li>\\n<li>OSS（非必须，上传图片时报错，但不影响跑）</li>\\n</ul>\\n<p>对，编程喵 🐱（Spring Boot+Vue 的前后端分离项目）要想在本地跑起来，需要这 8 个前置环境。</p>","autoDesc":true}');export{p as comp,m as data};