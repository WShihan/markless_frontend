export const lang = {
  page: {
    tags: {
      add: {
        summary: '添加标签',
        placeholder: '多个标签用&分开',
      },
      manage: {
        summary: '管理标签',
        placeholder: {
          selectTag: '选择标签',
          appliedTag: '选择绑定的书签',
        },
        tip: '↑↑ 选择应用的书签 ↓↓',
      },
    },
    'link-all': {
      search: {
        placeholder: '搜索',
        select: {
          all: '所有',
          read: '已阅',
          unread: '未阅',
        },
      },
      mark: {
        read: '全部标记为已阅',
        unread: '全部标记为未阅',
      },
    },
    'link-add': {
      label: {
        url: '链接',
        desc: '描述',
        read: '已阅',
        tag: '标签',
        wbaas: '浏览器获取',
      },
      summary: '其他选项',
      placeholder: '请选择标签',
    },
    'link-edit': {
      label: {
        url: '链接',
        title: '标题',
        desc: '描述',
        read: '已阅',
        tag: '标签',
        wbaas: '浏览器获取',
      },
      summary: {
        info: '书签信息',
        tag: '标签',
      },
      placeholder: '请选择标签',
      tip: {
        'link-info-get-failed': '获取书签信息失败',
        'link-info-get-success': '获取书签信息成功',
        'link-info-update-failed': '更新书签信息失败',
        'link-info-update-success': '更新书签信息成功',
        'link-tag-update-failed': '更新标签失败',
        'link-tag-update-success': '更新标签失败',
      },
    },
    'link-archive': {
      summary: '快照信息',
      label: {
        url: '链接',
        title: '标题',
        desc: '描述',
        tag: '标签',
      },
      tip: {
        'info-get-success': '获取书签信息成功',
        'info-get-failed': '获取书签信息失败',
      },
    },
    setting: {
      label: {
        username: '用户名',
        admin: '管理员',
        lang: '语言',
        theme: '主题',
        'password-now': '旧密码',
        'password-new': '新密码',
        'password-confirm': '确认密码',
        'base-url': '根路由',
        version: '版本',
        'git-id': 'Git提交ID',
        'build-time': '构建时间',
        wbaas: "浏览器密钥",
        'lang-opt': {
          en: '英文',
          'zh-TW': '中文繁体',
          'zh-CN': '中文简体',
        },
        'theme-opt': {
          normal: '明亮',
          dark: '黑暗',
        },
      },
      summary: {
        user: '用户',
        'user-info': '信息',
        password: '修改密码',
        token: '密钥',
        env: '应用信息',
      },
    },
    login: {
      label: {
        username: '用户名',
        password: '密码',
        submit: '登录',
        'to-register': '去注册',
        tip: {
          'username-invalid': '用户名错误',
          'password-invalid': '密码错误',
        },
      },
    },
    register: {
      label: {
        username: '用户名',
        password: '密码',
        'password-confirm': '确认密码',
        submit: '注册',
        'to-login': '去登录',
      },
      tip: {
        'username-invalid': '用户名错误',
        'password-invalid': '密码错误',
        'password-inconsistent': '密码不一致',
      },
    },
  },
  link: {
    label: {
      read: '标记已阅',
      unread: '标记未阅',
      edit: '编辑',
      copy: '复制链接',
      archive: '快照',
      delete: '删除',
    },
  },
  navs: {
    'link-all': '书签',
    'link-add': '+书签',
    tags: '标签',
    setting: '设置',
    logout: '登出',
  },
  confirm: {
    update: '确认更新吗',
    delete: '确认删除吗',
    add: '确认添加吗',
    cancel: '取消',
  },
  submit: {
    update: '更新',
    delete: '删除',
    add: '添加',
    create: '创建',
    cancel: '取消',
    login: '登录',
    register: '注册',
  },
  message: {
    success: {
      add: '添加成功',
      update: '更新成功',
      delete: '删除成功',
      common: '成功',
      register: '注册成功',
    },
    failed: {
      get: '获取信息失败',
      add: '添加失败',
      update: '更新失败',
      delete: '删除失败',
      common: '操作失败',
      register: '注册失败',
    },
  },
};

export default lang;
