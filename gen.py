import os
import re

# 設定你的文件根目錄 (例如 Docusaurus 的 docs 或 blog 資料夾)
# 如果腳本放在專案根目錄，可以設定為 './docs' 或 './blog'
search_dir = '.' 

def get_slug_from_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        # 使用正規表達式尋找 slug: /xxxx
        match = re.search(r'^slug:\s*(.*)$', content, re.MULTILINE)
        if match:
            return match.group(1).strip()
    return None

def generate_js():
    paths = []
    
    for root, dirs, files in os.walk(search_dir):
        for file in files:
            if file == "index.md":
                full_path = os.path.join(root, file)
                slug = get_slug_from_file(full_path)
                if slug:
                    # 確保 slug 以 / 開頭
                    if not slug.startswith('/'):
                        slug = '/' + slug
                    paths.append(slug)

    # 格式化成 JS 陣列字串
    formatted_paths = ",\n      ".join([f"'{p}'" for p in paths])

    js_template = f"""import {{ useEffect }} from 'react';
import {{ useHistory }} from '@docusaurus/router';
import {{ useBaseUrlUtils }} from '@docusaurus/useBaseUrl';

export default function RandomPage() {{
  const history = useHistory();
  const {{ withBaseUrl }} = useBaseUrlUtils();

  useEffect(() => {{
    const pages = [
      {formatted_paths}
    ];

    const randomPath =
      pages[Math.floor(Math.random() * pages.length)];

    history.replace(withBaseUrl(randomPath));
  }}, [history, withBaseUrl]);

  return <div>🎲 正在跳轉到隨機頁面...</div>;
}}
"""
    return js_template

if __name__ == "__main__":
    result = generate_js()
    
    # 輸出到螢幕方便複製，或者直接寫入檔案
    print(result)
    
    with open('random.js', 'w', encoding='utf-8') as f:
        f.write(result)
    print("\n✅ random.js 已生成成功！")


