# Редактор параметров

Тестовое задание: реализация компонента для редактирования параметров товара на React + TypeScript.

## Установка / запуск / тестирование

```bash
npm install
npm test
npm run dev
```

## Описание решения

Компонент `ParamEditor` позволяет редактировать структуру `Model` на основе списка параметров `params: Param[]`.

### Результаты тестов

```bash
 ✓ src/ParamEditor.test.tsx (4 tests) 463ms
   ✓ ParamEditor (4)
     ✓ отображает все поля по params 40ms
     ✓ корректно инициализирует значения из model.paramValues 6ms
     ✓ корректно возвращает getModel() после изменений 384ms
     ✓ обрабатывает пустые начальные значения 32ms

 Test Files  1 passed (1)
      Tests  4 passed (4)
   Start at  15:53:00
   Duration  2.09s
```
