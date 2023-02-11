class TextLabel {
    constructor(config) {
        this.text = config.text;
        this.font = '"IBM Plex Mono",Arial,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif';
        this.style = config.style;
        this.size = config.size;
        this.fill = config.fill;
        this.position = createVector(config.x, config.y);
        this.width = config.width;
        this.height = config.height;
        this.horizAlign = config.horizAlign;
        this.vertAlign = config.vertAlign;
    }

    drawTextLabel(buffer) {
        buffer.textFont(this.font);
        buffer.textStyle(this.style);
        buffer.textSize(this.size);
        buffer.fill(this.fill.h, this.fill.s, this.fill.l);
        buffer.textAlign(this.horizAlign, this.vertAlign);
        buffer.text(this.text, this.position.x, this.position.y, this.width, this.height);
    }
}