@echo off
chcp 65001 >nul
title Сборка WB Reviews в .exe

echo ==============================================
echo  WB Reviews - сборка .exe для Windows
echo ==============================================
echo.

echo Проверяем Node.js...
node -v >nul 2>&1
if errorlevel 1 (
  echo [ОШИБКА] Node.js не установлен.
  echo 1) Откройте https://nodejs.org
  echo 2) Скачайте и установите версию LTS
  echo 3) Перезагрузите компьютер
  echo 4) Запустите этот файл снова
  echo.
  pause
  exit /b 1
)

echo.
echo Шаг 1/2: Устанавливаем зависимости (npm install)...
call npm install
if errorlevel 1 (
  echo.
  echo [ОШИБКА] Не удалось установить зависимости.
  pause
  exit /b 1
)

echo.
echo Шаг 2/2: Собираем .exe (может занять 3-10 минут)...
call npm run desktop:build
if errorlevel 1 (
  echo.
  echo [ОШИБКА] Сборка не удалась.
  pause
  exit /b 1
)

echo.
echo ГОТОВО!
echo Ищите готовый .exe в папке dist\
echo Обычно файл называется примерно так: "WB Reviews.exe"
echo.
pause
