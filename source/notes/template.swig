<!doctype html>
<!--[if lt IE 7]>      <html class="lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html> <!--<![endif]-->
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">

	<title>
		{% if is_login %}Login
		{% elif is_home %}Home
		{% elif is_tag %}{{ tag }}
		{% elif post %}{{ post.title }}
		{% endif %}
		| {{ site.name }}
	</title>

	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
	<meta name="theme-color" content="#fafafa">
	<meta name="mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-status-bar-style" content="black">
	<meta name="author" content="{{ site.author }}">

	<!-- Setup favicons - used http://realfavicongenerator.net/ -->
	<!-- Generator output at http://realfavicongenerator.net/favicon?file_id=p19chl4h3v1e5pk1tmo8os31bal5#.VMV1cHCUe6Q -->
	<link rel="apple-touch-icon" sizes="57x57" href="//hadi.io/notes/apple-touch-icon-57x57.png">
	<link rel="apple-touch-icon" sizes="114x114" href="//hadi.io/notes/apple-touch-icon-114x114.png">
	<link rel="apple-touch-icon" sizes="72x72" href="//hadi.io/notes/apple-touch-icon-72x72.png">
	<link rel="apple-touch-icon" sizes="144x144" href="//hadi.io/notes/apple-touch-icon-144x144.png">
	<link rel="apple-touch-icon" sizes="60x60" href="//hadi.io/notes/apple-touch-icon-60x60.png">
	<link rel="apple-touch-icon" sizes="120x120" href="//hadi.io/notes/apple-touch-icon-120x120.png">
	<link rel="apple-touch-icon" sizes="76x76" href="//hadi.io/notes/apple-touch-icon-76x76.png">
	<link rel="apple-touch-icon" sizes="152x152" href="//hadi.io/notes/apple-touch-icon-152x152.png">
	<link rel="apple-touch-icon" sizes="180x180" href="//hadi.io/notes/apple-touch-icon-180x180.png">
	<link rel="icon" type="image/png" href="//hadi.io/notes/favicon-192x192.png" sizes="192x192">
	<link rel="icon" type="image/png" href="//hadi.io/notes/favicon-160x160.png" sizes="160x160">
	<link rel="icon" type="image/png" href="//hadi.io/notes/favicon-96x96.png" sizes="96x96">
	<link rel="icon" type="image/png" href="//hadi.io/notes/favicon-16x16.png" sizes="16x16">
	<link rel="icon" type="image/png" href="//hadi.io/notes/favicon-32x32.png" sizes="32x32">
	<meta name="msapplication-TileColor" content="#da532c">
	<meta name="msapplication-TileImage" content="//hadi.io/notes/mstile-144x144.png">

	<!-- OpenGraph tags -->
	<meta property="og:site_name" content="{{ site.name }}">
	<meta property="og:title" content="{{ post.title or site.name }}">
	<meta property="og:url" content="{{site.base_url}}{{ post.permalink }}">
	<meta property="og:description" content="{{ post.content|striptags|truncate(240) or site.bio }}">
	<meta property="og:image" content="{{ site.avatar }}">

	{% if is_home %}
	<meta property="og:type" content="website">
	{% else %}
	<meta property="article:author" content="{{ site.author }}">
	<meta property="article:published_time" content="{{ post.created_at }}">
	<meta property="og:type" content="article">
	{% endif %}

	<!-- Twitter Cards -->
	<meta name="twitter:card" content="summary">
	<meta name="twitter:site" content="{{ site.twitter }}">
	<meta name="twitter:creator" content="@hadi_michael">

	<link rel="canonical" href="{{site.base_url}}{{ post.permalink }}">

	<!-- RSS feed -->
	<link rel="alternate" type="application/rss+xml" title="RSS" href="{{site.base_url}}/feed.xml">

	<!-- Styles -->
  	<!-- <link href="{{ assets('css/style.css') }}" rel="stylesheet" />
  	<link href="//localhost:8080/styles/styles.css" rel="stylesheet" /> -->
  	<link href="//hadi.io/notes/styles/styles-c578f9e4ea.css" rel="stylesheet" />
