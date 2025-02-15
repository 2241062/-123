// 获取相关元素
const btnYes = document.getElementById('btnYes');
const btnNo = document.getElementById('btnNo');
const mainImage = document.getElementById('mainImage');

// 右侧按钮点击次数
let noClickCount = 0;

// 左侧按钮的初始放大倍数
let yesScale = 1;

// 记录左侧按钮“原始宽度”（未放大时的 offsetWidth），用来计算放大后占用空间
// 注意：最好在页面加载完后获取，否则有可能取到 0
const yesInitialWidth = btnYes.offsetWidth;

// 设定左右按钮间要保持的“间距”，可自行调整
const gap = 20;

/**
 * 点击“可以”按钮:
 *   - 切换主图片为图片2
 *   - 不管点击多少次，都只是换成图片2，不再重复切换
 */
btnYes.addEventListener('click', () => {
  mainImage.src = 'images/2.png';
});

/**
 * 点击“不要”按钮:
 *   1) 根据点击次数 noClickCount 修改按钮文本 & 切换对应图片3/4
 *   2) 让左侧按钮逐次放大
 *   3) 保持左右按钮间距不变，从而逐渐把右侧按钮“挤”出容器/屏幕
 */
btnNo.addEventListener('click', () => {
  noClickCount++;

  // 修改右侧按钮文本 & 主图片
  switch (noClickCount) {
    case 1:
      btnNo.textContent = '不许选这个！';
      mainImage.src = 'images/3.png';
      break;
    case 2:
      btnNo.textContent = '不许选 :(';
      mainImage.src = 'images/4.png';
      break;
    case 3:
      btnNo.textContent = '不许选 ！';
      break;
    case 4:
      btnNo.textContent = '不许选 ！！！';
      break;
    default:
      btnNo.textContent = '不许选 ！！！';
      break;
  }

  // 左侧按钮放大倍数递增
  // 你可以调大或调小这个数值，让按钮变大速度更快或更慢
  yesScale += 0.3;

  // 应用放大效果
  btnYes.style.transform = `scale(${yesScale})`;

  // 计算左侧按钮放大后的宽度
  // 因为 transform 不会改变 offsetWidth，所以我们自己用 原始宽度 * scale 来估算
  const newYesWidth = yesInitialWidth * yesScale;

  // 让右侧按钮保持固定间距：
  // 右侧按钮的 left = 左侧按钮放大后宽度 + gap
  btnNo.style.left = (newYesWidth + gap) + 'px';
});
