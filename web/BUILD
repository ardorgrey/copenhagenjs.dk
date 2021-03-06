genrule(
  name = "next",
  srcs = glob([
    "components/**",
    "Dockerfile",
    "next.config.js",
    "package-lock.json",
    "package.json",
    "pages/**",
    "services/**",
    "static/**",
    "utils/**",
  ]) + ["//_posts:copy"] + ["//data:copy"],
  cmd = "tar --exclude='./node_modules' -czh . | docker build -f web/Dockerfile -t cphjs - && docker run --rm cphjs sh -c 'tar -C out -cvzf - .' > $(location build.tar.gz)",
  outs = ["build.tar.gz"],
  tags = ["requires-network", "no-remote"]
)

genrule(
  name = "storybook",
  srcs = glob([
    "components/**",
    "package-lock.json",
    "package.json",
    "Dockerfile-storybook",
    "static/**",
    "stories/**",
  ]),
  cmd = "tar --exclude='./node_modules' -czh . | docker build -t cphjs-storybook -f web/Dockerfile-storybook - && docker run --rm cphjs-storybook sh -c 'tar -C static/storybook -cvzf - .' > $(location storybook.tar.gz)",
  outs = ["storybook.tar.gz"],
  tags = ["no-sandbox"]
)

genrule(
  name = "deploy",
  srcs = ["build.tar.gz", "storybook.tar.gz", "firebase.json"],
  cmd = "cd web && mkdir -p out && tar -xf ../$(location build.tar.gz) -C out && tar -xf ../$(location storybook.tar.gz) -C out/static/storybook && firebase deploy | tee $(location firebase_deploy.txt)",
  outs = ["firebase_deploy.txt"],
  tags = ["manual", "local"]
)
