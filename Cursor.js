class Cursor {
    constructor(config) {
        this.scale = random(0.5, 1.5);
        this.width = 15 * this.scale;
        this.height = 21 * this.scale;
        this.container = config.container;
        this.leftBound = config.container.getContainerBounds().left + (this.width / this.scale);
        this.rightBound = config.container.getContainerBounds().right - (this.width / this.scale);
        this.topBound = config.container.getContainerBounds().top + (this.width / this.scale);
        this.bottomBound = config.container.getContainerBounds().bottom - (this.width / this.scale);
        this.minSpeed = 1;
        this.maxSpeed = 3;
        this.velocity = createVector(0, 1).mult(random(this.minSpeed, this.maxSpeed));
        this.position = createVector(
            floor(random(this.leftBound, this.rightBound)),
            this.topBound
        );
        this.angle = random(0, 360);
        this.angleSpeed = random(-0.05, 0.05);

        this.cursor = createGraphics(this.width, this.height);
        this.cursor.colorMode(HSL, 360, 100, 100, 1);
        this.cursor.noStroke();
        this.cursor.noFill();

        this.makeCursor();
    }

    makeCursor() {
        this.cursor.push();
        this.cursor.strokeCap(SQUARE);
        this.cursor.stroke(fillHSL.h, 100, 40, 1);
        this.cursor.strokeWeight(1 * this.scale / 2);
        this.cursor.fill(fillHSL.h, 40, 92, 1);
        this.cursor.beginShape();
        this.cursor.vertex(2 * this.scale, 3 * this.scale);
        this.cursor.vertex(2 * this.scale, 18 * this.scale);
        this.cursor.vertex(6 * this.scale, 15 * this.scale);
        this.cursor.vertex(8 * this.scale, 19 * this.scale);
        this.cursor.vertex(10 * this.scale, 18 * this.scale);
        this.cursor.vertex(8 * this.scale, 14 * this.scale);
        this.cursor.vertex(13 * this.scale, 13 * this.scale);
        this.cursor.endShape(CLOSE);
        this.cursor.pop();
    }

    drawCursor() {
        if(this.position.y > this.bottomBound) {
            this.position = createVector(
                floor(random(this.leftBound, this.rightBound)),
                this.topBound
            );
            this.velocity = createVector(0, 1).mult(random(this.minSpeed, this.maxSpeed));
        }

        push();
        this.position = this.position.add(this.velocity);
        imageMode(CENTER);
        translate(this.position.x, this.position.y);
        rotate(this.angle += this.angleSpeed);
        image(this.cursor, 0, 0);
        pop();
    }
}