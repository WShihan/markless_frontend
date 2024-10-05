import os
from translate import Translator
import json



def translatei18n(translator, to="en"):
    folder = "/Users/wsh/Public/markless-github/local/translations/"
    zh_dic = json.load(open(os.path.join(folder, "zh-CN.json"), 'r', encoding='utf-8'))

    existed_file_path = os.path.join(folder, f"{to}.json")
    if os.path.exists(existed_file_path):
        with open(existed_file_path, 'r', encoding='utf-8') as f:
            existed_dic = json.load(f)
    else:
        existed_dic = {}

    new_dic = {}

    for k, v in zh_dic.items():
        if existed_dic.get(k):
            new_dic[k] = existed_dic[k]
            continue
        else:
            try:
                val = translator.translate(v.replace(' ', ''))
                new_dic[k] = val
                print(f'translate:{k}：{val}')
            except Exception as e:
                new_dic[k] = v

    with open(os.path.join(folder, f"{to}.json"), 'w', encoding='utf-8') as f:
        json.dump(new_dic, f, ensure_ascii=False, indent=4)



translatei18n(Translator(from_lang="Chinese",to_lang="English"), to="en")
translatei18n(Translator(from_lang="Chinese",to_lang="Japanese"), to="ja")
translatei18n(Translator(from_lang="zh-CN", to_lang="zh-TW"), to="zh-TW")
