export default function LinkedBuffer(size) {
    this.size = size;
    this.current = new Buffer(size);
    this.head = this.current;
    this.tail = this.current;
    this.bufferCount= 1;
    this.getTotalSize = function () {
        var full = (this.bufferCount-1) * this.size;
        var size =full + this.current.position;
        return size;
    }

    this.increaseBuffer = function () {
        this.bufferCount ++;
        this.current.next = new Buffer(size);
        this.current.next.index = this.current.index+1;
        this.current = this.current.next;
        this.tail = this.current;
    }

    this.writeByte = function (b) {
        var space = this.current.space();
        if (space > 0) {
            this.current.writeByte(b);
        } else if (this.current.next == null) {
            this.increaseBuffer();
            this.current.writeByte(b);
        } else {
            this.current = this.current.next;
            this.current.position = 0;
            this.current.writeByte(b);
        }
    }

    this.writeBytes = function(bytes) {
        var wrote = 0;
        var remain;
        while((remain = bytes.byteLength - wrote) > 0) {
            var space = this.current.space();
            var count = Math.min(space,remain);
            this.current.writeBytes(bytes,wrote,count);
            if (space < remain) {
                if (this.current.next == null) {
                    this.increaseBuffer();
                } else {
                    this.current = this.current.next;
                    this.current.position = 0;
                }
            }
            wrote += count;
        };
    }

    this.jump = function(count) {
        var currentLeft = this.current.space();
        if (count <= currentLeft) {
            this.current.position += count;
            return;
        }
        var bufferNeed = Math.floor((count - currentLeft + size -1) / size);
        var left = (count - currentLeft) % size;
        this.current.position = size;
        for(var i=0;i<bufferNeed;i++) {
            if (this.current.next == null) {
                this.increaseBuffer();
            } else {
                this.current.position = size;
                this.current = this.current.next;
            }
        }
        this.current.position = left;
    }


    this.seek = function(position) {
        var index = Math.floor(position / size);
        var left = position % size;
        var b = this.head;
        for(var i=0;i<index;i++) {
            b.position = size;
            b = b.next;
            if (b != null) {
                this.current = b;
            }
        }
        if (b != null) {
            b.position = left;
            this.current = b;
        }
    }

    this.getPosition = function () {
        return this.current.index * this.size + this.current.position;
    }

    this.toBytes = function () {
        var totalSize = this.getTotalSize();
        var resultBuffer = new ArrayBuffer(totalSize);
        var resultDataView = new DataView(resultBuffer);

        var h = this.head;
        var index = 0;
        var count = Math.floor(totalSize / size);
        var left = totalSize % size;
        for(var i=0;i<count;i++) {
            for(var j=0;j<h.position;j++) {
                resultDataView.setInt8(index,h.dataView.getInt8(j));
                index++;
            }
            h = h.next;
        }
        if (h != null && left > 0) {
            for(var j=0;j<h.position;j++) {
                resultDataView.setInt8(index,h.dataView.getInt8(j));
                index++;
            }
        }
        return resultBuffer;
    }
}

function Buffer(size) {
    this.size = size;
    this.buffer = new ArrayBuffer(size);
    this.dataView = new DataView(this.buffer);
    this.position = 0;
    this.index = 0;
    this.writeByte = function (b)  {
        this.dataView.setInt8(this.position,b);
        this.position++;
    }
    this.writeBytes = function(bytes,start,count) {
        var dataView = new DataView(bytes);
        for (var s = start; s < start + count; s++) {
            this.writeByte(dataView.getInt8(s));
        }
    }
    this.space = function () {
        return this.buffer.byteLength - this.position;
    }
}