import * as ui from '@zos/ui'
import { codec, create, id } from '@zos/media'

Page({
  build() {
    ui.createWidget(ui.widget.TEXT, {
      x: 40, y: 72, w: 400, h: 65,
      text: 'VOICE NOTES AI', text_size: 34, color: 0xffffff,
      align_h: ui.align.CENTER_H
    })
    this.status = ui.createWidget(ui.widget.TEXT, {
      x: 40, y: 150, w: 400, h: 65,
      text: 'Gotowy do nagrania', text_size: 25, color: 0xcccccc,
      align_h: ui.align.CENTER_H
    })
    ui.createWidget(ui.widget.BUTTON, {
      x: 95, y: 245, w: 290, h: 76,
      text: 'START', text_size: 30, color: 0xffffff,
      normal_color: 0x147d59, press_color: 0x0b5038,
      click_func: () => this.startRecording()
    })
    ui.createWidget(ui.widget.BUTTON, {
      x: 95, y: 340, w: 290, h: 76,
      text: 'STOP', text_size: 30, color: 0xffffff,
      normal_color: 0x9e3232, press_color: 0x632222,
      click_func: () => this.stopRecording()
    })

    this.recordingState = 'idle'
    this.destroyed = false

    try {
      const recorder = create(id.RECORDER)
      recorder.addEventListener(recorder.event.START, (success) => {
        const stopRequested = this.recordingState === 'stop-requested'
        this.recordingState = success ? 'recording' : 'idle'
        if (this.destroyed || (success && stopRequested)) {
          this.stopRecording()
          return
        }
        this.setStatus(success ? 'Nagrywanie…' : 'Błąd mikrofonu')
      })
      recorder.addEventListener(recorder.event.STOP, () => {
        this.recordingState = 'idle'
        this.setStatus('Zapisano w zegarku')
      })
      this.recorder = recorder
    } catch (error) {
      console.log('Recorder initialization failed:', error)
      this.setStatus('Mikrofon niedostępny')
    }
  },

  setStatus(text) {
    if (!this.destroyed) {
      this.status.setProperty(ui.prop.TEXT, text)
    }
  },

  startRecording() {
    if (!this.recorder || this.destroyed || this.recordingState !== 'idle') return

    this.recordingState = 'starting'
    this.setStatus('Uruchamianie…')
    try {
      this.recorder.setFormat(codec.OPUS, { target_file: 'data://voice_note.opus' })
      this.recorder.start()
    } catch (error) {
      console.log('Recorder start failed:', error)
      this.recordingState = 'idle'
      this.setStatus('Błąd START')
    }
  },

  stopRecording() {
    if (this.recordingState === 'starting') {
      this.recordingState = 'stop-requested'
      this.setStatus('Zatrzymywanie…')
      return
    }
    if (this.recordingState !== 'recording') return

    this.recordingState = 'stopping'
    this.setStatus('Zatrzymywanie…')
    try {
      this.recorder.stop()
    } catch (error) {
      console.log('Recorder stop failed:', error)
      this.recordingState = 'recording'
      this.setStatus('Błąd STOP')
    }
  },

  onDestroy() {
    this.destroyed = true
    this.stopRecording()
  }
})
