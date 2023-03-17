# 원티드 프리온보딩 인턴십 3주차 기업과제 - Flexsys

## 📜 목차

1. [과제 소개](#-과제-소개)
2. [실행 방법](#%EF%B8%8F-실행-방법)
3. [배포 링크](#-배포-링크)
4. [기술 스택](#%EF%B8%8F-기술-스택)
5. [폴더 구조](#-폴더-구조)
6. [모범 사례](#-모범-사례)
7. [협업 방식](#-협업-방식)
8. [팀 구성원](#-팀-구성원)

<!--  -->
<br />

## 📝 과제 소개

### 진행 기간: 2023.03.13 ~ 2023.03.17 (5일)

- AI기반 RPA 기술에 특화된 벤처기업 플렉시스의 기업과제입니다.
- 주어진 mock 데이터를 기반으로 시계열 차트 만들기

<br />

### 과제 요구사항

1. 시계열 차트 만들기
   - 주어진 JSON 데이터의 `key`값(시간)을 기반으로 시계열 차트를 만들어주세요
   - 하나의 차트안에 Area 형태의 그래프와 Bar 형태의 그래프가 모두 존재하는 복합 그래프로 만들어주세요
   - Area 그래프의 기준값은 `value_area` 값을 이용해주세요
   - Bar 그래프의 기준값은 `value_bar` 값을 이용해주세요
   - 차트의 Y축에 대략적인 수치를 표현해주세요(예시 이미지 참고)

<br />

2. 호버 기능 구현
   - 특정 데이터 구역에 마우스 호버시 `id, value_area, value_bar` 데이터를 툴팁 형태로 제공해주세요

<br />

3. 필터링 기능 구현
   - 필터링 기능을 구현해주세요, 필터링은 특정 데이터를 하이라이트 하는 방식으로 구현해주세요
   - 필터링 기능은 버튼 형태로 ID값(지역이름)을 이용해주세요
   - 필터링 시 버튼에서 선택한 ID값과 동일한 ID값을 가진 데이터 구역만 하이라이트 처리를 해주세요
   - 특정 데이터 구역을 클릭 시에도 필터링 기능과 동일한 형태로 동일한 ID값을 가진 데이터 구역을 하이라이트해주세요

<!--  -->
<br />

## 🕹️ 실행 방법

```
$ git clone https://github.com/wanted-pre-onboarding-internship-team-6/pre-onboarding-9th-3-6.git
$ cd pre-onboarding-9th-3-6
$ npm install
$ npm run dev
```

<!--  -->
<br />

## 🔗 배포 링크


💥**주의: 1~3초 사이의 로딩 시간과 30%의 에러 가능성을 설정해놓았습니다. 에러가 발생했다면 새로고침해주세요.**

[바로 가기](https://pre-onboarding-9th-3-6.vercel.app/)

<!--  -->
<br />

## 🛠️ 기술 스택

<!--
[Shield.io](http://shield.io/) 배지 양식

<img src= "[https://img.shields.io/badge/라벨-색상?style=배지스타일&logo=로고이름&logoColor=로고색상](https://img.shields.io/badge/%EB%9D%BC%EB%B2%A8-%EC%83%89%EC%83%81?style=%EB%B0%B0%EC%A7%80%EC%8A%A4%ED%83%80%EC%9D%BC&logo=%EB%A1%9C%EA%B3%A0%EC%9D%B4%EB%A6%84&logoColor=%EB%A1%9C%EA%B3%A0%EC%83%89%EC%83%81)">

- 라벨: 임의의 이름
- 색상: [https://simpleicons.org/](https://simpleicons.org/) 에서 검색한 로고의 색상코드 (# 제외하고 입력)
- 배지 스타일: plastic, flat, flat-square, for-the-badge, social 중 하나 선택
- 로고 이름: [https://simpleicons.org/](https://simpleicons.org/) 에서 검색한 로고의 이름
- 로고 색상: 로고의 색상코드
-->
<p>
<!-- npm -->
<img src= "https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white">
<!-- Vite -->
<img src= "https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=white">
<!-- Typescript -->
<img src= "https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
<!-- React -->
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
<!-- React Router -->
<img src="https://img.shields.io/badge/react router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white">
<!-- ChartJS -->
<img src="https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=Chart.js&logoColor=white">
<!-- emotion -->
<img src="https://img.shields.io/badge/emotion-D26AC2?style=for-the-badge&logoColor=white">
<!-- Husky -->
<img src= "https://img.shields.io/badge/husky-000000?style=for-the-badge&logoColor=white"> 
<!-- ESLint -->
<img src= "https://img.shields.io/badge/eslint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white"> 
<!-- Prettier -->
<img src= "https://img.shields.io/badge/prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black"> 
<!-- Vercel -->
<img src= "https://img.shields.io/badge/vercel-000000?style=for-the-badge&logo=vercel&logoColor=white">
<!-- GitHub -->
<img src= "https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
<!-- Discord -->
<img src= "https://img.shields.io/badge/discord-5865F2?style=for-the-badge&logo=discord&logoColor=white">
<!-- notion -->
<img src= "https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white">
</p>
<!-- 선택사항: 각 기술의 선정 이유 -->

- `Vite` : 빠른 번들링 속도와 네이티브 ESM 사용 등으로 빠르고 효율적인 웹 개발을 가능하게 함.
- `chartjs` : canvas를 이용한 차트를 간편히 구현하기 위해 사용함.
- `react-chartjs-2` : React 컴포넌트 구문으로 사용가능, Chart.js 기반, GitHub stars: 5.7K+, npm 다운로드수 770K+
- `react-router-dom` : `useSearchParams`를 이용하여 url querystring를 상태변수처럼 다루기 위해 사용함

<!-- -->
<br />

## 📂 폴더 구조

<!--
file-tree-generator(VSCode Extension) 설치
=> 파일 탐색기에서 우클릭
=> Generate to Tree 클릭
=> 복사 및 붙여넣기
-->

```
📦src
 ┣ 📂api
 ┃ ┣ 📜chartDatas.ts
 ┃ ┗ 📜index.ts
 ┣ 📂components
 ┃ ┣ 📜AsyncBoundary.tsx
 ┃ ┣ 📜Chart.tsx
 ┃ ┣ 📜Error.tsx
 ┃ ┣ 📜ErrorBoundary.tsx
 ┃ ┣ 📜index.ts
 ┃ ┣ 📜Layout.tsx
 ┃ ┣ 📜Loading.tsx
 ┃ ┗ 📜RegionFilter.tsx
 ┣ 📂constants
 ┃ ┣ 📜chart.ts
 ┃ ┣ 📜color.ts
 ┃ ┗ 📜index.ts
 ┣ 📂hooks
 ┃ ┣ 📜index.ts
 ┃ ┗ 📜useChartDatas.ts
 ┣ 📂pages
 ┃ ┣ 📜ChartPage.tsx
 ┃ ┗ 📜index.ts
 ┣ 📂styles
 ┃ ┗ 📜reset.ts
 ┣ 📂types
 ┃ ┣ 📜chart.ts
 ┃ ┗ 📜index.ts
 ┣ 📂utils
 ┃ ┣ 📜delayFailRandomly.ts
 ┃ ┣ 📜extractRegionFrom.ts
 ┃ ┣ 📜index.ts
 ┃ ┣ 📜makeChartColors.ts
 ┃ ┣ 📜reformChartData.ts
 ┃ ┗ 📜suspend.ts
 ┣ 📜App.tsx
 ┣ 📜main.tsx
 ┣ 📜Router.tsx
 ┗ 📜vite-env.d.ts
```

<!--  -->
<br />

## 🥇 모범 사례

### 커스텀 훅

차트 데이터를 훅으로 관리했습니다.

<details>
<summary>useChartDatas.ts</summary>
<div markdown="1">

```tsx
import { useState } from 'react';

import { fetchChartDatas } from '@/api';
import { delayFailRandomly, reformChartData, suspend } from '@/utils';

import type { ChartData, ReformedChartData } from '@/types';

const suspended = suspend(() => delayFailRandomly(fetchChartDatas));

export default function useChartDatas() {
  const [chartDatas, setChartDatas] = useState<ReformedChartData[]>([]);

  if (chartDatas.length === 0) {
    const response = suspended.promise.resolved() as ChartData;
    const chartData = reformChartData(response);

    setChartDatas(chartData);
  }

  return { chartDatas };
}
```

</div>
</details>

<br />

### 차트 시인성 개선

<details>
<summary>1단계 value_bar와 value_area 값의 차이가 **1000배** 이상이라 그대로 그래프에 출력하면 value_area는 상대적으로 바닥에 붙어있어 파악이 힘들었습니다.</summary>
<div markdown="1">

![1단계](https://user-images.githubusercontent.com/83561523/225860895-34e13720-c082-492d-9b4e-3fbbb94e9a89.png)

</div>
</details>

<details>
<summary>2단계 차트의 Y축을 두 개로 나누었는데 두 그래프 Y축 범위가 같아져서 각 값들을 구별하기가 어려워졌습니다.</summary>
<div markdown="1">

![2단계](https://user-images.githubusercontent.com/83561523/225861052-c88e5d03-b429-4a14-854b-bfcb653213c9.png)

</div>
</details>

3단계 최종적으로 X축의 tick 범위를 조정해 차트의 시인성을 개선했습니다.

![3단계](https://user-images.githubusercontent.com/83561523/225861081-e87b1cce-ec9f-48c5-a097-74be21769e08.png)

<!--
![chartfinal](https://user-images.githubusercontent.com/60649092/225910555-8a11e8b7-c8fa-49bc-9145-d4db12e427c3.png) -->

<br />

### 버튼 클릭시 상태관리

필터에 사용되는 값을 `state`로 관리하면 새로고침이나 뒤로가기 시에 휘발되어 필터링된 상태를 유지할 수 없다는 단점이 있었습니다. 이는 UX를 저해하기에 `react-router-dom`에서 제공하는 `useSearchParams` 훅을 사용해 쿼리스트링으로 관리함으로써 필터 상태를 유지하도록 구현했습니다.

예시) `http://127.0.0.1:5173/?region=성북구`

<br />

### 데이터 재설정

<details>
<summary>fetch로 가져온 데이터를 클라이언트에서 사용하기 쉽도록 다시 구조화 하였습니다</summary>
<div markdown="1">
fetch로 가져온 데이터를 클라이언트에서 사용하기 쉽도록 다시 구조화 하였습니다

```tsx
interface reformedChartData {
  bar: number;
  area: number;
  region: string;
  timestamp: string;
}
```

</div>
</details>

<br />

### type-only import / export

import/export 하는 것이 타입임을 명시하는 문법입니다. 런타임에 사용되지 않아도 되는 import를 구분하여 컴파일 결과에서 제외함으로써 혹시 모를 에러를 방지할 수 있고, 빌드의 크기도 줄어듭니다. 개발자 입장에서도 import/export 하는 코드가 타입인지, 값을 담은 변수나 함수인지 구별할 수 있게 해줍니다.

```tsx
interface ChartData {
  [timestamp: string]: {
    id: string;
    value_bar: number;
    value_area: number;
  };
}

export type { ChartData };
```

<br />

### Suspense, ErrorBoundary

컴포넌트의 로딩과 에러 상태를 선언적으로 다루기 위해 Suspense와 ErrorBoundary 조합해 AsyncBoundary를 만들어 활용했습니다.

```tsx
export default function ChartPage() {
  return (
    <AsyncBoundary loading={<Loading />} error={<Error />}>
      <Chart />
    </AsyncBoundary>
  );
}
```

<br />

### utils 함수 사용

반복되는 코드를 줄이기 위해서 유틸 함수를 사용하여 코드를 구조화 하였습니다.

```
📦utils
 ┣ 📜delayFailRandomly.ts
 ┣ 📜extractRegionFrom.ts
 ┣ 📜index.ts
 ┣ 📜makeChartColors.ts
 ┣ 📜reformChartData.ts
 ┗ 📜suspend.ts
```

<br />

### datasets pasing 속성 사용

area차트와 bar차트를 위한 데이터를 따로 생성하지 않고 dataset의 pasing 속성을 사용하였습니다

```tsx
...
parsing: {
  xAxisKey: 'timestamp',
  yAxisKey: 'area',
},
...
```

<br />

## 🤝 협업 방식

### 1. 요구사항 분석

과제의 요구사항을 분석하고 세세한 항목으로 나눠 분류합니다.

### 2. 이슈 발행

분석한 요구사항을 기간에 맞게 분배한 후 각 날짜에 해당하는 [이슈](https://github.com/wanted-pre-onboarding-internship-team-6/pre-onboarding-9th-3-6/issues)를 생성합니다.

### 3. 구현 & PR

각자 해당 날짜의 이슈를 코드로 구현하고 커밋([git 컨벤션](https://github.com/wanted-pre-onboarding-internship-team-6/pre-onboarding-9th-3-6/blob/main/.gitmessage.txt))하고 [PR](https://github.com/wanted-pre-onboarding-internship-team-6/pre-onboarding-9th-3-6/pulls)을 올립니다.

### 4. 코드 리뷰

각자의 PR을 보며 코드 리뷰를 합니다.

### 5. 모범 사례 선정

요구사항을 기록한 이슈에서 해당 이슈의 모범 사례라고 생각하는 PR의 번호를 작성해 투표([git Discussions](https://github.com/wanted-pre-onboarding-internship-team-6/pre-onboarding-9th-3-6/discussions))합니다. 모범 사례에 가장 가까운 PR을 선정하고 다른 PR의 모범 사례를 적용해 부족한 점을 보완합니다.

### 6. Merge

보완한 코드로 PR을 올려 Merge 하고 다음 요구사항 이슈에 대해 반복합니다.

<!-- <table>
<tbody>
<tr>
<td style="font-weight: bold">build</td>
<td>CI configuration 파일 또는 scripts의 변경사항</td>
</tr>
<tr>
<td style="font-weight: bold">ci</td>
<td>빌드 시스템이나 외부 의존성에 영향을 미치는 변경사항</td>
</tr>
<tr>
<td style="font-weight: bold">config</td>
<td>설정 관련 파일 작성 또는 변경</td>
</tr>
<tr>
<td style="font-weight: bold">docs</td>
<td>문서 변경사항</td>
</tr>
<tr>
<td style="font-weight: bold">feat</td>
<td>새로운 기능 추가</td>
</tr>
<tr>
<td style="font-weight: bold">fix</td>
<td>버그 수정</td>
</tr>
<tr>
<td style="font-weight: bold">perf</td>
<td>성능을 향상시키는 변경사항</td>
</tr>
<tr>
<td style="font-weight: bold">refactor</td>
<td>기능 추가나 버그 수정이 아닌 변경 사항</td>
</tr>
<tr>
<td style="font-weight: bold">remove</td>
<td>코드나 파일 제거</td>
</tr>
<tr>
<td style="font-weight: bold">style</td>
<td>스타일(CSS) 변경사항</td>
</tr>
</tbody>
</table> -->

<!--  -->

<br />

## 👥 팀 구성원

<table>
  <tbody>
    <tr>
      <td align="center"><a href="https://github.com/ggongjukim"><img src="https://avatars.githubusercontent.com/u/75241542?v=4" width="100px;"/><br /><sub><b>김채현</b></sub></a><br /></td>
      <td align="center"><a href="https://github.com/bymine"><img src="https://avatars.githubusercontent.com/u/71866185?v=4" width="100px;" /><br /><sub><b>박수빈</b></sub></a><br /></td>
      <td align="center"><a href="https://github.com/pji0219"><img src="https://avatars.githubusercontent.com/u/66911726?v=4" width="100px;" /><br /><sub><b>박종익</b></sub></a><br /></td>
      <td align="center"><a href="https://github.com/dong-geon-Lee"><img src="https://avatars.githubusercontent.com/u/71866185?v=4" width="100px;" /><br /><sub><b>이동건</b></sub></a><br /></td>
    <tr></tr>
      <td align="center"><a href="https://github.com/dlwnstjrzz"><img src="https://avatars.githubusercontent.com/u/95525638?v=4" width="100px;" /><br /><sub><b>이준석</b></sub></a><br /></td>
      <td align="center"><a href="https://github.com/Chun-gu"><img src="https://avatars.githubusercontent.com/u/60649092?v=4" width="100px;" /><br /><sub><b>이춘구</b></sub></a><br /></td>
      <td align="center"><a href="https://github.com/theo-jin"><img src="https://avatars.githubusercontent.com/u/83561523?v=4" width="100px;" /><br /><sub><b>진형빈</b></sub></a><br /></t>
      <td align="center"><a href="https://github.com/Sungrinhan"><img src="https://avatars.githubusercontent.com/u/78065205?v=4" width="100px;" /><br /><sub><b>한성린</b></sub></a><br /></td>
    </tr>
  </tbody>
</table>

[🔺 목차로 돌아가기](#-목차)
