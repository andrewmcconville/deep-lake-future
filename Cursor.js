class Cursor {
    constructor() {
        this.position = createVector(10, 10);
        this.width = 24;
        this.height = 36;
        this.image = createGraphics(this.width, this.height);

        this.makeCursor();
    }

    makeCursor() {
        this.image.fill(0);
        this.image.beginShape();
        this.image.vertex(0, 0);
        this.image.vertex(0, 30);
        this.image.vertex(7.5, 23);
        this.image.vertex(14.5, 36);
        this.image.vertex(19, 33);
        this.image.vertex(12, 21);
        this.image.vertex(24, 21);
        this.image.endShape(CLOSE);
    }

    drawCursor() {
        image(this.image, this.position.x, this.position.y);
    }
}