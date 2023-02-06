[![Coverage Status](https://coveralls.io/repos/github/guialexandree/habits-clean-api/badge.svg?branch=master)](https://coveralls.io/github/guialexandree/habits-clean-api?branch=master)
[![Known Vulnerabilities](https://snyk.io/test/github/guialexandree/habits-clean-api/badge.svg)](https://snyk.io/test/github/guialexandree/habits-clean-api)
[![](https://github.com/guialexandree/habits-clean-api/actions/workflows/development-ci.yml/badge.svg)](https://github.com/guialexandree/habits-clean-api/actions/workflows/development-ci.yml/badge.svg)
[![](https://github.com/guialexandree/habits-clean-api/actions/workflows/release-ci.yml/badge.svg)](https://github.com/guialexandree/habits-clean-api/actions/workflows/release-ci.yml/badge.svg)


# Habits 🎈 - API para Gerenciamento de Hábitos

![image](https://user-images.githubusercontent.com/30730216/215792250-ae7ce48a-3fed-4c11-a126-ae12bd87d217.png)

Durante a semana NLW realizada pela **RocketSeat** para comunidade dev, foram desenvolvidos três projetos que juntos
tem a finalidade de Gerenciar hábitos diários.
Conforme sugerido pelo Diego ao final da semana deveríamos dar um passo além nos projetos e incluir mais funcionalidades.

## Analise de Requisitos

Código | Requisito | RN
--- | --- | --- |
RF01 | Deve ser possível criar hábitos semanais | RN01 |
RF02 | Deve ser possível consultar os hábitos disponíveis em determinado dia | RN02, RN03 |
RF03 | Deve ser possível consultar os hábitos realizados em determinado dia | RN02, RN03 |
RF04 | Deve ser possível consultar lista anual de hábitos disponiveis | RN04, RN05, RN06 |
RF05 | Deve ser possível consultar lista anual de hábitos realizados  | RN04, RN05, RN06 |
RF06 | Deve ser possível marcar um hábito como realizado  | RN07, RN08, RN09 |
RF07 | Deve ser possível cancelar a realização de um hábito como realizado  | RN07, RN10 |

Código | Regra de Negócio
--- | --- |
RN01 | Requer um título e pelo menos um dia da semana para realização do hábito |
RN02 | Os hábitos devem ficar visíveis a partir da data de criação |
RN03 | Requer data no formato YYYY-MM-DD |
RN04 | Deve ser retornado a lista com informações diárias de hábitos `amount` e `completed` |
RN05 | O dia só deve ser retornado se possuia hábito disponível no dia da semana |
RN06 | O dia só deve ser retornado se possuia hábito realizado no dia da semana |
RN07 | Deve ser válido se o id do hábito fornecido é válido |
RN08 | Os hábitos serão marcados como realizados sempre na data atual |
RN09 | Não deve ser possível realizar hábitos em data retroativas |
RN10 | Não deve ser possível cancelar a realização de hábitos em data retroativa |

## Rotas
🚩 POST `/habits` cadastro de novos hábitos<br>
🚩 GET `/day?date=YYY-MM-DD` retornar lista de hábitos possíveis e lista de ids de hábitos realizados<br>
🚩 PATCH `/habits/:id/toggle` inverte status do hábito entre **realizado** e **não realizado**<br>
🚩 GET `/summary` retorna resumo anual

## Estrutra do BD

![image](https://user-images.githubusercontent.com/30730216/215297229-df351b45-2445-4e6a-a162-91374ca0b56f.png)

## Repositório dos projetos desenvolvidos no evento
- API - NodeJs, Fastify, Sqlite [🔗](https://github.com/guialexandree/rocketseat-nlw-setup-backend)
- Web - React [🔗](https://github.com/guialexandree/rocketseat-nlw-setup-web)
- Mobile - React Native [🔗](https://github.com/guialexandree/rocketseat-nlw-setup-mobile)

> Decidi recria-los aplicando conceitos de padrões de projetos e estruturação de código, para consolidar alguns conceitos que 
> aprendi recentemente em alguns cursos e desenvolver mais a minha escrita de testes. 
> Algumas lib externas utilizadas no evento foram descartadas e recriadas suas funcionalidades aplicando padrões de projeto.

## Desafio de refatoração

O projeto foi desenvolvido utilizando **TDD** como metodologia de trabalho, **Arquitetura Limpa** para fazer a distribuição
das responsabilidades em camadas, seguindo os princípios de **SOLID**. Foram criadas novas validações para correçõpes de bugs,
o código está com 100% de cobertura de testes 💚.

## Contribuindo

Sinta-se à vontade para enviar pull requests para ajudar:
- Corrigir erros;
- Reestruturação;
- Envie problemas e bugs.
