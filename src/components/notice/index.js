import noticeInstance from '../base/notification'

let name = 1,
    top = 24,
    defaultDuration = 4.5,
    noticeIntance

let iconType = {
  success: 'fd-notice__icon--success fa-check-circle',
  warning: 'fd-notice__icon--warning fa-exclamation-circle',
  error: 'fd-notice__icon--error fa-times-circle'
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
  let content = `<div class="fd-notice__contents">
                   <span class="float-left fd-notice__icon fa ${iconType[type]}"></span>
                   <div class="float-left fd-notice__txt">
                     <div class="fd-notice__title">${title}</div>
                     <div class="fd-notice__ctxt">${desc}</div>
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