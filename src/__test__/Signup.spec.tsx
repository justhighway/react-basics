import '@testing-library/jest-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import SignupPage from '../pages/SignupPage';

const queryClient = new QueryClient();

describe('회원가입 테스트', () => {
  test('비밀번호와 비밀버호 확인 값이 일치하지 않으면 에러메시지가 표시된다.', () => {
    // given - 회원가입 페이지가 그려짐
    const routes = [
      {
        path: '/signup',
        element: <SignupPage />,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ['/signup'],
      initialIndex: 0,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} future={{ v7_startTransition: true }} />
      </QueryClientProvider>,
    );
    // when - 비밀번호와 비밀번호 확인 값이 일치하지 않음

    const passwordInput = screen.getByLabelText('passwordInput');
    const passwordConfirmInput = screen.getByLabelText('passwordConfirmInput');

    fireEvent.change(passwordInput, {
      target: { value: 'password' },
    });
    fireEvent.change(passwordConfirmInput, {
      target: { value: 'passwordConfirm' },
    });

    // then - 에러메시지를 표시함
  });
});
