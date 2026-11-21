import * as ui from '@zos/ui'
import { create, id, codec } from '@zos/media'

const W = 480
Page({
  onInit() {
    this.rec = create(id.RECORDER)
    this.recording = false
    this.rec.addEventListener(this.rec.event.START, (ok) => {
      this.recording = Boolean(ok)
      this.status.setProperty(ui.prop.TEXT, ok ? 'Nagrywanie...' : 'Blad mikrofonu')
    })
    this.rec.addEventListener(this.rec.event.STOP, () => {
      this.recording = false
      this.status.setProperty(ui.prop.TEXT, 'Zapisano w zegarku')
    })
  },
  build() {
    ui.createWidget(ui.widget.TEXT, { x: 40, y: 72, w: 400, h: 65, text: 'VOICE NOTES AI', text_size: 34, color: 0xffffff, align_h: ui.align.CENTER_H })
    this.status = ui.createWidget(ui.widget.TEXT, { x: 40, y: 150, w: 400, h: 65, text: 'Gotowy do nagrania', text_size: 25, color: 0xcccccc, align_h: ui.align.CENTER_H })
    ui.createWidget(ui.widget.BUTTON, { x: 95, y: 245, w: 290, h: 76, text: 'START', text_size: 30, color: 0xffffff, normal_color: 0x147d59, press_color: 0x0b5038, click_func: () => {
      if (this.recording) return
      try {
        this.rec.setFormat(codec.OPUS, { target_file: 'data://voice_note.opus' })
        this.rec.start()
        this.status.setProperty(ui.prop.TEXT, 'Uruchamianie...')
      } catch (e) { this.status.setProperty(ui.prop.TEXT, 'Blad START') }
    } })
    ui.createWidget(ui.widget.BUTTON, { x: 95, y: 340, w: 290, h: 76, text: 'STOP', text_size: 30, color: 0xffffff, normal_color: 0x9e3232, press_color: 0x632222, click_func: () => {
      try { this.rec.stop() } catch (e) { this.status.setProperty(ui.prop.TEXT, 'Blad STOP') }
    } })
  },
  onDestroy() { if (this.recording) { try { this.rec.stop() } catch (e) {} } }
})
