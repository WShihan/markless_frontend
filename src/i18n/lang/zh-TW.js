export const lang = {
  page: {
    tags: {
      add: {
        summary: '添加標籤',
        placeholder: '多個標籤用&分開',
      },
      manage: {
        summary: '管理標籤',
        placeholder: {
          selectTag: '選擇標籤',
          appliedTag: '選擇綁定的書籤',
        },
        tip: '↑↑ 選擇應用的書籤 ↓↓',
      },
    },
    'link-all': {
      search: {
        placeholder: '搜尋',
        select: {
          all: '所有',
          read: '已閱',
          unread: '未閱',
        },
      },
      mark: {
        read: '全部標記為已閱',
        unread: '全部標記為未閱',
      },
    },
    'link-add': {
      label: {
        url: '連結',
        desc: '描述',
        read: '已閱',
        tag: '標籤',
      },
      summary: '其他選項',
      placeholder: '請選擇已有標籤或者輸入新標籤',
    },
    'link-edit': {
      label: {
        url: '連結',
        title: '標題',
        desc: '描述',
        read: '已閱',
        tag: '標籤',
      },
      summary: {
        info: '書籤資訊',
        tag: '標籤',
      },
      placeholder: '請選擇標籤',
      tip: {
        'link-info-get-failed': '獲取書籤資訊失敗',
        'link-info-get-success': '獲取書籤資訊成功',
        'link-info-update-failed': '更新書籤資訊失敗',
        'link-info-update-success': '更新書籤資訊成功',
        'link-tag-update-failed': '更新標籤失敗',
        'link-tag-update-success': '更新標籤成功',
      },
    },
    'link-archive': {
      summary: '快照資訊',
      label: {
        url: '連結',
        title: '標題',
        desc: '描述',
        tag: '標籤',
      },
      tip: {
        'info-get-success': '獲取書籤資訊成功',
        'info-get-failed': '獲取書籤資訊失敗',
      },
    },
    setting: {
      label: {
        username: '用戶名',
        admin: '管理員',
        lang: '語言',
        theme: '主題',
        'password-now': '舊密碼',
        'password-new': '新密碼',
        'password-confirm': '確認密碼',
        'base-url': '根路由',
        version: '版本',
        'git-id': 'Git提交ID',
        'build-time': '構建時間',
        'lang-opt': {
          en: '英文',
          'zh-TW': '中文繁體',
          'zh-CN': '中文簡體',
        },
        'theme-opt': {
          normal: '正常',
          dark: '黑暗',
        },
      },
      summary: {
        user: '用戶資訊',
        password: '修改密碼',
        token: '修改密鑰',
        env: '應用資訊',
      },
    },
    login: {
      label: {
        username: '用戶名',
        password: '密碼',
        submit: '登錄',
        'to-register': '去註冊',
        tip: {
          'username-invalid': '用戶名錯誤',
          'password-invalid': '密碼錯誤',
        },
      },
    },
    register: {
      label: {
        username: '用戶名',
        password: '密碼',
        'password-confirm': '確認密碼',
        submit: '註冊',
        'to-login': '去登錄',
      },
      tip: {
        'username-invalid': '用戶名錯誤',
        'password-invalid': '密碼錯誤',
        'password-inconsistent': '密碼不一致',
      },
    },
  },
  link: {
    label: {
      read: '標記已閱',
      unread: '標記未閱',
      edit: '編輯',
      copy: '複製連結',
      archive: '快照',
      delete: '刪除',
    },
  },
  navs: {
    'link-all': '書籤',
    'link-add': '+書籤',
    tags: '標籤',
    setting: '設定',
    logout: '登出',
  },
  confirm: {
    update: '確認更新嗎',
    delete: '確認刪除嗎',
    add: '確認添加嗎',
    cancel: '取消',
  },
  submit: {
    update: '更新',
    delete: '刪除',
    add: '添加',
    create: '創建',
    cancel: '取消',
    login: '登錄',
    register: '註冊',
  },
  message: {
    success: {
      add: '添加成功',
      update: '更新成功',
      delete: '刪除成功',
      common: '成功',
      register: '註冊成功',
    },
    failed: {
      get: '獲取資訊失敗',
      add: '添加失敗',
      update: '更新失敗',
      delete: '刪除失敗',
      common: '操作失敗',
      register: '註冊失敗',
    },
  },
};

export default lang;
