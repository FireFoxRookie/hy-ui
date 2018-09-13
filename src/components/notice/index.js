import noticeInstance from '../base/notification'

let name = 1,
    top = 24,
    defaultDuration = 4.5,
    noticeIntance

let iconType = {
  success: require('../../assets/img/hy-success.png'),
  warning: require('../../assets/img/hy-warning.png'),
  error: require('../../assets/img/hy-error.png')
}

function getNoticeIntance() {
  noticeIntance = noticeIntance || new noticeInstance.newInstance({
    styles: {
      top: `${top}px`,
      right: 0
    }
  })
  return noticeIntance
}

function notice(type, option) {
  let title = option.title
  let desc = option.desc
  let duration = option.duration || defaultDuration
  let instance = getNoticeIntance()
  let content = `<div class="fd-notice-contents">
                   <img class="float-left fd-notice-icon" src="${iconType[type]}"></div>
                   <div class="float-left fd-notice-txt">
                     <div class="fd-notice-title">${title}</div>
                     <div class="fd-notice-ctxt">${desc}</div>
                   </div>
                   <div class="clear"></div>
                 </div>`
  instance.notice({
    name: 'fd-notice' + name,
    content: content,
    duration: duration
  })
  name++
}

export default {
  success(options) {
    return notice('success', options)
  },
  warning(options) {
    return notice('warning', options)
  },
  error(options) {
    return notice('error', options)
  }
}