function viz() {
  /*
    ES6
  */
  const data = [
    {
      "year": 2003,
      "hrs": 31
    },
    {
      "year": 2004,
      "hrs": 41
    },
    {
      "year": 2005,
      "hrs": 47
    },
    {
      "year": 2006,
      "hrs": 54
    },
    {
      "year": 2007,
      "hrs": 35
    },
    {
      "year": 2008,
      "hrs": 23
    },
    {
      "year": 2009,
      "hrs": 28
    },
    {
      "year": 2010,
      "hrs": 32
    },
    {
      "year": 2011,
      "hrs": 29
    },
    {
      "year": 2012,
      "hrs": 23
    },
    {
      "year": 2013,
      "hrs": 30
    },
    {
      "year": 2014,
      "hrs": 35
    },
    {
      "year": 2015,
      "hrs": 37
    },
    {
      "year": 2016,
      "hrs": 38
    }
  ];
  const width = 1000;
  const height = 450;
  const draw = SVG("target").size(width, height);
  function maxDiffer(arr) {
    let maxDiff = arr[1] - arr[0];
    for (let i = 0; i < arr.length; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] - arr[i] > maxDiff) {
          maxDiff = arr[j] - arr[i];
        }
      }
    }
    return maxDiff;
  }
  document.addEventListener("DOMContentLoaded", () => {
    const viewBox = draw.viewbox();
    const width = viewBox.width;
    const height = viewBox.height;
    const x = viewBox.x;
    const y = viewBox.y;
    const padding = width / 200;
    const vizWidth = width - padding;
    const years = data.length;
    const total = data.reduce((total, item) => {
      return total + item.hrs;
    }, 0);
    const avg = total / years;
    const verticalMidPoint = (y + height) / 2;
    const diffs = data.map((item) => {
      return item.hrs - avg;
    });
    const maxDiff = maxDiffer(diffs);
    const yIntervals = verticalMidPoint / maxDiff;
    const xInterval = (vizWidth / years);
    for (const i in diffs) {
      const newX = xInterval * i;
      const newY = diffs[i] * yIntervals;
      if (diffs[i] < 0) {
        draw.rect(
          xInterval - padding,
          Math.abs(newY)
        )
        .attr({
          "x": newX + padding,
          "y": verticalMidPoint,
        })
        .fill("#C8102E")
        .stroke("#ffffff");

        draw.plain(`${data[i].hrs} in ${data[i].year}`)
        .attr({
          "x": newX + padding,
          "y": verticalMidPoint + Math.abs(newY) + (padding * 3)
        });
      }
      else if (diffs[i] > 0) {
        draw.rect(
          xInterval - padding,
          newY,
        )
        .attr({
          "x": newX + padding,
          "y": verticalMidPoint - newY
        })
        .fill("#4A777A")
        .stroke("#ffffff");

        draw.plain(`${data[i].hrs} in ${data[i].year}`)
        .attr({
          "x": newX + padding,
          "y": verticalMidPoint - newY - (padding * 2)
        })
      }    
    }
    draw.line(
      x,
      verticalMidPoint,
      width,
      verticalMidPoint
    )
    .attr({ 
      "stroke": "#ffffff" 
    });

    draw.plain(`Based on an average of ${avg} home runs over ${years} years`)
    .attr({
      "x": x + padding,
      "y": height - (padding * 3)
    })
    .addClass("large");
  })

}

viz();