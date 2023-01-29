[![Coverage Status](https://coveralls.io/repos/github/guialexandree/habits-clean-api/badge.svg?branch=master)](https://coveralls.io/github/guialexandree/habits-clean-api?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/guialexandree/habits-clean-api/badge.svg?branch=master)](https://coveralls.io/github/guialexandree/habits-clean-api?branch=master)


# Habits 🎈 - API para Gerenciamento de Hábitos

Durante a semana NLW realizada pela **RocketSeat** para comunidade dev, foram desenvolvidos três projetos que juntos
tem a finalidade de Gerenciar hábitos diários.
Conforme sugerido pelo Diego ao final da semana deveríamos dar um passo além nos projetos e incluir mais funcionalidades.

### Rotas
🚩 POST `/habits` cadastro de novos hábitos<br>
🚩 GET `/day?date=YYY-MM-DD` retornar lista de hábitos possíveis e lista de ids de hábitos realizados<br>
🚩 PATCH `/habits/:id/toggle` inverte status do hábito entre **realizado** e **não realizado**<br>
🚩 GET `/summary` retorna resumo anual

### Estrutra do BD

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
 
![image](https://user-images.githubusercontent.com/30730216/214993356-ff27f507-8296-444b-a2be-7c3804c0a19f.png)
