import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #27272a;
  color: #e5e7eb;
  height: 100vh;
  justify-content: center;
`;

const BarsContainer = styled.div`
  display: flex;
  align-items: flex-end;
  perspective: 1000px;
  border: 2px solid #e5e7eb;
  padding: 20px;
  border-radius: 10px;
  background-color: #3f3f46;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  width: 90%;
  max-width: 1200px;
`;

const barAnimation = keyframes`
  0% { transform: scaleY(0); }
  100% { transform: scaleY(1); }
`;

const Bar = styled.div`
  margin: 0 2px;
  background-color: #4f46e5;
  animation: ${barAnimation} 0.5s ease-in-out;
  transform-origin: bottom;
  transform: translateZ(0);
  flex: 1; /* Equal width for all bars */
`;

const Title = styled.h1`
  font-size: 2em;
  color: #e5e7eb;
  text-transform: uppercase;
`;

const Button = styled.button`
  margin: 10px;
  padding: 10px 20px;
  background-color: #1e3a8a;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #1e40af;
  }
`;

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [algorithm, setAlgorithm] = useState('Bubble Sort');

  useEffect(() => {
    resetArray();
  }, []);

  const resetArray = () => {
    const array = Array.from({ length: 50 }, () => Math.floor(Math.random() * 400) + 10);
    setArray(array);
  };

  const bubbleSort = async () => {
    const arr = [...array];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          await new Promise(resolve => setTimeout(resolve, 50));
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
        }
      }
    }
  };

  const quickSort = async (arr = array, left = 0, right = arr.length - 1) => {
    if (left < right) {
      const pivotIndex = await partition(arr, left, right);
      await quickSort(arr, left, pivotIndex - 1);
      await quickSort(arr, pivotIndex + 1, right);
    }
    setArray([...arr]);
  };

  const partition = async (arr, left, right) => {
    const pivot = arr[right];
    let i = left - 1;
    for (let j = left; j < right; j++) {
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setArray([...arr]);
        await new Promise(resolve => setTimeout(resolve, 50));
      }
    }
    [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
    setArray([...arr]);
    await new Promise(resolve => setTimeout(resolve, 50));
    return i + 1;
  };

  const mergeSort = async (arr = array, l = 0, r = arr.length - 1) => {
    if (l < r) {
      const m = Math.floor((l + r) / 2);
      await mergeSort(arr, l, m);
      await mergeSort(arr, m + 1, r);
      await merge(arr, l, m, r);
    }
    setArray([...arr]);
  };

  const merge = async (arr, l, m, r) => {
    const n1 = m - l + 1;
    const n2 = r - m;
    const left = new Array(n1);
    const right = new Array(n2);

    for (let i = 0; i < n1; i++) left[i] = arr[l + i];
    for (let j = 0; j < n2; j++) right[j] = arr[m + 1 + j];

    let i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
      if (left[i] <= right[j]) {
        arr[k] = left[i];
        i++;
      } else {
        arr[k] = right[j];
        j++;
      }
      setArray([...arr]);
      await new Promise(resolve => setTimeout(resolve, 50));
      k++;
    }

    while (i < n1) {
      arr[k] = left[i];
      i++;
      k++;
      setArray([...arr]);
      await new Promise(resolve => setTimeout(resolve, 50));
    }

    while (j < n2) {
      arr[k] = right[j];
      j++;
      k++;
      setArray([...arr]);
      await new Promise(resolve => setTimeout(resolve, 50));
    }
  };

  const handleSort = () => {
    if (algorithm === 'Bubble Sort') {
      bubbleSort();
    } else if (algorithm === 'Quick Sort') {
      quickSort();
    } else if (algorithm === 'Merge Sort') {
      mergeSort();
    }
  };

  return (
    <Container>
      <Title>{algorithm}</Title>
      <BarsContainer>
        {array.map((value, idx) => (
          <Bar key={idx} style={{ height: `${value}px` }}></Bar>
        ))}
      </BarsContainer>
      <div>
        <Button onClick={handleSort}>Sort</Button>
        <Button onClick={resetArray}>Reset</Button>
        <Button onClick={() => setAlgorithm('Bubble Sort')}>Bubble Sort</Button>
        <Button onClick={() => setAlgorithm('Quick Sort')}>Quick Sort</Button>
        <Button onClick={() => setAlgorithm('Merge Sort')}>Merge Sort</Button>
      </div>
    </Container>
  );
};

export default SortingVisualizer;
