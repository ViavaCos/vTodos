import { render } from 'react-dom'
import '../style/dialog.scss'

interface Dialog {
  id: number; // 弹窗id (not-use)
  open(): void; // 打开
  close(): void; // 关闭
  confirm(): void; // 确认
  cancel(): void; // 取消
}

class MyDialog implements Dialog {

  id: number = 0
  dialogWrap: Element | null = null

  construector() {
    const myDialogList = document.getElementsByClassName('my-dialog') || []
    const lastId = myDialogList.length 
      ? (myDialogList[myDialogList.length - 1].getAttribute('data-id')) 
      : 0
    this.id = lastId ? +lastId + 1 : 1
  }

  open(callBack?: Function){
    let dialogWrap = document.getElementById('my-dialog-wrap')
    if(!dialogWrap) {
      this.dialogWrap = document.createElement('div')
      this.dialogWrap.setAttribute('id', 'my-dialog-wrap')
      document.body.append(this.dialogWrap)
    } else {
      this.dialogWrap = dialogWrap
    }

    const element = (<div className="my-dialog" data-id={this.id}>
      <div className="my-dialog-title">确认弹窗</div>
      <div className="my-dialog-content">是否确定删除?</div>
      <div className="my-dialog-operation">
        <div className="cancel" onClick={this.close.bind(this)}>取消</div>
        <div className="confirm" onClick={this.confirm.bind(this, callBack)}>确定</div>
      </div>
    </div>)

    render(element, this.dialogWrap)
  }

  close(){
    this.dialogWrap?.remove()
  }

  confirm(callBack?: Function){
    callBack && callBack()
    this.close()
  }

  cancel(){
    this.close()
  }
}

export default MyDialog