</head>
<body>
{% if is_login %}
{{ login_form }}
{% else %}
<div class="wrapper">

	<header class="site-header">
	    <div class="author">
	        <div class="author-card">
    			<a href="/" class="avatar"><img src="{{ site.avatar }}" alt="{{ site.author }}'s avatar" /></a>
    		</div>
    		<div class="author-bio">
    			<h1><a href="/" class="header-link">{{ site.author }}</a></h1>
    			<p class="bio">{{ site.bio }} </p>
    		</div>
	    </div>
		<div class="header-nav">
			<nav role="navigation">
				<ul class="nav-home horizontal">
					{% if not is_home %}<li><a href="/" class="btn">All notes</a></li>{% endif %}
				</ul>
				<ul class="nav-pages horizontal">
					{% if pages %}
					{% for page in pages %}
					<li><a href="{{ page.url }}" class="{{ set_active(page.url) }} btn">{{ page.title }}</a></li>
					{% endfor %}
					{% endif %}
				</ul>
			</nav>
		</div>
	</header>

	<div class="website-content" role="main">
		<div class="content">
			{% if is_home or is_tag %}

			{% if is_tag %}
			<header>
				<h2 class="title">Showing all notes tagged #{{ tag }}:</h2>
			</header>
			{% endif %}

			{% if posts %}
			{% for year, items in sort_by_year(posts) %}
			{% if not is_tag %}
			<header>
				<h2 class="title">{{ year }}</h2>
			</header>
			{% endif %}
			<ul class="posts deadList">
				{% for post in items %}
				<li>
					<article itemscope itemtype="http://schema.org/Article">
						<time datetime="{{ post.created_at }}">{{ post.created_at.strftime('%d %b') }}</time> &rsaquo; <a href="{{ post.url }}" class="permalink">{{ post.title }}</a>
					</article>
				</li>
				{% endfor %}
			</ul>
			{% endfor %}
			<div class="pagination">
				{% if pagination.prev %}<a href="{{ pagination.prev }}" class="post-prev">&larr; View Previous</a>{% endif %}
				{% if pagination.next %}<a href="{{ pagination.next }}" class="post-next">View More &rarr;</a>{% endif %}
			</div>
			{% else %}
			<h2 class="title"><em>No posts yet :(</em></h2>
			<p><a href="/">View all posts</a></p>
			{% endif %}

			{% elif post.type == 'post' %}

			<article itemscope itemtype="http://schema.org/Article" class="post">
			    <section class="content">
					<h1 class="title">{{ post.title }}</h1>
					<p class="publisher">Published on <time class="time" datetime="{{ post.created_at }}">{{ post.created_at|date_format }}</time>{% if post.tags %} in {{ post.tags|format_tags(humanize=False) }}{% endif %}</p>

					<div class="post-content" data-type-cleanup="true">
						{{ post.content }}
					</div>
				</section>

				{% if site.disqus %}
				<hr class="large" />
				<section class="comments">
					<div id="disqus_thread"></div>
					<script type="text/javascript">
						var disqus_shortname = '{{ site.disqus }}';
						var disqus_url = '{{site.base_url}}{{ post.url }}';
						(function() {
							var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
							dsq.src = 'http://' + disqus_shortname + '.disqus.com/embed.js';
							(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
						})();
					</script>
					<noscript>
						Please enable JavaScript to view the <a href="http://disqus.com/?ref_noscript">comments powered by Disqus.</a>
					</noscript>
					<a href="http://disqus.com" class="dsq-brlink">comments powered by <span class="logo-disqus">Disqus</span></a>
				</section>
				{% endif %}
			</article>

			{% elif post.type == 'link' %}

			<article class="post">
				<section class="content">
					<h1>{{ link.title }}</h1>
					<p class="muted">Published by {{ site.author }} on {{ link.created_at|date_format }}</p>
					{{ link.content }}
					<span class="link-url"><i class="icon-share"></i> <a href="{{ link.link_url }}">{{ link.link_url }}</a></span>

					{{ theme.social.bar }}
				</section>

				{% if site.disqus %}
				<hr class="large" />
				<section class="comments">
					<div id="disqus_thread"></div>
					<script type="text/javascript">
						var disqus_shortname = '{{ site.disqus }}';
						var disqus_url = '{{site.base_url}}{{ post.url }}';
						(function() {
							var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
							dsq.src = 'http://' + disqus_shortname + '.disqus.com/embed.js';
							(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
						})();
					</script>
					<noscript>
						Please enable JavaScript to view the <a href="http://disqus.com/?ref_noscript">comments powered by Disqus.</a>
					</noscript>
					<a href="http://disqus.com" class="dsq-brlink">comments powered by <span class="logo-disqus">Disqus</span></a>
				</section>
				{% endif %}
			</article>


			{% elif post.type == 'page' %}

			<article class="post">
				<header>
					<h1>{{ page.title }}</h1>
				</header>
				<div class="page-content" data-type-cleanup="true">
					{{ page.content }}
				</div>
			</article>

			{% endif %}
		</div>
	</div>

	<footer class="site-footer">
		<div class="copyright">
			<p>All rights Reserved &copy; <a href="https://hadi.io">{{ site.author }}</a></p>
			<p>Powered by <a href="https://www.evernote.com" target="_blank">Evernote</a> and <a href="http://www.postach.io" target="_blank">Postach.io</a></p>
		</div>
	</footer>
</div>
{% endif %}
</body>
</html>
