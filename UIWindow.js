class UIWindow {
    constructor(config) {
      this.position = config.position;
      this.size = config.size;
      this.width = this.size;
      this.height = this.size * 3 / 4;
      this.title = config.title;
      this.outlineWidth = 1;
      this.resizeHandleOffset = 24 + (this.outlineWidth * 2);
      this.shadowOffset = 4;
      this.frameOuterMargin = 0;
      this.frameOuterBorder = {
        margin: this.frameOuterMargin,
        position: createVector(this.frameOuterMargin, this.frameOuterMargin),
        width: this.width - (this.frameOuterMargin * 2) - this.shadowOffset,
        height: this.height - (this.frameOuterMargin * 2) - this.shadowOffset,
      }
      this.frameMargin = 1 * this.outlineWidth;
      this.frame = {
        margin: this.frameMargin + this.frameOuterBorder.margin,
        position: createVector(this.frameOuterBorder.position.x + this.frameMargin, this.frameOuterBorder.position.y + this.frameMargin),
        width: this.frameOuterBorder.width - (this.frameMargin * 2),
        height: this.frameOuterBorder.height - (this.frameMargin * 2),
      }
      this.frameInnerMargin = 2 * this.outlineWidth;
      this.frameInner = {
        margin: this.frameInnerMargin + this.frame.margin,
        position: createVector(this.frame.position.x + this.frameInnerMargin, this.frame.position.y + this.frameInnerMargin),
        width: this.frame.width - (this.frameInnerMargin * 2),
        height: this.frame.height - (this.frameInnerMargin * 2),
      }
      this.headerHeight = 24;
      this.headerMargin = 1 * this.outlineWidth;
      this.header = {
        margin: this.headerMargin + this.frameInner.margin,
        position: createVector(this.frameInner.position.x + this.headerMargin, this.frameInner.position.y + this.headerMargin),
        width: this.frameInner.width - (this.headerMargin * 2),
        height: this.headerHeight,
      }
      this.toolBarHeight = 24;
      this.toolBarMargin = 1 * this.outlineWidth;
      this.toolBar = {
        margin: this.toolBarMargin + this.frameInner.margin,
        position: createVector(this.frameInner.position.x + this.toolBarMargin, this.frameInner.position.y + this.toolBarMargin + this.header.height,),
        width: this.frameInner.width - (this.headerMargin * 2),
        height: this.toolBarHeight,
      }
      this.footerHeight = 24;
      this.footerMargin = 1 * this.outlineWidth;
      this.footer = {
        margin: this.footerMargin + this.frameInner.margin,
        position: createVector(this.frameInner.position.x + this.footerMargin, this.frameInner.height + this.footerMargin + this.footerMargin - this.footerHeight,),
        width: this.frameInner.width - (this.headerMargin * 2),
        height: this.footerHeight,
      }
      this.contentMargin = 1 * this.outlineWidth;
      this.content = {
        margin: this.contentMargin + this.frameInner.margin,
        position: createVector(this.frameInner.position.x + this.contentMargin, this.frameInner.position.y + this.contentMargin + this.header.height),
        width: this.frameInner.width - (this.contentMargin * 2),        
        height: this.frameInner.height - (this.contentMargin * 2) - this.header.height,
      };
      this.borderStrokeColor = [
        fillHSL.h,
        50,
        70,
      ];
      this.contents = [];
      this.image = createGraphics(this.width, this.height);
      this.image.colorMode(HSL, 360, 100, 100, 1);
      this.image.noStroke();
      this.image.noFill();

      this.overlay = createGraphics(this.width, this.height);
      this.overlay.colorMode(HSL, 360, 100, 100, 1);
      this.overlay.noStroke();
      this.overlay.noFill();
      
      this.makeShadow();
      this.makeFrameOuterBorder();
      this.makeFrame();
      this.makeFrameInnerBorder();
      this.makeContent();
      this.makeHeader();
      this.makeToolBar();
      this.makeFooter();
      
      // this.image.filter(BLUR, 3);
      // this.overlay.filter(BLUR, 3);
    }
    
    drawWindow() {
      image(this.image, this.position.x, this.position.y);
    }
    
    drawWindowOverlay() {
      image(this.overlay, this.position.x, this.position.y);
    }
    
    makeShadow() {
      this.image.fill(fillHSL.h, 30, 60, 0.1);
      this.image.rect(this.shadowOffset, this.shadowOffset, this.width, this.height);
    }
    
    makeFrameOuterBorder() {
      this.image.fill(this.borderStrokeColor);
      this.image.rect(this.frameOuterBorder.position.x, this.frameOuterBorder.position.y, this.frameOuterBorder.width, this.frameOuterBorder.height);
    }
    
    makeFrame() {
      this.image.fill(fillHSL.h, 30, 88);
      this.image.rect(this.frame.position.x, this.frame.position.y, this.frame.width, this.frame.height);
      this.image.push();
      this.image.strokeCap(PROJECT);
      this.image.stroke(this.borderStrokeColor);
      this.image.strokeWeight(this.outlineWidth);
      this.image.line(
        this.frame.margin / 2 + this.frame.position.x + this.resizeHandleOffset,
        this.frame.margin / 2 + this.frame.position.y,
        this.frame.margin / 2 + this.frame.position.x + this.resizeHandleOffset,
        this.frame.margin / 2 + this.frame.height
      );
      this.image.line(
        this.frame.margin / 2 + this.frame.width - this.resizeHandleOffset,
        this.frame.margin / 2 + this.frame.position.y,
        this.frame.margin / 2 + this.frame.width - this.resizeHandleOffset,
        this.frame.margin / 2 + this.frame.height
      );
      this.image.line(
        this.frame.margin / 2 + this.frame.position.x,
        this.frame.margin / 2 + this.frame.position.y + this.resizeHandleOffset, 
        this.frame.margin / 2 + this.frame.width,
        this.frame.margin / 2 + this.frame.position.y + this.resizeHandleOffset
      );
      this.image.line(
        this.frame.margin / 2 + this.frame.position.x,
        this.frame.margin / 2 + this.frame.position.y + this.frame.height - this.resizeHandleOffset - this.frame.margin,
        this.frame.margin / 2 + this.frame.width,
        this.frame.margin / 2 + this.frame.position.y + this.frame.height - this.resizeHandleOffset - this.frame.margin
      );
      this.image.pop();
    }
    
    makeFrameInnerBorder() {
      this.image.fill(this.borderStrokeColor);
      this.image.rect(this.frameInner.position.x, this.frameInner.position.y, this.frameInner.width, this.frameInner.height);
    }
    
    makeHeader() {
      this.image.fill(fillHSL.h, 20, 99);
      this.image.rect(this.header.position.x, this.header.position.y, this.header.width, this.header.height);
      this.image.push();
      this.image.strokeCap(PROJECT);
      this.image.stroke(this.borderStrokeColor);
      this.image.strokeWeight(this.outlineWidth)
      this.image.line(
        this.header.position.x + (this.outlineWidth / 2),
        this.header.position.y + this.header.height - (this.outlineWidth / 2),
        this.header.position.x + this.header.width - (this.outlineWidth / 2),
        this.header.position.y + this.header.height - (this.outlineWidth / 2),
      );
      this.image.pop();
      new TextLabel(
        {
          text: this.title,
          style: BOLD,
          size: 11,
          fill: {
            h: fillHSL.h,
            s: fillHSL.s - 10,
            l: fillHSL.l + 10,
          },
          x: this.header.position.x,
          y: this.header.position.y,
          width: this.header.width,
          height: this.header.height,
          horizAlign: CENTER,
          vertAlign: CENTER,
        }
      ).drawTextLabel(this.image);
    }
    
    makeToolBar() {
      this.overlay.fill(fillHSL.h, 40, 92, 0.7);
      this.overlay.rect(this.toolBar.position.x, this.toolBar.position.y, this.toolBar.width, this.toolBar.height);
      this.overlay.push();
      this.overlay.strokeCap(PROJECT);
      this.overlay.stroke(this.borderStrokeColor);
      this.overlay.strokeWeight(this.outlineWidth)
      this.overlay.line(
        this.toolBar.position.x + (this.outlineWidth / 2),
        this.toolBar.position.y + this.toolBar.height - (this.outlineWidth / 2),
        this.toolBar.position.x + this.toolBar.width - (this.outlineWidth / 2),
        this.toolBar.position.y + this.toolBar.height - (this.outlineWidth / 2),
      );
      this.overlay.pop();
      new TextLabel(
        {
          text: "File   Edit",
          style: NORMAL,
          size: 11,
          fill: {
            h: fillHSL.h,
            s: fillHSL.s,
            l: fillHSL.l,
          },
          x: this.toolBar.position.x + 8,
          y: this.toolBar.position.y,
          width: this.toolBar.width - 16,
          height: this.toolBar.height,
          horizAlign: LEFT,
          vertAlign: CENTER,
        }
      ).drawTextLabel(this.overlay);
    }
    
    makeFooter() {
      this.overlay.fill(fillHSL.h, 40, 92, 0.7);
      this.overlay.rect(this.footer.position.x, this.footer.position.y, this.footer.width, this.footer.height);
      this.overlay.push();
      this.overlay.strokeCap(PROJECT);
      this.overlay.stroke(this.borderStrokeColor);
      this.overlay.strokeWeight(this.outlineWidth)
      this.overlay.line(
        this.footer.position.x + (this.outlineWidth / 2),
        this.footer.position.y + (this.outlineWidth / 2),
        this.footer.position.x + this.footer.width - (this.outlineWidth / 2),
        this.footer.position.y + (this.outlineWidth / 2),
      );
      this.overlay.pop();
      new TextLabel(
        {
          text: `x:${this.position.x}, y:${this.position.y}`,
          style: NORMAL,
          size: 11,
          fill: {
            h: fillHSL.h,
            s: fillHSL.s,
            l: fillHSL.l,
          },
          x: this.footer.position.x + 8,
          y: this.footer.position.y + this.outlineWidth,
          width: this.footer.width - 16,
          height: this.footer.height,
          horizAlign: RIGHT,
          vertAlign: CENTER,
        }
      ).drawTextLabel(this.overlay);
    }
    
    makeContent() {
      let from = color(fillHSL.h - 100, 30, 90, 1);
      let to = color(fillHSL.h - 100, 20, 95, 0);

      this.image.fill(fillHSL.h, 20, 95);
      this.image.rect(this.content.position.x, this.content.position.y, this.content.width, this.content.height);

      for(let i = this.headerHeight; i < 80; i++) {
        let inter = map(i, 0, 80, 0, 1);
        let color = lerpColor(from, to, inter);
        this.image.fill(color)
        this.image.rect(this.content.position.x, this.content.position.y + i, this.content.width, 1);
      }
    }
    
    getContainerBounds() {
      return {      
        left: this.position.x + this.content.position.x,      
        right: this.position.x + this.content.position.x + this.content.width,
        top: this.position.y + this.content.position.y,
        bottom: this.position.y + this.content.position.y + this.content.height,
      }
    }
  }