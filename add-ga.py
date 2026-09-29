import glob

GA_ID = "G-SMDRR9RTGG"

snippet = f"""<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id={GA_ID}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){{dataLayer.push(arguments);}}
  gtag("js", new Date());
  gtag("config", "{GA_ID}");
</script>
"""

files = glob.glob("public/results/*.html")
for f in files:
    with open(f, encoding="utf-8") as fp:
        content = fp.read()
    if GA_ID in content:
        print("已有追蹤碼，跳過：", f)
        continue
    content = content.replace("</head>", snippet + "</head>")
    with open(f, "w", encoding="utf-8") as fp:
        fp.write(content)
    print("已加入追蹤碼：", f)
