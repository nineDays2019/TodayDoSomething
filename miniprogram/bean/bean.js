class Thing {

    constructor(id, content) {
        this.id = id;
        this.content = content;
        this.isComplete = false;  // 是否完成，初始状态为 falae
        this.createTime = new Date().getTime();
        this.completeTime = null;   // 完成时间
    }

    complete() {
        this.isComplete = true;
        this.completeTime = new Date().getTime();
    }

}