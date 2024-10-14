import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,e}from"./app-BJI4IlqI.js";const t={},n=e(`<h1 id="第十九节-java的并发容器" tabindex="-1"><a class="header-anchor" href="#第十九节-java的并发容器"><span>第十九节：Java的并发容器</span></a></h1><p>Java 的并发集合容器提供了在多线程环境中高效访问和操作的数据结构。这些容器通过内部的同步机制实现了线程安全，使得开发者无需显式同步代码就能在并发环境下安全使用，比如说：ConcurrentHashMap、阻塞队列和 CopyOnWrite 容器等。</p><p>java.util 包下提供了一些容器类（<a href="https://javabetter.cn/collection/gailan.html" target="_blank" rel="noopener noreferrer">集合框架</a>），其中 Vector 和 Hashtable 是线程安全的，但实现方式比较粗暴，通过在方法上加「<a href="https://javabetter.cn/thread/synchronized-1.html" target="_blank" rel="noopener noreferrer">sychronized</a>」关键字实现。</p><p>但即便是 Vector 这样线程安全的类，在应对多线程的复合操作时也需要在客户端继续加锁以保证原子性。来看下面的例子：</p><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> TestVector</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">	private</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> Vector</span><span style="--shiki-light:#E45649;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">String</span><span style="--shiki-light:#E45649;--shiki-dark:#ABB2BF;">&gt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> vector</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">	//方法一</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">	public</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">  Object</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> getLast</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">Vector</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"> vector</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">	    int</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> lastIndex</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;"> vector</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">size</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">() </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">-</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">	    return</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;"> vector</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">get</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(lastIndex);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">	//方法二</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">	public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">  void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> deleteLast</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">Vector</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"> vector</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">	    int</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> lastIndex</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;"> vector</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">size</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">() </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">-</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">	    vector</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">remove</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(lastIndex);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">	//方法三</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">	public</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">  Object</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> getLastSysnchronized</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">Vector</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"> vector</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">		synchronized</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(vector){</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">			int</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> lastIndex</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;"> vector</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">size</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">() </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">-</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">			return</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;"> vector</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">get</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(lastIndex);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">		}</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">	//方法四</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">	public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">  void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> deleteLastSysnchronized</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">Vector</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"> vector</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">		synchronized</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> (vector){</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">			int</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> lastIndex</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;"> vector</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">size</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">() </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">-</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">			vector</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">remove</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(lastIndex);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">		}</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果方法一和方法二是一个组合的话，那么当方法一获取到了<code>vector</code>的 size 之后，方法二已经执行完毕，这样就会导致程序出现错误。</p><p>如果方法三与方法四组合的话，就还需在内部加锁来保证 <code>vector</code> 上的原子性操作。</p><p>于是并发容器就应用而生了，它们是线程安全的，可以在多线程环境下高效地访问和操作数据，而不需要额外的同步措施。</p><h2 id="并发容器类" tabindex="-1"><a class="header-anchor" href="#并发容器类"><span>并发容器类</span></a></h2><p>整体架构如下图所示：</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/thread/map-a6a020a3-4573-4cf8-b5ae-1541ae45801c.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="并发-map" tabindex="-1"><a class="header-anchor" href="#并发-map"><span>并发 Map</span></a></h2><h3 id="concurrentmap-接口" tabindex="-1"><a class="header-anchor" href="#concurrentmap-接口"><span>ConcurrentMap 接口</span></a></h3><p>ConcurrentMap 接口继承了 Map 接口，在 Map 接口的基础上又定义了四个方法：</p><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> interface</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> ConcurrentMap</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">K</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> V</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF;">&gt;</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> extends</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> Map</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">K</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> V</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF;">&gt;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">    //插入元素</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">    V</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> putIfAbsent</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">K</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"> key</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">V</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"> value</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">    //移除元素</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    boolean</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> remove</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">Object</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"> key</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">Object</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"> value</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">    //替换元素</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    boolean</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> replace</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">K</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"> key</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">V</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"> oldValue</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">V</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"> newValue</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">    //替换元素</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">    V</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> replace</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">K</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"> key</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">V</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"> value</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>putIfAbsent：</strong> 与原有 put 方法不同的是，putIfAbsent 如果插入的 key 相同，则不替换原有的 value 值；</p><p><strong>remove：</strong> 与原有 remove 方法不同的是，新 remove 方法中增加了对 value 的判断，如果要删除的 key-value 不能与 Map 中原有的 key-value 对应上，则不会删除该元素;</p><p><strong>replace(K,V,V)：</strong> 增加了对 value 值的判断，如果 key-oldValue 能与 Map 中原有的 key-value 对应上，才进行替换操作；</p><p><strong>replace(K,V)：</strong> 与上面的 replace 不同的是，此 replace 不会对 Map 中原有的 key-value 进行比较，如果 key 存在则直接替换；</p><h3 id="concurrenthashmap" tabindex="-1"><a class="header-anchor" href="#concurrenthashmap"><span>ConcurrentHashMap</span></a></h3><p>ConcurrentHashMap 同 <a href="https://javabetter.cn/collection/hashmap.html" target="_blank" rel="noopener noreferrer">HashMap</a> 一样，也是基于散列表的 map，但是它提供了一种与 Hashtable 完全不同的加锁策略，提供了更高效的并发性和伸缩性。</p><p>后面我们会单独开一篇来详细介绍 <a href="https://javabetter.cn/thread/ConcurrentHashMap.html" target="_blank" rel="noopener noreferrer">ConcurrentHashMap</a>，戳链接直达。</p><h3 id="concurrentskiplistmap" tabindex="-1"><a class="header-anchor" href="#concurrentskiplistmap"><span>ConcurrentSkipListMap</span></a></h3><p>ConcurrentNavigableMap 接口继承了 NavigableMap 接口，这个接口提供了针对给定搜索目标返回最接近匹配项的导航方法。</p><p>ConcurrentNavigableMap 接口的主要实现类是 ConcurrentSkipListMap 类。从名字上来看，它的底层使用的是跳表（SkipList）。跳表是一种”空间换时间“的数据结构，可以使用 <a href="https://javabetter.cn/thread/cas.html" target="_blank" rel="noopener noreferrer">CAS</a> 来保证并发安全性。</p><p>与 ConcurrentHashMap 的读密集操作相比，ConcurrentSkipListMap 的读和写操作的性能相对较低。这是由其数据结构导致的，因为跳表的插入和删除需要更复杂的指针操作。然而，ConcurrentSkipListMap 提供了有序性，这是 ConcurrentHashMap 所没有的。</p><p>ConcurrentSkipListMap 适用于需要线程安全的同时又需要元素有序的场合。如果不需要有序，ConcurrentHashMap 可能是更好的选择，因为它通常具有更高的性能。</p><h2 id="并发-queue" tabindex="-1"><a class="header-anchor" href="#并发-queue"><span>并发 Queue</span></a></h2><p>JDK 并没有提供线程安全的 List 类，因为对 List 来说，<strong>很难去开发一个通用并且没有并发瓶颈的线程安全的 List</strong>。因为即使简单的读操作，比如 <code>contains()</code>，也需要再搜索的时候锁住整个 list。</p><p>所以退一步，JDK 提供了队列和双端队列的线程安全类：ConcurrentLinkedQueue 和 ConcurrentLinkedDeque。因为队列相对于 List 来说，有更多的限制。这两个类是使用 CAS 来实现线程安全的。</p><p>我们会在后面单独开一篇来详细介绍<a href="https://javabetter.cn/thread/ConcurrentLinkedQueue.html" target="_blank" rel="noopener noreferrer">ConcurrentLinkedQueue</a>，戳链接直达。</p><h2 id="并发-set" tabindex="-1"><a class="header-anchor" href="#并发-set"><span>并发 Set</span></a></h2><p>ConcurrentSkipListSet 是线程安全的有序集合。底层是使用 ConcurrentSkipListMap 来实现。</p><p>谷歌的 <a href="https://javabetter.cn/common-tool/guava.html" target="_blank" rel="noopener noreferrer">Guava</a>实现了一个线程安全的 ConcurrentHashSet：</p><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">Set</span><span style="--shiki-light:#E45649;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">String</span><span style="--shiki-light:#E45649;--shiki-dark:#ABB2BF;">&gt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> s </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;"> Sets</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">newConcurrentHashSet</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">();</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>Set 日常开发中用的并不多，所以这里就不展开细讲了。</p><h2 id="阻塞队列" tabindex="-1"><a class="header-anchor" href="#阻塞队列"><span>阻塞队列</span></a></h2><p>我们假设一种场景，<a href="https://javabetter.cn/thread/shengchanzhe-xiaofeizhe.html" target="_blank" rel="noopener noreferrer">生产者一直生产资源，消费者一直消费资源</a>（后面会细讲，戳链接直达），资源存储在一个缓冲池中，生产者将生产的资源存进缓冲池中，消费者从缓冲池中拿到资源进行消费，这就是大名鼎鼎的<strong>生产者-消费者模式</strong>。</p><p>该模式能够简化开发过程，一方面消除了生产者类与消费者类之间的代码依赖性，另一方面将生产数据的过程与使用数据的过程解耦简化负载。</p><p>我们自己 coding 实现这个模式的时候，因为需要让<strong>多个线程操作共享变量</strong>（即资源），所以很容易引发<strong>线程安全问题</strong>，造成<strong>重复消费</strong>和<strong>死锁</strong>，尤其是生产者和消费者存在多个的情况。另外，当缓冲池空了，我们需要阻塞消费者，唤醒生产者；当缓冲池满了，我们需要阻塞生产者，唤醒消费者，这些个<strong>等待-唤醒</strong>逻辑都需要自己实现。</p><p>这么容易出错的事情，JDK 当然帮我们做啦，这就是阻塞队列（BlockingQueue），<strong>你只管往里面存、取就行，而不用担心多线程环境下存、取共享变量的线程安全问题。</strong></p><blockquote><p>BlockingQueue 是 Java util.concurrent 包下重要的数据结构，区别于普通的队列，BlockingQueue 提供了<strong>线程安全的队列访问方式</strong>，并发包下很多高级同步类的实现都是基于 BlockingQueue 实现的。</p></blockquote><p>BlockingQueue 一般用于生产者-消费者模式，生产者是往队列里添加元素的线程，消费者是从队列里拿元素的线程。<strong>BlockingQueue 就是存放元素的容器</strong>。</p><h3 id="blockingqueue-的操作方法" tabindex="-1"><a class="header-anchor" href="#blockingqueue-的操作方法"><span>BlockingQueue 的操作方法</span></a></h3><p>阻塞队列提供了四组不同的方法用于插入、移除、检查元素：</p><table><thead><tr><th style="text-align:center;">方法\\处理方式</th><th style="text-align:center;">抛出异常</th><th style="text-align:center;">返回特殊值</th><th style="text-align:center;">一直阻塞</th><th style="text-align:center;">超时退出</th></tr></thead><tbody><tr><td style="text-align:center;">插入方法</td><td style="text-align:center;">add(e)</td><td style="text-align:center;">offer(e)</td><td style="text-align:center;"><strong>put(e)</strong></td><td style="text-align:center;">offer(e,time,unit)</td></tr><tr><td style="text-align:center;">移除方法</td><td style="text-align:center;">remove()</td><td style="text-align:center;">poll()</td><td style="text-align:center;"><strong>take()</strong></td><td style="text-align:center;">poll(time,unit)</td></tr><tr><td style="text-align:center;">检查方法</td><td style="text-align:center;">element()</td><td style="text-align:center;">peek()</td><td style="text-align:center;">-</td><td style="text-align:center;">-</td></tr></tbody></table><ul><li>抛出异常：如果操作无法立即执行，会抛异常。当阻塞队列满时候，再往队列里插入元素，会抛出 <code>IllegalStateException(“Queue full”)</code>异常。当队列为空时，从队列里获取元素时会抛出 NoSuchElementException 异常 。</li><li>返回特殊值：如果操作无法立即执行，会返回一个特殊值，通常是 true / false。</li><li>一直阻塞：如果操作无法立即执行，则一直阻塞或者响应中断。</li><li>超时退出：如果操作无法立即执行，该方法调用将会发生阻塞，直到能够执行，但等待时间不会超过给定值。返回一个特定值以告知该操作是否成功，通常是 true / false。</li></ul><p><strong>注意：</strong></p><ul><li>不能往阻塞队列中插入 null，会抛出空指针异常。</li><li>可以访问阻塞队列中的任意元素，调用 <code>remove(o)</code>可以将队列之中的特定对象移除，但并不高效，尽量避免使用。</li></ul><p>我们会在后面单独开一篇<a href="https://javabetter.cn/thread/BlockingQueue.html" target="_blank" rel="noopener noreferrer">BlockingQueue</a>来细讲，戳链接直达。</p><h3 id="blockingqueue-的实现类" tabindex="-1"><a class="header-anchor" href="#blockingqueue-的实现类"><span>BlockingQueue 的实现类</span></a></h3><h4 id="arrayblockingqueue" tabindex="-1"><a class="header-anchor" href="#arrayblockingqueue"><span>ArrayBlockingQueue</span></a></h4><p>由<strong>数组</strong>结构组成的<strong>有界</strong>阻塞队列。内部结构是数组，具有数组的特性。</p><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">public</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> ArrayBlockingQueue</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">int</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> capacity</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> boolean</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> fair){</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> //..省略代码</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以初始化队列大小，一旦初始化将不能改变。构造方法中的 fair 表示控制对象的内部锁是否采用公平锁，默认是<strong>非公平锁</strong>。</p><h4 id="linkedblockingqueue" tabindex="-1"><a class="header-anchor" href="#linkedblockingqueue"><span>LinkedBlockingQueue</span></a></h4><p>由<strong>链表</strong>结构组成的<strong>有界</strong>阻塞队列。内部结构是链表，具有链表的特性。默认队列的大小是<code>Integer.MAX_VALUE</code>，也可以指定大小。此队列按照<strong>先进先出</strong>的原则对元素进行排序。</p><h4 id="delayqueue" tabindex="-1"><a class="header-anchor" href="#delayqueue"><span>DelayQueue</span></a></h4><p>该队列中的元素只有当其指定的延迟时间到了，才能够从队列中获取到该元素。注入其中的元素必须实现 <code>java.util.concurrent.Delayed</code> 接口。</p><p>DelayQueue 是一个没有大小限制的队列，因此往队列中插入数据的操作（生产者）永远不会被阻塞，而只有获取数据的操作（消费者）才会被阻塞。</p><h4 id="priorityblockingqueue" tabindex="-1"><a class="header-anchor" href="#priorityblockingqueue"><span>PriorityBlockingQueue</span></a></h4><p>基于优先级的无界阻塞队列（优先级的判断通过构造函数传入的 Compator 对象来决定），内部控制线程同步的锁采用的是非公平锁。</p><blockquote><p>网上大部分博客上<strong>PriorityBlockingQueue</strong>为公平锁，其实是不对的，查阅源码（感谢 github:<strong>ambition0802</strong>同学的指出）：</p></blockquote><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">public</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> PriorityBlockingQueue</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">int</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> initialCapacity</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">                                 Comparator</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">&lt;</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">?</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;"> super</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> E</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">&gt;</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> comparator) {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">    this</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">lock</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> ReentrantLock</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">()</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> //默认构造方法-非公平锁</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    ...</span><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">//其余代码略</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="synchronousqueue" tabindex="-1"><a class="header-anchor" href="#synchronousqueue"><span>SynchronousQueue</span></a></h4><p>这个队列比较特殊，<strong>没有任何内部容量</strong>，甚至连一个队列的容量都没有。并且每个 put 必须等待一个 take，反之亦然。</p><p>需要区别容量为 1 的 ArrayBlockingQueue、LinkedBlockingQueue。</p><p>以下方法的返回值，可以帮助理解这个队列：</p><ul><li><code>iterator()</code> 永远返回空，因为里面没有东西</li><li><code>peek()</code> 永远返回 null</li><li><code>put()</code> 往 queue 放进去一个 element 以后就一直 wait 直到有其他 thread 进来把这个 element 取走。</li><li><code>offer()</code> 往 queue 里放一个 element 后立即返回，如果碰巧这个 element 被另一个 thread 取走了，offer 方法返回 true，认为 offer 成功；否则返回 false。</li><li><code>take()</code> 取出并且 remove 掉 queue 里的 element，取不到东西他会一直等。</li><li><code>poll()</code> 取出并且 remove 掉 queue 里的 element，只有到碰巧另外一个线程正在往 queue 里 offer 数据或者 put 数据的时候，该方法才会取到东西。否则立即返回 null。</li><li><code>isEmpty()</code> 永远返回 true</li><li><code>remove()&amp;removeAll()</code> 永远返回 false</li></ul><p><strong>注意</strong></p><p><strong>PriorityBlockingQueue</strong>不会阻塞数据生产者（因为队列是无界的），而只会在没有可消费的数据时阻塞数据的消费者。因此使用的时候要特别注意，<strong>生产者生产数据的速度绝对不能快于消费者消费数据的速度，否则时间一长，会最终耗尽所有的可用堆内存空间。<strong>对于使用默认大小的</strong>LinkedBlockingQueue</strong>也是一样的。</p><h2 id="copyonwrite-容器" tabindex="-1"><a class="header-anchor" href="#copyonwrite-容器"><span>CopyOnWrite 容器</span></a></h2><p>在聊 CopyOnWrite 容器之前我们先来谈谈什么是 CopyOnWrite 机制，CopyOnWrite 是计算机设计领域的一种优化策略，也是一种在并发场景下常用的设计思想——写入时复制。</p><p>什么是写入时复制呢？</p><p>就是当有多个调用者同时去请求一个资源数据的时候，有一个调用者出于某些原因需要对当前的数据源进行修改，这个时候系统将会复制一个当前数据源的副本给调用者修改。</p><p>CopyOnWrite 容器即<strong>写时复制的容器</strong>，当我们往一个容器中添加元素的时候，不直接往容器中添加，而是将当前容器进行 copy，复制出来一个新的容器，然后向新容器中添加我们需要的元素，最后将原容器的引用指向新容器。</p><p>这样做的好处在于，我们可以在并发的场景下对容器进行&quot;读操作&quot;而不需要&quot;加锁&quot;，从而达到读写分离的目的。从 JDK 1.5 开始 Java 并发包里提供了两个使用 CopyOnWrite 机制实现的并发容器，分别是 <a href="https://javabetter.cn/thread/CopyOnWriteArrayList.html" target="_blank" rel="noopener noreferrer">CopyOnWriteArrayList</a>（后面会细讲，戳链接直达） 和 CopyOnWriteArraySet（不常用）。</p><h2 id="小结" tabindex="-1"><a class="header-anchor" href="#小结"><span>小结</span></a></h2><p>本文主要介绍了并发包中的三个重要的容器类，Map、阻塞队列和 CopyOnWrite 容器，Map 用于存储键值对，阻塞队列用于生产者-消费者模型，而 CopyOnWrite 容器用于“读多写少”的并发场景。</p><blockquote><p>编辑：沉默王二，部分内容来源于朋友小七萤火虫开源的这个仓库：<a href="http://concurrent.redspider.group/" target="_blank" rel="noopener noreferrer">深入浅出 Java 多线程</a>，推荐阅读：<a href="https://juejin.cn/post/6844903958499033095" target="_blank" rel="noopener noreferrer">時光以北这篇 ConcurrentSkipListMap 讲的很不错</a>，可以学习。</p></blockquote><hr><p>GitHub 上标星 10000+ 的开源知识库《<a href="https://github.com/itwanger/toBeBetterJavaer" target="_blank" rel="noopener noreferrer">二哥的 Java 进阶之路</a>》第二份 PDF 《<a href="https://javabetter.cn/thread/" target="_blank" rel="noopener noreferrer">并发编程小册</a>》终于来了！包括线程的基本概念和使用方法、Java的内存模型、sychronized、volatile、CAS、AQS、ReentrantLock、线程池、并发容器、ThreadLocal、生产者消费者模型等面试和开发必须掌握的内容，共计 15 万余字，200+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：<a href="https://javabetter.cn/thread/" target="_blank" rel="noopener noreferrer">太赞了，二哥的并发编程进阶之路.pdf</a></p><p><a href="https://javabetter.cn/thread/" target="_blank" rel="noopener noreferrer">加入二哥的编程星球</a>，在星球的第二个置顶帖「<a href="https://javabetter.cn/thread/" target="_blank" rel="noopener noreferrer">知识图谱</a>」里就可以获取 PDF 版本。</p><figure><img src="https://cdn.tobebetterjavaer.com/stutymore/mianshi-20240723112714.png" alt="二哥的并发编程进阶之路获取方式" tabindex="0" loading="lazy"><figcaption>二哥的并发编程进阶之路获取方式</figcaption></figure>`,84),l=[n];function h(r,p){return a(),s("div",null,l)}const o=i(t,[["render",h],["__file","map.html.vue"]]),c=JSON.parse('{"path":"/thread/map.html","title":"聊聊Java的并发集合容器ConcurrentHashMap、阻塞队列和 CopyOnWrite 容器","lang":"zh-CN","frontmatter":{"title":"聊聊Java的并发集合容器ConcurrentHashMap、阻塞队列和 CopyOnWrite 容器","shortTitle":"Java的并发容器","description":"Java 的并发集合容器提供了在多线程环境中高效访问和操作的数据结构。这些容器通过内部的同步机制实现了线程安全，使得开发者无需显式同步代码就能在并发环境下安全使用。","category":["Java核心"],"tag":["Java并发编程"],"head":[["meta",{"name":"keywords","content":"Java,并发编程,多线程,Thread,并发集合容器"}],["meta",{"property":"og:url","content":"https://javabetter.cn/thread/map.html"}],["meta",{"property":"og:site_name","content":"二哥的Java进阶之路"}],["meta",{"property":"og:title","content":"聊聊Java的并发集合容器ConcurrentHashMap、阻塞队列和 CopyOnWrite 容器"}],["meta",{"property":"og:description","content":"Java 的并发集合容器提供了在多线程环境中高效访问和操作的数据结构。这些容器通过内部的同步机制实现了线程安全，使得开发者无需显式同步代码就能在并发环境下安全使用。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/thread/map-a6a020a3-4573-4cf8-b5ae-1541ae45801c.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-25T09:46:09.000Z"}],["meta",{"property":"article:author","content":"沉默王二"}],["meta",{"property":"article:tag","content":"Java并发编程"}],["meta",{"property":"article:modified_time","content":"2024-07-25T09:46:09.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"聊聊Java的并发集合容器ConcurrentHashMap、阻塞队列和 CopyOnWrite 容器\\",\\"image\\":[\\"https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/thread/map-a6a020a3-4573-4cf8-b5ae-1541ae45801c.png\\",\\"https://cdn.tobebetterjavaer.com/stutymore/mianshi-20240723112714.png\\"],\\"dateModified\\":\\"2024-07-25T09:46:09.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"沉默王二\\",\\"url\\":\\"/about-the-author/\\"}]}"]]},"headers":[{"level":2,"title":"并发容器类","slug":"并发容器类","link":"#并发容器类","children":[]},{"level":2,"title":"并发 Map","slug":"并发-map","link":"#并发-map","children":[{"level":3,"title":"ConcurrentMap 接口","slug":"concurrentmap-接口","link":"#concurrentmap-接口","children":[]},{"level":3,"title":"ConcurrentHashMap","slug":"concurrenthashmap","link":"#concurrenthashmap","children":[]},{"level":3,"title":"ConcurrentSkipListMap","slug":"concurrentskiplistmap","link":"#concurrentskiplistmap","children":[]}]},{"level":2,"title":"并发 Queue","slug":"并发-queue","link":"#并发-queue","children":[]},{"level":2,"title":"并发 Set","slug":"并发-set","link":"#并发-set","children":[]},{"level":2,"title":"阻塞队列","slug":"阻塞队列","link":"#阻塞队列","children":[{"level":3,"title":"BlockingQueue 的操作方法","slug":"blockingqueue-的操作方法","link":"#blockingqueue-的操作方法","children":[]},{"level":3,"title":"BlockingQueue 的实现类","slug":"blockingqueue-的实现类","link":"#blockingqueue-的实现类","children":[]}]},{"level":2,"title":"CopyOnWrite 容器","slug":"copyonwrite-容器","link":"#copyonwrite-容器","children":[]},{"level":2,"title":"小结","slug":"小结","link":"#小结","children":[]}],"git":{"createdTime":1648037338000,"updatedTime":1721900769000,"contributors":[{"name":"沉默王二","email":"www.qing_gee@163.com","commits":1}]},"readingTime":{"minutes":11.71,"words":3513},"filePathRelative":"thread/map.md","localizedDate":"2022年3月23日","excerpt":"\\n<p>Java 的并发集合容器提供了在多线程环境中高效访问和操作的数据结构。这些容器通过内部的同步机制实现了线程安全，使得开发者无需显式同步代码就能在并发环境下安全使用，比如说：ConcurrentHashMap、阻塞队列和 CopyOnWrite 容器等。</p>\\n<p>java.util 包下提供了一些容器类（<a href=\\"https://javabetter.cn/collection/gailan.html\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">集合框架</a>），其中 Vector 和 Hashtable 是线程安全的，但实现方式比较粗暴，通过在方法上加「<a href=\\"https://javabetter.cn/thread/synchronized-1.html\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">sychronized</a>」关键字实现。</p>"}');export{o as comp,c as data};