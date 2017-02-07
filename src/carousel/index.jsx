import React, { Component } from 'react';
import { Link } from 'react-router';
import Classnames from 'classnames';

import './index.less';

const CLASS_PREFIX = 'fan-';
const CAROUSEL_CLASS = `${CLASS_PREFIX}carousel`;
const CAROUSEL_HORIZONTAL = `${CAROUSEL_CLASS}-horizontal`;
const CAROUSEL_VERTICAL = `${CAROUSEL_CLASS}-vertical`;
const CAROUSEL_SCROLL = `${CAROUSEL_CLASS}-scroll`;
const CAROUSEL_DOTTOOL = `${CAROUSEL_CLASS}-dottool`;
const CAROUSEL_ITEM = `${CAROUSEL_CLASS}-item`;
const CAROUSEL_DOT_ACTIVE = `${CAROUSEL_CLASS}-dot-active`;

const propTypes = {
  activePage: React.PropTypes.number, // 当前页数
  dotTool: React.PropTypes.bool,  // 是否显示圆点指示工具
  autoPlay: React.PropTypes.bool,  // 是否自动轮播页面
  wheelTrigger: React.PropTypes.bool,   // 滚轮是否触发页面改变
  focusOnSelect: React.PropTypes.bool,   // 滚轮是否触发页面改变
  mode: React.PropTypes.oneOf(['vertical', 'horizontal']),
  onSelect: React.PropTypes.func
};

const defaultProps = {
  activePage: 0,
  dotTool: false,
  autoPlay: false,
  wheelTrigger: false,
  focusOnSelect: false,
  mode: 'vertical',
  onSelect: () => {}
};

class Carousel extends Component {

  constructor(props, context) {
    super(props, context);

    const activePage = this.props.activePage || 0;
    this.state = { activePage };

    this.handlePackageCarouselItem = this.handlePackageCarouselItem.bind(this);
    this.handleRenderDots = this.handleRenderDots.bind(this);
    this.handleChangeDotsState = this.handleChangeDotsState.bind(this);
    this.handleClickDot = this.handleClickDot.bind(this);
    this.handleChangeActivePage = this.handleChangeActivePage.bind(this);
    this.handleChangeShowPage = this.handleChangeShowPage.bind(this);
    this.handleMouseWheel = this.handleMouseWheel.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if ('activePage' in nextProps) {
      const nextActive = nextProps.activePage;
      const prevActive = this.state.activePage;

      if (nextActive !== prevActive) {
        this.handleChangeActivePage(nextActive);
      }
    }
  }

  componentDidMount() {
    this.scrollable = true;
    this.handlePackageCarouselItem();
    this.handleRenderDots();
    this.handleChangeDotsState();
    this.handleChangeShowPage();
    this.carousel.addEventListener('mousewheel', this.handleMouseWheel);
  }

  componentDidUpdate() {
    this.handleChangeDotsState();
    this.handleChangeShowPage();
  }

  componentWillUnmount() {
    this.carousel.removeEventListener('mousewheel', this.handleMouseWheel);
  }

  render() {
    const { className, autoPlay, wheelTrigger, focusOnSelect, activePage, mode, dotTool, onSelect, children, ...rest } = this.props;

    const classes = Classnames(className, CAROUSEL_CLASS, {
      [CAROUSEL_HORIZONTAL]: mode === 'horizontal',
      [CAROUSEL_VERTICAL]: mode !== 'horizontal'
    });

    let dottoolDOM = '';
    if (dotTool) {
      dottoolDOM = <div className={CAROUSEL_DOTTOOL} ref={(dottool) => { this.dottool = dottool; }} />;
    }

    const reactDOM = (
      <div {...rest} className={classes} ref={(carousel) => { this.carousel = carousel; }}>
      <div className={CAROUSEL_SCROLL}>{children}</div>
      {dottoolDOM}
      </div>
    );

    return reactDOM;
  }

  /* 对轮播子元素封装 */
  handlePackageCarouselItem() {
    const self = this;
    const carouselWidth = this.carousel.clientWidth;
    const carouselHeight = this.carousel.clientHeight;
    const carouselNodes = this.carousel.firstChild.childNodes;
    self.number = carouselNodes.length;
    carouselNodes.forEach((child) => {
      child.className = `${child.className} ${CAROUSEL_ITEM}`;
      child.style.width = '100%';
      child.style.height = `${carouselHeight}px`;
    });
  }

  /* dotTool 为 true 时, 渲染 dots 元素 */
  handleRenderDots() {
    const self = this;
    const dotToolNode = this.dottool;
    if (!dotToolNode) return false;

    const nodeIterator = { number: self.number, nodeDom: '' };
    nodeIterator[Symbol.iterator] = function (number) {  // 自定义迭代
      let currentIndex = -1;
      return {
        next: () => {
          currentIndex += 1;
          if (currentIndex < this.number) {
            this.nodeDom += `<span data-index="${currentIndex}"></span>`;
            return { value: currentIndex, done: false };
          }
          return { done: true };
        },
      };
    };
    const Do = [...nodeIterator];  // 执行
    dotToolNode.innerHTML = nodeIterator.nodeDom;

    dotToolNode.childNodes.forEach((child) => {
      child.addEventListener('click', self.handleClickDot);
    });
  }

  /* 根据当前所在页面,滚动到对应的页面 */
  handleChangeShowPage() {
    const self = this;
    const scrollView = self.carousel.firstChild;
    const carouselOffsetY = -self.carousel.clientHeight * this.state.activePage;
    scrollView.style.transform = `translateY(${carouselOffsetY}px)`;
  }

  /* 根据当前所在页面,让对应 dot 高亮 */
  handleChangeDotsState() {
    const self = this;
    const dotToolNode = this.dottool;
    if (!dotToolNode) return false;
    dotToolNode.childNodes.forEach((child, index) => {
      if (index === this.state.activePage) {
        child.className = CAROUSEL_DOT_ACTIVE;
      } else {
        child.className = '';
      }
    });
  }

  /* 点击 dot */
  handleClickDot(event) {
    const self = this;
    const dotToolNode = this.dottool;
    const activePage = parseInt(event.target.attributes['data-index'].value, 10);
    this.handleChangeActivePage(activePage);
  }

  /* 处理滚轮触发页面变动 */
  handleMouseWheel() {
    const self = this;
    let activePage = this.state.activePage;
    if (!self.scrollable) return false;
    if (event.deltaY > 0) {
      if (activePage < this.number - 1) {
        activePage += 1;
        self.handleChangeActivePage(activePage);
        self.scrollable = false;
      }
    } else {
      if (activePage > 0) {
        activePage -= 1;
        self.handleChangeActivePage(activePage);
        self.scrollable = false;
      }
    }
    setTimeout(() => {
      self.scrollable = true;
    }, 1200);
  }

  /* 改变当前页面
   *
   * @params value 当前页数
   */
  handleChangeActivePage(page) {
    const self = this;
    page !== this.state.activePage && this.setState({ activePage: page });
    this.props.onSelect(page);
  }
}

Carousel.propTypes = propTypes;
Carousel.defaultProps = defaultProps;

export default Carousel;
